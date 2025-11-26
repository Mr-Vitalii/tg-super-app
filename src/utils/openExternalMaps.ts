export function openExternalMaps(opts: {
  address?: string
  lat?: number
  lng?: number
}) {
  const { address, lat, lng } = opts

  let query = ''

  if (lat !== undefined && lng !== undefined) {
    query = `${lat},${lng}`
  } else if (address) {
    query = encodeURIComponent(address)
  } else {
    console.warn('openExternalMaps: no address or coords provided.')
    return
  }

  const google = `https://www.google.com/maps/search/?api=1&query=${query}`
  const osm = `https://www.openstreetmap.org/?query=${query}`

  const win = window.open(google, '_blank', 'noopener,noreferrer')

  if (!win) {
    window.open(osm, '_blank', 'noopener,noreferrer')
  }
}
