import { sampleData } from "./sampleData";
const { delay } = require("../common/util/util");

export function fetchSampleData() {
  return delay(1000).then(function () {
    return Promise.resolve(sampleData);
  });
}
