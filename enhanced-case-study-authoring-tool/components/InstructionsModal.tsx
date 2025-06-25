// InstructionsModal.tsx - Save this as a separate file
import React, { useState } from "react"
import { X, BookOpen } from "lucide-react"

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Section {
  id: string;
  title: string;
  content: string;
}

const InstructionsModal: React.FC<InstructionsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  const sections: Section[] = [
    {
      id: 'getting-started',
      title: '🚀 Getting Started',
      content: `
## Interface Overview
The authoring tool has three main sections:
- **Left Sidebar**: Navigation, quick stats, and actions
- **Main Content Area**: Case study setup, level editor, and preview
- **Modals**: Variable manager, AI settings, and suggestion dialogs

## Two Ways to Create Case Studies

### Method 1: Import Existing JSON
1. Click **"Import JSON"** in the sidebar
2. Select your JSON file (must follow the required structure)
3. The tool automatically loads all content
4. Start editing immediately

### Method 2: Create Manually
1. Start with **"Setup"** tab
2. Fill in basic information
3. Create variables
4. Design levels step by step
5. Add interactive elements and choices
      `
    },
    {
      id: 'creating-first-case-study',
      title: '⚙️ Creating Your First Case Study',
      content: `
## Step 1: Basic Setup
Navigate to the **Setup** tab and fill in:

**Required Fields:**
- **Title**: Clear, descriptive name (e.g., "TechCorp Market Expansion Strategy")
- **Course Name**: Subject area (e.g., "Strategic Management", "Financial Analysis")

**Optional Fields:**
- **Course Code**: Academic identifier (e.g., "MGT501", "24SMG101")
- **University**: Your institution name
- **Description**: Brief overview of the scenario and learning goals
- **Difficulty**: Beginner, Intermediate, or Advanced
- **Estimated Time**: Expected completion time (15-300 minutes)
- **Theme**: Visual styling (Modern, Business, Academic, etc.)

## Step 2: Learning Objectives
1. Click **"+ Add Learning Objective"**
2. Start with action verbs (Analyze, Evaluate, Create, Apply, Compare)
3. Be specific and measurable
4. Aim for 4-6 objectives

**Good Examples:**
- "Analyze market entry strategies for emerging economies"
- "Evaluate financial risks in international expansion"
- "Create a resource allocation plan under budget constraints"

**Poor Examples:**
- "Understand business" (too vague)
- "Learn about markets" (not measurable)
      `
    },
    {
      id: 'variable-management',
      title: '📊 Variable Management',
      content: `
Variables are the data backbone of your case study, allowing information to flow between levels and creating dynamic experiences.

## Creating Variables
1. Click **"Variables"** button or sidebar link
2. Click **"+ Add Variable"**
3. Fill in details:

**Variable Properties:**
- **Name**: Short, descriptive (e.g., \`budget\`, \`team_size\`, \`market_share\`)
- **Type**: Text, Number, or Boolean
- **Default Value**: Starting value
- **Description**: What this variable represents

## Variable Types & Uses

### Text Variables
\`\`\`json
{
  "name": "company_name",
  "type": "text", 
  "defaultValue": "TechCorp",
  "description": "The company students are managing"
}
\`\`\`
**Use for**: Names, strategies, locations, decisions

### Number Variables  
\`\`\`json
{
  "name": "budget",
  "type": "number",
  "defaultValue": "500000", 
  "description": "Available budget in USD"
}
\`\`\`
**Use for**: Money, percentages, quantities, scores

### Boolean Variables
\`\`\`json
{
  "name": "has_partnership",
  "type": "boolean",
  "defaultValue": "false",
  "description": "Whether company has strategic partnerships"
}
\`\`\`
**Use for**: Yes/no decisions, feature flags, conditions

## Variable Best Practices
- **Use clear names**: \`marketing_budget\` not \`mb\`
- **Set logical defaults**: Starting values that make sense
- **Plan variable flow**: How will values change between levels?
- **Document purposes**: Clear descriptions help with maintenance

## AI Variable Suggestions
Click **"AI Suggest"** in Variable Manager to automatically generate relevant variables based on your case study topic and course.
      `
    },
    {
      id: 'level-design',
      title: '📚 Level Design',
      content: `
Levels are the sequential steps of your case study. Each level tells part of the story and collects student input.

## Level Types

### Introduction & Setup 📋
- Set the scene and context
- Collect initial student information
- Introduce key concepts
- **Example**: Company background, market situation

### Analysis & Research 📊  
- Present data for student analysis
- Research tasks and information gathering
- **Example**: Market research, financial analysis

### Strategic Decision 🎯
- Major decision points
- Strategy formulation
- **Example**: Market entry choice, budget allocation

### Simulation 🎮
- Interactive scenarios
- Real-time decision making
- **Example**: Negotiation simulation, crisis response

### Evaluation & Reflection 📝
- Assess outcomes and decisions
- Learning consolidation
- **Example**: Results analysis, lessons learned

## Creating Levels

### Manual Creation
1. Click **"+ Add Level"** in Setup tab
2. Fill in level details:
   - **Title**: Clear, specific name
   - **Description**: Level's purpose and goals
   - **Type**: Select from predefined types
3. Switch to **Level Editor** to add content

### AI-Generated Levels
1. Click **"AI Build Levels"** for automatic structure
2. Review and customize generated levels
3. AI creates complete level sequence with narratives

## Level Content Structure
Each level contains:
- **Narrative**: The story text (supports variable insertion)
- **Interactive Elements**: Input collection components  
- **Choices**: Decision points and navigation
- **Conditions**: Logic for conditional content
      `
    },
    {
      id: 'interactive-elements',
      title: '🎯 Interactive Elements',
      content: `
Interactive elements collect student input and create engagement. Each element can be linked to a variable to store responses.

## Element Types

### Text Input 📝
**Use for**: Short responses, names, strategies
\`\`\`json
{
  "type": "textInput",
  "title": "Company Strategy", 
  "description": "Describe your market entry strategy",
  "variableName": "strategy",
  "config": {
    "placeholder": "Enter your strategy...",
    "maxLength": 255
  }
}
\`\`\`

### Number Input 🔢
**Use for**: Budget allocation, percentages, quantities
\`\`\`json
{
  "type": "numberInput",
  "title": "Marketing Budget",
  "description": "Allocate budget for marketing (USD)",
  "variableName": "marketing_budget", 
  "config": {
    "min": 0,
    "max": 1000000,
    "step": 1000,
    "placeholder": "Enter amount..."
  }
}
\`\`\`

### Text Area 📄
**Use for**: Detailed responses, analysis, plans
\`\`\`json
{
  "type": "textArea", 
  "title": "Market Analysis",
  "description": "Provide detailed market analysis",
  "variableName": "market_analysis",
  "config": {
    "placeholder": "Enter detailed analysis...",
    "rows": 6,
    "maxLength": 2000
  }
}
\`\`\`

### Dropdown Select 📋
**Use for**: Single choice from predefined options
\`\`\`json
{
  "type": "dropdown",
  "title": "Target Market",
  "description": "Select primary target market",
  "variableName": "target_market",
  "config": {
    "placeholder": "Select market...",
    "options": [
      {"value": "b2b", "label": "Business-to-Business"},
      {"value": "b2c", "label": "Business-to-Consumer"},
      {"value": "b2g", "label": "Business-to-Government"}
    ]
  }
}
\`\`\`

### Multi-Select ☑️
**Use for**: Multiple choices, feature selection
\`\`\`json
{
  "type": "multiSelect",
  "title": "Marketing Channels", 
  "description": "Select all applicable channels",
  "variableName": "marketing_channels",
  "config": {
    "options": [
      {"value": "digital", "label": "Digital Marketing"},
      {"value": "print", "label": "Print Advertising"},
      {"value": "social", "label": "Social Media"}
    ],
    "minSelections": 1,
    "maxSelections": 3
  }
}
\`\`\`

### Value Slider 🎚️
**Use for**: Percentages, priorities, allocations
\`\`\`json
{
  "type": "slider",
  "title": "Risk Tolerance",
  "description": "Set your risk tolerance level", 
  "variableName": "risk_level",
  "config": {
    "min": 0,
    "max": 100,
    "defaultValue": 50,
    "step": 5,
    "unit": "%",
    "showValue": true
  }
}
\`\`\`

### Priority Ranking 📊
**Use for**: Ordering options, priority setting
\`\`\`json
{
  "type": "priorityRanking",
  "title": "Strategic Priorities",
  "description": "Rank these priorities (1 = highest)",
  "variableName": "priorities",
  "config": {
    "options": [
      {"value": "cost", "label": "Cost Reduction"},
      {"value": "quality", "label": "Quality Improvement"}, 
      {"value": "speed", "label": "Time to Market"},
      {"value": "innovation", "label": "Innovation"}
    ]
  }
}
\`\`\`

### Calculator Widget 🧮
**Use for**: Financial calculations, ROI analysis
\`\`\`json
{
  "type": "calculator",
  "title": "ROI Calculator",
  "description": "Calculate return on investment",
  "variableName": "roi_result",
  "config": {
    "inputs": [
      {"name": "investment", "label": "Initial Investment", "type": "number"},
      {"name": "revenue", "label": "Expected Revenue", "type": "number"}
    ],
    "formula": "(revenue - investment) / investment * 100",
    "resultLabel": "ROI (%)"
  }
}
\`\`\`

## Adding Interactive Elements
1. In Level Editor, scroll to **"Interactive Elements"** section
2. Select element type from dropdown
3. Click element to configure:
   - Set title and description
   - Link to variable (required for data collection)
   - Configure element-specific options
4. Use preview to test functionality
      `
    },
    {
      id: 'navigation-choices',
      title: '🧭 Navigation & Choices',
      content: `
Choices create decision points and control how students navigate through your case study.

## Choice Components
Each choice has:
- **Text**: What students see as the option
- **Outcome**: Feedback when choice is selected  
- **Next Level**: Where students go next (optional)
- **Variable Changes**: How this choice affects variables
- **Points**: Scoring for this choice
- **Conditions**: When this choice is available

## Navigation Patterns

### Sequential Navigation (Default)
\`\`\`json
{
  "text": "Proceed with market research",
  "outcome": "You decide to gather more market data before proceeding.",
  "nextLevel": null,  // Goes to next level in sequence
  "variableChanges": {"research_completed": true},
  "points": 5
}
\`\`\`

### Branching Navigation
\`\`\`json
{
  "text": "Launch aggressive expansion",
  "outcome": "You choose rapid growth despite the risks.",
  "nextLevel": "level_crisis_management",  // Jump to specific level
  "variableChanges": {"strategy": "aggressive", "risk_level": "high"},
  "points": 10
}
\`\`\`

### Conditional Navigation
Use variable values to determine paths:
\`\`\`json
{
  "text": "Secure additional funding",
  "outcome": "You seek external investment to support growth.",
  "nextLevel": "level_funding_secured", 
  "variableChanges": {"funding_secured": true, "budget": 1000000},
  "conditions": [{"variable": "budget", "operator": "<", "value": 500000}],
  "points": 8
}
\`\`\`

## Creating Effective Choices

### Choice Writing Best Practices
- **Be specific**: "Hire 5 additional developers" vs "Expand team"
- **Show consequences**: Hint at outcomes without spoiling them
- **Vary difficulty**: Include obvious and nuanced options
- **Make it meaningful**: Each choice should significantly impact the story

### Variable Integration
\`\`\`json
{
  "text": "Allocate 60% of budget to R&D",
  "outcome": "Heavy investment in research and development.",
  "variableChanges": {
    "rd_budget": 300000,
    "marketing_budget": 200000,
    "strategy_focus": "innovation"
  },
  "points": 12
}
\`\`\`

## Navigation Design Patterns

### The Hub Model
- Central level connects to specialized branches
- Students can explore different aspects
- All paths return to main progression

### The Fork Model  
- Major decision splits story into different tracks
- Parallel paths with different challenges
- Paths may reconvene at conclusion

### The Consequence Model
- Early decisions affect later options
- Poor choices limit future opportunities
- Good choices unlock advanced scenarios
      `
    },
    {
      id: 'ai-assistant-features',
      title: '🤖 AI Assistant Features',
      content: `
The built-in AI assistant helps generate content quickly and maintains consistency.

## Setting Up AI
1. Click **"AI Settings"** in sidebar or header
2. Choose provider:
   - **Google Gemini 2.0** (Recommended - free tier available)
   - **OpenAI GPT-4** (Paid service)
3. Enter your API key
4. Save settings (stored locally)

## Getting API Keys

### Google Gemini (Free)
1. Visit \`ai.google.dev\`
2. Sign in with Google account  
3. Create new project
4. Generate API key
5. Copy key to authoring tool

### OpenAI (Paid)
1. Visit \`platform.openai.com\`
2. Create account or sign in
3. Go to API Keys section
4. Create new secret key
5. Copy key to authoring tool

## AI Generation Features

### Auto-Generate Level Structure
- **Trigger**: "AI Build Levels" button in Setup
- **Output**: Complete 3-5 level sequence with titles, descriptions, and basic narratives
- **Use when**: Starting a new case study from scratch

### Narrative Generation
- **Trigger**: "AI Assist" in Level Editor narrative section
- **Output**: Rich, contextual story content with variable placeholders
- **Use when**: Need engaging scenario descriptions

### Choice Generation  
- **Trigger**: "AI Suggest" in Choices section
- **Output**: 3-4 strategic choices with outcomes and variable changes
- **Use when**: Creating decision points and branching paths

### Learning Objectives
- **Trigger**: "AI Suggest" in Learning Objectives section
- **Output**: 4-6 well-structured educational objectives
- **Use when**: Need help articulating learning goals

### Variable Suggestions
- **Trigger**: "AI Suggest" in Variable Manager
- **Output**: 6-8 relevant variables with types and descriptions
- **Use when**: Planning case study data structure

## AI Best Practices
- **Review all suggestions**: AI provides starting points, not final content
- **Customize outputs**: Adapt generated content to your specific needs
- **Maintain consistency**: Ensure AI suggestions align with your case theme
- **Iterative improvement**: Use AI to refine and expand existing content
      `
    },
    {
      id: 'external-ai-creation',
      title: '🌐 Using External AI for Case Study Creation',
      content: `
Beyond the built-in AI assistant, you can use external AI tools (ChatGPT, Claude, Gemini, etc.) to generate complete JSON case studies for direct import into the authoring tool.

## Complete AI Case Study Generation Prompt

Copy and paste this prompt into any AI tool to generate a full case study:

**Create a comprehensive business case study in JSON format for educational use.**

**EXACT JSON STRUCTURE REQUIRED:**
\`\`\`json
{
  "id": "case_[timestamp]",
  "title": "[Compelling Case Study Title]",
  "description": "[Brief description of the scenario and learning focus]",
  "course": "[Course Name - e.g., Strategic Management, Operations Management]",
  "courseCode": "[Course Code - e.g., MGT501, 24SMG101]", 
  "university": "[Institution Name]",
  "difficulty": "beginner|intermediate|advanced",
  "estimatedTime": [time in minutes: 30-90],
  "theme": "modern|business|academic|warm|corporate|creative",
  "learningObjectives": [
    "Analyze [specific business concept/skill]",
    "Evaluate [decision-making scenario]", 
    "Apply [theoretical framework to practical situation]",
    "Create [strategic plan/solution]"
  ],
  "variables": [
    {
      "id": "var_[unique_number]",
      "name": "[variable_name]",
      "type": "text|number|boolean",
      "defaultValue": "[realistic starting value]",
      "description": "[clear description of what this tracks]",
      "scope": "global"
    }
  ],
  "levels": [
    {
      "id": "level_[unique_number]",
      "title": "[Descriptive Level Title]",
      "description": "[Level's educational purpose]",
      "type": "introduction|analysis|strategy|simulation|negotiation|crisis|evaluation",
      "customType": "",
      "content": {
        "narrative": "[Story text with {{variableName}} placeholders]",
        "interactiveElements": [
          {
            "id": "element_[unique_number]",
            "type": "textInput|numberInput|textArea|dropdown|multiSelect|slider|calculator|priorityRanking",
            "title": "[Element Title]",
            "description": "[Instructions for students]",
            "variableName": "[linked_variable_name]",
            "config": {},
            "validation": {"required": false},
            "conditions": []
          }
        ],
        "choices": [
          {
            "id": "choice_[unique_number]",
            "text": "[Choice text students see]",
            "outcome": "[Immediate feedback when choice is selected]",
            "nextLevel": "[specific_level_id for branching, null for sequential]",
            "variableChanges": {"variableName": "newValue"},
            "conditions": [],
            "points": [0-20 points for this choice]
          }
        ],
        "conditions": [],
        "variableUpdates": {},
        "metrics": {}
      }
    }
  ]
}
\`\`\`

**CASE STUDY REQUIREMENTS:**
1. **Topic**: [Specify your topic - e.g., "Tech startup international expansion", "Restaurant chain crisis management", "Manufacturing quality control"]
2. **Industry**: [Specify industry context]
3. **Business Challenge**: [Core problem students must solve]
4. **Educational Level**: [Undergraduate/Graduate/Executive]
5. **Duration**: [30-90 minutes]

**CONTENT GUIDELINES:**
- Create 4-6 levels that build a complete business scenario
- Include 6-10 variables that track key business metrics (budget, market_share, employee_satisfaction, risk_level, etc.)
- Add 2-3 interactive elements per level for student engagement
- Provide 2-4 meaningful choices per level with different outcomes
- Use realistic business context and data
- Include branching navigation where high-risk choices lead to crisis management levels
- Ensure variable names are consistent throughout (use underscore_case)
- Write narratives that include {{variableName}} syntax for dynamic content
- Make choices that have clear business trade-offs and consequences

**EXAMPLE NAVIGATION PATTERN:**
Level 1 (Introduction) → Level 2 (Analysis) → Level 3 (Decision Point)
├─ Aggressive Strategy → Level 4 (Crisis Management) → Level 6 (Recovery)
└─ Conservative Strategy → Level 5 (Steady Growth) → Level 6 (Results)

**INTERACTIVE ELEMENT EXAMPLES:**
- Budget allocation sliders (type: "slider")
- Market research text areas (type: "textArea") 
- Priority ranking exercises (type: "priorityRanking")
- Strategic choice dropdowns (type: "dropdown")
- ROI calculators (type: "calculator")

Generate a complete, realistic business case study that imports seamlessly into the authoring tool.

## How to Use the AI Generation Prompt

### Step 1: Choose Your AI Tool
- **ChatGPT**: chat.openai.com
- **Claude**: claude.ai
- **Google Gemini**: gemini.google.com
- **Other AI tools**: Any that support JSON generation

### Step 2: Customize the Prompt
Before sending, customize these sections:
- **Topic**: Specify your exact case study focus
- **Industry**: Be specific (fintech, healthcare, retail, etc.)
- **Business Challenge**: Define the core problem
- **Educational Level**: Match your student audience
- **Duration**: Set realistic time expectations

Example customization:
\`\`\`
CASE STUDY REQUIREMENTS:
1. **Topic**: "E-commerce platform international expansion into Southeast Asia"
2. **Industry**: "Technology/E-commerce"  
3. **Business Challenge**: "Market entry strategy with limited budget and high competition"
4. **Educational Level**: "Graduate MBA students"
5. **Duration**: "60 minutes"
\`\`\`

### Step 3: Generate and Refine
1. **Send the prompt** to your chosen AI tool
2. **Review the output** for completeness and relevance
3. **Request modifications** if needed:
   - "Add more crisis management scenarios"
   - "Include financial calculations in interactive elements"
   - "Create more complex branching navigation"
4. **Iterate until satisfied** with quality and scope

### Step 4: Validate JSON Structure
Before importing:
1. **Copy the generated JSON**
2. **Validate syntax** using online JSON validator
3. **Check required fields** are present
4. **Verify variable consistency** throughout levels
5. **Test navigation logic** mentally

### Step 5: Import and Customize
1. **Import JSON** into authoring tool
2. **Review in Preview mode** for any issues
3. **Customize content** using built-in editor
4. **Add institution-specific branding**
5. **Test HTML export** before student deployment

## AI Generation Best Practices

### Prompt Engineering Tips
- **Be specific**: "Customer retention case study for SaaS company" vs "business case study"
- **Set constraints**: Specify exact number of levels, variables, elements
- **Include examples**: Reference successful case study patterns
- **Request variations**: Ask for multiple scenarios or difficulty levels

### Quality Control Checklist
After AI generation, verify:
- ✅ **Variable consistency**: Same names used throughout
- ✅ **Realistic scenarios**: Business context makes sense
- ✅ **Proper navigation**: Choice paths lead to appropriate levels
- ✅ **Educational value**: Clear learning progression
- ✅ **Technical format**: Valid JSON structure
- ✅ **Engagement level**: Interactive and decision-rich

### Common AI Generation Issues

**Problem**: Variables referenced but not defined
**Solution**: Add prompt instruction: "Ensure all {{variableName}} references have corresponding variable definitions"

**Problem**: Unrealistic business scenarios
**Solution**: Specify: "Base scenarios on real business challenges and industry best practices"

**Problem**: Too simple or too complex
**Solution**: Include detail level: "Create intermediate complexity suitable for 2nd year MBA students"

**Problem**: Broken navigation logic  
**Solution**: Request: "Map out navigation flow and ensure all nextLevel references point to valid level IDs"

### Advanced AI Techniques

#### Series Generation
Create connected case studies:
\`\`\`
Generate a 3-part case study series following the same company through:
1. Startup phase (funding and market entry)
2. Growth phase (scaling and operations) 
3. Maturity phase (diversification and sustainability)

Ensure variables carry forward between parts where appropriate.
\`\`\`

#### Industry-Specific Templates
Develop specialized prompts for different domains:
- **Healthcare**: Patient care, regulatory compliance, technology adoption
- **Finance**: Risk management, portfolio optimization, regulatory changes
- **Manufacturing**: Supply chain, quality control, sustainability
- **Technology**: Product development, market competition, scaling challenges

#### Difficulty Variations
Generate multiple versions:
\`\`\`
Create three versions of the same case study:
1. Beginner: Guided decisions with clear right/wrong choices
2. Intermediate: Balanced trade-offs requiring analysis
3. Advanced: Complex scenarios with ambiguous solutions
\`\`\`

### Integration with Built-in AI
You can combine external AI generation with built-in AI features:

1. **Generate structure externally**: Use AI tools for complete case study JSON
2. **Import and refine**: Bring JSON into authoring tool
3. **Enhance with built-in AI**: Use tool's AI for narrative improvements, choice refinement
4. **Iterate and improve**: Combine both AI approaches for optimal results

This hybrid approach gives you the best of both worlds: comprehensive case study generation and fine-tuned improvements.
      `
    },
    {
      id: 'import-export',
      title: '📤 Import & Export',
      content: `
## Importing Existing Case Studies

### JSON Import
1. Click **"Import JSON"** in sidebar
2. Select valid JSON file
3. Tool validates structure and loads content
4. Edit imported content as needed

### Supported JSON Structure
The tool accepts JSON files with this exact structure:
\`\`\`json
{
  "id": "case_[timestamp]",
  "title": "Case Study Title",
  "description": "Description", 
  "course": "Course Name",
  "courseCode": "COURSE123",
  "university": "Institution",
  "difficulty": "intermediate",
  "estimatedTime": 45,
  "theme": "modern",
  "learningObjectives": ["Objective 1", "Objective 2"],
  "variables": [/* variable objects */],
  "levels": [/* level objects */]
}
\`\`\`

## Exporting Case Studies

### JSON Export
- **Purpose**: Save work, share with colleagues, backup
- **Output**: Complete case study data in JSON format
- **Filename**: \`[Title]_[CourseCode].json\`

### HTML Export (Student Version)
- **Purpose**: Deploy to students as interactive experience
- **Output**: Self-contained HTML file with embedded JavaScript
- **Requirements**: Title and at least one level must exist
- **Features**: 
  - Responsive design
  - Progress tracking
  - Variable interpolation
  - Interactive elements
  - Navigation controls

## HTML Export Features
- **Header**: Institution branding, course info, title
- **Progress Circle**: Completion percentage indicator
- **Interactive Elements**: Fully functional input components
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Variable Display**: Dynamic text replacement using \`{{variableName}}\`
- **Choice Navigation**: Branching paths and consequence handling

## File Management Tips
- **Consistent Naming**: Use clear, descriptive filenames
- **Version Control**: Include dates or version numbers
- **Backup Regularly**: Export JSON frequently during development
- **Test HTML**: Always test generated HTML before distributing
- **Logo Placement**: Place \`jainlogo.png\` in same folder as HTML file
      `
    },
    {
      id: 'preview-testing',
      title: '🔍 Preview & Testing',
      content: `
## Using Preview Mode
1. Click **"Preview"** in sidebar or header
2. Review complete case study structure
3. Check stats and completeness warnings
4. Test export functionality

## Preview Features

### Overview Dashboard
- Case study metadata and statistics
- Completeness warnings and missing elements
- Learning objectives and variable summaries
- Theme preview with visual styling

### Export Options
- **JSON Export**: Download case study data
- **HTML Generation**: Create student-ready interactive version
- **Share**: Copy or send case study to colleagues

## Testing Checklist

### Content Review
- ✅ All required fields completed (title, course)
- ✅ Learning objectives are clear and measurable
- ✅ Variable names are consistent and descriptive
- ✅ Level narratives include variable placeholders
- ✅ Interactive elements linked to appropriate variables
- ✅ Choices have meaningful outcomes and navigation

### Technical Validation
- ✅ Variable references use correct syntax \`{{variableName}}\`
- ✅ Navigation paths connect to existing levels
- ✅ Interactive elements have proper validation
- ✅ Choice conditions use valid variable names
- ✅ HTML export generates without errors

### Educational Quality
- ✅ Learning progression is logical and scaffolded
- ✅ Case scenario is realistic and relevant
- ✅ Decision points create meaningful learning moments
- ✅ Variable changes reflect real-world consequences
- ✅ Assessment opportunities are embedded throughout

## Testing Generated HTML
1. Generate HTML using **"Generate HTML"** button
2. Open HTML file in web browser
3. Test all interactive elements
4. Verify variable substitution works correctly
5. Check navigation and choice outcomes
6. Test on mobile devices for responsiveness
      `
    },
    {
      id: 'best-practices',
      title: '🎓 Best Practices',
      content: `
## Case Study Design

### Story Structure
- **Opening Hook**: Compelling scenario that draws students in
- **Rising Action**: Increasing complexity and stakes
- **Decision Points**: Clear moments requiring student input
- **Consequences**: Realistic outcomes that teach lessons
- **Resolution**: Satisfying conclusion that reinforces learning

### Educational Design
- **Authentic Context**: Use real-world business scenarios
- **Progressive Complexity**: Start simple, build sophistication
- **Multiple Perspectives**: Consider different stakeholder viewpoints
- **Reflection Opportunities**: Include self-assessment and analysis
- **Transfer Potential**: Ensure lessons apply beyond the case

## Technical Implementation

### Variable Strategy
- **Namespace Clearly**: \`budget_marketing\` vs \`budget_rd\`
- **Use Consistent Types**: Don't mix strings and numbers
- **Plan Dependencies**: Map how variables influence each other
- **Default Thoughtfully**: Set realistic starting values

### Level Design
- **Focused Purpose**: Each level should have one main goal
- **Balanced Length**: 5-10 minutes per level typically
- **Clear Transitions**: Logical connections between levels
- **Varied Activities**: Mix analysis, decision-making, and reflection

### Navigation Design
- **Meaningful Choices**: Every option should teach something
- **Clear Consequences**: Students should understand outcomes
- **Recovery Paths**: Allow learning from mistakes
- **Multiple Routes**: Different ways to reach learning goals

## Content Creation

### Writing Effective Narratives
- **Show, Don't Tell**: Use specific details and scenarios
- **Student Voice**: Write from student's perspective as decision-maker
- **Context Rich**: Provide enough background for informed decisions
- **Variable Integration**: Seamlessly weave variables into story

### Creating Engaging Choices
- **Avoid Obviously Wrong Options**: All choices should be defensible
- **Include Dilemmas**: Present trade-offs and conflicting values
- **Vary Consequences**: Some choices have immediate, others delayed effects
- **Reflect Reality**: Base options on actual business decisions

## Quality Assurance

### Before Publishing
1. **Peer Review**: Have colleagues test your case study
2. **Student Pilot**: Test with small group of actual students  
3. **Technical Check**: Verify all interactive elements function
4. **Mobile Test**: Ensure responsive design works properly
5. **Accessibility Review**: Check for inclusive design elements

### Ongoing Improvement
- **Collect Feedback**: Gather student and instructor responses
- **Track Analytics**: Monitor completion rates and decision patterns
- **Iterate Content**: Update scenarios to maintain relevance
- **Expand Library**: Create connected case studies or sequels
      `
    },
    {
      id: 'troubleshooting',
      title: '🔧 Troubleshooting',
      content: `
## Common Issues

### Import Problems
**Problem**: "Invalid JSON format" error
**Solution**: 
- Validate JSON syntax using online validator
- Check for missing commas, brackets, or quotes
- Ensure all required fields are present

**Problem**: "Case study imported but content missing"
**Solution**:
- Verify JSON structure matches required format
- Check variable and level ID references
- Ensure all nested objects are properly formatted

### AI Assistant Issues
**Problem**: "Please configure your API key first"
**Solution**:
- Go to AI Settings and enter valid API key
- Check API key permissions and quotas
- Verify internet connection for API calls

**Problem**: "Error generating content"
**Solution**:
- Check API key validity and account status
- Try again with simpler prompts
- Switch to different AI provider if available

### Variable Problems
**Problem**: Variables not appearing in narratives
**Solution**:
- Use exact syntax: \`{{variableName}}\`
- Check variable name spelling and case sensitivity
- Ensure variable exists in Variable Manager

**Problem**: Interactive elements not saving data
**Solution**:
- Verify element is linked to existing variable
- Check variable name matches exactly
- Ensure variable type matches element type

### Export Issues
**Problem**: HTML export missing logo
**Solution**:
- Place \`jainlogo.png\` in same folder as HTML file
- Check image file name and format
- Verify image is not corrupted

**Problem**: Interactive elements not working in HTML
**Solution**:
- Test in different browsers
- Check browser console for JavaScript errors
- Ensure HTML file is complete and not truncated

### Navigation Problems
**Problem**: Choices not advancing to next level
**Solution**:
- Check \`nextLevel\` field in choice configuration
- Verify target level ID exists
- Test in preview mode before exporting

**Problem**: Infinite loops or broken navigation
**Solution**:
- Map navigation flow visually
- Check for circular references
- Ensure all paths lead to conclusion

## Getting Help

### Built-in Resources
- **Case Study Stats**: Check sidebar for completeness indicators
- **Analyze Readiness**: Use button to assess export readiness
- **Preview Mode**: Test functionality before export

### Documentation References
- **JSON Structure**: Reference the import prompt structure
- **Variable Syntax**: Use \`{{variableName}}\` format consistently  
- **Navigation Logic**: Follow choice → level relationship patterns

### Support Channels
- **Technical Issues**: Check browser console for error messages
- **Content Questions**: Review best practices and examples
- **Feature Requests**: Document needed functionality for future updates
      `
    }
  ]

  const [activeSection, setActiveSection] = useState<string>('getting-started')

  const formatContent = (content: string): string => {
  return content
    .split('\n')
    .map((line) => {
      // Apply bold and inline code first
      line = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-800">$1</strong>')
      line = line.replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">$1</code>')

      // Convert headers
      if (line.startsWith('## ')) {
        return `<h2 class="text-2xl font-bold text-gray-800 mt-6 mb-4">${line.substring(3)}</h2>`
      }
      if (line.startsWith('### ')) {
        return `<h3 class="text-xl font-semibold text-gray-700 mt-5 mb-3">${line.substring(4)}</h3>`
      }
      if (line.startsWith('#### ')) {
        return `<h4 class="text-lg font-medium text-gray-600 mt-4 mb-2">${line.substring(5)}</h4>`
      }

      // Check for code block syntax after markdown replacements
      if (line.startsWith('```')) {
        return line.includes('json')
          ? '<pre class="bg-gray-900 text-green-400 p-4 rounded-lg mt-3 mb-3 overflow-x-auto text-sm font-mono"><code>'
          : (line.trim() === '```')
          ? '</code></pre>'
          : '<pre class="bg-gray-900 text-white p-4 rounded-lg mt-3 mb-3 overflow-x-auto text-sm font-mono"><code>'
      }

      // Lists and other formatting...
      if (line.startsWith('- ✅')) {
        return `<li class="ml-6 mb-2 text-gray-700 flex items-center"><span class="text-green-500 mr-2">✅</span>${line.substring(4)}</li>`
      }
      if (line.startsWith('- ')) {
        return `<li class="ml-6 mb-2 text-gray-700">${line.substring(2)}</li>`
      }

      // Normal paragraphs
      if (line.trim() && !line.startsWith('<')) {
        return `<p class="mb-4 text-gray-700 leading-relaxed">${line}</p>`
      }

      return line
    })
    .join('')
    // Wrap lists
    .replace(/(<li[^>]*>.*?<\/li>\s*)+/g, '<ul class="list-disc mb-4">$&</ul>')
}

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-7xl mx-4 w-full max-h-[95vh] flex shadow-2xl">
        {/* Navigation Sidebar */}
        <div className="w-80 bg-gradient-to-b from-blue-50 to-indigo-50 rounded-l-xl border-r border-gray-200 overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <BookOpen size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">User Guide</h3>
                  <p className="text-sm text-gray-600">Complete Documentation</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-500 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeSection === section.id
                      ? 'bg-blue-100 text-blue-700 border border-blue-200 shadow-sm'
                      : 'text-gray-700 hover:bg-white hover:shadow-sm'
                  }`}
                >
                  <div className="font-medium text-sm leading-relaxed">{section.title}</div>
                </button>
              ))}
            </nav>
            
            <div className="mt-8 p-4 bg-white rounded-lg border border-blue-200">
              <h4 className="font-semibold text-gray-800 mb-2">Quick Tips</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Use AI features to speed up creation</li>
                <li>• Test frequently in Preview mode</li>
                <li>• Export JSON files as backups</li>
                <li>• Start simple, add complexity later</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-white rounded-r-xl">
          <div className="p-8">
            {sections.map((section) => (
              <div
                key={section.id}
                className={`${activeSection === section.id ? 'block' : 'hidden'}`}
              >
                <div className="prose prose-blue max-w-none">
                  <div 
                    dangerouslySetInnerHTML={{
                      __html: formatContent(section.content)
                    }}
                  />
                </div>
              </div>
            ))}
            
            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
                <h4 className="font-bold text-gray-800 mb-2">🎉 Conclusion</h4>
                <p className="text-gray-600 mb-4">
                  This authoring tool empowers educators to create sophisticated, interactive case studies that engage students and enhance learning outcomes. Whether you import existing content or build from scratch, the combination of structured design tools and AI assistance makes case study creation efficient and effective.
                </p>
                <div className="mb-4">
                  <h5 className="font-semibold text-gray-700 mb-2">Key Success Factors:</h5>
                  <ol className="text-sm text-gray-600 space-y-1">
                        <li>1. <strong>Plan First</strong>: Map your learning objectives to case study flow</li>
                        <li>2. <strong>Start Simple</strong>: Begin with basic structure, then add complexity</li>
                        <li>3. <strong>Test Early</strong>: Use preview mode and HTML testing frequently</li>
                        <li>4. <strong>Iterate Often</strong>: Refine based on student feedback and usage data</li>
                        <li>5. <strong>Share Widely</strong>: Collaborate with colleagues to build case study libraries</li>
                        </ol>

                </div>
                <div className="flex gap-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    📚 Comprehensive Guide
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    🤖 AI-Powered
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                    🎓 Education-Focused
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-4">
  <strong>Happy case study authoring!</strong> 🎓📚
</p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InstructionsModal;