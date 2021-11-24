/**
 * Opted for LRU Cache
 * It's simple, and gets the job done
 */

import LRU from 'lru-cache';

const options = {
  max: 500,
  maxAge: 1000 * 60 * 60,
};
const cache = new LRU(options);

export const getCachedData = <T = unknown>(query: string): T => {
  return cache.get(query) as T;
};

export const updateCache = (query: string, data: unknown) => {
  cache.set(query, data);
};

export const hasCache = (query: string): boolean => {
  return cache.has(query);
};

export const clearCache = (query: string) => cache.del(query);
