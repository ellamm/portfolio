import { useState, useRef, useId, useCallback } from "react";
import { miniApps, getCategories } from "../../data/miniApps";
import { createSearchFilter } from "../../utils/search";
import HeroSection from "./components/HeroSection/HeroSection";
import FiltersSection from "./components/FiltersSection/FiltersSection";
import AppsSection from "./components/AppsSection/AppsSection";
import CTASection from "./components/CTASection/CTASection";
import useAppFiltering from "../../hooks/useAppFiltering";
import styles from "./Home.module.css";

// Helper function for announcements
function createFilterAnnouncement(count, searchTerm, category) {
  const plural = count !== 1 ? "s" : "";
  const apps = `${count} application${plural}`;

  if (searchTerm && category !== "All") {
    return `Found ${apps} matching "${searchTerm}" in ${category} category`;
  } else if (searchTerm) {
    return `Found ${apps} matching "${searchTerm}"`;
  } else if (category !== "All") {
    return `Filtered by ${category}. Showing ${apps}.`;
  } else {
    return `Showing all ${apps}.`;
  }
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [announceResults, setAnnounceResults] = useState("");

  const searchInputRef = useRef(null);
  const searchId = useId();
  const filtersId = useId();

  const categories = getCategories();
  const filteredApps = useAppFiltering(miniApps, selectedCategory, searchTerm);

  const handleSearch = useCallback(
    (value) => {
      setSearchTerm(value);
      const searchFilter = createSearchFilter(value);
      const matchingApps = miniApps.filter((app) => {
        const matchesCategory =
          selectedCategory === "All" || app.category === selectedCategory;
        const matchesSearch = searchFilter(app);
        return matchesCategory && matchesSearch;
      });
      setAnnounceResults(
        createFilterAnnouncement(matchingApps.length, value, selectedCategory)
      );
    },
    [selectedCategory]
  );

  const handleCategoryChange = useCallback(
    (category) => {
      setSelectedCategory(category);
      const searchFilter = createSearchFilter(searchTerm);
      const matchingApps = miniApps.filter((app) => {
        const matchesCategory = category === "All" || app.category === category;
        const matchesSearch = searchFilter(app);
        return matchesCategory && matchesSearch;
      });
      setAnnounceResults(
        createFilterAnnouncement(matchingApps.length, searchTerm, category)
      );
    },
    [searchTerm]
  );

  const handleClearFilters = useCallback(() => {
    setSearchTerm("");
    setSelectedCategory("All");
    setAnnounceResults(
      `Filters cleared. Showing all ${miniApps.length} applications.`
    );
    setTimeout(() => searchInputRef.current?.focus(), 100);
  }, []);

  return (
    <div className={styles.home}>
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>
      <div aria-live="polite" aria-atomic="true" className={styles.srOnly}>
        {announceResults}
      </div>

      <HeroSection />
      <FiltersSection
        searchId={searchId}
        filtersId={filtersId}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        searchTerm={searchTerm}
        onSearchChange={handleSearch}
        searchInputRef={searchInputRef}
      />
      <AppsSection
        filteredApps={filteredApps}
        onClearFilters={handleClearFilters}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
      />
      <CTASection />
    </div>
  );
}
