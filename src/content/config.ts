import { defineCollection, z } from 'astro:content';

const articlesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    description: z.string(),
    coverImage: z.string().optional(),
    category: z.enum(["AI & Tech", "Business Automation", "Digital Foundation", "Mentorship"]).default("AI & Tech"),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  articles: articlesCollection,
};