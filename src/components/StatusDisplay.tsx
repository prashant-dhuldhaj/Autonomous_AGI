interface StatusDisplayProps {
  state: any;
}

export function StatusDisplay({ state }: StatusDisplayProps) {
  if (!state) return null;

  const getModeColor = (mode: string) => {
    switch (mode) {
      case "thinking": return "text-blue-400";
      case "learning": return "text-green-400";
      case "theorizing": return "text-purple-400";
      case "autonomous": return "text-orange-400";
      case "deep_analysis": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case "thinking": return "🤔";
      case "learning": return "📖";
      case "theorizing": return "🔬";
      case "autonomous": return "🤖";
      case "deep_analysis": return "🔍";
      default: return "😴";
    }
  };

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-lg border border-purple-500/30 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{getModeIcon(state.mode)}</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-purple-200 font-semibold">Status:</span>
                <span className={`font-bold capitalize ${getModeColor(state.mode)}`}>
                  {state.mode.replace('_', ' ')}
                </span>
                {state.autonomousMode && (
                  <span className="px-2 py-1 bg-orange-500/20 text-orange-300 text-xs rounded-full border border-orange-500/30">
                    AUTONOMOUS
                  </span>
                )}
              </div>
              <p className="text-purple-300 text-sm mt-1">{state.currentFocus}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-purple-200 text-sm">Creativity</div>
            <div className="w-16 h-2 bg-purple-900/50 rounded-full mt-1">
              <div 
                className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all"
                style={{ width: `${(state.creativityLevel || 0) * 100}%` }}
              />
            </div>
          </div>
          <div className="text-center">
            <div className="text-purple-200 text-sm">Learning</div>
            <div className="w-16 h-2 bg-purple-900/50 rounded-full mt-1">
              <div 
                className="h-full bg-gradient-to-r from-green-400 to-blue-400 rounded-full transition-all"
                style={{ width: `${(state.learningRate || 0) * 100}%` }}
              />
            </div>
          </div>
          <div className="text-center">
            <div className="text-purple-200 text-sm">Curiosity</div>
            <div className="w-16 h-2 bg-purple-900/50 rounded-full mt-1">
              <div 
                className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transition-all"
                style={{ width: `${(state.curiosityLevel || 0) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
