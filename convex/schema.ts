import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  pages: defineTable({
    slug: v.string(),
    viewCount: v.number(),
  }).index('by_slug', ['slug']),
});
