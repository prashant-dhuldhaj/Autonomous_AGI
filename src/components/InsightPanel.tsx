interface InsightPanelProps {
  insights: any[];
}

export function InsightPanel({ insights }: InsightPanelProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "pattern": return "🔍";
      case "anomaly": return "⚠️";
      case "connection": return "🔗";
      case "breakthrough": return "💥";
      case "paradox": return "🤯";
      default: return "💡";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "pattern": return "text-blue-400 bg-blue-500/20";
      case "anomaly": return "text-red-400 bg-red-500/20";
      case "connection": return "text-green-400 bg-green-500/20";
      case "breakthrough": return "text-orange-400 bg-orange-500/20";
      case "paradox": return "text-purple-400 bg-purple-500/20";
      default: return "text-yellow-400 bg-yellow-500/20";
    }
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold text-purple-200 mb-4">Generated Insights</h2>
      
      <div className="flex-1 overflow-y-auto space-y-4">
        {insights.map((insight) => (
          <div
            key={insight._id}
            className="p-4 bg-black/20 rounded-lg border border-purple-500/20 hover:bg-purple-500/10 hover:border-purple-400/30 transition-all"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{getTypeIcon(insight.type)}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(insight.type)}`}>
                    {insight.type}
                  </span>
                  <span className="text-purple-400 text-sm">•</span>
                  <span className="text-purple-300 text-sm">{insight.domain}</span>
                  <span className="text-purple-400 text-sm">•</span>
                  <span className="text-purple-300 text-sm">
                    {new Date(insight.discoveredAt).toLocaleString()}
                  </span>
                </div>
                
                <p className="text-purple-100 leading-relaxed mb-3">{insight.content}</p>
                
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1">
                    <span className="text-purple-300 text-sm">Significance:</span>
                    <div className="w-20 h-2 bg-purple-900/50 rounded-full">
                      <div 
                        className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
                        style={{ width: `${insight.significance * 100}%` }}
                      />
                    </div>
                    <span className="text-purple-200 text-sm">{Math.round(insight.significance * 100)}%</span>
                  </div>
                </div>
                
                {insight.relatedConcepts.length > 0 && (
                  <div className="mb-3">
                    <span className="text-purple-300 text-sm">Related Concepts:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {insight.relatedConcepts.map((concept: string, index: number) => (
                        <span key={index} className="px-2 py-1 bg-purple-500/20 text-purple-200 text-xs rounded">
                          {concept}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {insight.implications.length > 0 && (
                  <div>
                    <span className="text-purple-300 text-sm">Implications:</span>
                    <ul className="mt-1 space-y-1">
                      {insight.implications.map((implication: string, index: number) => (
                        <li key={index} className="text-purple-100 text-sm flex items-start gap-2">
                          <span className="text-purple-400">→</span>
                          {implication}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {insights.length === 0 && (
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">🔍</span>
            <p className="text-purple-300">No insights generated yet</p>
            <p className="text-purple-400 text-sm">Start the AGI thinking process to generate insights</p>
          </div>
        )}
      </div>
    </div>
  );
}
