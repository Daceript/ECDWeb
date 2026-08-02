export const eventCategoryColors: Record<string, string> = {
  culto: "#13423d",
  estudio: "#2d5a54",
  jovenes: "#904b36",
  oracion: "#304031",
  ministerio: "#783924",
  ensayo: "#465747",
  conferencia: "#5a3e13",
};

export const defaultEventColor = "#13423d";

export function getEventColor(category?: string): string {
  if (!category) return defaultEventColor;
  return eventCategoryColors[category] ?? defaultEventColor;
}
