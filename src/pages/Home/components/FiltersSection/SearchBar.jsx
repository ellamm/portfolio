import { Search } from "lucide-react";
import styles from "./FiltersSection.module.css";

export default function SearchBar({
  searchId,
  searchTerm,
  onSearchChange,
  searchInputRef,
}) {
  return (
    <div className={styles.searchContainer}>
      <label htmlFor={searchId} className={styles.srOnly}>
        Search applications by name or description
      </label>
      <Search className={styles.searchIcon} size={20} aria-hidden="true" />
      <input
        id={searchId}
        ref={searchInputRef}
        type="search"
        placeholder="Search mini-apps..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className={styles.searchInput}
        aria-describedby="search-help"
        autoComplete="off"
      />
      <div id="search-help" className={styles.srOnly}>
        Search will filter applications as you type
      </div>
    </div>
  );
}
