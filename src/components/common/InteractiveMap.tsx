import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import {
  ZoomIn,
  ZoomOut,
  Compass,
  Layers,
  Maximize2,
  Minimize2,
  ExternalLink,
  MapPin,
  Trees,
  Shield,
  Building2,
  GraduationCap,
  Sparkles,
  Search,
  CheckCircle2,
  Sliders,
  Eye,
  Info,
} from 'lucide-react';

export interface InteractiveMapProps {
  mode?: 'catalogue' | 'parcels' | 'geoai' | 'schools-buffer' | 'digital-twin' | 'simple';
  highlightedId?: string | number | null;
  onSelectFeature?: (id: string) => void;
  className?: string;
  isDarkTheme?: boolean;
  opacityMangroves?: number;
  opacityProtected?: number;
  opacityImagery?: number;
  swipePosition?: number;
  showSearchThisArea?: boolean;
  onSearchThisArea?: () => void;
  onOpenViewer?: () => void;
  height?: string;
  center?: [number, number];
  zoom?: number;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
  hideLegend?: boolean;
}

type BasemapType = 'satellite' | 'streets' | 'dark' | 'topo';

const BASEMAP_TILES: Record<BasemapType, { url: string; attribution: string; maxZoom: number }> = {
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Earthstar Geographics',
    maxZoom: 19,
  },
  streets: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; OpenStreetMap, Garmin',
    maxZoom: 19,
  },
  dark: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; HERE, Garmin',
    maxZoom: 18,
  },
  topo: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; USGS, NGA',
    maxZoom: 19,
  },
};

// Abu Dhabi coordinates
const ABU_DHABI_CENTER: [number, number] = [24.4539, 54.3773];
const MANGROVES_CENTER: [number, number] = [24.4440, 54.4250];
const KHALIFA_CITY_CENTER: [number, number] = [24.4170, 54.5820];
const AL_AIN_CENTER: [number, number] = [24.2150, 55.7450];
const GEOAI_CENTER: [number, number] = [24.4500, 54.5400];

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  mode = 'catalogue',
  highlightedId = null,
  onSelectFeature,
  className = '',
  isDarkTheme = false,
  opacityMangroves = 85,
  opacityProtected = 65,
  opacityImagery = 100,
  swipePosition = 50,
  showSearchThisArea = true,
  onSearchThisArea,
  onOpenViewer,
  center: customCenter,
  zoom: customZoom,
  isFullscreen,
  onToggleFullscreen,
  hideLegend = false,
}) => {
  const rootContainerRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const vectorLayerGroupRef = useRef<L.LayerGroup | null>(null);

  const [activeBasemap, setActiveBasemap] = useState<BasemapType>(
    isDarkTheme ? 'dark' : mode === 'schools-buffer' ? 'streets' : 'satellite'
  );
  const [showBasemapPicker, setShowBasemapPicker] = useState(false);
  const [coordinates, setCoordinates] = useState<string>('24.4539° N, 54.3773° E');
  const [currentZoom, setCurrentZoom] = useState<number>(customZoom || 12);
  const [selectedParcel, setSelectedParcel] = useState<any | null>(null);
  const [internalFullscreen, setInternalFullscreen] = useState(false);

  const effectiveFullscreen = isFullscreen !== undefined ? isFullscreen : internalFullscreen;

  const handleToggleFullscreen = async () => {
    const isCurrentlyFullscreen = !!document.fullscreenElement || effectiveFullscreen;

    try {
      if (!isCurrentlyFullscreen) {
        const el = rootContainerRef.current || mapContainerRef.current?.parentElement || document.documentElement;
        if (el.requestFullscreen) {
          await el.requestFullscreen();
        } else if ((el as any).webkitRequestFullscreen) {
          await (el as any).webkitRequestFullscreen();
        }
      } else {
        if (document.fullscreenElement) {
          if (document.exitFullscreen) {
            await document.exitFullscreen();
          } else if ((document as any).webkitExitFullscreen) {
            await (document as any).webkitExitFullscreen();
          }
        }
      }
    } catch (err) {
      console.warn('Native requestFullscreen failed or blocked (using viewport fallback):', err);
    }

    if (onToggleFullscreen) {
      onToggleFullscreen();
    } else {
      setInternalFullscreen((prev) => !prev);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      const isFs = !!document.fullscreenElement;
      setInternalFullscreen(isFs);
      if (!isFs && isFullscreen && onToggleFullscreen) {
        onToggleFullscreen();
      }
      setTimeout(() => {
        mapInstanceRef.current?.invalidateSize();
      }, 150);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, [isFullscreen, onToggleFullscreen]);

  // Handle Escape key for exiting fullscreen in all modes (native & viewport fallback)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && effectiveFullscreen) {
        if (document.fullscreenElement) {
          if (document.exitFullscreen) {
            document.exitFullscreen().catch(() => {});
          } else if ((document as any).webkitExitFullscreen) {
            (document as any).webkitExitFullscreen();
          }
        }
        if (isFullscreen !== undefined && onToggleFullscreen) {
          onToggleFullscreen();
        } else {
          setInternalFullscreen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [effectiveFullscreen, isFullscreen, onToggleFullscreen]);

  // When fullscreen changes or window resizes, invalidate Leaflet map dimensions
  useEffect(() => {
    const t1 = setTimeout(() => mapInstanceRef.current?.invalidateSize(), 50);
    const t2 = setTimeout(() => mapInstanceRef.current?.invalidateSize(), 150);
    const t3 = setTimeout(() => mapInstanceRef.current?.invalidateSize(), 300);
    const t4 = setTimeout(() => mapInstanceRef.current?.invalidateSize(), 600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [effectiveFullscreen]);

  // Determine initial center and zoom per mode
  const getInitialView = (): { center: [number, number]; zoom: number } => {
    if (customCenter && customZoom) {
      return { center: customCenter, zoom: customZoom };
    }
    if (customCenter) {
      return { center: customCenter, zoom: 12 };
    }
    switch (mode) {
      case 'parcels':
        return { center: KHALIFA_CITY_CENTER, zoom: 16 };
      case 'schools-buffer':
        return { center: AL_AIN_CENTER, zoom: 13 };
      case 'geoai':
        return { center: GEOAI_CENTER, zoom: 15 };
      case 'digital-twin':
        return { center: [24.4990, 54.3890], zoom: 14 };
      case 'catalogue':
      default:
        return { center: MANGROVES_CENTER, zoom: 12 };
    }
  };

  // 1. Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Check if map already initialized
    if (!mapInstanceRef.current) {
      const { center, zoom } = getInitialView();

      const map = L.map(mapContainerRef.current, {
        center,
        zoom,
        zoomControl: false,
        attributionControl: false,
      });

      mapInstanceRef.current = map;

      // Add Base Tile Layer
      const baseCfg = BASEMAP_TILES[activeBasemap];
      const tileLayer = L.tileLayer(baseCfg.url, {
        attribution: baseCfg.attribution,
        maxZoom: baseCfg.maxZoom,
        opacity: opacityImagery / 100,
        subdomains: 'abcd',
      }).addTo(map);
      tileLayerRef.current = tileLayer;

      // Vector group
      const vectorGroup = L.layerGroup().addTo(map);
      vectorLayerGroupRef.current = vectorGroup;

      // Track coordinates on mousemove
      map.on('mousemove', (e: L.LeafletMouseEvent) => {
        const lat = e.latlng.lat.toFixed(4);
        const lng = e.latlng.lng.toFixed(4);
        setCoordinates(`${lat}° N, ${lng}° E`);
      });

      // Track zoom level
      map.on('zoomend', () => {
        setCurrentZoom(map.getZoom());
      });

      // Invalidate size once rendered
      setTimeout(() => {
        map.invalidateSize();
      }, 250);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // 2. Handle Basemap Change
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    const baseCfg = BASEMAP_TILES[activeBasemap];
    const newTileLayer = L.tileLayer(baseCfg.url, {
      attribution: baseCfg.attribution,
      maxZoom: baseCfg.maxZoom,
      opacity: opacityImagery / 100,
      subdomains: 'abcd',
    }).addTo(map);

    tileLayerRef.current = newTileLayer;
    newTileLayer.bringToBack();
  }, [activeBasemap, opacityImagery]);

  // 3. Render Vector Features based on mode & highlight
  useEffect(() => {
    if (!mapInstanceRef.current || !vectorLayerGroupRef.current) return;
    const map = mapInstanceRef.current;
    const group = vectorLayerGroupRef.current;
    group.clearLayers();

    // Custom pulse marker creator
    const createPulsingMarker = (latlng: [number, number], title: string, subtitle: string, color: string) => {
      const customIcon = L.divIcon({
        className: 'custom-leaflet-pin',
        html: `
          <div class="relative flex items-center justify-center">
            <span class="animate-ping absolute inline-flex h-6 w-6 rounded-full opacity-75" style="background-color: ${color}"></span>
            <span class="relative inline-flex rounded-full h-4 w-4 border-2 border-white shadow-md items-center justify-center" style="background-color: ${color}"></span>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const marker = L.marker(latlng, { icon: customIcon }).addTo(group);
      marker.bindPopup(`
        <div class="p-2 font-sans text-left min-w-[180px]">
          <div class="font-bold text-[13px] text-slate-900">${title}</div>
          <div class="text-[11px] text-slate-500 mt-0.5">${subtitle}</div>
        </div>
      `);
      return marker;
    };

    // MODE: CATALOGUE
    if (mode === 'catalogue') {
      const isMangroveSelected = highlightedId === 1 || highlightedId === '1';
      const isProtectedSelected = highlightedId === 2 || highlightedId === '2';

      // 1. Mangrove Extent 2024 Polygon (Eastern Mangroves Lagoon)
      const mangroveCoords: [number, number][] = [
        [24.4420, 54.4150],
        [24.4550, 54.4280],
        [24.4590, 54.4420],
        [24.4510, 54.4590],
        [24.4380, 54.4640],
        [24.4280, 54.4490],
        [24.4290, 54.4260],
        [24.4420, 54.4150],
      ];

      const mangrovePolygon = L.polygon(mangroveCoords, {
        color: isMangroveSelected ? '#FFC20E' : '#10B981',
        weight: isMangroveSelected ? 3.5 : 2,
        fillColor: isMangroveSelected ? '#1F5FAD' : '#0E9F8E',
        fillOpacity: (opacityMangroves / 100) * (isMangroveSelected ? 0.6 : 0.4),
        dashArray: isMangroveSelected ? undefined : '2, 4',
      }).addTo(group);

      mangrovePolygon.bindPopup(`
        <div class="p-2.5 font-sans text-left min-w-[220px]">
          <div class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Authoritative</span>
          </div>
          <h4 class="font-bold text-[13px] text-slate-900 mt-1">Mangrove Habitat Extent 2024</h4>
          <p class="text-[11px] text-slate-500 mt-0.5">Environment Agency – Abu Dhabi (EAD)</p>
          <div class="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span class="text-slate-500">Coverage: <strong>4,120 ha</strong></span>
            <span class="text-emerald-700 font-semibold">100% Validated</span>
          </div>
        </div>
      `);

      mangrovePolygon.on('click', () => {
        if (onSelectFeature) onSelectFeature('1');
      });

      // 2. Jubail Mangrove Park Polygon
      const jubailCoords: [number, number][] = [
        [24.5420, 54.4750],
        [24.5580, 54.4980],
        [24.5510, 54.5260],
        [24.5330, 54.5090],
        [24.5420, 54.4750],
      ];

      L.polygon(jubailCoords, {
        color: '#10B981',
        weight: 2,
        fillColor: '#0E9F8E',
        fillOpacity: (opacityMangroves / 100) * 0.35,
      })
        .addTo(group)
        .bindPopup(`
          <div class="p-2.5 font-sans text-left">
            <h4 class="font-bold text-[13px] text-slate-900">Jubail Mangrove Park Reserve</h4>
            <p class="text-[11px] text-slate-500">Coastal Protected Wetland Sanctuary</p>
          </div>
        `);

      // 3. Coastal Protected Areas (Saadiyat Marine Biosphere)
      const protectedCoords: [number, number][] = [
        [24.5450, 54.4120],
        [24.5750, 54.4380],
        [24.5680, 54.4780],
        [24.5380, 54.4520],
        [24.5450, 54.4120],
      ];

      const protectedPolygon = L.polygon(protectedCoords, {
        color: isProtectedSelected ? '#FFC20E' : '#1F5FAD',
        weight: isProtectedSelected ? 3.5 : 2,
        fillColor: isProtectedSelected ? '#3B82F6' : '#1F5FAD',
        fillOpacity: (opacityProtected / 100) * (isProtectedSelected ? 0.55 : 0.35),
      }).addTo(group);

      protectedPolygon.bindPopup(`
        <div class="p-2.5 font-sans text-left min-w-[220px]">
          <div class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-blue-500"></span>
            <span class="text-[10px] font-bold uppercase tracking-wider text-blue-700">Marine Protected Zone</span>
          </div>
          <h4 class="font-bold text-[13px] text-slate-900 mt-1">Coastal Conservation Area</h4>
          <p class="text-[11px] text-slate-500 mt-0.5">Marawah Marine Biosphere Buffer</p>
        </div>
      `);

      protectedPolygon.on('click', () => {
        if (onSelectFeature) onSelectFeature('2');
      });

      // 4. Planting sites pulse pins
      createPulsingMarker([24.4410, 54.4350], 'Eastern Mangrove Planting Plot A', '12,000 Mangrove Seedlings', '#10B981');
      createPulsingMarker([24.5480, 54.5120], 'Jubail Blue Carbon Restoration', '45,000 Seedlings Planted', '#10B981');

      // 5. Drawn Area Polygon (Gold dashed polygon)
      const drawnAreaCoords: [number, number][] = [
        [24.4720, 54.3750],
        [24.5150, 54.4150],
        [24.4850, 54.4950],
        [24.4250, 54.4450],
      ];
      L.polygon(drawnAreaCoords, {
        color: '#FFC20E',
        weight: 2,
        dashArray: '6, 6',
        fillColor: '#FFC20E',
        fillOpacity: 0.08,
      })
        .addTo(group)
        .bindTooltip('Filter Search Area · 86.4 km²', { permanent: false, direction: 'center' });

      // Fly to highlighted dataset
      if (isMangroveSelected) {
        map.flyTo([24.4440, 54.4350], 12.5, { duration: 1 });
      } else if (isProtectedSelected) {
        map.flyTo([24.5550, 54.4450], 12.5, { duration: 1 });
      }
    }

    // MODE: PARCELS (Cadastral plots)
    else if (mode === 'parcels') {
      const parcelsList = [
        { id: '0482', bounds: [[24.4180, 54.5800], [24.4210, 54.5800], [24.4210, 54.5840], [24.4180, 54.5840]], use: 'Commercial Mixed-Use C25', area: '1,420 m²', owner: 'Abu Dhabi DMT Registered Leasehold' },
        { id: '0480', bounds: [[24.4180, 54.5760], [24.4210, 54.5760], [24.4210, 54.5800], [24.4180, 54.5800]], use: 'Residential Villa R1', area: '980 m²', owner: 'Private Freehold' },
        { id: '0481', bounds: [[24.4180, 54.5840], [24.4210, 54.5840], [24.4210, 54.5880], [24.4180, 54.5880]], use: 'Commercial Office C10', area: '1,150 m²', owner: 'Government Sovereign' },
        { id: '0483', bounds: [[24.4210, 54.5800], [24.4240, 54.5800], [24.4240, 54.5840], [24.4210, 54.5840]], use: 'Public Community Facility', area: '2,200 m²', owner: 'DMT Municipal Reserve' },
        { id: '0484', bounds: [[24.4210, 54.5760], [24.4240, 54.5760], [24.4240, 54.5800], [24.4210, 54.5800]], use: 'Residential Multi-family R3', area: '1,650 m²', owner: 'Private Investment' },
        { id: '0485', bounds: [[24.4210, 54.5840], [24.4240, 54.5840], [24.4240, 54.5880], [24.4210, 54.5880]], use: 'Retail Promenade', area: '1,320 m²', owner: 'DMT Commercial Registry' },
      ];

      parcelsList.forEach((p) => {
        const isFeatured = p.id === '0482';
        const polygon = L.polygon(p.bounds as [number, number][], {
          color: isFeatured ? '#F59E0B' : '#38BDF8',
          weight: isFeatured ? 3.5 : 1.5,
          fillColor: isFeatured ? '#F59E0B' : '#0284C7',
          fillOpacity: isFeatured ? 0.45 : 0.2,
        }).addTo(group);

        polygon.bindPopup(`
          <div class="p-2.5 font-sans text-left min-w-[210px]">
            <div class="flex items-center justify-between">
              <span class="font-mono text-[12px] font-bold text-slate-900">PARCEL ${p.id}</span>
              <span class="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">DMT Authoritative</span>
            </div>
            <div class="text-[11px] text-slate-600 mt-1">Zoning: <strong>${p.use}</strong></div>
            <div class="text-[11px] text-slate-600">Area: <strong>${p.area}</strong></div>
            <div class="text-[10px] text-slate-400 mt-1">${p.owner}</div>
          </div>
        `);

        polygon.on('click', () => {
          setSelectedParcel(p);
          if (onSelectFeature) onSelectFeature(p.id);
        });
      });
    }

    // MODE: SCHOOLS-BUFFER (Al Ain Corridor)
    else if (mode === 'schools-buffer') {
      // 1. Road Arterial Corridor Polyline
      const roadLine: [number, number][] = [
        [24.2450, 55.7100],
        [24.2320, 55.7300],
        [24.2180, 55.7500],
        [24.2020, 55.7750],
        [24.1900, 55.8050],
      ];

      L.polyline(roadLine, {
        color: '#E5A817',
        weight: 6,
        lineCap: 'round',
        opacity: 0.95,
      })
        .addTo(group)
        .bindTooltip('Al Ain Primary Arterial Corridor', { permanent: true, direction: 'top' });

      // 2. 500m Translucent Buffer Corridor
      const bufferCoords: [number, number][] = [
        [24.2480, 55.7060],
        [24.2350, 55.7260],
        [24.2210, 55.7460],
        [24.2050, 55.7710],
        [24.1930, 55.8010],
        [24.1870, 55.8090],
        [24.1990, 55.7790],
        [24.2150, 55.7540],
        [24.2290, 55.7340],
        [24.2420, 55.7140],
      ];

      L.polygon(bufferCoords, {
        color: '#E5A817',
        weight: 2,
        dashArray: '4, 4',
        fillColor: '#E5A817',
        fillOpacity: 0.22,
      }).addTo(group);

      // 3. School Markers
      const schools = [
        { latlng: [24.2260, 55.7380] as [number, number], name: 'Al Ain Academy', cap: 1200, curr: 'British Curriculum (ADEK Band A)', dist: '240 m' },
        { latlng: [24.2180, 55.7480] as [number, number], name: 'Liwa International School', cap: 1650, curr: 'American Curriculum', dist: '180 m' },
        { latlng: [24.2120, 55.7550] as [number, number], name: 'Brighton College Al Ain', cap: 1400, curr: 'British Curriculum', dist: '310 m' },
        { latlng: [24.2310, 55.7280] as [number, number], name: 'Al Dhafra Private School', cap: 950, curr: 'Ministry of Education', dist: '390 m' },
        { latlng: [24.2010, 55.7680] as [number, number], name: 'Global English School', cap: 880, curr: 'CBSE / British', dist: '260 m' },
        { latlng: [24.2420, 55.7150] as [number, number], name: 'Emirates National Schools', cap: 2100, curr: 'IB World School', dist: '420 m' },
      ];

      schools.forEach((sch) => {
        const schoolIcon = L.divIcon({
          className: 'school-icon',
          html: `
            <div class="relative flex items-center justify-center cursor-pointer group">
              <span class="w-8 h-8 rounded-full bg-[#7B4FD6] border-2 border-white shadow-lg flex items-center justify-center text-white transition-transform group-hover:scale-110">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </span>
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });

        L.marker(sch.latlng, { icon: schoolIcon })
          .addTo(group)
          .bindPopup(`
            <div class="p-2.5 font-sans text-left min-w-[210px]">
              <div class="flex items-center gap-1.5 text-purple-700 font-bold text-[10px] uppercase">
                <span>School Facility</span>
              </div>
              <h4 class="font-bold text-[13px] text-slate-900 mt-0.5">${sch.name}</h4>
              <p class="text-[11px] text-slate-500">${sch.curr}</p>
              <div class="mt-2 pt-2 border-t border-slate-100 space-y-0.5 text-[11px]">
                <div>Capacity: <strong>${sch.cap.toLocaleString()} students</strong></div>
                <div>Corridor Distance: <strong class="text-amber-600">${sch.dist} (Inside 500m buffer)</strong></div>
              </div>
            </div>
          `);
      });
    }

    // MODE: GEOAI (AI Detected changes)
    else if (mode === 'geoai') {
      const detections = [
        {
          id: 1,
          type: 'New building',
          bounds: [[24.4510, 54.5370], [24.4550, 54.5370], [24.4550, 54.5430], [24.4510, 54.5430]],
          color: '#7B4FD6',
          area: '1,240 m²',
          conf: '0.96',
          status: 'Pending review',
        },
        {
          id: 2,
          type: 'Extension',
          bounds: [[24.4470, 54.5440], [24.4500, 54.5440], [24.4500, 54.5480], [24.4470, 54.5480]],
          color: '#0E9F8E',
          area: '310 m²',
          conf: '0.92',
          status: 'Verified',
        },
        {
          id: 3,
          type: 'Demolition',
          bounds: [[24.4530, 54.5310], [24.4560, 54.5310], [24.4560, 54.5350], [24.4530, 54.5350]],
          color: '#E07B24',
          area: '580 m²',
          conf: '0.94',
          status: 'Verified',
        },
      ];

      detections.forEach((d) => {
        const poly = L.polygon(d.bounds as [number, number][], {
          color: d.color,
          weight: 2.5,
          fillColor: d.color,
          fillOpacity: 0.45,
        }).addTo(group);

        poly.bindPopup(`
          <div class="p-2.5 font-sans text-left min-w-[200px]">
            <div class="flex items-center gap-1.5 font-bold text-[12px]" style="color: ${d.color}">
              <span class="w-2 h-2 rounded-full" style="background-color: ${d.color}"></span>
              <span>${d.type}</span>
            </div>
            <div class="text-[11px] text-slate-600 mt-1 font-mono space-y-0.5">
              <div>Footprint: <strong>${d.area}</strong></div>
              <div>AI Confidence: <strong class="text-emerald-600">${d.conf}</strong></div>
              <div>Status: <strong>${d.status}</strong></div>
            </div>
          </div>
        `);

        poly.on('click', () => {
          if (onSelectFeature) onSelectFeature(String(d.id));
        });
      });
    }
  }, [mode, highlightedId, opacityMangroves, opacityProtected]);

  // Zoom helpers
  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();
  const handleResetNorth = () => {
    const { center, zoom } = getInitialView();
    mapInstanceRef.current?.setView(center, zoom);
  };

  return (
    <div
      ref={rootContainerRef}
      className={`select-none bg-slate-900 ${
        effectiveFullscreen && !isFullscreen && !document.fullscreenElement
          ? 'fixed inset-0 z-[9999] w-screen h-screen'
          : 'relative w-full h-full overflow-hidden'
      } ${className}`}
    >
      {/* Real Map Canvas DOM */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Floating Search this Area button (Top Left) */}
      {showSearchThisArea && (
        <div className="absolute top-4 left-4 z-20">
          <button
            onClick={() => {
              if (onSearchThisArea) onSearchThisArea();
            }}
            className="h-9 bg-white/95 hover:bg-white text-navy-900 shadow-md backdrop-blur px-3.5 rounded-lg border border-border text-[12px] font-semibold flex items-center gap-2 transition-all cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-steel-500" />
            <span>Search this area</span>
          </button>
        </div>
      )}

      {/* Floating Top-Right Action Controls (Unified 36px horizontal toolbar) */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        {onOpenViewer && (
          <button
            onClick={onOpenViewer}
            className="h-9 bg-white/95 hover:bg-white text-navy-900 shadow-md backdrop-blur px-3 rounded-lg border border-border text-[12px] font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            title="Open full dataset in dedicated map viewer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
            <span>Open in Map Viewer</span>
          </button>
        )}

        {/* Fullscreen Map Toggle Button */}
        <button
          onClick={handleToggleFullscreen}
          className={`w-9 h-9 rounded-lg border shadow-md flex items-center justify-center transition-all cursor-pointer ${
            effectiveFullscreen
              ? 'bg-[#1865C9] text-white border-[#1865C9] hover:bg-[#1453A3]'
              : 'bg-white/95 hover:bg-white text-slate-700 border-border hover:text-[#1865C9]'
          }`}
          title={effectiveFullscreen ? 'Exit Fullscreen Map (Esc)' : 'Fullscreen Map'}
        >
          {effectiveFullscreen ? (
            <Minimize2 className="w-4 h-4" />
          ) : (
            <Maximize2 className="w-4 h-4 text-blue-600" />
          )}
        </button>

        {/* Basemap Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowBasemapPicker(!showBasemapPicker)}
            className="w-9 h-9 bg-white/95 hover:bg-white rounded-lg border border-border shadow-md flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
            title="Switch Basemap (Satellite, Streets, Dark)"
          >
            <Layers className="w-4 h-4 text-blue-600" />
          </button>

          {showBasemapPicker && (
            <div className="absolute right-0 top-11 w-44 bg-white border border-slate-200 rounded-xl shadow-xl p-1.5 z-30 text-[12px] space-y-1">
              <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Select Basemap
              </div>
              {(
                [
                  { id: 'satellite', label: 'Satellite Orthophoto' },
                  { id: 'streets', label: 'Carto Streets (Voyager)' },
                  { id: 'dark', label: 'Dark Canvas' },
                  { id: 'topo', label: 'Topographic' },
                ] as const
              ).map((bm) => (
                <button
                  key={bm.id}
                  onClick={() => {
                    setActiveBasemap(bm.id);
                    setShowBasemapPicker(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                    activeBasemap === bm.id
                      ? 'bg-blue-50 text-blue-700 font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{bm.label}</span>
                  {activeBasemap === bm.id && <span className="text-blue-600 text-[11px]">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Dedicated Zoom & Navigation Controls (Bottom Right, stacked cleanly above coordinates bar) */}
      <div className="absolute bottom-[54px] right-4 z-20 bg-white/95 dark:bg-[#0B2545]/95 backdrop-blur-md rounded-lg border border-border dark:border-white/10 shadow-md flex flex-col p-0.5">
        <button
          onClick={handleZoomIn}
          className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/10 rounded text-slate-700 dark:text-white transition-colors cursor-pointer"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <div className="h-[1px] bg-slate-100 dark:bg-white/10 mx-1" />
        <button
          onClick={handleZoomOut}
          className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/10 rounded text-slate-700 dark:text-white transition-colors cursor-pointer"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <div className="h-[1px] bg-slate-100 dark:bg-white/10 mx-1" />
        <button
          onClick={handleResetNorth}
          className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/10 rounded text-[#E5A817] transition-colors cursor-pointer"
          title="Reset North & Center"
        >
          <Compass className="w-4 h-4" />
        </button>
      </div>

      {/* Floating Bottom Left Legend */}
      {!hideLegend && (
        <div className="absolute bottom-4 left-4 z-20 bg-white/95 dark:bg-[#0B2545]/95 backdrop-blur-md rounded-lg border border-border dark:border-white/10 px-3.5 py-2.5 shadow-md text-[11px] space-y-1.5">
        <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-blue-600 dark:text-[#E5A817]" />
          <span>Active Layers & Legend</span>
        </div>
        <div className="flex items-center gap-4 text-slate-600 dark:text-steel-300">
          {mode === 'catalogue' && (
            <>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-2 rounded-sm bg-[#10B981]"></span>
                <span>Mangrove Habitats</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-2 rounded-sm bg-[#1F5FAD]"></span>
                <span>Protected Marine</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-2 rounded-sm border border-[#E5A817] border-dashed bg-[#E5A817]/20"></span>
                <span>Draw Filter</span>
              </div>
            </>
          )}

          {mode === 'parcels' && (
            <>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-2 rounded-sm bg-[#38BDF8]"></span>
                <span>Cadastral Parcels</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-2 rounded-sm bg-[#F59E0B]"></span>
                <span>Selected Plot</span>
              </div>
            </>
          )}

          {mode === 'schools-buffer' && (
            <>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1.5 bg-[#E5A817]"></span>
                <span>Arterial Corridor</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-2 rounded-sm bg-[#E5A817]/30 border border-[#E5A817]"></span>
                <span>500m Buffer</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7B4FD6]"></span>
                <span>Schools</span>
              </div>
            </>
          )}

          {mode === 'geoai' && (
            <>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-2 rounded-sm bg-[#7B4FD6]"></span>
                <span>New Structure</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-2 rounded-sm bg-[#E07B24]"></span>
                <span>Demolition</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-2 rounded-sm bg-[#0E9F8E]"></span>
                <span>Extension</span>
              </div>
            </>
          )}
        </div>
      </div>
    )}

      {/* Floating Bottom Right Coordinates, Scale & Attribution */}
      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-3 bg-white/95 dark:bg-[#0B2545]/95 backdrop-blur rounded px-3 py-1.5 border border-border dark:border-white/10 text-[10px] font-mono text-slate-600 dark:text-steel-300 shadow-sm">
        <div className="flex items-center gap-1 border-r border-slate-200 dark:border-white/10 pr-2.5">
          <div className="w-10 h-1 bg-slate-800 dark:bg-white flex justify-between">
            <div className="w-[1px] h-2 bg-slate-800 dark:bg-white -mt-0.5"></div>
            <div className="w-[1px] h-2 bg-slate-800 dark:bg-white -mt-0.5"></div>
          </div>
          <span className="ml-1 font-bold">2 km</span>
        </div>
        <div className="border-r border-slate-200 dark:border-white/10 pr-2.5">
          <span>{coordinates}</span>
        </div>
        <div>
          <span>WGS 84 / UTM 40N &middot; DGE AD-SDI</span>
        </div>
      </div>
    </div>
  );
};
