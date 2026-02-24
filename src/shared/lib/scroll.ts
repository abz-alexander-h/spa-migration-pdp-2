export const CATALOG_SECTION_ID = 'catalog-section';

export function scrollToSection(sectionId: string, offset = 86): void {
  if (typeof window === 'undefined') {
    return;
  }

  const section = window.document.getElementById(sectionId);

  if (!section) {
    return;
  }

  const top = section.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top,
    behavior: 'smooth',
  });
}
