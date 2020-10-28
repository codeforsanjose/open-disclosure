export function sortInDescendingOrder(arr, key) {
  return arr.sort((a, b) => b[key] - a[key])
}

export function sortTeamByAlphabeticalOrder(arr) {
  return arr.sort((a, b) => {
    return !a.lead && a.name.toLowerCase() > b.name.toLowerCase()
  })
}
