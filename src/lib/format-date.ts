/**
 * A frontmatter date as "July 6, 2026". YAML turns an unquoted `2026-07-06` into
 * a Date (at UTC midnight) and a quoted one stays a string, so take either, and
 * read the parts directly instead of going through the local timezone.
 */
export const formatLongDate = (value: string | Date): string => {
  let year: number;
  let month: number;
  let day: number;

  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return "";
    year = value.getUTCFullYear();
    month = value.getUTCMonth() + 1;
    day = value.getUTCDate();
  } else {
    const [y, m, d] = String(value)
      .split("-")
      .map((part) => parseInt(part, 10));
    if (!y || !m || !d) return String(value);
    [year, month, day] = [y, m, d];
  }

  const monthName = new Date(year, month - 1).toLocaleString("en-US", {
    month: "long",
  });
  return `${monthName} ${day}, ${year}`;
};
