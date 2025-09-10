import CategoryFilters from "./CategoryFilters";
import SearchBar from "./SearchBar";
import styles from "./FiltersSection.module.css";

export default function FiltersSection({
  searchId,
  filtersId,
  categories,
  selectedCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange,
  searchInputRef,
}) {
  return (
    <section
      className={styles.filters}
      aria-labelledby="filters-title"
      role="search"
    >
      <h2 id="filters-title" className={styles.srOnly}>
        Filter and search applications
      </h2>

      <CategoryFilters
        filtersId={filtersId}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
      />

      <SearchBar
        searchId={searchId}
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        searchInputRef={searchInputRef}
      />
    </section>
  );
}
