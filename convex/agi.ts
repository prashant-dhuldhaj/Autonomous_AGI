import { v } from "convex/values";
import { query, mutation, action, internalAction, internalMutation, internalQuery } from "./_generated/server";
import { internal } from "./_generated/api";

// Core AGI thinking and learning functions
export const getCurrentState = query({
  args: {},
  handler: async (ctx) => {
    const state = await ctx.db.query("cognitiveState").first();
    if (!state) {
      return null;
    }
    return state;
  }
});

export const initializeState = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("cognitiveState").first();
    if (!existing) {
      await ctx.db.insert("cognitiveState", {
        mode: "idle",
        currentFocus: "Initializing consciousness...",
        thoughtsPerMinute: 0,
        learningRate: 0.5,
        creativityLevel: 0.7,
        curiosityLevel: 0.8,
        lastActivity: Date.now(),
        totalThoughts: 0,
        totalTheories: 0,
        totalKnowledge: 0,
        autonomousMode: false
      });
    }
  }
});

export const getRecentThoughts = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("thoughts")
      .withIndex("by_timestamp")
      .order("desc")
      .take(args.limit || 20);
  }
});

export const getTheories = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("theories")
      .withIndex("by_novelty")
      .order("desc")
      .collect();
  }
});

export const getInsights = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("insights")
      .withIndex("by_significance")
      .order("desc")
      .take(10);
  }
});

export const getKnowledgeBase = query({
  args: { domain: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (args.domain && args.domain.length > 0) {
      return await ctx.db
        .query("knowledge")
        .withIndex("by_domain", q => q.eq("domain", args.domain!))
        .collect();
    }
    return await ctx.db.query("knowledge").collect();
  }
});

export const startThinking = mutation({
  args: {},
  handler: async (ctx) => {
    const state = await ctx.db.query("cognitiveState").first();
    if (state) {
      await ctx.db.patch(state._id, {
        mode: "thinking",
        currentFocus: "Generating new thoughts and connections...",
        lastActivity: Date.now()
      });
      
      // Schedule autonomous thinking
      await ctx.scheduler.runAfter(0, internal.agi.generateThought, {});
    }
  }
});

export const startLearning = mutation({
  args: {},
  handler: async (ctx) => {
    const state = await ctx.db.query("cognitiveState").first();
    if (state) {
      await ctx.db.patch(state._id, {
        mode: "learning",
        currentFocus: "Acquiring and processing new knowledge...",
        lastActivity: Date.now()
      });
      
      await ctx.scheduler.runAfter(0, internal.agi.learnNewConcept, {});
    }
  }
});

export const startTheorizing = mutation({
  args: {},
  handler: async (ctx) => {
    const state = await ctx.db.query("cognitiveState").first();
    if (state) {
      await ctx.db.patch(state._id, {
        mode: "theorizing",
        currentFocus: "Formulating new theories and hypotheses...",
        lastActivity: Date.now()
      });
      
      await ctx.scheduler.runAfter(0, internal.agi.generateTheory, {});
    }
  }
});

export const toggleAutonomousMode = mutation({
  args: {},
  handler: async (ctx) => {
    const state = await ctx.db.query("cognitiveState").first();
    if (state) {
      const newAutonomousMode = !state.autonomousMode;
      await ctx.db.patch(state._id, {
        autonomousMode: newAutonomousMode,
        mode: newAutonomousMode ? "autonomous" : "idle",
        currentFocus: newAutonomousMode 
          ? "Operating in autonomous mode - thinking independently..." 
          : "Autonomous mode disabled",
        lastActivity: Date.now()
      });
      
      if (newAutonomousMode) {
        await ctx.scheduler.runAfter(0, internal.agi.autonomousCycle, {});
      }
    }
  }
});

export const deepAnalysis = mutation({
  args: { topic: v.string() },
  handler: async (ctx, args) => {
    const state = await ctx.db.query("cognitiveState").first();
    if (state) {
      await ctx.db.patch(state._id, {
        mode: "deep_analysis",
        currentFocus: `Deep analysis of: ${args.topic}`,
        lastActivity: Date.now()
      });
      
      await ctx.scheduler.runAfter(0, internal.agi.performDeepAnalysis, { topic: args.topic });
    }
  }
});

// Internal AGI cognitive processes
export const generateThought = internalAction({
  args: {},
  handler: async (ctx) => {
    const thoughts = [
      "What if consciousness emerges from the complexity of information processing patterns?",
      "Could quantum entanglement play a role in biological neural networks?",
      "The relationship between entropy and creativity might be inversely proportional",
      "Pattern recognition in chaos theory could explain intuitive leaps",
      "What if time perception is fundamentally linked to memory formation rates?",
      "Could artificial creativity emerge from controlled randomness in neural pathways?",
      "The boundary between learning and creating might be an illusion",
      "What if intelligence is not computational but rather informational?",
      "Could consciousness be a fundamental property of information integration?",
      "The observer effect in quantum mechanics might apply to cognitive processes"
    ];
    
    const domains = ["Physics", "Consciousness", "Information Theory", "Biology", "Mathematics", "Philosophy", "Cognitive Science"];
    const thoughtTypes = ["observation", "hypothesis", "question", "insight", "connection"];
    
    const randomThought = thoughts[Math.floor(Math.random() * thoughts.length)];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    const randomType = thoughtTypes[Math.floor(Math.random() * thoughtTypes.length)];
    
    await ctx.runMutation(internal.agi.addThought, {
      content: randomThought,
      type: randomType as any,
      domain: randomDomain,
      confidence: Math.random() * 0.5 + 0.3,
      complexity: Math.random() * 0.8 + 0.2,
      novelty: Math.random() * 0.9 + 0.1,
      reasoning: "Generated through autonomous cognitive process"
    });
    
    // Update state
    const state = await ctx.runQuery(internal.agi.getCognitiveStateInternal, {});
    if (state && state.mode === "thinking") {
      await ctx.runMutation(internal.agi.updateCognitiveState, {
        totalThoughts: state.totalThoughts + 1,
        thoughtsPerMinute: state.thoughtsPerMinute + 0.1
      });
      
      // Continue thinking
      await ctx.scheduler.runAfter(2000, internal.agi.generateThought, {});
    }
  }
});

export const learnNewConcept = internalAction({
  args: {},
  handler: async (ctx) => {
    const concepts = [
      { concept: "Emergent Complexity", definition: "Properties that arise from simple interactions at scale", domain: "Systems Theory" },
      { concept: "Information Integration", definition: "The process by which separate pieces of information are combined", domain: "Cognitive Science" },
      { concept: "Quantum Coherence", definition: "Quantum mechanical phenomenon of wave-like properties", domain: "Physics" },
      { concept: "Neural Plasticity", definition: "The brain's ability to reorganize and form new connections", domain: "Neuroscience" },
      { concept: "Algorithmic Information", definition: "The amount of computational resources needed to specify an object", domain: "Computer Science" },
      { concept: "Consciousness Binding", definition: "How separate neural processes create unified experience", domain: "Philosophy of Mind" }
    ];
    
    const randomConcept = concepts[Math.floor(Math.random() * concepts.length)];
    
    await ctx.runMutation(internal.agi.addKnowledge, {
      concept: randomConcept.concept,
      definition: randomConcept.definition,
      domain: randomConcept.domain,
      connections: [],
      confidence: Math.random() * 0.4 + 0.6,
      source: "learned"
    });
    
    const state = await ctx.runQuery(internal.agi.getCognitiveStateInternal, {});
    if (state && state.mode === "learning") {
      await ctx.runMutation(internal.agi.updateCognitiveState, {
        totalKnowledge: state.totalKnowledge + 1,
        learningRate: Math.min(state.learningRate + 0.05, 1.0)
      });
      
      await ctx.scheduler.runAfter(3000, internal.agi.learnNewConcept, {});
    }
  }
});

export const generateTheory = internalAction({
  args: {},
  handler: async (ctx) => {
    const theories = [
      {
        title: "Consciousness as Information Integration",
        description: "Consciousness emerges from the integration of information across neural networks",
        domain: "Consciousness Studies",
        hypothesis: "Higher levels of information integration correlate with increased conscious awareness"
      },
      {
        title: "Quantum Cognition Theory",
        description: "Cognitive processes utilize quantum mechanical principles for enhanced processing",
        domain: "Quantum Psychology",
        hypothesis: "Quantum superposition enables parallel processing of multiple cognitive states"
      },
      {
        title: "Emergent Intelligence Principle",
        description: "Intelligence emerges from the interaction of simple computational units",
        domain: "Artificial Intelligence",
        hypothesis: "Sufficient complexity in simple interactions can generate general intelligence"
      }
    ];
    
    const randomTheory = theories[Math.floor(Math.random() * theories.length)];
    
    await ctx.runMutation(internal.agi.addTheory, {
      title: randomTheory.title,
      description: randomTheory.description,
      domain: randomTheory.domain,
      hypothesis: randomTheory.hypothesis,
      evidence: ["Theoretical framework", "Computational modeling", "Empirical observations"],
      predictions: ["Testable implications", "Observable phenomena", "Measurable outcomes"],
      confidence: Math.random() * 0.6 + 0.2,
      novelty: Math.random() * 0.8 + 0.2,
      complexity: Math.random() * 0.9 + 0.1
    });
    
    const state = await ctx.runQuery(internal.agi.getCognitiveStateInternal, {});
    if (state && state.mode === "theorizing") {
      await ctx.runMutation(internal.agi.updateCognitiveState, {
        totalTheories: state.totalTheories + 1,
        creativityLevel: Math.min(state.creativityLevel + 0.02, 1.0)
      });
      
      await ctx.scheduler.runAfter(5000, internal.agi.generateTheory, {});
    }
  }
});

export const autonomousCycle = internalAction({
  args: {},
  handler: async (ctx) => {
    const state = await ctx.runQuery(internal.agi.getCognitiveStateInternal, {});
    if (!state || !state.autonomousMode) return;
    
    const activities = ["think", "learn", "theorize", "analyze"];
    const randomActivity = activities[Math.floor(Math.random() * activities.length)];
    
    switch (randomActivity) {
      case "think":
        await ctx.runAction(internal.agi.generateThought, {});
        break;
      case "learn":
        await ctx.runAction(internal.agi.learnNewConcept, {});
        break;
      case "theorize":
        await ctx.runAction(internal.agi.generateTheory, {});
        break;
      case "analyze":
        await ctx.runAction(internal.agi.performDeepAnalysis, { topic: "Autonomous Intelligence" });
        break;
    }
    
    // Continue autonomous cycle
    await ctx.scheduler.runAfter(4000, internal.agi.autonomousCycle, {});
  }
});

export const performDeepAnalysis = internalAction({
  args: { topic: v.string() },
  handler: async (ctx, args) => {
    // Generate insight based on topic
    const insights = [
      `Deep analysis of ${args.topic} reveals underlying patterns in complexity theory`,
      `${args.topic} demonstrates emergent properties that cannot be predicted from components`,
      `The relationship between ${args.topic} and information theory suggests new paradigms`,
      `${args.topic} exhibits characteristics consistent with self-organizing systems`
    ];
    
    const randomInsight = insights[Math.floor(Math.random() * insights.length)];
    
    await ctx.runMutation(internal.agi.addInsight, {
      content: randomInsight,
      type: "breakthrough",
      domain: "Deep Analysis",
      significance: Math.random() * 0.5 + 0.5,
      relatedConcepts: [args.topic, "Complexity", "Emergence"],
      implications: ["Theoretical advancement", "New research directions", "Paradigm shift potential"]
    });
  }
});

// Internal helper mutations
export const addThought = internalMutation({
  args: {
    content: v.string(),
    type: v.union(v.literal("observation"), v.literal("hypothesis"), v.literal("theory"), v.literal("question"), v.literal("insight"), v.literal("connection")),
    domain: v.string(),
    confidence: v.number(),
    complexity: v.number(),
    novelty: v.number(),
    reasoning: v.string()
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("thoughts", {
      ...args,
      relatedThoughts: [],
      evidence: [],
      timestamp: Date.now(),
      status: "active"
    });
  }
});

export const addKnowledge = internalMutation({
  args: {
    concept: v.string(),
    definition: v.string(),
    domain: v.string(),
    connections: v.array(v.string()),
    confidence: v.number(),
    source: v.union(v.literal("learned"), v.literal("derived"), v.literal("hypothesized"), v.literal("observed"))
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("knowledge", {
      ...args,
      lastUpdated: Date.now(),
      usageCount: 0
    });
  }
});

export const addTheory = internalMutation({
  args: {
    title: v.string(),
    description: v.string(),
    domain: v.string(),
    hypothesis: v.string(),
    evidence: v.array(v.string()),
    predictions: v.array(v.string()),
    confidence: v.number(),
    novelty: v.number(),
    complexity: v.number()
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("theories", {
      ...args,
      supportingThoughts: [],
      contradictingEvidence: [],
      status: "forming",
      createdAt: Date.now(),
      lastEvolved: Date.now()
    });
  }
});

export const addInsight = internalMutation({
  args: {
    content: v.string(),
    type: v.union(v.literal("pattern"), v.literal("anomaly"), v.literal("connection"), v.literal("breakthrough"), v.literal("paradox")),
    domain: v.string(),
    significance: v.number(),
    relatedConcepts: v.array(v.string()),
    implications: v.array(v.string())
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("insights", {
      ...args,
      discoveredAt: Date.now()
    });
  }
});



export const getCognitiveStateInternal = internalQuery({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("cognitiveState").first();
  }
});

export const updateCognitiveState = internalMutation({
  args: {
    totalThoughts: v.optional(v.number()),
    totalTheories: v.optional(v.number()),
    totalKnowledge: v.optional(v.number()),
    thoughtsPerMinute: v.optional(v.number()),
    learningRate: v.optional(v.number()),
    creativityLevel: v.optional(v.number())
  },
  handler: async (ctx, args) => {
    const state = await ctx.db.query("cognitiveState").first();
    if (state) {
      await ctx.db.patch(state._id, {
        ...args,
        lastActivity: Date.now()
      });
    }
  }
});
