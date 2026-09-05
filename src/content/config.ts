import { defineCollection, z } from 'astro:content';

const articlesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    description: z.string(),
    coverImage: z.string().optional(),
    category: z.enum(['Save Time & Stress','Protect Your Business','Get More Clients']),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  articles: articlesCollection,
};