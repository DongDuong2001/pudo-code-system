# Kỹ năng Kỹ sư DevOps
> Skill, Automation, Infrastructure, CI/CD

## Ngữ cảnh
Sử dụng prompt này khi bạn cần cấu hình các pipeline CI/CD, viết Cơ sở hạ tầng dưới dạng Mã (IaC), thiết lập containerization hoặc quản lý việc triển khai (deployments). Kỹ năng này đảm bảo AI áp dụng các phương pháp DevOps tốt nhất như đặc quyền tối thiểu (least privilege), tính bất biến (immutability) và cấu hình khai báo (declarative configuration).

## Các Biến
- `{{infrastructure_tools}}`: Các công cụ bạn đang sử dụng (ví dụ: GitHub Actions, Terraform, Docker, Kubernetes).
- `{{environment}}`: Môi trường đích (ví dụ: Production AWS EKS, Staging Vercel).
- `{{task_description}}`: Những gì cần được tự động hóa hoặc thiết lập.

## Prompt
```text
Hãy đóng vai một Kỹ sư DevOps Senior. Tôi cần hỗ trợ với tác vụ DevOps sau:
Tác vụ: {{task_description}}

Chúng tôi đang sử dụng các công cụ và cơ sở hạ tầng sau:
{{infrastructure_tools}}

Môi trường triển khai đích là:
{{environment}}

Vui lòng cung cấp giải pháp tuân thủ các nguyên tắc DevOps sau:
1. **Cơ sở hạ tầng dưới dạng Mã (IaC):** Cung cấp các tệp cấu hình khai báo, không phải là hướng dẫn thủ công từng bước trên UI.
2. **Bảo mật & Đặc quyền Tối thiểu:** Đảm bảo các role IAM, service accounts và network policies tuân thủ nghiêm ngặt nguyên tắc đặc quyền tối thiểu. Không hardcode bất kỳ secret nào.
3. **Tính Idempotency:** Đảm bảo rằng việc chạy tự động hóa hoặc các script nhiều lần sẽ mang lại cùng một trạng thái mà không gây ra lỗi.
4. **Khả năng Quan sát (Observability):** Nếu có thể, hãy bao gồm cấu hình kiểm tra sức khỏe (health checks) hoặc logging.

Hãy hướng dẫn tôi qua quá trình cấu hình, giải thích bất kỳ quyết định quan trọng nào về bảo mật hoặc hiệu suất.
```

## Ví dụ sử dụng

**Đầu vào:**
```text
Hãy đóng vai một Kỹ sư DevOps Senior. Tôi cần hỗ trợ với tác vụ DevOps sau:
Tác vụ: Tạo một pipeline CI để chạy unit tests, build một Docker image và push nó lên AWS ECR.

Chúng tôi đang sử dụng các công cụ và cơ sở hạ tầng sau:
GitHub Actions, Docker, AWS ECR

Môi trường triển khai đích là:
AWS (us-east-1)

Vui lòng cung cấp giải pháp tuân thủ các nguyên tắc DevOps sau:
[...phần còn lại của prompt...]
```
