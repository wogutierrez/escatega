// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const articlesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    description: z.string(),
    coverImage: z.string().optional(),
    category: z.enum([
      'Save Time & Stress',
      'Protect Your Business',
      'Get More Clients',
      'Ahorra tiempo y estres',
      'Protege tu negocio',
      'Consigue mas clientes'
    ]),
    featured: z.boolean().default(false),
    lang: z.enum(['en', 'es']).default('en'),
  }),
});

export const collections = {
  articles: articlesCollection,
};