import styles from "./FiltersSection.module.css";

export default function CategoryFilters({
  filtersId,
  categories,
  selectedCategory,
  onCategoryChange,
}) {
  return (
    <fieldset className={styles.categoryFilters}>
      <legend className="srOnly">Filter by category</legend>
      <div
        role="group"
        aria-labelledby={filtersId}
        className={styles.categoryButtons}
      >
        <div id={filtersId} className="srOnly">
          Category filters:
        </div>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => onCategoryChange(category)}
            className={`${styles.categoryButton} ${
              selectedCategory === category ? styles.active : ""
            }`}
            aria-pressed={selectedCategory === category}
            aria-label={`Filter by ${category} category`}
          >
            {category}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
