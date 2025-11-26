import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Company, NearbyCompany } from '@/common/types/сompany'
import styles from './CompanyMap.module.scss'
import 'leaflet/dist/leaflet.css' // обязательно (если сборка настроена на css импорты)
import { prepareNearby } from '@/utils/mapNearby'

// react-leaflet
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  ScaleControl,
} from 'react-leaflet'
import type { Map as LeafletMap } from 'leaflet'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import NearbyCompanies from '@/modules/services/components/NearbyCompanies/NearbyCompanies'

// NOTE: У Leaflet есть проблема с дефолтными иконками в Webpack/CRA/Vite —
// если у тебя маркеры отображаются пустыми, добавь корректный icon url.
// Ниже задаём простой икон-патч (используем встроенные файлы leaflet).
// Если у тебя настроен обработчик ресурсов, можно убрать этот кусок.

/* delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
}) */

delete (L.Icon.Default.prototype as any)._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

interface CompanyMapProps {
  company: Company
  /** Дополнительные (ближайшие) компании, которые можно показать на карте как маркеры */
  nearby?: NearbyCompany[]
  /** начальный уровень масштаба */
  initialZoom?: number
  /** ширина/высота контейнера можно задавать через CSS-модуль */
  className?: string
}

const DEFAULT_ZOOM = 16

const buildExternalMapUrl = (lat: number, lng: number) => {
  return {
    google: `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
    osm: `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=18/${lat}/${lng}`,
  }
}

const CompanyMap: React.FC<CompanyMapProps> = ({
  company,
  nearby = [],
  initialZoom = DEFAULT_ZOOM,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<LeafletMap | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [activeNearbyId, setActiveNearbyId] = useState<string | null>(null)

  const coords = company.coords ?? null

  // whenCreated callback for MapContainer
  /*   const handleMapCreated = useCallback((mapInstance: LeafletMap) => {
    mapRef.current = mapInstance
  }, []) */

  const preparedNearby = useMemo(() => prepareNearby(nearby), [nearby])

  useEffect(() => {
    // слушаем события Fullscreen для синхронизации класса/состояния
    const onFsChange = () => {
      const fsElement =
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      setIsFullscreen(!!fsElement)
      // invalidate size when fullscreen toggled
      setTimeout(() => {
        mapRef.current?.invalidateSize()
      }, 250)
    }

    document.addEventListener('fullscreenchange', onFsChange)
    // vendor prefixes (на старых браузерах) — необязательно, но безопасно
    document.addEventListener('webkitfullscreenchange', onFsChange as any)
    document.addEventListener('mozfullscreenchange', onFsChange as any)
    document.addEventListener('MSFullscreenChange', onFsChange as any)

    return () => {
      document.removeEventListener('fullscreenchange', onFsChange)
      document.removeEventListener('webkitfullscreenchange', onFsChange as any)
      document.removeEventListener('mozfullscreenchange', onFsChange as any)
      document.removeEventListener('MSFullscreenChange', onFsChange as any)
    }
  }, [])

  // full screen toggle
  const toggleFullscreen = useCallback(async () => {
    const el = containerRef.current
    if (!el) return

    try {
      if (!document.fullscreenElement) {
        // request fullscreen
        if (el.requestFullscreen) await el.requestFullscreen()
        else if ((el as any).webkitRequestFullscreen)
          await (el as any).webkitRequestFullscreen()
        else if ((el as any).msRequestFullscreen)
          await (el as any).msRequestFullscreen()
        setIsFullscreen(true)
      } else {
        // exit fullscreen
        if (document.exitFullscreen) await document.exitFullscreen()
        else if ((document as any).webkitExitFullscreen)
          await (document as any).webkitExitFullscreen()
        else if ((document as any).msExitFullscreen)
          await (document as any).msExitFullscreen()
        setIsFullscreen(false)
      }
    } catch (err) {
      // noop — браузер может заблокировать
      setIsFullscreen(Boolean(document.fullscreenElement))
    } finally {
      // invalidate map size after a short delay
      setTimeout(() => {
        mapRef.current?.invalidateSize()
      }, 300)
    }
  }, [])

  const openExternalMaps = useCallback(() => {
    if (!coords) return
    const { lat, lng } = coords
    const urls = buildExternalMapUrl(lat, lng)
    const win = window.open(urls.google, '_blank', 'noopener,noreferrer')
    if (!win) window.open(urls.osm, '_blank', 'noopener,noreferrer')
  }, [coords])

  const flyToCompany = useCallback(
    (c: { id: string; coords?: { lat: number; lng: number } }) => {
      if (!c.coords || !mapRef.current) return

      setActiveNearbyId(c.id)

      mapRef.current.flyTo([c.coords.lat, c.coords.lng], 17, {
        duration: 0.8,
      })
    },
    []
  )

  // center/viewport update when company coords change
  useEffect(() => {
    if (!coords || !mapRef.current) return
    mapRef.current.setView([coords.lat, coords.lng], initialZoom)
  }, [coords, initialZoom])

  if (!coords) {
    return (
      <div className={`${styles.root} ${className}`}>
        <div className={styles.placeholder}>
          <p>Координаты компании не указаны</p>
          {company.address && (
            <p className={styles.placeholderAddr}>{company.address}</p>
          )}
        </div>
      </div>
    )
  }

  const handleNearbyClick = (c: NearbyCompany) => {
    setActiveNearbyId(c.id)
    flyToCompany(c)
  }

  return (
    <div ref={containerRef} className={`${styles.root} ${className}`}>
      <div className={styles.controls}>
        <button type='button' className={styles.btn} onClick={openExternalMaps}>
          Открыть в картах
        </button>
        <button type='button' className={styles.btn} onClick={toggleFullscreen}>
          {isFullscreen ? 'Выйти из полноэкранного' : 'Развернуть карту'}
        </button>
      </div>

      <div className={styles.mapWrapper}>
        <MapContainer
          ref={mapRef}
          /*  whenReady={(map) => {
            mapRef.current = map.target
          }} */
          center={[coords.lat, coords.lng]}
          zoom={initialZoom}
          scrollWheelZoom={false}
          style={{ width: '100%', height: '100%' }}
          zoomControl={false} // отключаем дефолтный, потому что добавляем настраиваемый
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />

          {/* Наш маркер */}
          <Marker position={[coords.lat, coords.lng]}>
            <Popup>
              <div className={styles.popup}>
                <strong>{company.title}</strong>
                {company.address && <div>{company.address}</div>}
                {company.phone?.[0] && <div>☎ {company.phone[0]}</div>}
              </div>
            </Popup>
          </Marker>

          {/* nearby companies */}
          {preparedNearby.map((c) =>
            c.coords ? (
              <Marker
                key={c.id}
                position={[c.coords.lat, c.coords.lng]}
                opacity={activeNearbyId === c.id ? 1 : 0.6}
                eventHandlers={{
                  click: () => {
                    setActiveNearbyId(c.id)
                    flyToCompany(c)
                  },
                }}
              >
                <Popup>
                  <div>
                    <strong>{c.name}</strong>
                    {c.address && <div>{c.address}</div>}
                    {c.phone?.[0] && <div>☎ {c.phone[0]}</div>}
                  </div>
                </Popup>
              </Marker>
            ) : null
          )}

          {/* Controls */}
          <ZoomControl position='topright' />
          <ScaleControl position='bottomleft' />
        </MapContainer>
      </div>

      {preparedNearby.length > 0 && (
        <NearbyCompanies
          nearby={preparedNearby}
          selectedId={activeNearbyId}
          onSelect={handleNearbyClick}
        />
      )}
    </div>
  )
}

export default CompanyMap
