export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getFileExtenstion(filename) {
  const slicec = filename.slice(filename.lastIndexOf("."));
  console.log("##slicec", slicec);
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
}

export function createDataTree(dataset) {
  let hashtable = Object.create(null);
  let dataTree = [];

  //! Add childNodes to every comment
  dataset.forEach((a) => {
    hashtable[a.ChatId] = { ...a, childNodes: [] };
  });

  dataset.forEach((a) => {
    if (a.parentId) {
      hashtable[a.parentId].childNodes.push(hashtable[a.ChatId]);
    } else dataTree.push(hashtable[a.ChatId]);
  });

  return dataTree;
}
