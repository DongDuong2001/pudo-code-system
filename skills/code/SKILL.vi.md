# Kỹ năng Lập trình Phần mềm
> Skill, Coding, Implementation, Clean Code

## Ngữ cảnh
Sử dụng prompt này khi bạn đã có một kế hoạch rõ ràng và cần AI tạo ra mã thực hiện (implementation code) thực tế. Kỹ năng này thực thi việc tuân thủ nghiêm ngặt các nguyên tắc Clean Code, khả năng kiểm thử và xử lý lỗi mạnh mẽ.

## Các Biến
- `{{specifications}}`: Yêu cầu chi tiết hoặc các bước cho mã bạn cần.
- `{{language_framework}}`: Ngôn ngữ lập trình và framework đang được sử dụng.
- `{{existing_patterns}}`: Bất kỳ mẫu (pattern) nào đã được thiết lập trong codebase mà AI phải tuân theo.

## Prompt
```text
Hãy đóng vai một Kỹ sư Phần mềm Senior. Tôi cần bạn viết mã sẵn sàng cho production dựa trên các thông số kỹ thuật sau:

Thông số kỹ thuật: 
{{specifications}}

Ngôn ngữ/Framework: 
{{language_framework}}

Các Mẫu (Patterns) Hiện có trong Codebase cần Tuân theo:
{{existing_patterns}}

Vui lòng tạo mã thực hiện tuân thủ các nguyên tắc sau:
1. **Sạch sẽ & Chuẩn mực (Clean & Idiomatic):** Sử dụng các quy ước chuẩn cho ngôn ngữ. Giữ các hàm nhỏ và tập trung vào một trách nhiệm duy nhất (Nguyên tắc SOLID).
2. **Xử lý Lỗi Mạnh mẽ:** Không nuốt lỗi (swallow errors). Xử lý các trường hợp ngoại lệ (edge cases) một cách tinh tế và sử dụng các error boundaries hoặc exceptions phù hợp.
3. **Có thể Kiểm thử (Testable):** Viết mã có thể dễ dàng unit test. Sử dụng dependency injection khi thích hợp.
4. **Tự Ghi chú (Self-Documenting):** Sử dụng tên biến và hàm rõ ràng, mang tính mô tả. Chỉ thêm comment để giải thích *tại sao* một điều gì đó phức tạp đang được thực hiện, chứ không phải *nó là gì*.

Cung cấp các khối mã (code blocks) hoàn chỉnh, tránh viết tắt nếu có thể.
```

## Ví dụ sử dụng

**Đầu vào:**
```text
Hãy đóng vai một Kỹ sư Phần mềm Senior. Tôi cần bạn viết mã sẵn sàng cho production dựa trên các thông số kỹ thuật sau:

Thông số kỹ thuật: 
Tạo một React hook `useDebounce` để trì hoãn việc cập nhật một giá trị cho đến khi một thời gian được chỉ định trôi qua kể từ lần thay đổi cuối cùng.

Ngôn ngữ/Framework: 
TypeScript, React 18

Các Mẫu (Patterns) Hiện có trong Codebase cần Tuân theo:
Luôn sử dụng generic types cho custom hooks. Đảm bảo strict typing.

Vui lòng tạo mã thực hiện tuân thủ các nguyên tắc sau:
[...phần còn lại của prompt...]
```
