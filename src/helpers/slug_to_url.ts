export default function ToUrl(...slug: string[]): string {
  return "/" + slug.join("/").toLowerCase();
}
