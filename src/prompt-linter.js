const fs = require("fs");
const path = require("path");

const REQUIRED_SECTIONS = ["Context", "Prompt"];
const RECOMMENDED_SECTIONS = ["Variables", "Example Usage", "Expected Output"];
const REQUIRED_METADATA = ["Phase", "Tags"];

function findPromptFiles(dir) {
  const results = [];

  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findPromptFiles(fullPath));
    } else if (entry.name.endsWith(".md") && entry.name !== "README.md") {
      results.push(fullPath);
    }
  }

  return results;
}

function lintPrompt(filePath, content) {
  const issues = [];
  const lines = content.split("\n");
  const headings = lines.filter((line) => line.startsWith("## ")).map((line) => line.slice(3).trim());

  // Check required metadata (blockquotes with > **Phase:**)
  const hasPhase = content.includes("> **Phase:**");
  const hasTags = content.includes("> **Tags:**");
  if (!hasPhase) issues.push({ severity: "WARN", message: "Missing metadata: > **Phase:** tag not found" });
  if (!hasTags) issues.push({ severity: "WARN", message: "Missing metadata: > **Tags:** tag not found" });

  // Check required sections
  for (const section of REQUIRED_SECTIONS) {
    if (!headings.some((h) => h.toLowerCase().includes(section.toLowerCase()))) {
      issues.push({ severity: "ERROR", message: `Missing required section: ## ${section}` });
    }
  }

  // Check recommended sections
  for (const section of RECOMMENDED_SECTIONS) {
    if (!headings.some((h) => h.toLowerCase().includes(section.toLowerCase()))) {
      issues.push({ severity: "WARN", message: `Missing recommended section: ## ${section}` });
    }
  }

  // Check for variables section
  if (content.includes("## Variables")) {
    const variablePattern = /\{\{([A-Za-z0-9_]+)\}\}/g;
    const variables = [];
    let match;
    while ((match = variablePattern.exec(content)) !== null) {
      variables.push(match[1]);
    }

    // Check variable naming (should be UPPER_SNAKE_CASE)
    for (const variable of variables) {
      if (!/^[A-Z][A-Z0-9_]*$/.test(variable)) {
        issues.push({ severity: "WARN", message: `Variable naming issue: {{${variable}}} should be UPPER_SNAKE_CASE` });
      }
    }
  }

  // Check for empty prompt
  const promptMatch = content.match(/## Prompt\r?\n([\s\S]*?)(?=\r?\n## |$)/);
  if (promptMatch && promptMatch[1].trim().length < 50) {
    issues.push({ severity: "WARN", message: "Prompt section is very short (< 50 chars)" });
  }

  return issues;
}

function lintPrompts(promptsDir) {
  const files = findPromptFiles(promptsDir);
  const results = [];
  let totalErrors = 0;
  let totalWarnings = 0;

  for (const file of files) {
    const relativePath = path.relative(process.cwd(), file);
    const content = fs.readFileSync(file, "utf8");
    const issues = lintPrompt(file, content);
    const errors = issues.filter((i) => i.severity === "ERROR").length;
    const warnings = issues.filter((i) => i.severity === "WARN").length;
    totalErrors += errors;
    totalWarnings += warnings;

    results.push({
      file: relativePath,
      passed: errors === 0,
      errors,
      warnings,
      issues
    });
  }

  return {
    total_files: files.length,
    total_errors: totalErrors,
    total_warnings: totalWarnings,
    passed: totalErrors === 0,
    results
  };
}

module.exports = { lintPrompts, lintPrompt, findPromptFiles };
