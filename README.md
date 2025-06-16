# 📚 Interactive Case Study Authoring Tool

A powerful, web-based tool for creating interactive educational case studies with dynamic content, student choices, and variable tracking.

## ✨ Features

### 🎯 Core Functionality
- **Visual Case Study Builder** - Drag-and-drop interface for creating educational content
- **Multi-Level Structure** - Organize content into sequential levels with different types
- **Interactive Elements** - Add text inputs, sliders, dropdowns, and more
- **Variable System** - Track and update data throughout the case study
- **Choice-Based Navigation** - Create branching scenarios based on student decisions
- **Real-Time Preview** - See exactly how students will experience your case study

### 📊 Content Types
- **Introduction & Setup** - Welcome students and establish context
- **Analysis & Research** - Data analysis and investigation tasks
- **Strategic Decision** - Critical thinking and planning exercises
- **Simulation** - Interactive scenarios and role-playing
- **Evaluation & Reflection** - Assessment and learning consolidation

### 🎨 Customization
- **Visual Themes** - Choose from modern, business, academic, and creative styles
- **Branding Support** - Add university logos and course information
- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Export Options** - Generate standalone HTML files or JSON data

## 🚀 Quick Start

### 1. Basic Setup
1. Open the Case Study Authoring Tool
2. Fill in basic information:
   - Case study title
   - Course name and code
   - University/institution
   - Description and learning objectives

### 2. Create Variables (Optional)
- Click "Variables" in the sidebar
- Add variables to track data across levels
- Examples: `budget`, `teamSize`, `satisfaction`
- Variables can be referenced in narratives using `{{variableName}}`

### 3. Build Levels
1. Click "Add Level" to create your first level
2. Choose a level type (Introduction, Analysis, Strategy, etc.)
3. Write the narrative/story for the level
4. Add interactive elements if needed
5. Create choices for student decision-making

### 4. Preview & Export
- Use "Preview" to test your case study
- Export as JSON to save your work
- Generate HTML for student deployment

## 📋 Example Workflow

\`\`\`
1. Setup → Add title, course info, learning objectives
2. Variables → Create budget, satisfaction, performance metrics  
3. Level 1 → Introduction with company background
4. Level 2 → Analysis with data interpretation tasks
5. Level 3 → Strategic decision with multiple choice outcomes
6. Level 4 → Crisis management scenario
7. Level 5 → Evaluation and reflection
8. Preview → Test the complete experience
9. Export → Generate final HTML file
\`\`\`

## 🎮 Interactive Elements

### Available Element Types
- **Text Input** - Single-line text responses
- **Number Input** - Numeric values with validation
- **Text Area** - Multi-line detailed responses
- **Dropdown** - Single selection from options
- **Slider** - Numeric range selection (great for budgets, percentages)

### Using Variables
Variables allow data to flow between levels:
\`\`\`
Narrative: "Your budget is ${{budget}} and team satisfaction is {{satisfaction}}%"
\`\`\`

## 📤 Export Options

### JSON Export
- Saves complete case study data
- Can be imported later for editing
- Shareable with colleagues
- Version control friendly

### HTML Export
- Standalone interactive file
- No internet connection required
- Includes progress tracking
- Mobile-responsive design
- Ready for student deployment

## 🎯 Best Practices

### Content Design
- **Start Simple** - Begin with 3-5 levels for your first case study
- **Clear Objectives** - Define what students should learn
- **Engaging Narrative** - Tell a compelling story
- **Meaningful Choices** - Ensure decisions have real consequences

### Technical Tips
- **Use Variables** - Track important metrics throughout the case
- **Test Thoroughly** - Preview your case study before deployment
- **Mobile-First** - Consider how it looks on phones and tablets
- **Save Often** - Export JSON backups regularly

### Educational Guidelines
- **Learning Objectives** - Start with clear, measurable goals
- **Scaffolding** - Build complexity gradually across levels
- **Feedback** - Provide immediate responses to student choices
- **Reflection** - Include evaluation and summary levels

## 🔧 Technical Requirements

### Browser Support
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### File Requirements
- **Logo**: Place `jainlogo.png` in same folder as exported HTML
- **No Dependencies**: Exported HTML files are completely standalone

## 📁 File Structure

\`\`\`
case-study-project/
├── case-study-authoring-tool.tsx    # Main application
├── sample-case-study.json           # Example case study
├── import-instructions.tsx          # Import guide
├── README.md                        # This file
└── public/
    └── jainlogo.png                 # University logo
\`\`\`

## 🎓 Sample Case Study

The tool includes a complete sample case study:
- **Topic**: Digital Marketing Strategy for E-Commerce
- **Levels**: 5 comprehensive levels
- **Variables**: 8 tracked metrics
- **Elements**: 15+ interactive components
- **Choices**: Multiple decision points with consequences

Import `sample-case-study.json` to explore a fully-featured example.

## 🆘 Troubleshooting

### Common Issues
- **Missing Logo**: Ensure `jainlogo.png` is in the same folder as exported HTML
- **Variables Not Updating**: Check variable names match exactly (case-sensitive)
- **Export Fails**: Ensure title and at least one level are created
- **Import Error**: Verify JSON file format is valid

### Getting Help
1. Check the preview mode to test functionality
2. Use "Analyze Readiness" button for content validation
3. Start with the sample case study to understand structure
4. Keep case studies simple initially (3-5 levels)

## 🚀 Advanced Features

### Variable System
- Global scope variables persist across all levels
- Dynamic text replacement in narratives
- Automatic updates from interactive elements
- Support for text, number, and boolean types

### Choice Consequences
- Update multiple variables per choice
- Branch to specific levels
- Point scoring system
- Conditional logic support

### Export Customization
- Responsive design templates
- Progress tracking
- Keyboard navigation support
- Print-friendly layouts

---

**Ready to create engaging educational experiences?** Start with the sample case study, then build your own interactive learning adventures! 🎯📚
