<p align="center">
  <a href="https://forg.to/products/pudo" target="_blank" rel="noopener">
    <img src="https://forg.to/api/badges/upvote/pudo?theme=light&shape=square" alt="Pudo - Upvote on Forg on forg." height="48" />
  </a>
  <a href="https://unikorn.vn/p/pudo?ref=embed-pudo" target="_blank">
    <img src="https://unikorn.vn/api/widgets/badge/pudo?theme=light" alt="Pudo trên Unikorn.vn" style="width: 256px; height: 64px;" width="256" height="64" />
  </a>
  <a href="https://unikorn.vn/p/pudo?ref=embed-pudo" target="_blank">
    <img src="https://unikorn.vn/api/widgets/badge/pudo/rank?theme=light&type=daily" alt="Pudo - Hàng ngày" style="width: 250px; height: 64px;" width="250" height="64" />
  </a>
</p>

<p align="center">
  <img src="assets/Pudo_banner.png" alt="PUDO Code System" width="100%" />
</p>

<h3 align="center">Một phương pháp luận 4 giai đoạn có cấu trúc để lập trình với các trợ lý AI.</h3>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License: MIT" /></a>
  <img src="https://img.shields.io/badge/version-1.0.0-brightgreen.svg" alt="Version 1.0.0" />
  <a href="CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-welcome-orange.svg" alt="PRs Welcome" /></a>
  <img src="https://img.shields.io/badge/AI-agnostic-purple.svg" alt="AI Agnostic" />
</p>

<p align="center">
  <b>🌍 Languages:</b>
  <a href="README.md">English</a> |
  <a href="README.vi.md">Tiếng Việt</a> |
  <a href="README.pt.md">Português</a> |
  <a href="README.es.md">Español</a> |
  <a href="README.ru.md">Русский</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=yjRRjrx6Ews" target="_blank">
    <img src="https://img.youtube.com/vi/yjRRjrx6Ews/maxresdefault.jpg" alt="Watch the PUDO Code System overview video" width="80%" />
    <br />
    <strong>🎥 Watch the PUDO Code System overview video</strong>
  </a>
</p>

---

## Vấn đề

Bạn mở trình soạn thảo. Bạn gõ một yêu cầu mơ hồ cho trợ lý AI. Nó tạo ra thứ gì đó. Bạn dán vào. Nó chạy được một nửa. Bạn yêu cầu sửa lỗi. Nó làm hỏng thứ khác. Lặp lại quá trình này trong 3 giờ.

**Đây là lập trình hỗn loạn.** Cảm giác thì có vẻ năng suất, nhưng thực tế thì không.

Vấn đề không phải là AI — mà là **sự thiếu cấu trúc**. Không có phương pháp rõ ràng, việc lập trình với sự hỗ trợ của AI trở thành một cuộc dạo chơi ngẫu nhiên trong codebase của bạn.

## Giải pháp: PUDO

**PUDO** mang đến một chu kỳ 4 giai đoạn có thể lặp lại, biến AI từ một cỗ máy quay thưởng thành một công cụ chính xác.

| Giai đoạn | Mục tiêu | Bạn làm | AI làm |
|:---:|---|---|---|
| **(P) Plan (Lên Kế Hoạch)** | Định nghĩa *cái gì* và *tại sao* | Thiết lập phạm vi, ràng buộc, tiêu chí thành công | Lập bản nháp kế hoạch, xác định rủi ro |
| **(U) Understand (Hiểu)** | Biết *ở đâu* và *như thế nào* | Chỉ đến đoạn code liên quan, giải thích ngữ cảnh | Phân tích codebase, lập bản đồ phụ thuộc, tìm kiếm mẫu (pattern) |
| **(D) Develop (Phát Triển)** | Xây dựng *nó* | Xem xét, phê duyệt, kiểm thử | Viết code, chạy kiểm thử, theo dõi tiến độ |
| **(O) Optimize (Tối Ưu Hóa)** | Làm cho *nó tốt hơn* | Xác nhận các cải tiến, hợp nhất (merge) | Tái cấu trúc, benchmark, ghi chép thay đổi |

> **Điểm cốt lõi:** PUDO là một **chu kỳ**, không phải là một quy trình một chiều (pipeline). Bạn quay lại các giai đoạn khi bạn hiểu thêm. Một phát hiện mới trong giai đoạn Develop có thể đưa bạn trở lại Plan. Điều đó là hoàn toàn bình thường.

## Bắt đầu nhanh

### 1. Bắt đầu với Plan

Trước khi viết bất kỳ dòng code nào, hãy xác định bạn đang xây dựng cái gì:

```
Tôi cần xây dựng [TÍNH_NĂNG]. 
Tiêu chí thành công là [TIÊU_CHÍ].
Các ràng buộc là [RÀNG_BUỘC].
Hãy tạo một kế hoạch thực hiện trước khi viết bất kỳ đoạn code nào.
```

### 2. Chuyển sang Understand

Nghiên cứu trước khi xây dựng:

```
Trước khi thực hiện, hãy phân tích codebase hiện tại:
- Những mẫu (pattern) nào đã được thiết lập?
- Những phụ thuộc (dependencies) nào có liên quan?
- Những phần nào có thể bị hỏng?
```

### 3. Thực thi trong Develop

Xây dựng có cấu trúc:

```
Thực hiện theo kế hoạch. Theo dõi tiến độ bằng danh sách công việc (task checklist).
Viết các bài kiểm thử song song với việc thực hiện.
Báo cáo bất kỳ sự sai lệch nào so với kế hoạch.
```

### 4. Đóng chu kỳ với Optimize

Đừng vội phát hành phiên bản nháp đầu tiên:

```
Xem xét việc thực hiện:
- Có những cải tiến nào về hiệu suất không?
- Code có nhất quán với các mẫu hiện có không?
- Viết một bản tóm tắt (walkthrough) những gì đã thay đổi và tại sao.
```

### 5. Lặp lại

Mọi tác vụ, mọi tính năng, mọi lỗi cần sửa. **Plan → Understand → Develop → Optimize.**

## Thư viện Prompt

PUDO đi kèm với một [thư viện prompt sẵn sàng sử dụng](prompts/) — **21 prompts** xuyên suốt 4 giai đoạn và các kỹ năng chuyên môn mà bạn có thể sao chép-dán vào bất kỳ trợ lý AI nào. Mỗi thư mục của các giai đoạn đều bao gồm một `README.md` chi tiết giải thích cách sửa đổi và mở rộng các prompts cho phù hợp với nhu cầu của nhóm bạn.

| Giai đoạn | Prompts |
|---|---|
| **(P)** Plan | [Định Nghĩa Phạm Vi](prompts/plan/scope-definition.md) · [Bản Nháp Kiến Trúc](prompts/plan/architecture-draft.md) · [Đánh Giá Rủi Ro](prompts/plan/risk-assessment.md) · [Lược Đồ Cơ Sở Dữ Liệu](prompts/plan/database-schema-design.md) · [Hợp Đồng API](prompts/plan/api-contract-design.md) · [Mô Hình Mối Đe Dọa An Ninh](prompts/plan/security-threat-model.md) |
| **(U)** Understand | [Phân Tích Codebase](prompts/understand/codebase-analysis.md) · [Kiểm Toán Phụ Thuộc](prompts/understand/dependency-audit.md) · [Nhận Diện Mẫu](prompts/understand/pattern-recognition.md) · [Phân Tích Nhật Ký Lỗi (Crash Log)](prompts/understand/crash-log-analysis.md) |
| **(D)** Develop | [Thực Hiện Tính Năng](prompts/develop/feature-implementation.md) · [Phát Triển Hướng Kiểm Thử (TDD)](prompts/develop/test-driven-dev.md) · [Dàn Giáo Component](prompts/develop/component-scaffold.md) · [Bộ Kiểm Thử Tích Hợp](prompts/develop/integration-test-suite.md) · [Bộ Kiểm Thử E2E](prompts/develop/e2e-test-suite.md) |
| **(O)** Optimize | [Đánh Giá Hiệu Suất](prompts/optimize/performance-review.md) · [Danh Sách Kiểm Tra Khi Review Code](prompts/optimize/code-review-checklist.md) · [Cơ Hội Tái Cấu Trúc](prompts/optimize/refactor-opportunities.md) · [Cấu Hình Bộ Nhớ](prompts/optimize/memory-profiling.md) · [Khắc Phục Sự Cố Mạng](prompts/optimize/network-troubleshooting.md) |
| **Skills** | [Kiến trúc & Kế hoạch](skills/plan/SKILL.md) · [Kỹ Thuật Phần mềm](skills/code/SKILL.md) · [Xử lý Sự Cố & Gỡ Lỗi](skills/debug/SKILL.md) · [Kỹ Sư DevOps](skills/devops/SKILL.md) · [Kỹ Sư Kiểm Thử (Test)](skills/test/SKILL.md) |
| **Công cụ DevOps** | [GitHub Actions](skills/devops/github-actions/SKILL.md) · [GitLab CI](skills/devops/gitlab-ci/SKILL.md) · [Argo CD](skills/devops/argo-cd/SKILL.md) · [Jenkins](skills/devops/jenkins/SKILL.md) · [Terraform](skills/devops/terraform/SKILL.md) · [Docker](skills/devops/docker/SKILL.md) · [Kubernetes](skills/devops/kubernetes/SKILL.md) |

## Tích hợp AI

PUDO được thiết kế để trở thành hệ điều hành mặc định cho các trợ lý lập trình AI của bạn. Chúng tôi đã bao gồm các hướng dẫn hệ thống được viết sẵn cho các công cụ phổ biến nhất:

- **[Claude Projects](claude.md)**: Dán vào hướng dẫn tùy chỉnh của Dự án.
- **[Cursor](cursor/.cursorrules)**: Sao chép vào `.cursorrules` trong thư mục gốc của kho lưu trữ.
- **[OpenCode](opencode/opencode.md)**: Thêm vào prompts hệ thống OpenCode hoặc hướng dẫn của workspace.
- **[Antigravity](antigravity/instructions.xml)**: Sao chép vào `.gemini/antigravity/instructions.xml` trong workspace của bạn.
- **[Kiro](kiro/system-prompt.md)**: Đặt làm system prompt trong phần cài đặt Kiro.

## Triết lý

PUDO không chỉ là một danh sách kiểm tra — đó là một tư duy. Hãy đọc [toàn bộ triết lý](docs/philosophy.md) để hiểu các nguyên tắc đằng sau phương pháp này.

**Tóm tắt (TL;DR):**
- **Chống lại sự hỗn loạn** — Cấu trúc đánh bại sự ngẫu hứng ở quy mô lớn
- **Tính lặp lại** — Nó là một chu kỳ, không phải là thác nước (waterfall)
- **Tương thích AI** — Được thiết kế cho lập trình đôi giữa con người và AI
- **Tính toàn vẹn của giai đoạn** — Mỗi giai đoạn đều có tiêu chí đầu vào và đầu ra rõ ràng

## Dành Cho Ai?

- **Các lập trình viên sử dụng trợ lý AI** (ChatGPT, Claude, Gemini, Copilot, v.v.) muốn có kết quả tốt hơn
- **Các trưởng nhóm (Team leads)** đang tìm kiếm một phương pháp luận chung để phát triển phần mềm được hỗ trợ bởi AI
- **Sinh viên** đang học lập trình với AI đúng cách ngay từ ngày đầu tiên

## Đóng góp

PUDO phát triển cùng cộng đồng. Hãy xem [CONTRIBUTING.md](CONTRIBUTING.md) để biết cách:

- Thêm prompts mới vào thư viện
- Gửi các walkthrough thực tế làm ví dụ
- Cải thiện tài liệu

## Hỗ trợ & Tài trợ

Nếu bạn thấy PUDO hữu ích, hãy cân nhắc tài trợ cho dự án:

<iframe src="https://github.com/sponsors/DongDuong2001/button" title="Sponsor DongDuong2001" height="32" width="114" style="border: 0; border-radius: 6px;"></iframe>

- [GitHub Sponsors](https://github.com/sponsors/DongDuong2001)
- [Patreon](https://patreon.com/DongDuong2001)
- [Ko-fi](https://ko-fi.com/dongphuduong)
- [Buy Me a Coffee](https://buymeacoffee.com/lab68dev)
- **PayPal:** dongduong840@gmail.com

## Giấy phép

[MIT](LICENSE) — Sử dụng, fork, biến nó thành của bạn.

---

<p align="center">
  <strong>Ngừng ngẫu hứng. Hãy bắt đầu PUDO.</strong>
  <br /><br />
  <em>Plan → Understand → Develop → Optimize</em>
</p>
