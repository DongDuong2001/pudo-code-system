# Caching & Messaging Playbook

This playbook covers cache patterns, Redis configurations, asynchronous message queues (RabbitMQ, Kafka), and real-time state synchronization via WebSockets.

---

## 1. Caching & Redis

### Explanation
Caching speeds up database read queries by storing high-access datasets in memory. Redis is the standard distributed in-memory data store. Common patterns include Cache-Aside (application queries cache, falls back to DB, and populates cache) and Write-Through (data is written to cache and DB simultaneously).

### Best Practices
- **Implement TTLs:** Always configure Time-To-Live (TTL) values for all cached objects to prevent stale data.
- **Cache Invalidation:** Use cache eviction policies (e.g., volatile-lru) and explicitly delete keys upon record updates (Cache-Aside invalidation).
- **Prevent Thundering Herd:** Use mutexes or lock patterns to prevent concurrent database hits when a hot cache key expires.

### Common Mistakes
- Cache stampede/thundering herd (failing to handle multi-client misses on hot keys).
- Caching large unindexed blobs without pagination or compression.

### AI Prompt
> "Write a Redis cache-aside implementation in Node.js for fetching user profiles. Check Redis first; on miss, query the database, populate Redis with a 1-hour TTL, and use a locking mechanism to avoid cache stampede."

### Checklist
- [ ] TTL configured on every cache write.
- [ ] Invalidation logic triggers immediately on DB write/update.
- [ ] Handled thundering herd/cache stampede cases.

### Example
```javascript
import Redis from 'ioredis';
const redis = new Redis();

async function getUserProfile(userId, dbQuery) {
  const cacheKey = `user:${userId}:profile`;
  const cachedData = await redis.get(cacheKey);

  if (cachedData) return JSON.parse(cachedData);

  // Simple lock key to prevent stampede
  const lockKey = `lock:${cacheKey}`;
  const acquired = await redis.set(lockKey, 'true', 'NX', 'PX', 5000);

  if (acquired) {
    const profile = await dbQuery(userId);
    await redis.set(cacheKey, JSON.stringify(profile), 'EX', 3600); // 1 hour TTL
    await redis.del(lockKey);
    return profile;
  } else {
    // Retry fetch after small delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return getUserProfile(userId, dbQuery);
  }
}
```

---

## 2. Message Queues (RabbitMQ & Kafka)

### Explanation
Message queues enable asynchronous processing, microservice decoupling, and system scaling. RabbitMQ is a message broker focusing on flexible routing (AMQP), while Apache Kafka is a distributed event streaming platform built for high-throughput replayable logs.

### Best Practices
- **Idempotent Consumers:** Ensure event handling logic can run multiple times without duplicate side effects (at-least-once delivery guarantee).
- **Dead-Letter Exchange (DLX):** Route failing messages to a DLX/DLQ for isolation, investigation, and manual retries.
- **Backpressure & Prefetch:** Configure prefetch limits on consumers so they are not overwhelmed by incoming messages.

### Common Mistakes
- Committing Kafka offsets before message processing is complete (leads to lost messages on consumer crash).
- Infinite retry loops without backoff or routing to a DLQ (leads to CPU resource starvation).

### AI Prompt
> "Generate a RabbitMQ message consumer in Node.js using amqplib. Configure a prefetch limit of 10, process incoming jobs, acknowledge on success, and route messages to a Dead-Letter Queue (DLQ) after 3 failed retries."

### Checklist
- [ ] Consumers are idempotent.
- [ ] Prefetch count/limit is configured.
- [ ] Dead-Letter Queue (DLQ) is active and monitored.

### Example
```javascript
import amqp from 'amqplib';

async function startConsumer() {
  const conn = await amqp.connect('amqp://localhost');
  const channel = await conn.createChannel();
  
  const queue = 'orders';
  const dlq = 'orders.dlq';
  
  await channel.assertQueue(queue, {
    durable: true,
    deadLetterExchange: '',
    deadLetterRoutingKey: dlq
  });
  
  channel.prefetch(10);
  
  channel.consume(queue, async (msg) => {
    if (!msg) return;
    try {
      const order = JSON.parse(msg.content.toString());
      // Process business logic idempotently
      console.log(`Processing Order ${order.id}`);
      channel.ack(msg);
    } catch (err) {
      console.error('Processing failed', err);
      // Nack and reject, moving to DLQ (no requeue)
      channel.reject(msg, false);
    }
  });
}
```

---

## 3. WebSockets

### Explanation
WebSockets provide persistent, bidirectional, low-latency communication channels between client and server. Essential for real-time applications like chat engines and live dashboards.

### Best Practices
- **Heartbeat / Ping-Pong:** Implement active ping-pong mechanisms to clean up dead connections and avoid port exhaustion.
- **Authentication Handshake:** Validate authentication credentials during the initial HTTP Upgrade handshake. Never accept unauthenticated connections.
- **Horizontal Scaling:** Use a pub/sub adapter (like Redis adapter) to distribute WebSocket messages across multiple node instances.

### Common Mistakes
- Allowing unauthorized users to upgrade to WebSockets.
- Leaking closed sockets in server memory lists.

### AI Prompt
> "Write a secure WebSocket server implementation in Node.js using ws and redis. Authenticate users during the upgrade phase using JWT, and implement a heartbeat ping-pong interval to clean up stale connections."

### Checklist
- [ ] Connection upgrade requires JWT verification.
- [ ] Active heartbeat mechanism removes dead sockets.
- [ ] Multi-instance sync configured via Redis Pub/Sub.

### Example
```javascript
import { WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken';

const wss = new WebSocketServer({ noServer: true });

wss.on('connection', (ws) => {
  ws.isAlive = true;
  ws.on('pong', () => { ws.isAlive = true; });

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
  });
});

// Heartbeat interval
const interval = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (ws.isAlive === false) return ws.terminate();
    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

wss.on('close', () => {
  clearInterval(interval);
});
```
