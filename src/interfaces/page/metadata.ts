interface IMetadata {
  title?: string,
  date?: string,
  description?: string,

  author?: string,
  categories?: string[],
  className?: string,
  comments?: boolean,
  details?: string,
  linkTitle?: string,
  publication?: boolean,
  sticky?: boolean,
  tags?: string[],
  weight?: number,

  project?: {
    github?: string,
    tag?: string,
    version?: string,
  }
}

export default IMetadata;
