export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getFileExtenstion(filename) {
  const slicec = filename.slice(filename.lastIndexOf("."));
  console.log("##slicec", slicec);
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
}
