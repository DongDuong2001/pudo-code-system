import type { Dictionary } from "./en";

const vi: Dictionary = {
  meta: {
    title: "PUDO Code System — Lớp vận hành cho các AI Coding Agent",
    description:
      "Chuẩn hóa quy trình lập trình trên Claude, Cursor, Windsurf, Roo và Codex. Áp dụng cổng chất lượng, bàn giao ngữ cảnh và thang đánh giá mức sẵn sàng 100 điểm cho repository.",
    docsTitle: "Tài liệu — PUDO Code System",
    docsDescription:
      "Hướng dẫn vận hành về điều phối AI agent, cấu hình MCP server và kiến trúc cloud bền vững.",
    articleSuffix: "Tài liệu PUDO",
  },
  nav: {
    workflow: "Quy trình",
    generator: "Tạo quy tắc",
    mcp: "Giao thức MCP",
    calculator: "Thang đánh giá",
    docs: "Tài liệu & Playbook",
    copyTitle: "Nhấn để sao chép lệnh khởi động nhanh",
    github: "Repository GitHub",
    exploreDocs: "Xem tài liệu",
    language: "Ngôn ngữ",
  },
  hero: {
    release: "Phiên bản v1.4.0",
    announcement: "MCP Prompt tương tác & mạng lưới đa agent",
    titleLead: "Lớp vận hành cho",
    titleAccent: "AI Coding Agent",
    subtitle:
      "Chuẩn hóa quy trình lập trình trên Claude, Cursor, Windsurf, Roo và Codex. Đảm bảo các bất biến kiến trúc, bàn giao ngữ cảnh và mức sẵn sàng của repository dựa trên bằng chứng.",
    ctaGenerate: "Tạo quy tắc cho agent",
    ctaMcp: "Cài đặt MCP Server",
    ctaPlaybooks: "Đọc playbook",
    copyTitle: "Sao chép lệnh đang chọn",
    copyCommand: "Sao chép lệnh",
  },
  workflow: {
    eyebrow: "Giao thức agent có kỷ luật",
    title: "Chu trình làm việc PUDO",
    intro:
      "Agent tự động sẽ đi chệch hướng nếu không bị ràng buộc. PUDO neo mọi hành động của AI vào một chu trình 4 giai đoạn có thể kiểm chứng: Plan, Understand, Develop và Optimize.",
    phase: "Giai đoạn",
    rulesHeading: "Quy tắc & ràng buộc bắt buộc",
    outputLabel: "Kết quả thực tế của agent",
    compliant: "Tuân thủ PUDO",
    phases: {
      plan: {
        name: "Plan",
        tagline: "Xác định ranh giới trước khi viết bất kỳ dòng code nào.",
        summary:
          "Ngăn agent lao vào những lần viết lại mang tính phá hủy. Yêu cầu phạm vi rõ ràng, tiêu chí chấp nhận, chiến lược kiểm thử và sự đồng ý rõ ràng của con người cho các thao tác rủi ro.",
        rules: [
          "Xác định chính xác các file sẽ sửa trước khi chỉnh sửa",
          "Liệt kê những gì nằm ngoài phạm vi để tránh phình phạm vi",
          "Bắt buộc người dùng phê duyệt các migration mang tính phá hủy",
          "Xác định điều kiện tiên quyết và rủi ro hồi quy ngay từ đầu",
        ],
        gate: "Cổng: Kế hoạch hoặc checklist tóm tắt PR đã được phê duyệt.",
      },
      understand: {
        name: "Understand",
        tagline: "Kiểm tra thực tế trước khi giả định quy ước.",
        summary:
          "Buộc agent đọc các file hiện có và tôn trọng các bất biến kiến trúc thay vì bịa ra package, API tưởng tượng hoặc phong cách không thống nhất.",
        rules: [
          "Đọc các file triển khai liên quan trước khi tạo diff",
          "Tuân theo pattern, framework và cấu trúc thư mục hiện có",
          "Không bịa API, cờ giả hay dependency không tồn tại",
          "Giữ nguyên comment và tài liệu giấy phép hiện có",
        ],
        gate: "Cổng: Không có endpoint bịa đặt hay đường dẫn chưa được kiểm tra.",
      },
      develop: {
        name: "Develop",
        tagline: "Tạo các bản vá nhỏ, tập trung, dễ review.",
        summary:
          "Giới hạn agent ở các thay đổi nguyên tử kèm theo test. Nếu kế hoạch hoặc test thất bại, hãy dừng lại và lập kế hoạch lại thay vì vá víu.",
        rules: [
          "Diff nguyên tử, dễ review thay vì thay thế toàn bộ file",
          "Luôn thêm hoặc cập nhật test cùng với thay đổi chức năng",
          "Dừng lại và lập kế hoạch lại nếu gặp trở ngại bất ngờ",
          "Stage từng file riêng lẻ với Conventional Commits",
        ],
        gate: "Cổng: Unit test và integration test đều đạt cho mọi bản vá.",
      },
      optimize: {
        name: "Optimize",
        tagline: "Cổng chất lượng, tự review và bàn giao liên tục.",
        summary:
          "Vòng xác minh cuối cùng trước khi code vào nhánh chính. Bắt buộc qua linter, kiểm tra hiệu năng và lưu trạng thái bàn giao trong .pudo/session.md.",
        rules: [
          "Tự review rò rỉ bộ nhớ, trường hợp biên và hiệu năng",
          "Chạy các cổng chất lượng của repository (`npm test`, `npm run check`)",
          "Ghi trạng thái bàn giao phiên đa agent vào `.pudo/session.md`",
          "Xác minh điểm sẵn sàng 100/100 trước khi gắn tag release candidate",
        ],
        gate: "Cổng: Script cổng chất lượng tự động kết thúc với mã 0.",
      },
    },
  },
  generator: {
    eyebrow: "Trình tạo quy tắc tương tác",
    title: "Cấu hình quy tắc agent cho stack của bạn",
    intro:
      "Chọn stack công nghệ và trình soạn thảo AI mục tiêu. Sao chép file quy tắc được tạo hoặc tải trực tiếp vào thư mục gốc của repository.",
    toolLabel: "1. Công cụ AI mục tiêu",
    stackLabel: "2. Stack dự án",
    modeLabel: "3. Chế độ áp dụng",
    standard: "Tiêu chuẩn",
    standardDesc: "Quy trình PUDO + cổng an toàn",
    strict: "Nghiêm ngặt",
    strictDesc: "Bắt buộc phê duyệt migration & lệnh",
    cliLabel: "Lệnh CLI tương đương",
    copy: "Sao chép",
    copied: "Đã sao chép!",
    copyCode: "Sao chép code",
    downloadTitle: "Tải file trực tiếp",
    download: "Tải xuống",
    ready: "Sẵn sàng lưu",
    frameworks: {
      next: "React Server Components, App Router",
      react: "SPA, state phía client, hooks",
      fastapi: "Python bất đồng bộ, Pydantic v2",
      django: "Python, ORM, fat model",
      go: "cmd/, internal/, cấu trúc chuẩn",
      rust: "Cargo, zero-cost, kiểm tra clippy",
      bun: "Runtime tốc độ cao, bun:test",
    },
  },
  mcp: {
    eyebrow: "Model Context Protocol",
    title: "Kết nối PUDO trực tiếp vào AI agent của bạn",
    intro:
      "Cho Claude Desktop, Cursor và Windsurf truy cập các bất biến kiến trúc, danh mục playbook, trình chạy cổng chất lượng và bàn giao ngữ cảnh trực tiếp của repository.",
    copied: "Đã sao chép",
    copyConfig: "Sao chép cấu hình",
    target: "Vị trí",
    npmPackage: "Gói npm",
    stdioTitle: "Stdio CLI / Agent tùy chỉnh",
    stdioFile: "Chạy tiến trình",
    stdioPath: "Kênh giao tiếp standard I/O trực tiếp",
    promptsTitle: "MCP Prompt tương tác",
    promptsIntro: "Các lệnh slash trong Claude hoặc Cursor hướng dẫn lập trình viên theo quy trình chuẩn:",
    promptInit: "Thiết lập quy tắc dự án tương tác",
    promptPlan: "Xác định phạm vi & chiến lược kiểm thử",
    promptOptimize: "Chạy checklist cổng chất lượng",
    resourcesTitle: "Tài nguyên giao thức MCP",
    resourcesIntro: "Nguồn ngữ cảnh trực tiếp cho LLM mà không làm tràn giới hạn token của system prompt:",
    resourceRules: "File quy tắc hiện hành của repo",
    resourceSession: "Trạng thái phiên hiện tại",
    resourcePlaybooks: "Playbook tích hợp sẵn",
  },
  score: {
    eyebrow: "Đánh giá tương tác",
    title: "Thang đánh giá mức sẵn sàng 100 điểm",
    intro:
      "PUDO đánh giá repository theo thang điểm dựa trên bằng chứng. Bật/tắt các tiêu chí bên dưới để mô phỏng điểm sẵn sàng của repository.",
    reset: "Đặt lại 100/100",
    pts: "điểm",
    auditStatus: "Trạng thái đánh giá",
    ready: "SẴN SÀNG",
    caution: "THẬN TRỌNG",
    blocked: "BỊ CHẶN",
    readyDesc: "Repository đã được củng cố hoàn toàn cho các agent lập trình tự động.",
    cautionDesc: "An toàn cho copilot, nhưng cần thêm cổng chất lượng.",
    blockedDesc: "Nguy cơ cao về ảo giác hoặc thay đổi không kiểm soát từ agent.",
    categories: {
      rules: {
        name: "Quy tắc & bất biến của agent",
        short: "Quy tắc",
        description: "File hướng dẫn rõ ràng định ranh giới và cách ra quyết định của agent.",
      },
      context: {
        name: "Chất lượng & trạng thái ngữ cảnh",
        short: "Ngữ cảnh",
        description: "Cấu hình repository, bất biến kiến trúc và bàn giao đa agent.",
      },
      workflow: {
        name: "Quy trình & cổng chất lượng",
        short: "Quy trình",
        description: "Lint tự động, bộ test và cổng xác minh pull request.",
      },
      safety: {
        name: "An toàn AI & giao thức MCP",
        short: "An toàn",
        description: "Bảo vệ dry-run, loại trừ file nhạy cảm và kiểm soát quyền.",
      },
      evidence: {
        name: "Bằng chứng vận hành",
        short: "Bằng chứng",
        description: "Số liệu chạy test, build tái lập được và lịch sử git nguyên tử.",
      },
    },
    items: {
      "rules-file": {
        title: "Có bộ quy tắc agent chính",
        description: "Repository có AGENTS.md, .cursorrules, .windsurfrules hoặc CLAUDE.md.",
      },
      "rules-workflow": {
        title: "Đã định nghĩa chu trình PUDO",
        description: "File quy tắc mô tả rõ chu trình Plan -> Understand -> Develop -> Optimize.",
      },
      "rules-boundaries": {
        title: "Ranh giới rủi ro & phạm vi rõ ràng",
        description: "Hướng dẫn rõ ràng chống migration phá hủy hoặc API bịa đặt.",
      },
      "rules-stack": {
        title: "Ghi lại bất biến của tech stack",
        description: "Có hướng dẫn framework (ví dụ Server Components, schema Pydantic).",
      },
      "context-config": {
        title: "Có cấu hình PUDO",
        description: ".pudo/config.json hợp lệ với metadata dự án và mức độ nghiêm ngặt.",
      },
      "context-session": {
        title: "Có file bàn giao phiên",
        description: ".pudo/session.md duy trì tính liên tục giữa các cửa sổ ngữ cảnh của agent.",
      },
      "context-arch": {
        title: "Chuẩn kiến trúc & schema",
        description: "Hướng dẫn cấu trúc repository rõ ràng giúp tránh lệch kiến trúc.",
      },
      "workflow-gates": {
        title: "Cổng xác minh tự động",
        description: "Script thực thi được (npm test, npm run check) bắt buộc khi commit.",
      },
      "workflow-pr": {
        title: "Mẫu pull request PUDO",
        description: ".github/pull_request_template.md bắt buộc nêu kế hoạch và kết quả test.",
      },
      "workflow-release": {
        title: "Quy trình release & checklist",
        description: "Có checklist release và quy trình tăng phiên bản SemVer.",
      },
      "safety-sensitive": {
        title: "Loại trừ đường dẫn nhạy cảm",
        description: ".env, secret và thông tin xác thực bị loại khỏi context pack của AI.",
      },
      "safety-dryrun": {
        title: "Dry-run & phê duyệt ghi",
        description: "Công cụ AI mặc định xem trước dry-run trước khi ghi xuống đĩa.",
      },
      "safety-hallucination": {
        title: "Ràng buộc chống ảo giác",
        description: "Agent được hướng dẫn dừng sớm thay vì bịa ra API giả định.",
      },
      "evidence-tests": {
        title: "Bộ test đều đạt",
        description: "Mọi unit test và integration test đều xanh, không có hồi quy.",
      },
      "evidence-git": {
        title: "Kỷ luật Conventional Commit",
        description: "Lịch sử git sạch với các commit nguyên tử, dễ review.",
      },
    },
  },
  playbooks: {
    eyebrow: "Playbook kỹ thuật",
    title: "Tiêu chuẩn kiến trúc cho AI & Cloud",
    intro:
      "Bản thiết kế thực tế để xây dựng hệ thống LLM bền vững, điều phối chu trình đa agent và tổ chức cơ sở dữ liệu phân tán.",
    viewAll: "Xem tất cả playbook",
    readGuide: "Đọc hướng dẫn",
  },
  footer: {
    about:
      "Lớp vận hành mã nguồn mở cho các AI coding agent. Áp dụng phương pháp PUDO (Plan, Understand, Develop, Optimize), mức sẵn sàng repository dựa trên bằng chứng và tích hợp Model Context Protocol.",
    toolsHeading: "Công cụ cho lập trình viên",
    toolWorkflow: "Chu trình phương pháp PUDO",
    toolGenerator: "Trình tạo quy tắc tương tác",
    toolMcp: "Trung tâm Model Context Protocol",
    toolRubric: "Thang đánh giá 100 điểm",
    docsHeading: "Playbook & tài liệu",
    docQuickstart: "Hướng dẫn nhanh",
    docLlm: "Kiến trúc ứng dụng LLM",
    docAgents: "Điều phối đa agent",
    docDatabase: "Thiết kế & đánh chỉ mục cơ sở dữ liệu",
    license: "Giấy phép MIT © 2026 Dong Duong (DongDuong2001). Xây dựng cho kỹ thuật AI có kỷ luật cao.",
    hosted: "Lưu trữ trên Vercel",
    tracking: "Không theo dõi",
  },
  docs: {
    sidebar: "Tài liệu",
    eyebrow: "Tài liệu & Playbook",
    title: "Trung tâm kiến thức PUDO",
    intro:
      "Hướng dẫn vận hành toàn diện về điều phối AI agent, cấu hình MCP server và kiến trúc cloud bền vững.",
    searchPlaceholder: "Tìm hướng dẫn, playbook, thẻ (ví dụ RAG, MCP, PostgreSQL, Multi-Agent)...",
    read: "Đọc",
    noResults: "Không có bài viết nào khớp với từ khóa.",
    noResultsHint: 'Thử tìm "RAG", "MCP" hoặc "Index".',
    breadcrumb: "Tài liệu",
    codeLabel: "Chuẩn PUDO",
    previous: "Trước",
    next: "Tiếp",
    minRead: "phút đọc",
    englishOnly: "Bài viết này hiện chỉ có bằng tiếng Anh.",
    categories: {
      "Getting Started": "Bắt đầu",
      "AI Engineering": "Kỹ thuật AI",
      "DevOS System Architecture": "Kiến trúc hệ thống DevOS",
    },
  },
};

export default vi;
