import styles from "./AppsSection.module.css";

export default function NoResults({
  onClearFilters,
  hasFilters,
  searchTerm,
  selectedCategory,
}) {
  let filterDescription = "";

  if (searchTerm && selectedCategory !== "All") {
    filterDescription = `search "${searchTerm}" in ${selectedCategory} category`;
  } else if (searchTerm) {
    filterDescription = `search "${searchTerm}"`;
  } else if (selectedCategory !== "All") {
    filterDescription = `${selectedCategory} category`;
  }

  return (
    <div className={styles.noResults} role="status" aria-live="polite">
      <div className={styles.noResultsIcon} aria-hidden="true">
        🔍
      </div>
      <h3>No applications found</h3>
      <p>
        {hasFilters ? (
          <>
            No applications found matching your {filterDescription}.
            <br />
            Try adjusting your filters or search terms.
          </>
        ) : (
          "No applications available at the moment."
        )}
      </p>
      {hasFilters && (
        <button
          onClick={onClearFilters}
          className={styles.clearFilters}
          aria-label="Clear all filters and show all applications"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}
