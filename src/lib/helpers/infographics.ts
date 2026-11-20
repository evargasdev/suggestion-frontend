export function getInfographicUrl(
  dimensionLabel: string,
  classification: string | null,
): string | null {
  const normalizedClassification = classification
    ?.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  const classificationSlug = normalizedClassification?.includes("pesimas")
    ? "pesimas"
    : normalizedClassification?.includes("intermedias")
      ? "intermedias"
      : normalizedClassification?.includes("buenas")
        ? "buenas"
        : null;

  if (!classificationSlug) {
    return null;
  }

  const dimensionSlug = dimensionLabel
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `/infografias/${dimensionSlug}-${classificationSlug}.pdf`;
}
