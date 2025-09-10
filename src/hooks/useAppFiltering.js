import { createSearchFilter } from "../utils/search";

/**
 * Custom hook for filtering applications
 * @param {Array} apps - Array of applications
 * @param {string} selectedCategory - Selected category
 * @param {string} searchTerm - Search term
 * @returns {Array} Filtered applications
 */
export default function useAppFiltering(apps, selectedCategory, searchTerm) {
  const searchFilter = createSearchFilter(searchTerm);

  return apps.filter((app) => {
    const matchesCategory =
      selectedCategory === "All" || app.category === selectedCategory;
    const matchesSearch = searchFilter(app);

    return matchesCategory && matchesSearch;
  });
}
