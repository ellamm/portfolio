// src/utils/search.js - Reusable search utilities
/**
 * Creates an optimized search filter function
 * @param {string} searchTerm - The search term to filter by
 * @returns {function} Filter function that checks if text matches search
 */
export function createSearchFilter(searchTerm) {
  if (!searchTerm?.trim()) return () => true;

  const search = searchTerm.toLowerCase().trim();

  return (app) =>
    app.title.toLowerCase().includes(search) ||
    app.description.toLowerCase().includes(search);
}

/**
 * Counts items that match a filter function
 * @param {Array} items - Array of items to filter
 * @param {function} filterFn - Filter function
 * @returns {number} Count of matching items
 */
export function countFilteredItems(items, filterFn) {
  return items.filter(filterFn).length;
}
