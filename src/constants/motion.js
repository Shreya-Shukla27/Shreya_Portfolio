const roundDelay = (value) => Number(value.toFixed(3));

export const SKILLS_CATEGORY_BASE_DELAY_MAP = {
  'Programming Languages': 0.03,
  'AI/ML': 0.09,
  'GenAI/LLM': 0.13,
  'Data Science': 0.1,
  Web: 0.07,
  Backend: 0.06,
  Database: 0.05,
  'DevOps & Tools': 0.08,
  Cloud: 0.065,
};
export const SKILLS_CATEGORY_INDEX_STEP = 0.014;
export const SKILLS_CATEGORY_FALLBACK_BASE_DELAY = 0.05;

export const PROJECTS_GRID_COLUMNS = 2;
export const PROJECTS_GRID_BASE_DELAY = 0.06;
export const PROJECTS_GRID_ROW_STEP = 0.085;
export const PROJECTS_GRID_COLUMN_STEP = 0.03;

export const EXPERIENCE_LIST_BASE_DELAY = 0.065;
export const EXPERIENCE_LIST_STEP = 0.09;

export const ACHIEVEMENTS_GRID_COLUMNS = 2;
export const ACHIEVEMENTS_GRID_BASE_DELAY = 0.07;
export const ACHIEVEMENTS_GRID_ROW_STEP = 0.085;
export const ACHIEVEMENTS_GRID_COLUMN_STEP = 0.03;

export const PUBLICATIONS_LIST_BASE_DELAY = 0.06;
export const PUBLICATIONS_LIST_STEP = 0.085;

export const CONTACT_HEADING_DELAY = 0.065;
export const CONTACT_COPY_DELAY = 0.095;
export const CONTACT_AVAILABILITY_DELAY = 0.12;
export const CONTACT_SOCIAL_BASE_DELAY = 0.145;
export const CONTACT_SOCIAL_STEP = 0.03;
export const CONTACT_FORM_DELAY = 0.16;

export function getLinearRevealDelay(index, baseDelay = 0.06, delayStep = 0.085) {
  return roundDelay(baseDelay + index * delayStep);
}

export function getGridRevealDelay(index, columns = 2, baseDelay = 0.06, rowDelayStep = 0.085, columnDelayStep = 0.03) {
  const row = Math.floor(index / columns);
  const col = index % columns;
  return roundDelay(baseDelay + row * rowDelayStep + col * columnDelayStep);
}

export function getCategoryRevealDelay(category, index, baseDelayMap = {}, indexStep = 0.014, fallbackBaseDelay = 0.05) {
  const hasCategory = Object.prototype.hasOwnProperty.call(baseDelayMap, category);
  const baseDelay = hasCategory ? baseDelayMap[category] : fallbackBaseDelay;
  return roundDelay(baseDelay + index * indexStep);
}

export function toRevealDelayStyle(delaySeconds) {
  return { transitionDelay: `${roundDelay(delaySeconds)}s` };
}