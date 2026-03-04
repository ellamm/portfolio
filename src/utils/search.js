export function createSearchFilter(searchTerm) {
  if (!searchTerm?.trim()) return () => true;

  const search = searchTerm.toLowerCase().trim();

  return (app) =>
    app.title.toLowerCase().includes(search) ||
    app.description.toLowerCase().includes(search);
}
