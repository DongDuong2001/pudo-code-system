# Plan Phase Prompts

The **Plan** phase is the foundational step of the PUDO methodology. The prompts in this directory are designed to establish clear scope, architecture, and risk boundaries before any code is written.

## How to Use and Modify

These prompts act as a structured communication layer between you and the AI assistant. They are not strictly rigid—you should adapt them based on your project's needs.

### Customizing Constraints and Criteria
When using prompts like [Scope Definition](scope-definition.md), the `{{variables}}` are starting points. To modify these for your own organization:
- Add specific technical constraints (e.g., "Must be compatible with IE11" or "Maximum bundle size of 100KB").
- Standardize your success criteria to match your team's definition of done (e.g., "Minimum 80% unit test coverage required").

### Adapting Architecture
For the [Architecture Draft](architecture-draft.md) prompt, you may want to tailor the requested outputs to your preferred diagramming format. If your team uses Mermaid.js, PlantUML, or C4 models, explicitly hardcode that preference into the prompt template.

### Enhancing Risk Assessments
The [Risk Assessment](risk-assessment.md) prompt evaluates security, performance, and operational risks. You can modify this to include compliance checks relevant to your industry (e.g., GDPR, HIPAA, SOC2).

## Contributing New Plan Prompts
If you create a new prompt that aids in the planning phase (such as a Database Schema Design or an API Contract Spec), follow the structure of the existing files and open a Pull Request.
