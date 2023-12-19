export function parseCacheControl(header?: string) {
  if (typeof header !== "string") {
    return 0;
  }

  if (header.includes("no-cache") || header.includes("no-store")) {
    return 0;
  }

  if (header.includes("max-age")) {
    const [, maxAge] = header.match(/max-age=(\d+)/) ?? [];

    if (maxAge) {
      return parseInt(maxAge, 10);
    }
  }

  return 0;
}
