const getFileExt = (filename: string) =>
  filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2).toLowerCase()

export { getFileExt }
