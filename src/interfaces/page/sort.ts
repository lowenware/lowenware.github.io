import IMetadata from "./metadata";

export function sortByDate(a?: IMetadata, b?: IMetadata) {
  const aTime = (a && a.date) ?
    new Date(a.date).getTime()
    : 0;

  const bTime = (b && b.date) ?
    new Date(b.date).getTime()
    : 0;

  return bTime - aTime;
}
