# Kỹ năng Kiến trúc & Lên kế hoạch
> Skill, System Design, Architecture, Planning

## Ngữ cảnh
Sử dụng prompt này khi bạn bắt đầu một dự án hoặc một tính năng và cần thiết kế kiến trúc, định nghĩa các mô hình dữ liệu, lập bản đồ các API contracts, hoặc chia nhỏ các bước thực hiện. Kỹ năng này buộc AI phải suy nghĩ như một Kiến trúc sư trưởng (Principal Architect).

## Các Biến
- `{{project_goal}}`: Mô tả tổng quan về những gì bạn đang cố gắng xây dựng.
- `{{tech_stack}}`: Ngôn ngữ, framework và cơ sở dữ liệu bạn đang sử dụng.
- `{{constraints}}`: Bất kỳ ràng buộc nào về kỹ thuật, kinh doanh hoặc tiến độ.

## Prompt
```text
Hãy đóng vai một Kiến trúc sư Phần mềm Trưởng (Principal Software Architect). Tôi cần chuyên môn của bạn để thiết kế kiến trúc và kế hoạch thực hiện cho dự án sau:

Mục tiêu: {{project_goal}}
Tech Stack: {{tech_stack}}
Ràng buộc: {{constraints}}

Vui lòng cung cấp một thiết kế kiến trúc toàn diện bao gồm:
1. **Tổng quan Hệ thống:** Giải thích tổng quan về cách hệ thống sẽ hoạt động.
2. **Phân tích Component:** Các module, service hoặc component chính cần thiết.
3. **Luồng dữ liệu & Mô hình:** Cách dữ liệu di chuyển qua hệ thống và các cấu trúc schema cốt lõi.
4. **Giảm thiểu Rủi ro:** Các điểm nghẽn tiềm ẩn, các vấn đề bảo mật hoặc nợ kỹ thuật (technical debt) và cách phòng tránh.
5. **Các bước Thực hiện:** Một trình tự các công việc phát triển hợp lý, có thứ tự để xây dựng hệ thống này.

Không viết mã thực hiện (implementation code). Chỉ tập trung vào thiết kế và kiến trúc.
```

## Ví dụ sử dụng

**Đầu vào:**
```text
Hãy đóng vai một Kiến trúc sư Phần mềm Trưởng (Principal Software Architect). Tôi cần chuyên môn của bạn để thiết kế kiến trúc và kế hoạch thực hiện cho dự án sau:

Mục tiêu: Xây dựng một trình soạn thảo markdown cộng tác thời gian thực.
Tech Stack: Next.js, WebSockets, Redis, PostgreSQL
Ràng buộc: Phải xử lý tối đa 50 người dùng đồng thời trên cùng một tài liệu mà không gặp sự cố độ trễ.

Vui lòng cung cấp một thiết kế kiến trúc toàn diện bao gồm:
[...phần còn lại của prompt...]
```
