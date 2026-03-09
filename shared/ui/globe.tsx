"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import createGlobe, { COBEOptions } from "cobe"
import { cn } from "@/shared/lib/utils"
import { GLOBE_CONFIG as GLOBE_UI_CONFIG } from "@/shared/constants/ui"

interface Marker {
  location: [number, number]
  size: number
  label?: string
}

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  scale: 1.5, // Zoom in globe
  markers: [
    { location: [-6.2, 106.8], size: 0.1 }, // Jakarta
    { location: [48.8, 2.3], size: 0.08 }, // Paris
    { location: [35.6, 139.7], size: 0.08 }, // Tokyo
    { location: [37.5, 127.0], size: 0.07 }, // Seoul
    { location: [51.5, -0.1], size: 0.08 }, // London
    { location: [40.7, -74.0], size: 0.08 }, // New York
    { location: [-33.8, 151.2], size: 0.07 }, // Sydney
    { location: [39.9, 116.4], size: 0.07 }, // Beijing
    { location: [25.2, 55.3], size: 0.06 }, // Dubai
    { location: [1.3, 103.8], size: 0.05 }, // Singapore
  ],
}

const COUNTRY_LABELS = [
  { name: "Jakarta", lat: -6.2, lng: 106.8 },
  { name: "Paris", lat: 48.8, lng: 2.3 },
  { name: "Tokyo", lat: 35.6, lng: 139.7 },
  { name: "Seoul", lat: 37.5, lng: 127.0 },
  { name: "London", lat: 51.5, lng: -0.1 },
  { name: "New York", lat: 40.7, lng: -74.0 },
  { name: "Sydney", lat: -33.8, lng: 151.2 },
  { name: "Beijing", lat: 39.9, lng: 116.4 },
  { name: "Dubai", lat: 25.2, lng: 55.3 },
  { name: "Singapore", lat: 1.3, lng: 103.8 },
]

// Extended country list for the new globe component
const SUPPORTED_COUNTRIES = [
  { name: "Selandia Baru", flag: "🇳🇿", lat: -40.9, lng: 174.9 },
  { name: "Palau", flag: "🇵🇼", lat: 7.5, lng: 134.6 },
  { name: "Papua Nugini", flag: "🇵🇬", lat: -6.3, lng: 143.9 },
  { name: "Samoa", flag: "🇼🇸", lat: -13.8, lng: -172.1 },
  { name: "Kepulauan Solomon", flag: "🇸🇧", lat: -9.6, lng: 160.2 },
  { name: "Tonga", flag: "🇹🇴", lat: -21.2, lng: -175.2 },
  { name: "Hong Kong", flag: "🇭🇰", lat: 22.3, lng: 114.2 },
  { name: "Afganistan", flag: "🇦🇫", lat: 33.9, lng: 67.7 },
  { name: "Bangladesh", flag: "🇧🇩", lat: 23.8, lng: 90.4 },
  { name: "Bhutan", flag: "🇧🇹", lat: 27.5, lng: 90.4 },
  { name: "India", flag: "🇮🇳", lat: 20.6, lng: 78.9 },
  { name: "Maladewa", flag: "🇲🇻", lat: 3.2, lng: 73.2 },
  { name: "Nepal", flag: "🇳🇵", lat: 28.4, lng: 84.1 },
  { name: "Pakistan", flag: "🇵🇰", lat: 30.4, lng: 69.3 },
  { name: "Belarus", flag: "🇧🇾", lat: 53.7, lng: 27.9 },
  { name: "Belgia", flag: "🇧🇪", lat: 50.5, lng: 4.5 },
  { name: "Bosnia dan Herzegovina", flag: "🇧🇦", lat: 43.9, lng: 17.7 },
  { name: "Bulgaria", flag: "🇧🇬", lat: 42.7, lng: 25.5 },
  { name: "Kroasia", flag: "🇭🇷", lat: 45.1, lng: 15.2 },
  { name: "Siprus", flag: "🇨🇾", lat: 35.1, lng: 33.4 },
  { name: "Republik Ceko", flag: "🇨🇿", lat: 49.8, lng: 15.5 },
  { name: "El Salvador", flag: "🇸🇻", lat: 13.8, lng: -88.9 },
  { name: "Guatemala", flag: "🇬🇹", lat: 15.8, lng: -90.2 },
  { name: "Honduras", flag: "🇭🇳", lat: 15.2, lng: -86.2 },
  { name: "Nikaragua", flag: "🇳🇮", lat: 12.9, lng: -85.2 },
  { name: "Panama", flag: "🇵🇦", lat: 8.5, lng: -80.8 },
  { name: "Antigua dan Barbuda", flag: "🇦🇬", lat: 17.1, lng: -61.8 },
  { name: "Bahama", flag: "🇧🇸", lat: 25.0, lng: -77.4 },
  { name: "Burkina Faso", flag: "🇧🇫", lat: 12.2, lng: -1.6 },
  { name: "Burundi", flag: "🇧🇮", lat: -3.4, lng: 29.9 },
  { name: "Kamerun", flag: "🇨🇲", lat: 7.4, lng: 12.4 },
  { name: "Tanjung Verde", flag: "🇨🇻", lat: 16.0, lng: -24.0 },
  { name: "Republik Afrika Tengah", flag: "🇨🇫", lat: 6.6, lng: 20.9 },
  { name: "Chad", flag: "🇹🇩", lat: 15.5, lng: 18.7 },
]

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string
  config?: COBEOptions
}) {
  let phi = 0
  let width = 0
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)
  const [r, setR] = useState(0)
  const [labelPositions, setLabelPositions] = useState<Array<{ x: number; y: number; name: string; visible: boolean }>>([])

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab"
    }
  }

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta
      setR(delta / 200)
    }
  }

  const projectToScreen = (lat: number, lng: number, phi: number, theta: number) => {
    const latRad = (lat * Math.PI) / 180
    const lngRad = (lng * Math.PI) / 180
    
    const x = Math.cos(latRad) * Math.sin(lngRad - phi)
    const y = Math.sin(latRad) * Math.cos(theta) - Math.cos(latRad) * Math.cos(lngRad - phi) * Math.sin(theta)
    const z = Math.sin(latRad) * Math.sin(theta) + Math.cos(latRad) * Math.cos(lngRad - phi) * Math.cos(theta)
    
    const visible = z > 0
    
    return {
      x: (x + 1) * width / 2,
      y: (1 - y) * width / 2,
      visible
    }
  }

  const onRender = useCallback(
    (state: Record<string, any>) => {
      if (pointerInteracting.current === null) phi += 0.005
      state.phi = phi + r
      state.width = width * 2
      state.height = width * 2

      // Update label positions
      const newPositions = COUNTRY_LABELS.map(label => {
        const pos = projectToScreen(label.lat, label.lng, state.phi, state.theta)
        return {
          x: pos.x,
          y: pos.y,
          name: label.name,
          visible: pos.visible
        }
      })
      setLabelPositions(newPositions)
    },
    [r]
  )

  const onResize = () => {
    if (canvasRef.current) {
      width = canvasRef.current.offsetWidth
    }
  }

  useEffect(() => {
    window.addEventListener("resize", onResize)
    onResize()

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender,
    })

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1"
      }
    })

    return () => globe.destroy()
  }, [config, onRender])

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]",
        className
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        )}
        ref={canvasRef}
        onPointerDown={(e) =>
          updatePointerInteraction(
            e.clientX - pointerInteractionMovement.current
          )
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
      
      {/* Country Labels Overlay */}
      {labelPositions.map((label, idx) => (
        label.visible && (
          <div
            key={idx}
            className="absolute pointer-events-none"
            style={{
              left: `${label.x}px`,
              top: `${label.y}px`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="bg-orange text-white px-2 py-1 rounded-md text-[10px] font-poppins font-semibold whitespace-nowrap shadow-lg">
              {label.name}
            </div>
          </div>
        )
      ))}
    </div>
  )
}

// New Globe component with country labels displayed on the globe
export function GlobeWithCountries({
  className,
  interactive = true,
}: {
  className?: string
  interactive?: boolean
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)
  const phiRef = useRef(0)
  const widthRef = useRef(0)
  const [r, setR] = useState(0)
  const [labelPositions, setLabelPositions] = useState<Array<{ x: number; y: number; name: string; flag: string; visible: boolean; z: number; index: number }>>([])

  const updatePointerInteraction = (value: number | null) => {
    if (!interactive) return
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab"
    }
  }

  const updateMovement = (clientX: number) => {
    if (!interactive) return
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta
      setR(delta / 200)
    }
  }

  const projectToScreen = useCallback((lat: number, lng: number, phi: number, theta: number) => {
    const latRad = (lat * Math.PI) / 180
    const lngRad = (lng * Math.PI) / 180
    
    const x = Math.cos(latRad) * Math.sin(lngRad - phi)
    const y = Math.sin(latRad) * Math.cos(theta) - Math.cos(latRad) * Math.cos(lngRad - phi) * Math.sin(theta)
    const z = Math.sin(latRad) * Math.sin(theta) + Math.cos(latRad) * Math.cos(lngRad - phi) * Math.cos(theta)
    
    const visible = z > 0.15
    const width = widthRef.current
    
    return {
      x: (x + 1) * width / 2,
      y: (1 - y) * width / 2,
      visible,
      z
    }
  }, [])

  // Check if two labels overlap
  const checkOverlap = (pos1: { x: number; y: number }, pos2: { x: number; y: number }) => {
    const dx = pos1.x - pos2.x
    const dy = pos1.y - pos2.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    return distance < GLOBE_UI_CONFIG.LABEL_MIN_DISTANCE;
  }

  const onRender = useCallback(
    (state: Record<string, any>) => {
      if (pointerInteracting.current === null) phiRef.current += GLOBE_UI_CONFIG.ROTATION_SPEED;
      state.phi = phiRef.current + r;
      state.width = widthRef.current * 2;
      state.height = widthRef.current * 2;

      // Update label positions for supported countries
      const allPositions = SUPPORTED_COUNTRIES.map((country, idx) => {
        const pos = projectToScreen(country.lat, country.lng, state.phi, state.theta)
        return {
          x: pos.x,
          y: pos.y,
          name: country.name,
          flag: country.flag,
          visible: pos.visible,
          z: pos.z,
          index: idx
        }
      })

      // Sort by z-index (closer to viewer = higher priority)
      const sortedPositions = allPositions
        .filter(p => p.visible)
        .sort((a, b) => b.z - a.z)

      // Filter out overlapping labels (keep only higher priority ones)
      const nonOverlappingPositions: typeof allPositions = []
      for (const pos of sortedPositions) {
        const hasOverlap = nonOverlappingPositions.some(existing => 
          checkOverlap(pos, existing)
        )
        if (!hasOverlap) {
          nonOverlappingPositions.push(pos)
        }
      }

      setLabelPositions(nonOverlappingPositions)
    },
    [r, projectToScreen]
  )

  const onResize = useCallback(() => {
    if (canvasRef.current) {
      widthRef.current = canvasRef.current.offsetWidth
    }
  }, [])

  // Remove markers (no dots on globe)
  const markers: Array<{ location: [number, number]; size: number }> = []

  const globeConfig: COBEOptions = {
    ...GLOBE_CONFIG,
    markers,
    onRender,
  }

  useEffect(() => {
    window.addEventListener("resize", onResize)
    onResize()

    const globe = createGlobe(canvasRef.current!, {
      ...globeConfig,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
    })

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1"
      }
    }, 100)

    return () => {
      window.removeEventListener("resize", onResize)
      globe.destroy()
    }
  }, [r, onResize])

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]",
        className
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]",
          !interactive && "pointer-events-none cursor-default"
        )}
        ref={canvasRef}
        onPointerDown={(e) =>
          interactive && updatePointerInteraction(
            e.clientX - pointerInteractionMovement.current
          )
        }
        onPointerUp={() => interactive && updatePointerInteraction(null)}
        onPointerOut={() => interactive && updatePointerInteraction(null)}
        onMouseMove={(e) => interactive && updateMovement(e.clientX)}
        onTouchMove={(e) =>
          interactive && e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
      
      {/* Country Labels Overlay on Globe - Anti-overlap system */}
      {labelPositions.map((label) => (
        <div
          key={label.index}
          className="absolute pointer-events-none transition-all duration-200"
          style={{
            left: `${label.x}px`,
            top: `${label.y}px`,
            transform: 'translate(-50%, -50%)',
            opacity: label.visible ? 1 : 0,
          }}
        >
          <div className="flex items-center gap-1 bg-white/95 backdrop-blur-sm text-navy px-2 py-0.5 rounded-md text-[9px] font-dm-sans font-medium whitespace-nowrap shadow-md border border-orange/30 hover:bg-orange hover:text-white hover:scale-105 transition-all duration-200">
            <span className="text-[10px]">{label.flag}</span>
            <span>{label.name}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
