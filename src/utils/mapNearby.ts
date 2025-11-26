import { NearbyCompany } from '@/common/types/сompany'

export function prepareNearby(items: NearbyCompany[]) {
  return items
    .filter((c) => c.coords) // <- важно! отсеиваем null
    .map((c) => ({
      id: c.id,
      name: c.name,
      address: c.address ?? undefined,
      coords: c.coords!, // теперь точно не null
      distance: c.distance ?? undefined,
      phone: c.phone ?? undefined,
    }))
    .sort((a, b) => {
      if (a.distance == null) return 1
      if (b.distance == null) return -1
      return a.distance - b.distance
    })
}
