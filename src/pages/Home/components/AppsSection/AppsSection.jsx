import AppCard from "../../../../components/AppCard/AppCard";
import NoResults from "./NoResults";
import styles from "./AppsSection.module.css";

export default function AppsSection({
  filteredApps,
  onClearFilters,
  searchTerm,
  selectedCategory,
}) {
  const hasFilters = searchTerm || selectedCategory !== "All";

  return (
    <section
      className={styles.apps}
      aria-labelledby="apps-title"
      role="main"
      id="main-content"
    >
      <h2 id="apps-title" className={styles.srOnly}>
        Available Applications
      </h2>

      <div
        aria-live="polite"
        aria-label={`Showing ${filteredApps.length} application${
          filteredApps.length !== 1 ? "s" : ""
        }`}
      >
        {filteredApps.length > 0 ? (
          <div
            className={styles.appsGrid}
            role="grid"
            aria-label="Applications grid"
          >
            {filteredApps.map((app, index) => (
              <div
                key={app.id}
                role="gridcell"
                aria-rowindex={Math.floor(index / 2) + 1}
                aria-colindex={(index % 2) + 1}
              >
                <AppCard app={app} />
              </div>
            ))}
          </div>
        ) : (
          <NoResults
            onClearFilters={onClearFilters}
            hasFilters={hasFilters}
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
          />
        )}
      </div>
    </section>
  );
}
