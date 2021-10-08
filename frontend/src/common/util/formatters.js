const percentFormatter = Intl.NumberFormat("en-US", { style: "percent" })

const currencyFormatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

const thousandsFormatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
})

export function formatPercent(value) {
  return percentFormatter.format(value)
}

export function formatDollars(value) {
  return currencyFormatter.format(value)
}

export function formatDollarsInThousands(value) {
  return thousandsFormatter.format(value)
}
