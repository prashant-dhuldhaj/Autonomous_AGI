import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";

export function CognitiveControls() {
  const [analysisInput, setAnalysisInput] = useState("");
  
  const startThinking = useMutation(api.agi.startThinking);
  const startLearning = useMutation(api.agi.startLearning);
  const startTheorizing = useMutation(api.agi.startTheorizing);
  const toggleAutonomous = useMutation(api.agi.toggleAutonomousMode);
  const deepAnalysis = useMutation(api.agi.deepAnalysis);

  const handleDeepAnalysis = () => {
    if (analysisInput.trim()) {
      deepAnalysis({ topic: analysisInput.trim() });
      setAnalysisInput("");
    }
  };

  return (
    <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-purple-500/30 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-purple-200 font-semibold">Cognitive Controls</h3>
          <div className="flex gap-2">
            <button
              onClick={() => startThinking()}
              className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg border border-blue-500/30 hover:bg-blue-500/30 transition-all flex items-center gap-2"
            >
              🤔 Think
            </button>
            <button
              onClick={() => startLearning()}
              className="px-4 py-2 bg-green-500/20 text-green-300 rounded-lg border border-green-500/30 hover:bg-green-500/30 transition-all flex items-center gap-2"
            >
              📖 Learn
            </button>
            <button
              onClick={() => startTheorizing()}
              className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-lg border border-purple-500/30 hover:bg-purple-500/30 transition-all flex items-center gap-2"
            >
              🔬 Theorize
            </button>
            <button
              onClick={() => toggleAutonomous()}
              className="px-4 py-2 bg-orange-500/20 text-orange-300 rounded-lg border border-orange-500/30 hover:bg-orange-500/30 transition-all flex items-center gap-2"
            >
              🤖 Autonomous
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={analysisInput}
            onChange={(e) => setAnalysisInput(e.target.value)}
            placeholder="Topic for deep analysis..."
            className="px-3 py-2 bg-black/30 text-purple-200 rounded-lg border border-purple-500/30 focus:border-purple-400 focus:outline-none"
            onKeyPress={(e) => e.key === 'Enter' && handleDeepAnalysis()}
          />
          <button
            onClick={handleDeepAnalysis}
            disabled={!analysisInput.trim()}
            className="px-4 py-2 bg-red-500/20 text-red-300 rounded-lg border border-red-500/30 hover:bg-red-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            🔍 Analyze
          </button>
        </div>
      </div>
    </div>
  );
}
