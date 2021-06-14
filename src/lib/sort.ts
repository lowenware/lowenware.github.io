import IMetadata from "../interfaces/page/metadata";

export function sortByDate(a?: IMetadata, b?: IMetadata) {
  const aTime = (a && a.date) ?
    new Date(a.date).getTime()
    : 0;

  const bTime = (b && b.date) ?
    new Date(b.date).getTime()
    : 0;

  return bTime - aTime;
}

export function sortByWeight(a?: IMetadata, b?: IMetadata) {
  const aWeight = a?.weight || 0;
  const bWeight = b?.weight || 0;

  return aWeight - bWeight;
}
