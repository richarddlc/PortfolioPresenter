/** Supports both full sections and the Studio marker inside the pinned hero. */
export function activePortfolioSection(ids: string[]) {
  for (const id of ids.slice().reverse()) {
    const element = document.getElementById(id);
    if (element && element.getBoundingClientRect().top <= 80) return id;
  }
  return ids[0];
}
