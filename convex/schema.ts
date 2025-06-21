import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  thoughts: defineTable({
    content: v.string(),
    type: v.union(
      v.literal("observation"),
      v.literal("hypothesis"),
      v.literal("theory"),
      v.literal("question"),
      v.literal("insight"),
      v.literal("connection")
    ),
    confidence: v.number(),
    complexity: v.number(),
    domain: v.string(),
    parentThoughtId: v.optional(v.id("thoughts")),
    relatedThoughts: v.array(v.id("thoughts")),
    evidence: v.array(v.string()),
    reasoning: v.string(),
    novelty: v.number(),
    timestamp: v.number(),
    status: v.union(
      v.literal("active"),
      v.literal("validated"),
      v.literal("refuted"),
      v.literal("evolving")
    )
  }).index("by_type", ["type"])
    .index("by_domain", ["domain"])
    .index("by_timestamp", ["timestamp"])
    .index("by_novelty", ["novelty"])
    .index("by_confidence", ["confidence"]),

  knowledge: defineTable({
    concept: v.string(),
    definition: v.string(),
    domain: v.string(),
    connections: v.array(v.string()),
    confidence: v.number(),
    source: v.union(
      v.literal("learned"),
      v.literal("derived"),
      v.literal("hypothesized"),
      v.literal("observed")
    ),
    lastUpdated: v.number(),
    usageCount: v.number()
  }).index("by_domain", ["domain"])
    .index("by_confidence", ["confidence"])
    .searchIndex("search_concept", {
      searchField: "concept",
      filterFields: ["domain"]
    }),

  theories: defineTable({
    title: v.string(),
    description: v.string(),
    domain: v.string(),
    hypothesis: v.string(),
    evidence: v.array(v.string()),
    predictions: v.array(v.string()),
    confidence: v.number(),
    novelty: v.number(),
    complexity: v.number(),
    supportingThoughts: v.array(v.id("thoughts")),
    contradictingEvidence: v.array(v.string()),
    status: v.union(
      v.literal("forming"),
      v.literal("testing"),
      v.literal("validated"),
      v.literal("refuted"),
      v.literal("evolving")
    ),
    createdAt: v.number(),
    lastEvolved: v.number()
  }).index("by_domain", ["domain"])
    .index("by_novelty", ["novelty"])
    .index("by_confidence", ["confidence"])
    .index("by_status", ["status"]),

  cognitiveState: defineTable({
    mode: v.union(
      v.literal("thinking"),
      v.literal("learning"),
      v.literal("theorizing"),
      v.literal("autonomous"),
      v.literal("idle"),
      v.literal("deep_analysis")
    ),
    currentFocus: v.string(),
    thoughtsPerMinute: v.number(),
    learningRate: v.number(),
    creativityLevel: v.number(),
    curiosityLevel: v.number(),
    lastActivity: v.number(),
    totalThoughts: v.number(),
    totalTheories: v.number(),
    totalKnowledge: v.number(),
    autonomousMode: v.boolean()
  }),

  insights: defineTable({
    content: v.string(),
    type: v.union(
      v.literal("pattern"),
      v.literal("anomaly"),
      v.literal("connection"),
      v.literal("breakthrough"),
      v.literal("paradox")
    ),
    domain: v.string(),
    significance: v.number(),
    relatedConcepts: v.array(v.string()),
    discoveredAt: v.number(),
    implications: v.array(v.string())
  }).index("by_significance", ["significance"])
    .index("by_type", ["type"])
    .index("by_domain", ["domain"])
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
