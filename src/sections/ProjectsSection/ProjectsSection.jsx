import { useState, useRef, useId, useCallback, useMemo, lazy, Suspense } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { miniApps, getCategories } from "../../data/miniApps";
import useAppFiltering from "../../hooks/useAppFiltering";
import AppCard from "../../components/AppCard/AppCard";
import FiltersSection from "../FiltersSection/FiltersSection";
import SectionCard from "../../components/SectionCard/SectionCard";
import AppModal from "../../components/AppModal/AppModal";
import styles from "./ProjectsSection.module.css";

const APP_COMPONENTS = {
  "submission-form": lazy(() => import("../../apps/submission-form/SubmissionForm")),
  "color-tool":      lazy(() => import("../../apps/color-tool/ColorTool")),
};

const featuredApps = miniApps.filter((a) => a.featured);
const extraCount = miniApps.length - featuredApps.length;

export default function ProjectsSection() {
  const [expanded, setExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [openApp, setOpenApp] = useState(null);
  const searchInputRef = useRef(null);
  const searchId = useId();
  const filtersId = useId();

  const categories = useMemo(() => getCategories(), []);
  const filteredApps = useAppFiltering(miniApps, selectedCategory, searchTerm);

  const isFiltering = searchTerm !== "" || selectedCategory !== "All";
  const showAll = expanded || isFiltering;

  const handleSearch = useCallback((value) => setSearchTerm(value), []);

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
    if (expanded) setExpanded(false);
  }, [expanded]);

  return (
    <SectionCard id="projects" title="Projects" compact>
      <p className={styles.intro}>
        A mix of learning projects, tools, and experiments built hands-on while
        upskilling in React and modern frontend. The top four are the builds I'm
        most proud of — the rest are practice projects and smaller tools.
      </p>

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

      {!showAll ? (
        <>
          <div className={styles.featuredGrid}>
            {featuredApps.map((app) => <AppCard key={app.id} app={app} onLaunch={setOpenApp} />)}
          </div>
          <div className={styles.loadMoreWrap}>
            <button className={styles.loadMoreBtn} onClick={() => setExpanded(true)}>
              <ChevronDown size={15} aria-hidden="true" />
              Load more — {extraCount} more projects
            </button>
          </div>
        </>
      ) : (
        <>
          {filteredApps.length === 0 ? (
            <div className={styles.noResults}>
              <span className={styles.noResultsIcon}>🔍</span>
              <p className={styles.noResultsText}>No projects found</p>
              <p className={styles.noResultsHint}>
                Try a different search term or category
              </p>
            </div>
          ) : (
            <div className={styles.allGrid}>
              {filteredApps.map((app) => <AppCard key={app.id} app={app} onLaunch={setOpenApp} />)}
            </div>
          )}
          {!isFiltering && (
            <div className={styles.loadMoreWrap}>
              <button className={styles.loadMoreBtn} onClick={() => setExpanded(false)}>
                <ChevronUp size={15} aria-hidden="true" />
                Show less
              </button>
            </div>
          )}
        </>
      )}
      {openApp && APP_COMPONENTS[openApp.id] && (() => {
        const AppComponent = APP_COMPONENTS[openApp.id];
        return (
          <AppModal app={openApp} onClose={() => setOpenApp(null)}>
            <Suspense fallback={<div style={{ padding: "2rem", textAlign: "center", color: "var(--color-muted)" }}>Loading…</div>}>
              <AppComponent />
            </Suspense>
          </AppModal>
        );
      })()}
    </SectionCard>
  );
}
