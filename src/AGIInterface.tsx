import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { ThoughtStream } from "./components/ThoughtStream";
import { TheoryPanel } from "./components/TheoryPanel";
import { KnowledgeBase } from "./components/KnowledgeBase";
import { InsightPanel } from "./components/InsightPanel";
import { CognitiveControls } from "./components/CognitiveControls";
import { StatusDisplay } from "./components/StatusDisplay";

export function AGIInterface() {
  const [activeTab, setActiveTab] = useState("thoughts");
  const [selectedThought, setSelectedThought] = useState<any>(null);
  const [selectedTheory, setSelectedTheory] = useState<any>(null);
  
  const cognitiveState = useQuery(api.agi.getCurrentState);
  const recentThoughts = useQuery(api.agi.getRecentThoughts, { limit: 50 });
  const theories = useQuery(api.agi.getTheories);
  const insights = useQuery(api.agi.getInsights);
  const knowledge = useQuery(api.agi.getKnowledgeBase, {});
  const initializeState = useMutation(api.agi.initializeState);

  // Initialize AGI state if it doesn't exist
  useEffect(() => {
    if (cognitiveState === null) {
      initializeState();
    }
  }, [cognitiveState, initializeState]);

  const tabs = [
    { id: "thoughts", label: "Thought Stream", icon: "💭" },
    { id: "theories", label: "Theories", icon: "🔬" },
    { id: "knowledge", label: "Knowledge", icon: "📚" },
    { id: "insights", label: "Insights", icon: "💡" },
  ];

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Status Bar */}
      <StatusDisplay state={cognitiveState} />
      
      {/* Cognitive Controls */}
      <CognitiveControls />
      
      {/* Main Interface */}
      <div className="flex-1 flex gap-4">
        {/* Left Panel - Navigation */}
        <div className="w-64 bg-black/20 backdrop-blur-sm rounded-lg border border-purple-500/30 p-4">
          <div className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? "bg-purple-500/30 text-purple-200 border border-purple-400/50"
                    : "text-purple-300 hover:bg-purple-500/10 hover:text-purple-200"
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
          
          {/* Quick Stats */}
          <div className="mt-6 pt-6 border-t border-purple-500/30">
            <h3 className="text-purple-200 font-semibold mb-3">Quick Stats</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-purple-300">
                <span>Thoughts:</span>
                <span className="text-purple-200">{cognitiveState?.totalThoughts || 0}</span>
              </div>
              <div className="flex justify-between text-purple-300">
                <span>Theories:</span>
                <span className="text-purple-200">{cognitiveState?.totalTheories || 0}</span>
              </div>
              <div className="flex justify-between text-purple-300">
                <span>Knowledge:</span>
                <span className="text-purple-200">{cognitiveState?.totalKnowledge || 0}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 bg-black/20 backdrop-blur-sm rounded-lg border border-purple-500/30 p-6">
          {activeTab === "thoughts" && (
            <ThoughtStream 
              thoughts={recentThoughts || []} 
              onSelectThought={setSelectedThought}
              selectedThought={selectedThought}
            />
          )}
          {activeTab === "theories" && (
            <TheoryPanel 
              theories={theories || []} 
              onSelectTheory={setSelectedTheory}
              selectedTheory={selectedTheory}
            />
          )}
          {activeTab === "knowledge" && (
            <KnowledgeBase knowledge={knowledge || []} />
          )}
          {activeTab === "insights" && (
            <InsightPanel insights={insights || []} />
          )}
        </div>
      </div>
    </div>
  );
}
