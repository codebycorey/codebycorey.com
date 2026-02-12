import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const getViewCount = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const page = await ctx.db
      .query('pages')
      .withIndex('by_slug', (q) => q.eq('slug', args.slug))
      .first();

    return page?.viewCount ?? 0;
  },
});

export const getAllViewCounts = query({
  args: {},
  handler: async (ctx) => {
    const pages = await ctx.db.query('pages').collect();
    return pages.map((page) => ({
      slug: page.slug,
      viewCount: page.viewCount,
    }));
  },
});

export const incrementViewCount = mutation({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const page = await ctx.db
      .query('pages')
      .withIndex('by_slug', (q) => q.eq('slug', args.slug))
      .first();

    if (page) {
      await ctx.db.patch(page._id, {
        viewCount: page.viewCount + 1,
      });
      return page.viewCount + 1;
    }

    const id = await ctx.db.insert('pages', {
      slug: args.slug,
      viewCount: 1,
    });
    return 1;
  },
});
