export default function ImportInstructions() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📋 Sample Case Study Import Instructions</h1>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold text-blue-800 mb-3">🚀 How to Import the Sample Case Study</h2>
        <ol className="list-decimal list-inside space-y-2 text-blue-700">
          <li>
            Copy the JSON content from the <code>sample-case-study.json</code> file
          </li>
          <li>
            Save it as a <code>.json</code> file on your computer
          </li>
          <li>Open the Case Study Authoring Tool</li>
          <li>
            Click the <strong>"Import JSON"</strong> button in the sidebar
          </li>
          <li>Select your saved JSON file</li>
          <li>The complete case study will load with all functionalities!</li>
        </ol>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-green-800 mb-3">✅ What This Sample Includes</h3>
          <ul className="list-disc list-inside space-y-1 text-green-700 text-sm">
            <li>
              <strong>5 Complete Levels</strong> - From analysis to evaluation
            </li>
            <li>
              <strong>8 Variables</strong> - Budget, metrics, satisfaction scores
            </li>
            <li>
              <strong>15+ Interactive Elements</strong> - All types included
            </li>
            <li>
              <strong>15 Decision Choices</strong> - With variable changes
            </li>
            <li>
              <strong>6 Learning Objectives</strong> - Professional marketing goals
            </li>
            <li>
              <strong>Realistic Scenario</strong> - E-commerce marketing challenge
            </li>
          </ul>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-purple-800 mb-3">🎯 Interactive Elements Tested</h3>
          <ul className="list-disc list-inside space-y-1 text-purple-700 text-sm">
            <li>
              <strong>Text Input</strong> - Target market definition
            </li>
            <li>
              <strong>Number Input</strong> - Performance targets
            </li>
            <li>
              <strong>Text Area</strong> - Strategy descriptions
            </li>
            <li>
              <strong>Dropdown</strong> - Strategic choices
            </li>
            <li>
              <strong>Multi-Select</strong> - Campaign types
            </li>
            <li>
              <strong>Slider</strong> - Budget allocation
            </li>
            <li>
              <strong>Calculator</strong> - Budget calculations
            </li>
            <li>
              <strong>Priority Ranking</strong> - Channel priorities
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold text-yellow-800 mb-3">🎮 Case Study Flow</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 text-sm">
          <div className="bg-white p-3 rounded border">
            <div className="font-semibold text-blue-600">Level 1</div>
            <div>Market Analysis</div>
            <div className="text-xs text-gray-600">Introduction & Setup</div>
          </div>
          <div className="bg-white p-3 rounded border">
            <div className="font-semibold text-green-600">Level 2</div>
            <div>Campaign Development</div>
            <div className="text-xs text-gray-600">Strategic Planning</div>
          </div>
          <div className="bg-white p-3 rounded border">
            <div className="font-semibold text-orange-600">Level 3</div>
            <div>Execution & Monitoring</div>
            <div className="text-xs text-gray-600">Simulation</div>
          </div>
          <div className="bg-white p-3 rounded border">
            <div className="font-semibold text-red-600">Level 4</div>
            <div>Crisis Management</div>
            <div className="text-xs text-gray-600">Crisis Response</div>
          </div>
          <div className="bg-white p-3 rounded border">
            <div className="font-semibold text-purple-600">Level 5</div>
            <div>Performance Analysis</div>
            <div className="text-xs text-gray-600">Evaluation</div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">📊 Variable Tracking</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div>
            <strong>marketingBudget:</strong> $50,000 → Dynamic
          </div>
          <div>
            <strong>customerAcquisitionCost:</strong> $25 → Dynamic
          </div>
          <div>
            <strong>brandAwareness:</strong> 35% → Dynamic
          </div>
          <div>
            <strong>conversionRate:</strong> 2.5% → Dynamic
          </div>
          <div>
            <strong>competitorThreat:</strong> Medium → Dynamic
          </div>
          <div>
            <strong>customerSatisfaction:</strong> 78 → Dynamic
          </div>
          <div>
            <strong>socialMediaFollowers:</strong> 15,000
          </div>
          <div>
            <strong>emailSubscribers:</strong> 8,500
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
        <h3 className="text-lg font-semibold text-indigo-800 mb-2">🎓 Educational Value</h3>
        <p className="text-indigo-700 text-sm">
          This case study teaches digital marketing strategy, budget allocation, crisis management, and performance
          analysis through realistic business scenarios. Students make decisions that affect variables and see
          consequences, creating an engaging learning experience.
        </p>
      </div>
    </div>
  )
}
