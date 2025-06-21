import { useState } from "react";

interface ThoughtStreamProps {
  thoughts: any[];
  onSelectThought: (thought: any) => void;
  selectedThought: any;
}

export function ThoughtStream({ thoughts, onSelectThought, selectedThought }: ThoughtStreamProps) {
  const [filter, setFilter] = useState("all");

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "observation": return "👁️";
      case "hypothesis": return "🤔";
      case "theory": return "🔬";
      case "question": return "❓";
      case "insight": return "💡";
      case "connection": return "🔗";
      default: return "💭";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "observation": return "text-blue-400";
      case "hypothesis": return "text-yellow-400";
      case "theory": return "text-purple-400";
      case "question": return "text-green-400";
      case "insight": return "text-orange-400";
      case "connection": return "text-pink-400";
      default: return "text-gray-400";
    }
  };

  const filteredThoughts = filter === "all" 
    ? thoughts 
    : thoughts.filter(t => t.type === filter);

  return (
    <div className="h-full flex gap-4">
      {/* Thought List */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-purple-200">Thought Stream</h2>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 bg-black/30 text-purple-200 rounded-lg border border-purple-500/30 focus:border-purple-400 focus:outline-none"
          >
            <option value="all">All Thoughts</option>
            <option value="observation">Observations</option>
            <option value="hypothesis">Hypotheses</option>
            <option value="theory">Theories</option>
            <option value="question">Questions</option>
            <option value="insight">Insights</option>
            <option value="connection">Connections</option>
          </select>
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-3">
          {filteredThoughts.map((thought) => (
            <div
              key={thought._id}
              onClick={() => onSelectThought(thought)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                selectedThought?._id === thought._id
                  ? "bg-purple-500/20 border-purple-400/50"
                  : "bg-black/20 border-purple-500/20 hover:bg-purple-500/10 hover:border-purple-400/30"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl">{getTypeIcon(thought.type)}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-sm font-semibold capitalize ${getTypeColor(thought.type)}`}>
                      {thought.type}
                    </span>
                    <span className="text-purple-400 text-sm">•</span>
                    <span className="text-purple-300 text-sm">{thought.domain}</span>
                    <span className="text-purple-400 text-sm">•</span>
                    <span className="text-purple-300 text-sm">
                      {new Date(thought.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-purple-100 leading-relaxed">{thought.content}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1">
                      <span className="text-purple-300 text-sm">Confidence:</span>
                      <div className="w-16 h-1 bg-purple-900/50 rounded-full">
                        <div 
                          className="h-full bg-purple-400 rounded-full"
                          style={{ width: `${thought.confidence * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-purple-300 text-sm">Novelty:</span>
                      <div className="w-16 h-1 bg-purple-900/50 rounded-full">
                        <div 
                          className="h-full bg-pink-400 rounded-full"
                          style={{ width: `${thought.novelty * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Thought Detail Panel */}
      {selectedThought && (
        <div className="w-80 bg-black/30 rounded-lg border border-purple-500/30 p-4">
          <h3 className="text-lg font-semibold text-purple-200 mb-4">Thought Analysis</h3>
          <div className="space-y-4">
            <div>
              <label className="text-purple-300 text-sm font-medium">Type</label>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-lg">{getTypeIcon(selectedThought.type)}</span>
                <span className={`capitalize font-semibold ${getTypeColor(selectedThought.type)}`}>
                  {selectedThought.type}
                </span>
              </div>
            </div>
            
            <div>
              <label className="text-purple-300 text-sm font-medium">Domain</label>
              <p className="text-purple-100 mt-1">{selectedThought.domain}</p>
            </div>
            
            <div>
              <label className="text-purple-300 text-sm font-medium">Reasoning Process</label>
              <p className="text-purple-100 mt-1 text-sm">{selectedThought.reasoning}</p>
            </div>
            
            <div>
              <label className="text-purple-300 text-sm font-medium">Metrics</label>
              <div className="space-y-2 mt-2">
                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-300">Confidence</span>
                    <span className="text-purple-200">{Math.round(selectedThought.confidence * 100)}%</span>
                  </div>
                  <div className="w-full h-2 bg-purple-900/50 rounded-full mt-1">
                    <div 
                      className="h-full bg-purple-400 rounded-full"
                      style={{ width: `${selectedThought.confidence * 100}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-300">Complexity</span>
                    <span className="text-purple-200">{Math.round(selectedThought.complexity * 100)}%</span>
                  </div>
                  <div className="w-full h-2 bg-purple-900/50 rounded-full mt-1">
                    <div 
                      className="h-full bg-blue-400 rounded-full"
                      style={{ width: `${selectedThought.complexity * 100}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-300">Novelty</span>
                    <span className="text-purple-200">{Math.round(selectedThought.novelty * 100)}%</span>
                  </div>
                  <div className="w-full h-2 bg-purple-900/50 rounded-full mt-1">
                    <div 
                      className="h-full bg-pink-400 rounded-full"
                      style={{ width: `${selectedThought.novelty * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <label className="text-purple-300 text-sm font-medium">Status</label>
              <span className={`inline-block px-2 py-1 rounded-full text-xs mt-1 ${
                selectedThought.status === 'active' ? 'bg-green-500/20 text-green-300' :
                selectedThought.status === 'validated' ? 'bg-blue-500/20 text-blue-300' :
                selectedThought.status === 'refuted' ? 'bg-red-500/20 text-red-300' :
                'bg-yellow-500/20 text-yellow-300'
              }`}>
                {selectedThought.status}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
