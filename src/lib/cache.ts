import { cache } from "react";
import "server-only";
import { getCategories, getPost } from "./posts";

export const getPostCache = cache(async (slug: string) => {
  return await getPost(slug);
});

export const getCategoriesCache = cache(async () => {
  return await getCategories();
});
