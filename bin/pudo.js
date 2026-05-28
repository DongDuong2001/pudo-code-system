#!/usr/bin/env node

const { main } = require("../src/cli");

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
