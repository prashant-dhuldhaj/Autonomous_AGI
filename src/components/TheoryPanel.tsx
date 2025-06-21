interface TheoryPanelProps {
  theories: any[];
  onSelectTheory: (theory: any) => void;
  selectedTheory: any;
}

export function TheoryPanel({ theories, onSelectTheory, selectedTheory }: TheoryPanelProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "forming": return "text-yellow-400 bg-yellow-500/20";
      case "testing": return "text-blue-400 bg-blue-500/20";
      case "validated": return "text-green-400 bg-green-500/20";
      case "refuted": return "text-red-400 bg-red-500/20";
      case "evolving": return "text-purple-400 bg-purple-500/20";
      default: return "text-gray-400 bg-gray-500/20";
    }
  };

  return (
    <div className="h-full flex gap-4">
      {/* Theory List */}
      <div className="flex-1 flex flex-col">
        <h2 className="text-2xl font-bold text-purple-200 mb-4">Generated Theories</h2>
        
        <div className="flex-1 overflow-y-auto space-y-4">
          {theories.map((theory) => (
            <div
              key={theory._id}
              onClick={() => onSelectTheory(theory)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                selectedTheory?._id === theory._id
                  ? "bg-purple-500/20 border-purple-400/50"
                  : "bg-black/20 border-purple-500/20 hover:bg-purple-500/10 hover:border-purple-400/30"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-purple-100">{theory.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(theory.status)}`}>
                  {theory.status}
                </span>
              </div>
              
              <p className="text-purple-200 mb-3">{theory.description}</p>
              
              <div className="flex items-center gap-4 text-sm">
                <span className="text-purple-300">Domain: <span className="text-purple-200">{theory.domain}</span></span>
                <span className="text-purple-400">•</span>
                <span className="text-purple-300">
                  Created: <span className="text-purple-200">{new Date(theory.createdAt).toLocaleDateString()}</span>
                </span>
              </div>
              
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1">
                  <span className="text-purple-300 text-sm">Confidence:</span>
                  <div className="w-16 h-1 bg-purple-900/50 rounded-full">
                    <div 
                      className="h-full bg-purple-400 rounded-full"
                      style={{ width: `${theory.confidence * 100}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-purple-300 text-sm">Novelty:</span>
                  <div className="w-16 h-1 bg-purple-900/50 rounded-full">
                    <div 
                      className="h-full bg-pink-400 rounded-full"
                      style={{ width: `${theory.novelty * 100}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-purple-300 text-sm">Complexity:</span>
                  <div className="w-16 h-1 bg-purple-900/50 rounded-full">
                    <div 
                      className="h-full bg-blue-400 rounded-full"
                      style={{ width: `${theory.complexity * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Theory Detail Panel */}
      {selectedTheory && (
        <div className="w-96 bg-black/30 rounded-lg border border-purple-500/30 p-4">
          <h3 className="text-lg font-semibold text-purple-200 mb-4">Theory Details</h3>
          <div className="space-y-4">
            <div>
              <label className="text-purple-300 text-sm font-medium">Title</label>
              <h4 className="text-purple-100 font-semibold mt-1">{selectedTheory.title}</h4>
            </div>
            
            <div>
              <label className="text-purple-300 text-sm font-medium">Hypothesis</label>
              <p className="text-purple-100 mt-1 text-sm">{selectedTheory.hypothesis}</p>
            </div>
            
            <div>
              <label className="text-purple-300 text-sm font-medium">Description</label>
              <p className="text-purple-100 mt-1 text-sm">{selectedTheory.description}</p>
            </div>
            
            <div>
              <label className="text-purple-300 text-sm font-medium">Evidence</label>
              <ul className="mt-1 space-y-1">
                {selectedTheory.evidence.map((item: string, index: number) => (
                  <li key={index} className="text-purple-100 text-sm flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <label className="text-purple-300 text-sm font-medium">Predictions</label>
              <ul className="mt-1 space-y-1">
                {selectedTheory.predictions.map((item: string, index: number) => (
                  <li key={index} className="text-purple-100 text-sm flex items-start gap-2">
                    <span className="text-purple-400">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <label className="text-purple-300 text-sm font-medium">Metrics</label>
              <div className="space-y-2 mt-2">
                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-300">Confidence</span>
                    <span className="text-purple-200">{Math.round(selectedTheory.confidence * 100)}%</span>
                  </div>
                  <div className="w-full h-2 bg-purple-900/50 rounded-full mt-1">
                    <div 
                      className="h-full bg-purple-400 rounded-full"
                      style={{ width: `${selectedTheory.confidence * 100}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-300">Novelty</span>
                    <span className="text-purple-200">{Math.round(selectedTheory.novelty * 100)}%</span>
                  </div>
                  <div className="w-full h-2 bg-purple-900/50 rounded-full mt-1">
                    <div 
                      className="h-full bg-pink-400 rounded-full"
                      style={{ width: `${selectedTheory.novelty * 100}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-300">Complexity</span>
                    <span className="text-purple-200">{Math.round(selectedTheory.complexity * 100)}%</span>
                  </div>
                  <div className="w-full h-2 bg-purple-900/50 rounded-full mt-1">
                    <div 
                      className="h-full bg-blue-400 rounded-full"
                      style={{ width: `${selectedTheory.complexity * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <label className="text-purple-300 text-sm font-medium">Status</label>
              <span className={`inline-block px-2 py-1 rounded-full text-xs mt-1 font-medium ${getStatusColor(selectedTheory.status)}`}>
                {selectedTheory.status}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
