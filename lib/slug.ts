export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function generateSlug(
  modelo: string,
  storage: string,
  color: string,
  index: number
): string {
  const base = slugify(`${modelo} ${storage} ${color}`);
  return base || `iphone-${index + 1}`;
}

export function ensureUniqueSlugs<T extends { slug: string }>(items: T[]): T[] {
  const seen = new Map<string, number>();

  return items.map((item) => {
    const count = seen.get(item.slug) ?? 0;
    seen.set(item.slug, count + 1);

    if (count === 0) return item;

    return { ...item, slug: `${item.slug}-${count + 1}` };
  });
}
