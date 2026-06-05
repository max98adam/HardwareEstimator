/**
 * App-wide display strings. Single source of truth so the header, page
 * titles, embed footer, and share artefacts never drift apart.
 */

/** Display name of the application. */
export const APP_NAME = "LLM Inference Hardware Estimator";

/** Filename-safe slug for downloaded artefacts (badges, screenshots). */
export const APP_SLUG = "llm-hardware-estimator";

/**
 * Date (ISO `YYYY-MM-DD`) of the last model/hardware catalog update.
 * Shown in the footer and README. The scheduled "Update models and hardware"
 * routine bumps this whenever it refreshes the catalog.
 */
export const LAST_UPDATED = "2026-05-22";
