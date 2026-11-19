export function isDateObject(obj: unknown): obj is {
  msSinceEpoch: number;
} {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof (obj as any).msSinceEpoch === "number"
  );
}
