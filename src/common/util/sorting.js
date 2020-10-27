export function sortInDescendingOrder(arr, key) {
  return arr.sort((a, b) => b[key] - a[key])
}
