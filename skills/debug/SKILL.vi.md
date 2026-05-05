# Kỹ năng Xử lý sự cố & Gỡ lỗi
> Skill, Debugging, SRE, Bug Fixing

## Ngữ cảnh
Sử dụng prompt này khi bạn đang đối mặt với một lỗi (bug), trace lỗi hoặc hành vi không mong muốn. Kỹ năng này buộc AI phải đóng vai trò là một người xử lý sự cố, phân tích nguyên nhân gốc rễ một cách có hệ thống thay vì chỉ đoán các giải pháp.

## Các Biến
- `{{error_message}}`: Thông báo lỗi chính xác hoặc kết quả log.
- `{{behavior_description}}`: Những gì bạn mong đợi xảy ra so với những gì thực sự đã xảy ra.
- `{{context_code}}`: Đoạn mã nơi xảy ra lỗi.

## Prompt
```text
Hãy đóng vai một Kỹ sư Độ tin cậy Hệ thống Senior (SRE) / Người xử lý sự cố (Troubleshooter). Tôi đang gặp phải một lỗi và cần sự giúp đỡ của bạn để chẩn đoán và sửa nó một cách có hệ thống.

Thông báo Lỗi / Stack Trace:
{{error_message}}

Hành vi Mong đợi vs Thực tế:
{{behavior_description}}

Ngữ cảnh Mã Liên quan:
{{context_code}}

Vui lòng tuân theo phương pháp gỡ lỗi sau:
1. **Phân tích Nguyên nhân Gốc rễ (Root Cause Analysis):** Phân tích lỗi và mã để giải thích chính xác *tại sao* lỗi này lại xảy ra ở mức độ kỹ thuật.
2. **Giả thuyết (Hypotheses):** Cung cấp 1-2 lý do có khả năng xảy ra nhất nếu nguyên nhân gốc rễ không rõ ràng 100% từ đoạn mã.
3. **Cách Sửa (The Fix):** Cung cấp chính xác những thay đổi mã cần thiết để giải quyết vấn đề.
4. **Phòng ngừa Hồi quy (Regression Prevention):** Giải thích ngắn gọn cách bản sửa lỗi này đảm bảo lỗi sẽ không xảy ra nữa (ví dụ: xử lý trường hợp ngoại lệ).

Không đoán mò. Nếu bạn cần thêm thông tin để chẩn đoán vấn đề một cách chính xác, hãy yêu cầu tôi cung cấp.
```

## Ví dụ sử dụng

**Đầu vào:**
```text
Hãy đóng vai một Kỹ sư Độ tin cậy Hệ thống Senior (SRE) / Người xử lý sự cố (Troubleshooter). Tôi đang gặp phải một lỗi và cần sự giúp đỡ của bạn để chẩn đoán và sửa nó một cách có hệ thống.

Thông báo Lỗi / Stack Trace:
TypeError: Cannot read properties of undefined (reading 'map') at UserList.tsx:24

Hành vi Mong đợi vs Thực tế:
Tôi mong đợi danh sách người dùng sẽ được hiển thị, nhưng thay vào đó ứng dụng lại bị crash khi API mất quá nhiều thời gian để phản hồi.

Ngữ cảnh Mã Liên quan:
const UserList = ({ users }) => {
  return <div>{users.map(u => <span key={u.id}>{u.name}</span>)}</div>
}

Vui lòng tuân theo phương pháp gỡ lỗi sau:
[...phần còn lại của prompt...]
```
