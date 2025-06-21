import { useState } from "react";

interface KnowledgeBaseProps {
  knowledge: any[];
}

export function KnowledgeBase({ knowledge }: KnowledgeBaseProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("all");
  
  const domains = [...new Set(knowledge.map(k => k.domain))];
  
  const filteredKnowledge = knowledge.filter(k => {
    const matchesSearch = k.concept.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         k.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain = selectedDomain === "all" || k.domain === selectedDomain;
    return matchesSearch && matchesDomain;
  });

  const getSourceColor = (source: string) => {
    switch (source) {
      case "learned": return "text-green-400 bg-green-500/20";
      case "derived": return "text-blue-400 bg-blue-500/20";
      case "hypothesized": return "text-yellow-400 bg-yellow-500/20";
      case "observed": return "text-purple-400 bg-purple-500/20";
      default: return "text-gray-400 bg-gray-500/20";
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-purple-200">Knowledge Base</h2>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search knowledge..."
            className="px-3 py-2 bg-black/30 text-purple-200 rounded-lg border border-purple-500/30 focus:border-purple-400 focus:outline-none"
          />
          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="px-3 py-2 bg-black/30 text-purple-200 rounded-lg border border-purple-500/30 focus:border-purple-400 focus:outline-none"
          >
            <option value="all">All Domains</option>
            {domains.map(domain => (
              <option key={domain} value={domain}>{domain}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredKnowledge.map((item) => (
            <div
              key={item._id}
              className="p-4 bg-black/20 rounded-lg border border-purple-500/20 hover:bg-purple-500/10 hover:border-purple-400/30 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-purple-100">{item.concept}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSourceColor(item.source)}`}>
                  {item.source}
                </span>
              </div>
              
              <p className="text-purple-200 text-sm mb-3">{item.definition}</p>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-purple-300">Domain: <span className="text-purple-200">{item.domain}</span></span>
                <div className="flex items-center gap-1">
                  <span className="text-purple-300">Confidence:</span>
                  <div className="w-16 h-1 bg-purple-900/50 rounded-full">
                    <div 
                      className="h-full bg-purple-400 rounded-full"
                      style={{ width: `${item.confidence * 100}%` }}
                    />
                  </div>
                </div>
              </div>
              
              {item.connections.length > 0 && (
                <div className="mt-3 pt-3 border-t border-purple-500/20">
                  <span className="text-purple-300 text-sm">Connected to:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {item.connections.slice(0, 3).map((connection: string, index: number) => (
                      <span key={index} className="px-2 py-1 bg-purple-500/20 text-purple-200 text-xs rounded">
                        {connection}
                      </span>
                    ))}
                    {item.connections.length > 3 && (
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded">
                        +{item.connections.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
