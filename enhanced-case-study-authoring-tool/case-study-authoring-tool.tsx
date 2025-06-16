"use client"

import { useState, useEffect } from "react"
import {
  Plus,
  Trash2,
  Eye,
  Play,
  Download,
  Upload,
  Wand2,
  Brain,
  BookOpen,
  Target,
  Settings,
  Users,
  Edit,
  X,
  Variable,
  AlertCircle,
  ArrowRight,
  Link,
} from "lucide-react"

const CaseStudyAuthoringTool = () => {
  // State Management
  const [currentView, setCurrentView] = useState("overview")
  const [caseStudy, setCaseStudy] = useState({
    id: "",
    title: "",
    description: "",
    course: "",
    courseCode: "",
    university: "",
    difficulty: "intermediate",
    estimatedTime: 30,
    learningObjectives: [],
    levels: [],
    variables: [],
    theme: "modern",
  })

  const [currentLevel, setCurrentLevel] = useState(null)
  const [isLLMAssisting, setIsLLMAssisting] = useState(false)
  const [llmSuggestion, setLLMSuggestion] = useState("")
  const [llmContext, setLLMContext] = useState("")
  const [previewMode, setPreviewMode] = useState(false)
  const [editingElement, setEditingElement] = useState(null)
  const [apiKey, setApiKey] = useState("")
  const [apiProvider, setApiProvider] = useState("gemini")
  const [showApiSettings, setShowApiSettings] = useState(false)
  const [showVariableManager, setShowVariableManager] = useState(false)
  const [llmError, setLLMError] = useState("")

  // Configuration Data
  const themes = [
    { id: "modern", name: "Modern Gradient", preview: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
    { id: "business", name: "Business Blue", preview: "linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)" },
    { id: "academic", name: "Academic Green", preview: "linear-gradient(135deg, #00b894 0%, #00cec9 100%)" },
    { id: "warm", name: "Warm Orange", preview: "linear-gradient(135deg, #fdcb6e 0%, #e17055 100%)" },
    { id: "corporate", name: "Corporate Gray", preview: "linear-gradient(135deg, #636e72 0%, #2d3436 100%)" },
    { id: "creative", name: "Creative Purple", preview: "linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%)" },
  ]

  const levelTypes = [
    {
      id: "introduction",
      name: "Introduction & Setup",
      icon: "📋",
      description: "Introduce the scenario and collect initial variables",
    },
    { id: "analysis", name: "Analysis & Research", icon: "📊", description: "Data analysis and research tasks" },
    { id: "strategy", name: "Strategic Decision", icon: "🎯", description: "Strategic planning and decision making" },
    { id: "simulation", name: "Simulation", icon: "🎮", description: "Interactive simulations and scenarios" },
    { id: "negotiation", name: "Negotiation", icon: "🤝", description: "Negotiation and collaboration exercises" },
    { id: "crisis", name: "Crisis Management", icon: "🚨", description: "Emergency and crisis response scenarios" },
    {
      id: "evaluation",
      name: "Evaluation & Reflection",
      icon: "📝",
      description: "Assess outcomes and reflect on decisions",
    },
    { id: "custom", name: "Custom Type", icon: "⚙️", description: "Define your own level type" },
  ]

  const interactiveElementTypes = [
    { id: "textInput", name: "Text Input", icon: "📝", description: "Single line text input for variables" },
    { id: "numberInput", name: "Number Input", icon: "🔢", description: "Numeric input with validation" },
    { id: "textArea", name: "Text Area", icon: "📄", description: "Multi-line text input for detailed responses" },
    { id: "dropdown", name: "Dropdown Select", icon: "📋", description: "Single selection from predefined options" },
    { id: "multiSelect", name: "Multi-Select", icon: "☑️", description: "Multiple selections from options" },
    { id: "slider", name: "Value Slider", icon: "🎚️", description: "Numeric range slider for allocations" },
    { id: "calculator", name: "Calculator Widget", icon: "🧮", description: "Interactive calculations with formulas" },
    { id: "priorityRanking", name: "Priority Ranking", icon: "📊", description: "Drag and drop priority lists" },
    { id: "matrix", name: "Decision Matrix", icon: "⚡", description: "Payoff matrices and decision trees" },
    { id: "custom", name: "Custom Element", icon: "🔧", description: "Define your own interactive element" },
  ]

  // Initialize Component
  useEffect(() => {
    setCaseStudy((prev) => ({
      ...prev,
      id: "case_" + Date.now(),
    }))

    // Load saved API settings
    const savedApiKey = JSON.parse(localStorage.getItem("llm_api_key") || '""')
    const savedProvider = localStorage.getItem("llm_provider") || "gemini"
    if (savedApiKey) setApiKey(savedApiKey)
    if (savedProvider) setApiProvider(savedProvider)
  }, [])

  // Variable Management Functions
  const addVariable = () => {
    const newVariable = {
      id: `var_${Date.now()}`,
      name: "",
      type: "text",
      defaultValue: "",
      description: "",
      scope: "global",
    }

    setCaseStudy((prev) => ({
      ...prev,
      variables: [...prev.variables, newVariable],
    }))
  }

  const updateVariable = (varId, updates) => {
    setCaseStudy((prev) => ({
      ...prev,
      variables: prev.variables.map((variable) => (variable.id === varId ? { ...variable, ...updates } : variable)),
    }))
  }

  const deleteVariable = (varId) => {
    setCaseStudy((prev) => ({
      ...prev,
      variables: prev.variables.filter((variable) => variable.id !== varId),
    }))
  }

  // API & LLM Functions
  const saveApiSettings = () => {
    localStorage.setItem("llm_api_key", JSON.stringify(apiKey))
    localStorage.setItem("llm_provider", apiProvider)
    setShowApiSettings(false)
  }

  const generateContentWithLLM = async (type, context) => {
    if (!apiKey) {
      alert("Please configure your API key in settings first.")
      setShowApiSettings(true)
      return
    }

    setIsLLMAssisting(true)
    setLLMContext(type)
    setLLMError("")

    try {
      let prompt = ""

      switch (type) {
        case "narrative":
          prompt = `Create an engaging case study narrative for a business/academic level titled "${context.level?.title || "New Level"}" in a ${caseStudy.course || "business course"} course. 

Context:
- Course: ${caseStudy.course || "Business Course"}
- Difficulty: ${caseStudy.difficulty}
- Level Type: ${context.level?.type || "introduction"}
- Available Variables: ${caseStudy.variables.map((v) => `${v.name} (${v.type})`).join(", ") || "None defined yet"}

Requirements:
- Create a realistic business scenario (200-300 words)
- Include specific details about the situation
- Reference variables using {{variableName}} syntax where appropriate
- Make it engaging and educational
- Include a clear challenge or decision point

The narrative should set up the scenario students will work through.`
          break

        case "choices":
          prompt = `Generate 3-4 strategic decision choices for a case study level in ${caseStudy.course || "business management"}. 

Context:
- Course: ${caseStudy.course || "Business Course"}
- Level Title: ${context.level?.title || "Decision Point"}
- Available Variables: ${caseStudy.variables.map((v) => v.name).join(", ") || "budget, teamSize, timeframe"}
- Level Type: ${context.level?.type || "strategy"}

Return ONLY a JSON array like this:
[
  {
    "text": "Choice description that students will see",
    "outcome": "What happens when this choice is selected",
    "variableChanges": {"variableName": "newValue"},
    "points": 10
  }
]

Make choices realistic and impactful, with clear consequences.`
          break

        case "objectives":
          prompt = `Create 4-6 specific learning objectives for a ${caseStudy.course || "business"} case study about "${caseStudy.title || "strategic decision making"}".

Requirements:
- Start each with action verbs (Analyze, Evaluate, Create, Apply, etc.)
- Be specific and measurable
- Appropriate for ${caseStudy.difficulty} level students
- Focus on practical skills and knowledge

Return ONLY a JSON array of strings:
["objective 1", "objective 2", ...]`
          break

        case "variables":
          prompt = `Suggest 6-8 useful variables for a ${caseStudy.course || "business"} case study about "${caseStudy.title || "business scenario"}".

Context:
- Course: ${caseStudy.course || "Business Management"}
- Description: ${caseStudy.description || "Interactive business case study"}
- Difficulty: ${caseStudy.difficulty}

Return ONLY a JSON array like this:
[
  {
    "name": "budget",
    "type": "number",
    "description": "Available budget for the project",
    "defaultValue": "100000"
  }
]

Include variables that track decisions, resources, performance metrics, and outcomes.`
          break

        case "level_structure":
          prompt = `Create a complete level structure for a ${caseStudy.course || "business"} case study with 3-5 levels.

Context:
- Title: ${caseStudy.title || "Business Case Study"}
- Course: ${caseStudy.course || "Business Management"}
- Description: ${caseStudy.description || "Interactive case study"}

Return ONLY a JSON array of level objects:
[
  {
    "title": "Level Title",
    "description": "Brief description",
    "type": "introduction",
    "narrative": "Level story content"
  }
]`
          break
      }

      let response

      if (apiProvider === "gemini") {
        response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 2000,
                topP: 0.8,
              },
            }),
          },
        )

        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.error?.message || `API Error: ${response.status}`)
        }
        if (data.candidates && data.candidates.length > 0) {
          setLLMSuggestion(data.candidates[0].content.parts[0].text)
        } else {
          throw new Error("No response generated from API")
        }
      } else if (apiProvider === "openai") {
        response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-4",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 2000,
            temperature: 0.7,
          }),
        })

        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.error?.message || `API Error: ${response.status}`)
        }
        setLLMSuggestion(data.choices[0].message.content)
      }
    } catch (error) {
      console.error("LLM API Error:", error)
      setLLMError(error.message)
      alert(`Error generating content: ${error.message}`)
    } finally {
      setIsLLMAssisting(false)
    }
  }

  const applyLLMSuggestion = () => {
    if (!llmSuggestion) return

    try {
      switch (llmContext) {
        case "narrative":
          if (currentLevel) {
            const updatedContent = {
              ...currentLevel.content,
              narrative: llmSuggestion,
            }
            updateLevel(currentLevel.id, { content: updatedContent })
            setCurrentLevel((prev) => ({
              ...prev,
              content: updatedContent,
            }))
          }
          break

        case "choices":
          // Clean the response to extract JSON
          let cleanedResponse = llmSuggestion.trim()
          if (cleanedResponse.startsWith("```json")) {
            cleanedResponse = cleanedResponse.replace(/```json\n?/, "").replace(/\n?```$/, "")
          }
          if (cleanedResponse.startsWith("```")) {
            cleanedResponse = cleanedResponse.replace(/```\n?/, "").replace(/\n?```$/, "")
          }

          const choices = JSON.parse(cleanedResponse)
          const formattedChoices = choices.map((choice, index) => ({
            id: `choice_${Date.now()}_${index}`,
            text: choice.text,
            outcome: choice.outcome,
            variableChanges: choice.variableChanges || {},
            nextLevel: null,
            conditions: [],
            points: choice.points || 0,
          }))

          if (currentLevel) {
            const updatedContent = {
              ...currentLevel.content,
              choices: formattedChoices,
            }
            updateLevel(currentLevel.id, { content: updatedContent })
            setCurrentLevel((prev) => ({
              ...prev,
              content: updatedContent,
            }))
          }
          break

        case "objectives":
          let objectivesResponse = llmSuggestion.trim()
          if (objectivesResponse.startsWith("```json")) {
            objectivesResponse = objectivesResponse.replace(/```json\n?/, "").replace(/\n?```$/, "")
          }
          const objectives = JSON.parse(objectivesResponse)
          setCaseStudy((prev) => ({ ...prev, learningObjectives: objectives }))
          break

        case "variables":
          let variablesResponse = llmSuggestion.trim()
          if (variablesResponse.startsWith("```json")) {
            variablesResponse = variablesResponse.replace(/```json\n?/, "").replace(/\n?```$/, "")
          }
          const variables = JSON.parse(variablesResponse)
          const formattedVariables = variables.map((variable, index) => ({
            id: `var_${Date.now()}_${index}`,
            name: variable.name,
            type: variable.type,
            description: variable.description,
            defaultValue: variable.defaultValue,
            scope: "global",
          }))
          setCaseStudy((prev) => ({
            ...prev,
            variables: [...prev.variables, ...formattedVariables],
          }))
          break

        case "level_structure":
          let levelsResponse = llmSuggestion.trim()
          if (levelsResponse.startsWith("```json")) {
            levelsResponse = levelsResponse.replace(/```json\n?/, "").replace(/\n?```$/, "")
          }
          const levelStructures = JSON.parse(levelsResponse)
          const formattedLevels = levelStructures.map((level, index) => ({
            id: `level_${Date.now()}_${index}`,
            title: level.title,
            description: level.description,
            type: level.type || "introduction",
            customType: "",
            content: {
              narrative: level.narrative || "",
              interactiveElements: [],
              choices: [],
              conditions: [],
              variableUpdates: {},
              metrics: {},
            },
          }))
          setCaseStudy((prev) => ({
            ...prev,
            levels: [...prev.levels, ...formattedLevels],
          }))
          break
      }

      setLLMSuggestion("")
      setLLMContext("")
    } catch (error) {
      console.error("Error applying LLM suggestion:", error)
      alert(`Error applying suggestion: ${error.message}. Please check the format or try again.`)
    }
  }

  // Level Management Functions
  const addLevel = () => {
    const newLevel = {
      id: `level_${Date.now()}`,
      title: "",
      description: "",
      type: "introduction",
      customType: "",
      content: {
        narrative: "",
        interactiveElements: [],
        choices: [],
        conditions: [],
        variableUpdates: {},
        metrics: {},
      },
    }

    setCaseStudy((prev) => ({
      ...prev,
      levels: [...prev.levels, newLevel],
    }))

    setCurrentLevel(newLevel)
    setCurrentView("level-editor")
  }

  const updateLevel = (levelId, updates) => {
    setCaseStudy((prev) => ({
      ...prev,
      levels: prev.levels.map((level) => (level.id === levelId ? { ...level, ...updates } : level)),
    }))
  }

  const deleteLevel = (levelId) => {
    setCaseStudy((prev) => ({
      ...prev,
      levels: prev.levels.filter((level) => level.id !== levelId),
    }))

    if (currentLevel && currentLevel.id === levelId) {
      setCurrentLevel(null)
      setCurrentView("overview")
    }
  }

  // Interactive Element Functions
  const addInteractiveElement = (elementType) => {
    if (!currentLevel) return

    const newElement = {
      id: `element_${Date.now()}`,
      type: elementType,
      title: "",
      description: "",
      variableName: "",
      config: getDefaultConfig(elementType),
      validation: {
        required: false,
        minValue: null,
        maxValue: null,
        pattern: "",
      },
      conditions: [],
    }

    const updatedElements = [...currentLevel.content.interactiveElements, newElement]
    const updatedContent = { ...currentLevel.content, interactiveElements: updatedElements }

    updateLevel(currentLevel.id, { content: updatedContent })
    setCurrentLevel((prev) => ({ ...prev, content: updatedContent }))
  }

  const updateInteractiveElement = (elementId, updates) => {
    if (!currentLevel) return

    const updatedElements = currentLevel.content.interactiveElements.map((el) =>
      el.id === elementId ? { ...el, ...updates } : el,
    )

    const updatedContent = { ...currentLevel.content, interactiveElements: updatedElements }

    updateLevel(currentLevel.id, { content: updatedContent })
    setCurrentLevel((prev) => ({ ...prev, content: updatedContent }))
  }

  const deleteInteractiveElement = (elementId) => {
    if (!currentLevel) return

    const updatedElements = currentLevel.content.interactiveElements.filter((el) => el.id !== elementId)
    const updatedContent = { ...currentLevel.content, interactiveElements: updatedElements }

    updateLevel(currentLevel.id, { content: updatedContent })
    setCurrentLevel((prev) => ({ ...prev, content: updatedContent }))
  }

  const getDefaultConfig = (type) => {
    switch (type) {
      case "textInput":
        return { placeholder: "Enter your response...", maxLength: 255 }
      case "numberInput":
        return { min: 0, max: 1000, step: 1, placeholder: "Enter a number..." }
      case "textArea":
        return { placeholder: "Enter detailed response...", rows: 4, maxLength: 2000 }
      case "dropdown":
        return {
          options: [
            { value: "option1", label: "Option 1" },
            { value: "option2", label: "Option 2" },
          ],
          placeholder: "Select an option...",
        }
      case "multiSelect":
        return {
          options: [
            { value: "opt1", label: "Option 1" },
            { value: "opt2", label: "Option 2" },
            { value: "opt3", label: "Option 3" },
          ],
          minSelections: 1,
          maxSelections: null,
        }
      case "slider":
        return { min: 0, max: 100, defaultValue: 50, step: 1, unit: "%", showValue: true }
      case "calculator":
        return {
          inputs: [
            { name: "value1", label: "First Value", type: "number" },
            { name: "value2", label: "Second Value", type: "number" },
          ],
          formula: "value1 + value2",
          resultLabel: "Result",
        }
      case "custom":
        return {
          htmlTemplate: "<div>Custom Element HTML</div>",
          cssStyles: "",
          jsCode: "",
        }
      case "priorityRanking":
        return {
          options: [
            { value: "priority1", label: "Cost Reduction" },
            { value: "priority2", label: "Quality Improvement" },
            { value: "priority3", label: "Market Expansion" },
            { value: "priority4", label: "Innovation" },
          ],
        }
      default:
        return {}
    }
  }

  // Choice Management Functions
  const addChoice = () => {
    if (!currentLevel) return

    const newChoice = {
      id: `choice_${Date.now()}`,
      text: "",
      outcome: "",
      nextLevel: null,
      variableChanges: {},
      conditions: [],
      points: 0,
    }

    const updatedChoices = [...currentLevel.content.choices, newChoice]
    const updatedContent = { ...currentLevel.content, choices: updatedChoices }

    updateLevel(currentLevel.id, { content: updatedContent })
    setCurrentLevel((prev) => ({ ...prev, content: updatedContent }))
  }

  const updateChoice = (choiceId, updates) => {
    if (!currentLevel) return

    const updatedChoices = currentLevel.content.choices.map((choice) =>
      choice.id === choiceId ? { ...choice, ...updates } : choice,
    )

    const updatedContent = { ...currentLevel.content, choices: updatedChoices }

    updateLevel(currentLevel.id, { content: updatedContent })
    setCurrentLevel((prev) => ({ ...prev, content: updatedContent }))
  }

  const deleteChoice = (choiceId) => {
    if (!currentLevel) return

    const updatedChoices = currentLevel.content.choices.filter((choice) => choice.id !== choiceId)
    const updatedContent = { ...currentLevel.content, choices: updatedChoices }

    updateLevel(currentLevel.id, { content: updatedContent })
    setCurrentLevel((prev) => ({ ...prev, content: updatedContent }))
  }

  // Learning Objective Functions
  const addLearningObjective = () => {
    setCaseStudy((prev) => ({
      ...prev,
      learningObjectives: [...prev.learningObjectives, ""],
    }))
  }

  const updateLearningObjective = (index, value) => {
    const newObjectives = [...caseStudy.learningObjectives]
    newObjectives[index] = value
    setCaseStudy((prev) => ({ ...prev, learningObjectives: newObjectives }))
  }

  const deleteLearningObjective = (index) => {
    const newObjectives = caseStudy.learningObjectives.filter((_, i) => i !== index)
    setCaseStudy((prev) => ({ ...prev, learningObjectives: newObjectives }))
  }

  // Export/Import Functions
  const exportCaseStudy = () => {
    const exportData = {
      ...caseStudy,
      exportedAt: new Date().toISOString(),
      version: "2.1",
    }

    const dataStr = JSON.stringify(exportData, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const exportFileDefaultName = `${(caseStudy.title || "CaseStudy").replace(/\s+/g, "_")}_${caseStudy.courseCode || "Course"}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const importCaseStudy = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".json"
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          try {
            const importedData = JSON.parse(event.target.result)
            setCaseStudy(importedData)
            setCurrentLevel(null)
            setCurrentView("overview")
            alert("Case study imported successfully!")
          } catch (err) {
            alert("Error importing file: Invalid JSON format")
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  const generateHTMLExport = () => {
    if (!caseStudy.title || caseStudy.levels.length === 0) {
      alert("Please add a title and at least one level before generating HTML.")
      return
    }

    // Function to process narrative text and replace variables
    const processNarrativeText = (text) => {
      if (!text) return "";
      let processedText = text;
      
      // Replace {{variableName}} with JavaScript template for dynamic replacement
      caseStudy.variables.forEach(variable => {
        const regex = new RegExp(`\\{\\{${variable.name}\\}\\}`, 'g');
        processedText = processedText.replace(regex, `<span class="variable-value" data-variable="${variable.name}">{{${variable.name}}}</span>`);
      });
      
      return processedText;
    };

    const generateInteractiveElementHTML = (element) => {
      switch (element.type) {
        case "textInput":
          return `
          <div class="interactive-element">
            <h4>${element.title}</h4>
            <p>${element.description}</p>
            <input type="text" id="${element.id}" data-variable="${element.variableName}" 
                   placeholder="${(element.config.placeholder || "").replace(/"/g, '&quot;')}" 
                   maxlength="${element.config.maxLength || 255}"
                   onchange="updateVariable('${element.variableName}', this.value)"
                   class="form-input">
          </div>`

        case "numberInput":
          return `
          <div class="interactive-element">
            <h4>${element.title}</h4>
            <p>${element.description}</p>
            <input type="number" id="${element.id}" data-variable="${element.variableName}"
                   min="${element.config.min || 0}" max="${element.config.max || 1000}"
                   step="${element.config.step || 1}"
                   placeholder="${(element.config.placeholder || "").replace(/"/g, '&quot;')}"
                   onchange="updateVariable('${element.variableName}', parseFloat(this.value))"
                   class="form-input">
          </div>`

        case "dropdown":
          return `
          <div class="interactive-element">
            <h4>${element.title}</h4>
            <p>${element.description}</p>
            <select id="${element.id}" data-variable="${element.variableName}"
                    onchange="updateVariable('${element.variableName}', this.value)"
                    class="form-select">
              <option value="">${(element.config.placeholder || "Select an option...").replace(/"/g, '&quot;')}</option>
              ${
                element.config.options
                  ?.map(
                    (opt) => `
                <option value="${opt.value.replace(/"/g, '&quot;')}">${opt.label.replace(/"/g, '&quot;')}</option>
              `,
                  )
                  .join("") || ""
              }
            </select>
          </div>`

        case "slider":
          return `
          <div class="interactive-element">
            <h4>${element.title}</h4>
            <p>${element.description}</p>
            <div class="slider-container">
              <input type="range" id="${element.id}" data-variable="${element.variableName}"
                     min="${element.config.min || 0}" max="${element.config.max || 100}"
                     value="${element.config.defaultValue || 50}"
                     step="${element.config.step || 1}"
                     oninput="updateSliderVariable('${element.variableName}', this.value, '${element.config.unit || ""}')"
                     class="slider">
              <div class="slider-value" id="${element.id}_display">
                ${element.config.defaultValue || 50}${element.config.unit || ""}
              </div>
            </div>
          </div>`

        default:
          return `
          <div class="interactive-element">
            <h4>${element.title}</h4>
            <p>${element.description}</p>
            <div class="element-placeholder">Interactive element: ${element.type}</div>
          </div>`
      }
    }


    const generateLevelHTML = (level, index) => {
      return `
      <div class="level ${index === 0 ? "active" : ""}" data-id="${level.id}" data-index="${index}">
        <h2>${level.title}</h2>
        <div class="level-content">
          <div class="narrative-content">${processNarrativeText(level.content.narrative || "")}</div>
          
          ${level.content.interactiveElements?.map((element) => generateInteractiveElementHTML(element)).join("") || ""}
          
          <div class="choices">
            ${
              level.content.choices
                ?.map(
                  (choice, idx) => {
                    // Safely encode the choice data
                    const choiceData = {
                      id: choice.id,
                      variableChanges: choice.variableChanges || {},
                      nextLevel: choice.nextLevel || "",
                      points: choice.points || 0
                    };
                    
                    // Double encode to be safe
                    const encodedChoiceData = encodeURIComponent(JSON.stringify(choiceData));
                    
                    return `
              <button class="choice-btn" 
                      data-choice="${encodedChoiceData}"
                      onclick="handleChoiceClick(this)">
                ${choice.text.replace(/"/g, '&quot;')}
              </button>
            `;
                  }
                )
                .join("") || ""
            }
          </div>
        </div>
      </div>`
    }

    const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${caseStudy.title}</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
            background: linear-gradient(135deg, #ffeaa7 0%, #fab1a0 25%, #fd79a8 50%, #e17055 75%, #a29bfe 100%);
            background-attachment: fixed;
            min-height: 100vh;
            color: #333;
        }

        /* Header - Exact match to your reference */
        .header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 80px;
            background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 20%, #90caf9 40%, #64b5f6 65%, #42a5f5 85%, #f48fb1 100%);
            box-shadow: 0 4px 20px rgba(179, 229, 252, 0.3);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 30px;
            color: white;
            backdrop-filter: blur(10px);
            border-bottom: 2px solid rgba(255, 255, 255, 0.2);
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
        }

        .header-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            max-width: 1400px;
            margin: 0 auto;
        }

        /* Logo section - Plain design */
        .header-logo-section {
            flex: 0 0 auto;
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .header-logo {
            height: 50px;
            width: auto;
            object-fit: contain;
        }

        .logo-text {
            font-weight: bold;
            font-size: 16px;
            color: #000000;
            line-height: 1.2;
        }

        /* Title section - Elegant typography */
        .header-center {
            flex: 1;
            text-align: center;
            margin: 0 20px;
        }

        .header-title {
            margin: 0;
            font-size: 30px;
            font-weight: bold;
            letter-spacing: 0.8px;
            color: #000000;
        }

        .header-subtitle {
            margin: 6px 0 0 0;
            font-size: 20px;
            font-weight: bold;
            color: #000000;
            letter-spacing: 0.3px;
        }

        /* Course info section */
        .header-course {
            flex: 0 0 auto;
            text-align: right;
            min-width: 200px;
            padding: 12px 16px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
        }

        .course-name {
            font-size: 13px;
            font-weight: bold;
            color: #000000;
            line-height: 1.3;
        }

        .course-code {
            font-size: 15px;
            margin-bottom: 4px;
            color: #000000;
            letter-spacing: 1.2px;
        }

        /* Progress tracker - Higher z-index */
        .progress-container {
            position: fixed;
            bottom: 25px;
            right: 25px;
            z-index: 10001;
        }

        .progress-circle {
            background: linear-gradient(135deg, #74b9ff 0%, #0984e3 50%, #a29bfe 100%);
            color: white;
            padding: 16px 20px;
            border-radius: 30px;
            font-size: 16px;
            font-weight: bold;
            box-shadow: 0 8px 25px rgba(116, 185, 255, 0.4);
            backdrop-filter: blur(15px);
            border: 2px solid rgba(255, 255, 255, 0.4);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            user-select: none;
            transform: translateY(0);
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
        }

        .progress-circle:hover {
            background: linear-gradient(135deg, #0984e3 0%, #74b9ff 50%, #fd79a8 100%);
            transform: translateY(-4px);
            box-shadow: 0 12px 35px rgba(116, 185, 255, 0.6);
            border-color: rgba(255, 255, 255, 0.6);
        }

        /* Main content adjustment */
        .container {
            max-width: 900px;
            margin: 100px auto 40px auto;
            padding: 40px 20px;
            position: relative;
            background: linear-gradient(135deg, 
                rgba(255, 255, 255, 0.98) 0%, 
                rgba(241, 242, 246, 0.98) 25%, 
                rgba(220, 221, 225, 0.98) 50%, 
                rgba(241, 242, 246, 0.98) 75%, 
                rgba(255, 255, 255, 0.98) 100%);
            min-height: calc(100vh - 100px);
            backdrop-filter: blur(5px);
            border-radius: 20px;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.95);
            color: #000000;
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
        }

        /* Level styling */
        .level {
            display: none;
            position: relative;
            max-width: 850px;
            margin: 20px auto;
            padding: 25px 35px;
            line-height: 1.7;
            background: rgba(255, 255, 255, 0.99);
            border-radius: 20px;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            animation: fadeInUp 0.6s ease-out;
        }

        .level.active {
            display: block;
        }

        .level h2 {
            color: #000000;
            margin-top: 0;
            margin-bottom: 20px;
            font-weight: bold;
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
            font-size: 28px;
        }

        .level-content p {
            color: #000000;
            margin-bottom: 16px;
            font-size: 16px;
            line-height: 1.7;
            font-weight: normal;
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
        }

        .narrative-content {
            color: #000000;
            margin-bottom: 25px;
            font-size: 16px;
            line-height: 1.7;
            font-weight: normal;
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
        }

       
        /* Interactive Elements */
        .interactive-element {
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 15px;
            padding: 25px;
            margin: 25px 0;
            transition: all 0.3s ease;
        }

        .interactive-element:hover {
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        .interactive-element h4 {
            color: #495057;
            margin-bottom: 15px;
            font-size: 1.3em;
            font-weight: 600;
        }

        .form-input, .form-select {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid #dee2e6;
            border-radius: 10px;
            font-size: 1em;
            margin-top: 10px;
            transition: all 0.3s ease;
            background: white;
            color: #000000;
        }

        .form-input:focus, .form-select:focus {
            outline: none;
            border-color: #007bff;
            box-shadow: 0 0 0 3px rgba(0,123,255,0.1);
        }

        /* Links styling - Pastel buttons with black text */
        .choices {
            margin: 30px 0;
        }

        .choice-btn {
            color: #000000;
            text-decoration: none;
            font-weight: bold;
            font-size: 15px;
            padding: 12px 20px;
            border-radius: 12px;
            background: linear-gradient(135deg, rgba(108, 92, 231, 0.15) 0%, rgba(162, 155, 254, 0.15) 100%);
            display: block;
            width: 100%;
            margin: 6px 0;
            transition: all 0.3s ease;
            border: 2px solid rgba(108, 92, 231, 0.3);
            box-shadow: 0 4px 15px rgba(108, 92, 231, 0.2);
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
            cursor: pointer;
            text-align: left;
        }

        .choice-btn:hover:not(:disabled) {
            background: linear-gradient(135deg, rgba(95, 61, 196, 0.25) 0%, rgba(253, 121, 168, 0.25) 100%);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(108, 92, 231, 0.3);
            border-color: rgba(108, 92, 231, 0.5);
            color: #000000;
        }

        .choice-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }

        /* Navigation */
        .navigation {
            display: flex;
            justify-content: space-between;
            margin-top: 40px;
            padding: 20px 0;
        }

        .nav-btn {
            padding: 12px 24px;
            border: none;
            border-radius: 10px;
            font-size: 1em;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .nav-btn.prev {
            background: #6c757d;
            color: white;
        }

        .nav-btn.next {
            background: #28a745;
            color: white;
        }

        .nav-btn:disabled {
            background: #ccc;
            cursor: not-allowed;
        }

        .nav-btn:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }

        /* Slider Styling */
        .slider-container {
            margin-top: 15px;
            padding: 15px;
            background: white;
            border-radius: 10px;
            border: 1px solid #dee2e6;
        }

        .slider {
            width: 100%;
            height: 8px;
            border-radius: 4px;
            background: #e9ecef;
            outline: none;
            margin: 15px 0;
            cursor: pointer;
            -webkit-appearance: none;
        }

        .slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: #007bff;
            cursor: pointer;
            box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }

        .slider-value {
            text-align: center;
            font-size: 1.2em;
            font-weight: bold;
            color: #007bff;
            margin-top: 10px;
            padding: 8px;
            background: #f8f9fa;
            border-radius: 6px;
        }

        /* Text styling - Black text for maximum readability */
        h1, h2, h3, h4, h5, h6 {
            color: #000000;
            margin-top: 0;
            margin-bottom: 20px;
            font-weight: bold;
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
        }

        p {
            color: #000000;
            margin-bottom: 16px;
            font-size: 16px;
            line-height: 1.7;
            font-weight: normal;
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
        }

        strong, b {
            color: #000000;
            font-weight: bold;
        }

        em, i {
            color: #000000;
            font-style: italic;
        }

        /* Beautiful scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
        }

        ::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
        }

        ::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #74b9ff 0%, #a29bfe 100%);
            border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, #0984e3 0%, #6c5ce7 100%);
        }

        /* Responsive design */
        @media (max-width: 768px) {
            .header {
                height: 70px;
                padding: 0 15px;
            }
            
            .header-content {
                flex-direction: column;
                justify-content: center;
                gap: 5px;
            }
            
            .header-logo {
                height: 40px;
            }
            
            .header-title {
                font-size: 18px;
            }
            
            .header-subtitle {
                font-size: 14px;
            }
            
            .header-course {
                min-width: 150px;
                padding: 8px 12px;
                text-align: center;
            }
            
            .course-code {
                font-size: 13px;
            }
            
            .course-name {
                font-size: 11px;
            }
            
            .progress-circle {
                bottom: 20px;
                right: 20px;
                padding: 12px 16px;
                font-size: 14px;
            }
            
            .container {
                margin-top: 90px;
                padding: 20px 15px;
            }
            
            .level {
                padding: 20px 25px;
                margin: 0 15px 20px 15px;
            }
        }

        @media (max-width: 480px) {
            .header {
                height: 65px;
                padding: 0 12px;
            }
            
            .header-center {
                margin: 0 10px;
            }
            
            .header-title {
                font-size: 16px;
            }
            
            .header-subtitle {
                font-size: 12px;
            }
            
            .header-course {
                min-width: 120px;
                padding: 6px 10px;
            }
            
            .progress-circle {
                bottom: 15px;
                right: 15px;
                padding: 10px 14px;
                font-size: 13px;
            }
            
            .container {
                margin-top: 80px;
                padding: 15px 10px;
            }
            
            .level {
                padding: 20px;
                margin: 0 10px 15px 10px;
            }
        }

        /* Beautiful animations */
        .header {
            animation: slideInDown 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .progress-circle {
            animation: bounceInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both;
        }

        .level {
            animation: fadeInUp 0.6s ease-out;
        }

        @keyframes slideInDown {
            from {
                opacity: 0;
                transform: translateY(-30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes bounceInUp {
            from {
                opacity: 0;
                transform: translateY(50px) scale(0.8);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    </style>
</head>
<body>
    <!-- Header -->
    <div class="header">
        <div class="header-content">
            <div class="header-logo-section">
                <img src="jainlogo.png" alt="Jain University Logo" class="header-logo">
            </div>
            <div class="header-center">
                <h3 class="header-title">Online Mini Case Study</h3>
                <h4 class="header-subtitle">${caseStudy.title || "Interactive Learning Experience"}</h4>
            </div>
            <div class="header-course">
                <div class="course-name">${caseStudy.course || "COURSE NAME"}</div>
                <div class="course-code">${caseStudy.courseCode || "COURSE CODE"}</div>
            </div>
        </div>
    </div>

    <!-- Progress Circle -->
    <div class="progress-container">
        <div class="progress-circle" id="progressCircle">0%</div>
    </div>

    <div class="container">
        ${caseStudy.levels.map((level, index) => generateLevelHTML(level, index)).join("")}
        
        <div class="navigation">
            <button class="nav-btn prev" id="prevBtn" onclick="previousLevel()" disabled>
                ← Previous
            </button>
            <button class="nav-btn next" id="nextBtn" onclick="nextLevel()">
                Next →
            </button>
        </div>
    </div>

    <script>
        let gameState = {
            currentLevelIndex: 0,
            variables: {},
            levelHistory: [],
            totalLevels: ${caseStudy.levels.length},
            startTime: Date.now(),
            interactions: 0,
            levelMap: {}
        };
        
        // Create level mapping
        const levels = document.querySelectorAll('.level');
        levels.forEach((level, index) => {
            const levelId = level.getAttribute('data-id');
            gameState.levelMap[levelId] = index;
        });
        
        // Initialize variables
        ${JSON.stringify(caseStudy.variables)}.forEach(variable => {
            gameState.variables[variable.name] = variable.defaultValue;
        });
        
        function updateVariable(variableName, value) {
            if (variableName) {
                gameState.variables[variableName] = value;
                gameState.interactions++;
                updateVariableDisplay(variableName, value);
                console.log('Variable updated:', variableName, '=', value);
            }
        }
        
        function updateVariableDisplay(variableName, value) {
            const variableElements = document.querySelectorAll('[data-variable="' + variableName + '"]');
            variableElements.forEach(element => {
                if (element.classList.contains('variable-value')) {
                    element.textContent = value !== undefined && value !== null ? value : variableName;
                }
            });
        }
        
        function initializeVariableDisplays() {
            Object.entries(gameState.variables).forEach(([varName, varValue]) => {
                updateVariableDisplay(varName, varValue);
            });
        }
        
        function updateSliderVariable(variableName, value, unit) {
            updateVariable(variableName, parseFloat(value));
            const variableElements = document.querySelectorAll('[data-variable="' + variableName + '"]');
            variableElements.forEach(element => {
                if (element.nextElementSibling && element.nextElementSibling.classList.contains('slider-value')) {
                    element.nextElementSibling.textContent = value + unit;
                }
            });
        }
        
        function updateProgress() {
            const progress = Math.round(((gameState.currentLevelIndex + 1) / gameState.totalLevels) * 100);
            document.getElementById('progressCircle').textContent = progress + '%';
        }
        
        function handleChoiceClick(buttonElement) {
            try {
                const encodedData = buttonElement.getAttribute('data-choice');
                const choiceData = JSON.parse(decodeURIComponent(encodedData));
                
                console.log('Choice clicked:', choiceData);
                
                Object.entries(choiceData.variableChanges).forEach(([varName, varValue]) => {
                    gameState.variables[varName] = varValue;
                    updateVariable(varName, varValue);
                });
                
                gameState.levelHistory.push({
                    levelIndex: gameState.currentLevelIndex,
                    choiceId: choiceData.id,
                    variables: {...gameState.variables},
                    timestamp: Date.now()
                });
                
                buttonElement.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
                buttonElement.innerHTML += ' ✓';
                buttonElement.disabled = true;
                
                const currentLevel = buttonElement.closest('.level');
                const allChoiceBtns = currentLevel.querySelectorAll('.choice-btn');
                allChoiceBtns.forEach(btn => {
                    if (btn !== buttonElement) {
                        btn.style.opacity = '0.5';
                        btn.disabled = true;
                    }
                });
                
                setTimeout(() => {
                    if (choiceData.nextLevel && choiceData.nextLevel !== "") {
                        console.log('Navigating to level:', choiceData.nextLevel);
                        
                        const targetIndex = gameState.levelMap[choiceData.nextLevel];
                        
                        if (targetIndex !== undefined) {
                            console.log('Found target level at index:', targetIndex);
                            gameState.currentLevelIndex = targetIndex;
                            showLevel(gameState.currentLevelIndex);
                            return;
                        } else {
                            console.warn('Level not found:', choiceData.nextLevel, 'Available levels:', Object.keys(gameState.levelMap));
                        }
                    }
                    
                    nextLevel();
                }, 1500);
                
            } catch (error) {
                console.error('Error handling choice click:', error);
                alert('Error processing choice. Please try again.');
            }
        }
        
        function showLevel(index) {
            const levels = document.querySelectorAll('.level');
            levels.forEach(level => level.classList.remove('active'));
            
            if (levels[index]) {
                levels[index].classList.add('active');
                gameState.currentLevelIndex = index;
                
                document.getElementById('prevBtn').disabled = index === 0;
                document.getElementById('nextBtn').disabled = index === levels.length - 1;
                
                updateProgress();
                
                setTimeout(initializeVariableDisplays, 100);
                
                const choiceBtns = levels[index].querySelectorAll('.choice-btn');
                choiceBtns.forEach(btn => {
                    btn.disabled = false;
                    btn.style.opacity = '1';
                    btn.innerHTML = btn.innerHTML.replace(' ✓', '');
                    btn.style.background = 'linear-gradient(135deg, rgba(108, 92, 231, 0.15) 0%, rgba(162, 155, 254, 0.15) 100%)';
                });
                
                window.scrollTo(0, 0);
                
                console.log('Showing level:', index, 'ID:', levels[index].getAttribute('data-id'));
            }
        }
        
        function nextLevel() {
            if (gameState.currentLevelIndex < gameState.totalLevels - 1) {
                showLevel(gameState.currentLevelIndex + 1);
            } else {
                const timeSpent = Math.round((Date.now() - gameState.startTime) / 1000 / 60);
                const pathTaken = gameState.levelHistory.map(h => h.choiceId).join(' → ');
                
                alert('🎉 Case Study Complete!\\n\\n⏱️ Time: ' + timeSpent + ' minutes\\n🎯 Interactions: ' + gameState.interactions + '\\n📊 Final Variables: ' + Object.entries(gameState.variables).map(([k,v]) => k + ': ' + v).join(', ') + '\\n🛤️ Path: ' + pathTaken + '\\n\\nThank you for completing this interactive case study!');
            }
        }
        
        function previousLevel() {
            if (gameState.currentLevelIndex > 0) {
                showLevel(gameState.currentLevelIndex - 1);
            }
        }
        
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Case study loaded with', gameState.totalLevels, 'levels');
            console.log('Level mapping:', gameState.levelMap);
            
            showLevel(0);
            
            setTimeout(initializeVariableDisplays, 200);
            
            document.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowRight' && !document.getElementById('nextBtn').disabled) {
                    nextLevel();
                } else if (e.key === 'ArrowLeft' && !document.getElementById('prevBtn').disabled) {
                    previousLevel();
                }
            });
            
            setTimeout(() => {
                const firstLevel = document.querySelector('.level.active');
                if (firstLevel) {
                    const choices = firstLevel.querySelectorAll('.choice-btn');
                    console.log('First level has', choices.length, 'choices');
                }
            }, 500);
        });
    </script>
</body>
</html>`;

    try {
      const blob = new Blob([htmlTemplate], { type: "text/html" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${(caseStudy.title || "CaseStudy").replace(/\s+/g, "_")}_Interactive.html`
      a.click()
      URL.revokeObjectURL(url)

      alert(
        '✅ Interactive case study HTML generated successfully!\\n\\n📝 Note: Make sure to place "jainlogo.png" in the same folder as the generated HTML file for the logo to display properly.',
      )
    } catch (error) {
      console.error("Error generating HTML:", error)
      alert("❌ Error generating HTML file. Please try again.")
    }
  }
  // Modal Components
  const VariableManagerModal = () => {
    if (!showVariableManager) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 max-w-4xl mx-4 w-full max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Variable Manager</h3>
            <div className="flex gap-2">
              <button
                onClick={() => generateContentWithLLM("variables", caseStudy)}
                className="flex items-center gap-2 px-3 py-1 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm"
                disabled={isLLMAssisting}
              >
                <Brain size={16} />
                {isLLMAssisting && llmContext === "variables" ? "Generating..." : "AI Suggest"}
              </button>
              <button
                onClick={addVariable}
                className="flex items-center gap-2 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
              >
                <Plus size={16} />
                Add Variable
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {caseStudy.variables.map((variable) => (
              <div key={variable.id} className="border border-gray-200 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Variable Name</label>
                    <input
                      type="text"
                      value={variable.name}
                      onChange={(e) => updateVariable(variable.id, { name: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., budget, teamSize"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      value={variable.type}
                      onChange={(e) => updateVariable(variable.id, { type: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="text">Text</option>
                      <option value="number">Number</option>
                      <option value="boolean">Boolean</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Default Value</label>
                    <input
                      type="text"
                      value={variable.defaultValue}
                      onChange={(e) => updateVariable(variable.id, { defaultValue: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Initial value"
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      onClick={() => deleteVariable(variable.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <input
                    type="text"
                    value={variable.description}
                    onChange={(e) => updateVariable(variable.id, { description: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Describe what this variable represents"
                  />
                </div>
              </div>
            ))}

            {caseStudy.variables.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Variable size={32} className="mx-auto mb-2 text-gray-300" />
                <p>No variables defined yet</p>
                <p className="text-sm">Variables allow data to flow between levels</p>
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setShowVariableManager(false)}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    )
  }

  const ApiSettingsModal = () => {
    if (!showApiSettings) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 max-w-md mx-4 w-full max-h-[80vh] overflow-y-auto">
          <h3 className="text-xl font-bold text-gray-800 mb-4">AI API Configuration</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">AI Provider</label>
              <select
                value={apiProvider}
                onChange={(e) => setApiProvider(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="gemini">Google Gemini 2.0 Flash (Recommended)</option>
                <option value="openai">OpenAI (GPT-4)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your API key"
              />
            </div>

            <div className="text-sm text-gray-600 space-y-3">
              <p className="font-medium">🔐 Your API key is stored locally and never shared.</p>

              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="font-medium mb-2">Where to get API keys:</p>

                {apiProvider === "gemini" && (
                  <div>
                    <p className="mb-1">
                      🟡 <strong>Google Gemini 2.0:</strong>
                    </p>
                    <p>
                      • Visit: <span className="font-mono bg-blue-100 px-1 rounded">ai.google.dev</span>
                    </p>
                    <p>• Sign in with Google account</p>
                    <p>• Get API key from console</p>
                    <p>
                      • <span className="text-green-600 font-medium">✨ Free tier available!</span>
                    </p>
                  </div>
                )}

                {apiProvider === "openai" && (
                  <div>
                    <p className="mb-1">
                      🟢 <strong>OpenAI GPT-4:</strong>
                    </p>
                    <p>
                      • Visit: <span className="font-mono bg-blue-100 px-1 rounded">platform.openai.com</span>
                    </p>
                    <p>• Go to API Keys section</p>
                    <p>• Create new secret key</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={saveApiSettings}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              disabled={!apiKey.trim()}
            >
              Save Settings
            </button>
            <button
              onClick={() => setShowApiSettings(false)}
              className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  }

  // LLM Suggestion Modal
  const LLMSuggestionModal = () => {
    if (!llmSuggestion || isLLMAssisting) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 max-w-4xl mx-4 w-full max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">AI Suggestion</h3>
            <button
              onClick={() => {
                setLLMSuggestion("")
                setLLMContext("")
              }}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mb-4">
            <div className="text-sm text-gray-600 mb-2">
              Generated content for: <strong>{llmContext}</strong>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border max-h-60 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm">{llmSuggestion}</pre>
            </div>
          </div>

          {llmError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="text-red-800 text-sm">{llmError}</div>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={applyLLMSuggestion}
              className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Apply Suggestion
            </button>
            <button
              onClick={() => {
                setLLMSuggestion("")
                setLLMContext("")
              }}
              className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Discard
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Render Functions
  const renderOverview = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Case Study Setup</h2>
          <div className="flex gap-2">
            <button
              onClick={() => generateContentWithLLM("level_structure", caseStudy)}
              className="flex items-center gap-2 px-3 py-1 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm"
              disabled={isLLMAssisting}
            >
              <Brain size={16} />
              {isLLMAssisting && llmContext === "level_structure" ? "Generating..." : "AI Build Levels"}
            </button>
            <button
              onClick={() => setShowVariableManager(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
            >
              <Variable size={18} />
              Variables ({caseStudy.variables.length})
            </button>
            <button
              onClick={() => setShowApiSettings(true)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              <Settings size={18} />
              AI Settings {!apiKey && "⚡"}
            </button>
            <button
              onClick={() => setPreviewMode(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Eye size={18} />
              Preview
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Case Study Title *</label>
            <input
              type="text"
              value={caseStudy.title}
              onChange={(e) => setCaseStudy((prev) => ({ ...prev, title: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter case study title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Course Name *</label>
            <input
              type="text"
              value={caseStudy.course}
              onChange={(e) => setCaseStudy((prev) => ({ ...prev, course: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Strategic Management, Financial Analysis"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Course Code</label>
            <input
              type="text"
              value={caseStudy.courseCode}
              onChange={(e) => setCaseStudy((prev) => ({ ...prev, courseCode: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 24SMG101, BUS501"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">University/Institution</label>
            <input
              type="text"
              value={caseStudy.university}
              onChange={(e) => setCaseStudy((prev) => ({ ...prev, university: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your institution name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
            <select
              value={caseStudy.difficulty}
              onChange={(e) => setCaseStudy((prev) => ({ ...prev, difficulty: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="beginner">Beginner (Undergraduate)</option>
              <option value="intermediate">Intermediate (Advanced UG/Graduate)</option>
              <option value="advanced">Advanced (Master's/PhD)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Time (minutes)</label>
            <input
              type="number"
              value={caseStudy.estimatedTime}
              onChange={(e) =>
                setCaseStudy((prev) => ({ ...prev, estimatedTime: Number.parseInt(e.target.value) || 30 }))
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="15"
              max="300"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={caseStudy.description}
            onChange={(e) => setCaseStudy((prev) => ({ ...prev, description: e.target.value }))}
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Describe what students will learn and the scenario they'll explore..."
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Visual Theme</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {themes.map((theme) => (
              <div
                key={theme.id}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  caseStudy.theme === theme.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"
                }`}
                onClick={() => setCaseStudy((prev) => ({ ...prev, theme: theme.id }))}
              >
                <div className="h-8 rounded mb-2" style={{ background: theme.preview }} />
                <p className="text-sm font-medium text-center">{theme.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">Learning Objectives</h3>
          <button
            onClick={() => generateContentWithLLM("objectives", caseStudy)}
            className="flex items-center gap-2 px-3 py-1 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm"
            disabled={isLLMAssisting}
          >
            <Wand2 size={16} />
            {isLLMAssisting && llmContext === "objectives" ? "Generating..." : "AI Suggest"}
          </button>
        </div>

        <div className="space-y-3">
          {caseStudy.learningObjectives.map((objective, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </span>
              <input
                type="text"
                value={objective}
                onChange={(e) => updateLearningObjective(index, e.target.value)}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter learning objective (start with action verb: Analyze, Evaluate, Create...)"
              />
              <button
                onClick={() => deleteLearningObjective(index)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}

          <button
            onClick={addLearningObjective}
            className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors w-full justify-center"
          >
            <Plus size={18} />
            Add Learning Objective
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">Case Study Levels & Flow</h3>
          <button
            onClick={addLevel}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <Plus size={18} />
            Add Level
          </button>
        </div>

        <div className="space-y-4">
          {caseStudy.levels.map((level, index) => (
            <div key={level.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center font-bold text-blue-600">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{level.title || `Level ${index + 1}`}</h4>
                    <p className="text-sm text-gray-600">{level.description || "No description"}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {levelTypes.find((t) => t.id === level.type)?.icon}{" "}
                        {levelTypes.find((t) => t.id === level.type)?.name || level.customType}
                      </span>
                      <span className="text-xs text-gray-500">
                        {level.content.interactiveElements.length} interactive elements
                      </span>
                      <span className="text-xs text-gray-500">{level.content.choices.length} choices</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setCurrentLevel(level)
                      setCurrentView("level-editor")
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit Level"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this level?")) {
                        deleteLevel(level.id)
                      }
                    }}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Level"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {index < caseStudy.levels.length - 1 && (
                <div className="flex justify-center mt-3">
                  <ArrowRight size={20} className="text-gray-400" />
                </div>
              )}
            </div>
          ))}

          {caseStudy.levels.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <BookOpen size={48} className="mx-auto mb-4 text-gray-300" />
              <p className="text-lg mb-2">No levels created yet</p>
              <p className="text-sm">Add your first level to start building your case study</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const renderLevelEditor = () => {
    if (!currentLevel) return null

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Level Editor</h2>
            <button
              onClick={() => setCurrentView("overview")}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Back to Overview
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Level Title *</label>
              <input
                type="text"
                value={currentLevel.title}
                onChange={(e) => {
                  const updatedLevel = { ...currentLevel, title: e.target.value }
                  setCurrentLevel(updatedLevel)
                  updateLevel(currentLevel.id, { title: e.target.value })
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter level title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Level Type</label>
              <select
                value={currentLevel.type}
                onChange={(e) => {
                  const updatedLevel = { ...currentLevel, type: e.target.value }
                  setCurrentLevel(updatedLevel)
                  updateLevel(currentLevel.id, { type: e.target.value })
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {levelTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.icon} {type.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Level Description</label>
            <input
              type="text"
              value={currentLevel.description}
              onChange={(e) => {
                const updatedLevel = { ...currentLevel, description: e.target.value }
                setCurrentLevel(updatedLevel)
                updateLevel(currentLevel.id, { description: e.target.value })
              }}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Brief description of this level's purpose"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Level Narrative</h3>
            <button
              onClick={() => generateContentWithLLM("narrative", { level: currentLevel, caseStudy })}
              className="flex items-center gap-2 px-3 py-1 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm"
              disabled={isLLMAssisting}
            >
              <Brain size={16} />
              {isLLMAssisting && llmContext === "narrative" ? "Generating..." : "AI Assist"}
            </button>
          </div>

          <textarea
            value={currentLevel.content.narrative}
            onChange={(e) => {
              const updatedContent = { ...currentLevel.content, narrative: e.target.value }
              const updatedLevel = { ...currentLevel, content: updatedContent }
              setCurrentLevel(updatedLevel)
              updateLevel(currentLevel.id, { content: updatedContent })
            }}
            rows={6}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Write the story and context for this level. Reference variables using {{variableName}} syntax..."
          />

          {caseStudy.variables.length > 0 && (
            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-800 mb-2">Available Variables:</p>
              <div className="flex flex-wrap gap-2">
                {caseStudy.variables.map((variable) => (
                  <span
                    key={variable.id}
                    className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded border cursor-pointer hover:bg-blue-200"
                    onClick={() => {
                      const currentText = currentLevel.content.narrative
                      const newText = currentText + ` {{${variable.name}}}`
                      const updatedContent = { ...currentLevel.content, narrative: newText }
                      const updatedLevel = { ...currentLevel, content: updatedContent }
                      setCurrentLevel(updatedLevel)
                      updateLevel(currentLevel.id, { content: updatedContent })
                    }}
                    title={`Click to insert {{${variable.name}}}`}
                  >
                    {variable.name}
                  </span>
                ))}
              </div>
              <p className="text-xs text-blue-600 mt-1">Click to insert variables into your narrative</p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Interactive Elements</h3>
            <div className="relative">
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    addInteractiveElement(e.target.value)
                    e.target.value = ""
                  }
                }}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors cursor-pointer"
              >
                <option value="">+ Add Element</option>
                {interactiveElementTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.icon} {type.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {currentLevel.content.interactiveElements.map((element) => (
              <div key={element.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">
                      {interactiveElementTypes.find((t) => t.id === element.type)?.icon || "⚙️"}
                    </span>
                    <div>
                      <h4 className="font-medium">
                        {element.title ||
                          `${interactiveElementTypes.find((t) => t.id === element.type)?.name || "Element"}`}
                      </h4>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        Variable: {element.variableName || "None set"}
                        {element.variableName && <Link size={12} className="text-green-500" />}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingElement(editingElement === element.id ? null : element.id)}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      {editingElement === element.id ? <X size={16} /> : <Edit size={16} />}
                    </button>
                    <button
                      onClick={() => deleteInteractiveElement(element.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {editingElement === element.id && (
                  <div className="space-y-4 border-t pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Element Title</label>
                        <input
                          type="text"
                          value={element.title}
                          onChange={(e) => updateInteractiveElement(element.id, { title: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter title for this element"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Variable Name
                          <span className="text-blue-600 ml-1">
                            {caseStudy.variables.length === 0 && "(Create variables first)"}
                          </span>
                        </label>
                        <select
                          value={element.variableName || ""}
                          onChange={(e) => {
                            console.log("Variable selection changed:", e.target.value)
                            updateInteractiveElement(element.id, { variableName: e.target.value })
                          }}
                          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          disabled={caseStudy.variables.length === 0}
                        >
                          <option value="">
                            {caseStudy.variables.length === 0 ? "No variables available" : "Select variable to set..."}
                          </option>
                          {caseStudy.variables.map((variable) => (
                            <option key={variable.id} value={variable.name}>
                              {variable.name} ({variable.type})
                            </option>
                          ))}
                        </select>
                        {caseStudy.variables.length === 0 && (
                          <button
                            onClick={() => setShowVariableManager(true)}
                            className="mt-2 text-sm text-blue-600 hover:underline"
                          >
                            Create variables →
                          </button>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <input
                        type="text"
                        value={element.description}
                        onChange={(e) => updateInteractiveElement(element.id, { description: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Instructions for the student"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}

            {currentLevel.content.interactiveElements.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Target size={32} className="mx-auto mb-2 text-gray-300" />
                <p>No interactive elements yet</p>
                <p className="text-sm">Add elements to collect data and create engagement</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Level Choices & Navigation</h3>
            <div className="flex gap-2">
              <button
                onClick={() => generateContentWithLLM("choices", { level: currentLevel })}
                className="flex items-center gap-2 px-3 py-1 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm"
                disabled={isLLMAssisting}
              >
                <Brain size={16} />
                {isLLMAssisting && llmContext === "choices" ? "Generating..." : "AI Suggest"}
              </button>
              <button
                onClick={addChoice}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Plus size={18} />
                Add Choice
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {currentLevel.content.choices.map((choice, index) => (
              <div key={choice.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">Choice {index + 1}</h4>
                  <button
                    onClick={() => deleteChoice(choice.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Choice Text</label>
                    <textarea
                      value={choice.text}
                      onChange={(e) => updateChoice(choice.id, { text: e.target.value })}
                      rows={2}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="What the student sees as a choice option"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Outcome/Feedback</label>
                    <textarea
                      value={choice.outcome}
                      onChange={(e) => updateChoice(choice.id, { outcome: e.target.value })}
                      rows={2}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="What happens when student makes this choice"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Next Level</label>
                      <select
                        value={choice.nextLevel || ""}
                        onChange={(e) => updateChoice(choice.id, { nextLevel: e.target.value || null })}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Continue to next level</option>
                        {caseStudy.levels.map((level) => (
                          <option key={level.id} value={level.id}>
                            {level.title || `Level ${caseStudy.levels.indexOf(level) + 1}`}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Points</label>
                      <input
                        type="number"
                        value={choice.points || 0}
                        onChange={(e) => updateChoice(choice.id, { points: Number.parseInt(e.target.value) || 0 })}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {currentLevel.content.choices.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Users size={32} className="mx-auto mb-2 text-gray-300" />
                <p>No choices defined yet</p>
                <p className="text-sm">Add choices to create decision points and navigation</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  const renderPreview = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Case Study Preview</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setPreviewMode(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Exit Preview
            </button>
            <button
              onClick={generateHTMLExport}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              disabled={!caseStudy.title || caseStudy.levels.length === 0}
            >
              <Play size={18} />
              Generate HTML
            </button>
            <button
              onClick={exportCaseStudy}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Download size={18} />
              Export JSON
            </button>
          </div>
        </div>

        {(!caseStudy.title || !caseStudy.course || caseStudy.levels.length === 0) && (
          <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle size={20} className="text-orange-600" />
              <h4 className="font-medium text-orange-800">Preview Warnings</h4>
            </div>
            <ul className="text-sm text-orange-700 space-y-1">
              {!caseStudy.title && <li>• Missing case study title</li>}
              {!caseStudy.course && <li>• Missing course name</li>}
              {caseStudy.levels.length === 0 && <li>• No levels created yet</li>}
              {caseStudy.variables.length === 0 && <li>• Consider adding variables for data flow</li>}
            </ul>
          </div>
        )}

        <div
          className="rounded-lg p-6 border border-blue-200"
          style={{
            background: `linear-gradient(135deg, ${themes.find((t) => t.id === caseStudy.theme)?.preview || themes[0].preview} 20%, rgba(255,255,255,0.9) 100%)`,
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <img
                src="/jainlogo.png"
                alt="Jain University Logo"
                className="w-16 h-16 object-contain rounded-lg shadow-md bg-white p-2"
                onError={(e) => {
                  e.target.style.display = "none"
                }}
              />
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{caseStudy.title || "Untitled Case Study"}</h3>
                <p className="text-lg text-gray-600">{caseStudy.description || "No description provided"}</p>
                <div className="mt-2 text-sm text-gray-600">
                  <span className="font-medium">{caseStudy.course || "Course Name"}</span>
                  {caseStudy.courseCode && <span> | {caseStudy.courseCode}</span>}
                  {caseStudy.university && <span> | {caseStudy.university}</span>}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>🎯 {caseStudy.difficulty.charAt(0).toUpperCase() + caseStudy.difficulty.slice(1)}</span>
            <span>⏱️ ~{caseStudy.estimatedTime} minutes</span>
            <span>📚 {caseStudy.levels.length} levels</span>
            <span>🎓 {caseStudy.learningObjectives.length} objectives</span>
            <span>📊 {caseStudy.variables.length} variables</span>
          </div>
        </div>
      </div>

      {caseStudy.learningObjectives.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Learning Objectives</h3>
          <ul className="space-y-2">
            {caseStudy.learningObjectives.map((objective, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  {index + 1}
                </span>
                <span className="text-gray-700">{objective}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {caseStudy.variables.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Case Variables</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {caseStudy.variables.map((variable) => (
              <div key={variable.id} className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-800">{variable.name}</h4>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{variable.type}</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{variable.description}</p>
                <p className="text-xs text-gray-500">Default: {variable.defaultValue || "None"}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Export & Deploy</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={exportCaseStudy}
            className="flex items-center gap-3 p-4 border-2 border-blue-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors"
          >
            <Download size={24} className="text-blue-600" />
            <div className="text-left">
              <div className="font-medium text-gray-800">Export JSON</div>
              <div className="text-sm text-gray-600">Download case study data</div>
            </div>
          </button>

          <button
            onClick={generateHTMLExport}
            className="flex items-center gap-3 p-4 border-2 border-green-200 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors"
            disabled={!caseStudy.title || caseStudy.levels.length === 0}
          >
            <Play size={24} className="text-green-600" />
            <div className="text-left">
              <div className="font-medium text-gray-800">Generate HTML</div>
              <div className="text-sm text-gray-600">Interactive student version</div>
            </div>
          </button>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: caseStudy.title,
                  text: `Check out this interactive case study: ${caseStudy.description}`,
                  url: window.location.href,
                })
              } else {
                navigator.clipboard.writeText(JSON.stringify(caseStudy, null, 2))
                alert("Case study data copied to clipboard!")
              }
            }}
            className="flex items-center gap-3 p-4 border-2 border-purple-200 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors"
          >
            <Users size={24} className="text-purple-600" />
            <div className="text-left">
              <div className="font-medium text-gray-800">Share</div>
              <div className="text-sm text-gray-600">Share with colleagues</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )

  const renderSidebar = () => (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200 h-screen overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-md border">
            <img
              src="/jainlogo.png"
              alt="Jain University Logo"
              className="w-10 h-10 object-contain"
              onError={(e) => {
                e.target.style.display = "none"
                e.target.nextSibling.style.display = "flex"
              }}
            />
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg items-center justify-center hidden">
              <BookOpen size={20} className="text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-800">Case Builder</h1>
            <p className="text-sm text-gray-600">Interactive Authoring</p>
          </div>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => {
              setCurrentView("overview")
              setPreviewMode(false)
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
              currentView === "overview" && !previewMode
                ? "bg-blue-100 text-blue-700 border border-blue-200"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Settings size={18} />
            <span>Setup</span>
          </button>

          <button
            onClick={() => setShowVariableManager(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Variable size={18} />
            <span>Variables</span>
            <span className="ml-auto text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
              {caseStudy.variables.length}
            </span>
          </button>

          <button
            onClick={() => {
              if (currentLevel) {
                setCurrentView("level-editor")
                setPreviewMode(false)
              } else {
                alert("Please select a level to edit first")
              }
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
              currentView === "level-editor" && !previewMode
                ? "bg-blue-100 text-blue-700 border border-blue-200"
                : "text-gray-700 hover:bg-gray-100"
            } ${!currentLevel ? "opacity-50" : ""}`}
          >
            <Target size={18} />
            <span>Level Editor</span>
            {currentLevel && (
              <span className="ml-auto text-xs bg-blue-500 text-white px-2 py-1 rounded">
                {(currentLevel.title || "Level").substring(0, 8)}
              </span>
            )}
          </button>

          <button
            onClick={() => setPreviewMode(true)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
              previewMode ? "bg-green-100 text-green-700 border border-green-200" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Eye size={18} />
            <span>Preview</span>
          </button>

          <div className="border-t border-gray-200 my-4"></div>

          <button
            onClick={importCaseStudy}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Upload size={18} />
            <span>Import JSON</span>
          </button>

          <button
            onClick={exportCaseStudy}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Download size={18} />
            <span>Export JSON</span>
          </button>

          <button
            onClick={generateHTMLExport}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-gray-700 hover:bg-gray-100 transition-colors"
            disabled={!caseStudy.title || caseStudy.levels.length === 0}
          >
            <Play size={18} />
            <span>Generate HTML</span>
          </button>
        </nav>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-3">Case Study Stats</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Title:</span>
              <span className={`font-medium ${caseStudy.title ? "text-green-600" : "text-red-500"}`}>
                {caseStudy.title ? "✓" : "✗"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Course:</span>
              <span className={`font-medium ${caseStudy.course ? "text-green-600" : "text-red-500"}`}>
                {caseStudy.course ? "✓" : "✗"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Levels:</span>
              <span className="font-medium">{caseStudy.levels.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Variables:</span>
              <span className="font-medium">{caseStudy.variables.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Interactive Elements:</span>
              <span className="font-medium">
                {caseStudy.levels.reduce((sum, level) => sum + level.content.interactiveElements.length, 0)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Decision Points:</span>
              <span className="font-medium">
                {caseStudy.levels.reduce((sum, level) => sum + level.content.choices.length, 0)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Objectives:</span>
              <span className="font-medium">{caseStudy.learningObjectives.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">AI Provider:</span>
              <span className="font-medium capitalize">
                {apiKey ? (
                  <span className="text-green-600">{apiProvider === "gemini" ? "🟡" : "🟢"} ✓</span>
                ) : (
                  <span className="text-gray-400">✗</span>
                )}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <h3 className="font-medium text-gray-800 mb-3">Quick Actions</h3>
          <button
            onClick={() => {
              if (confirm("Create a new case study? Current work will be lost.")) {
                setCaseStudy({
                  id: "case_" + Date.now(),
                  title: "",
                  description: "",
                  course: "",
                  courseCode: "",
                  university: "",
                  difficulty: "intermediate",
                  estimatedTime: 30,
                  learningObjectives: [],
                  levels: [],
                  variables: [],
                  theme: "modern",
                })
                setCurrentLevel(null)
                setCurrentView("overview")
                setPreviewMode(false)
              }
            }}
            className="w-full px-3 py-2 text-sm bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
          >
            New Case Study
          </button>

          <button
            onClick={() => {
              const stats = {
                levels: caseStudy.levels.length,
                variables: caseStudy.variables.length,
                elements: caseStudy.levels.reduce((sum, level) => sum + level.content.interactiveElements.length, 0),
                choices: caseStudy.levels.reduce((sum, level) => sum + level.content.choices.length, 0),
                objectives: caseStudy.learningObjectives.length,
              }

              const readiness = []
              if (caseStudy.title) readiness.push("✓ Title set")
              if (caseStudy.course) readiness.push("✓ Course set")
              if (stats.levels > 0) readiness.push("✓ Has levels")
              if (stats.variables > 0) readiness.push("✓ Has variables")
              if (stats.elements > 0) readiness.push("✓ Has interactive elements")

              alert(`Case Study Analysis:

📊 Statistics:
• ${stats.levels} Levels
• ${stats.variables} Variables  
• ${stats.elements} Interactive Elements
• ${stats.choices} Decision Points
• ${stats.objectives} Learning Objectives

⏱️ Estimated Time: ${caseStudy.estimatedTime} minutes

🎯 Readiness:
${readiness.length > 0 ? readiness.join("\n") : "• No key components ready"}

${readiness.length >= 3 ? "✅ Ready to export!" : "⚠️ Consider adding more content"}`)
            }}
            className="w-full px-3 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Analyze Readiness
          </button>
        </div>
      </div>
    </div>
  )

  // Main Render
  return (
    <div className="flex h-screen bg-gray-50">
      {renderSidebar()}

      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {previewMode ? renderPreview() : currentView === "level-editor" ? renderLevelEditor() : renderOverview()}
        </div>

        {isLLMAssisting && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-md mx-4 text-center">
              <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">AI Assistant Working</h3>
              <p className="text-gray-600">
                Generating {llmContext} suggestions for your {caseStudy.course || "case study"}...
              </p>
            </div>
          </div>
        )}
      </div>

      <VariableManagerModal />
      <ApiSettingsModal />
      <LLMSuggestionModal />
    </div>
  )
}

export default CaseStudyAuthoringTool;
