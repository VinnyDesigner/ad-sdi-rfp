import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Compass, Layers, Maximize2 } from 'lucide-react';

interface InteractiveMapProps {
  mode?: 'catalogue' | 'parcels' | 'geoai' | 'schools-buffer' | 'simple';
  highlightedId?: string | number | null;
  onSelectFeature?: (id: string) => void;
  className?: string;
  isDarkTheme?: boolean;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  mode = 'catalogue',
  highlightedId = null,
  onSelectFeature,
  className = '',
  isDarkTheme = false,
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeLayer, setActiveLayer] = useState<'all' | 'mangroves' | 'cadastre' | 'imagery'>('all');
  const [tooltip, setTooltip] = useState<{ x: number; y: number; title: string; subtitle: string } | null>(null);

  // Basemap styling
  const waterColor = isDarkTheme ? '#0A1726' : '#DCE8F5';
  const landColor = isDarkTheme ? '#14253D' : '#F1F4F8';
  const islandBorder = isDarkTheme ? '#243C60' : '#CBD8E6';
  const roadColor = isDarkTheme ? '#233959' : '#FFFFFF';
  const primaryRoad = isDarkTheme ? '#32527D' : '#E2EAF4';

  return (
    <div className={`relative w-full h-full overflow-hidden select-none bg-canvas ${className}`}>
      {/* SVG GIS Vector Map */}
      <svg
        viewBox="0 0 800 600"
        className="w-full h-full object-cover transition-transform duration-300"
        style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
      >
        <defs>
          {/* Subtle grid pattern for cartographic feel */}
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke={isDarkTheme ? 'rgba(255,255,255,0.03)' : 'rgba(11,37,69,0.03)'}
              strokeWidth="0.8"
            />
          </pattern>

          {/* Mangrove Pattern */}
          <pattern id="mangrovePattern" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="8" cy="8" r="2" fill="#0E9F8E" opacity="0.6" />
          </pattern>

          {/* Linear Gradient for Water Bathymetry */}
          <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={waterColor} />
            <stop offset="100%" stopColor={isDarkTheme ? '#07101B' : '#CFE0F0'} />
          </linearGradient>
        </defs>

        {/* 1. Sea & Background */}
        <rect width="800" height="600" fill="url(#waterGrad)" />
        <rect width="800" height="600" fill="url(#grid)" />

        {/* 2. Coastal Bathymetry lines */}
        <path
          d="M 50 180 Q 220 230 380 200 T 700 160"
          fill="none"
          stroke={isDarkTheme ? '#182C49' : '#BFD5EC'}
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <path
          d="M 20 290 Q 200 360 410 320 T 780 280"
          fill="none"
          stroke={isDarkTheme ? '#182C49' : '#BFD5EC'}
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* 3. Authentic Abu Dhabi Landmasses */}
        {/* Main Mainland Shoreline */}
        <path
          d="M 0 350 Q 150 360 300 380 T 600 420 L 800 450 L 800 600 L 0 600 Z"
          fill={landColor}
          stroke={islandBorder}
          strokeWidth="1.5"
        />

        {/* Abu Dhabi Island (Center/Left) */}
        <path
          d="M 160 270 C 190 230 260 220 310 240 C 350 260 370 310 340 350 C 310 390 230 390 180 360 C 140 330 140 290 160 270 Z"
          fill={landColor}
          stroke={islandBorder}
          strokeWidth="1.5"
        />

        {/* Al Reem Island */}
        <path
          d="M 330 190 C 350 170 390 170 410 190 C 430 210 420 240 390 250 C 360 250 340 230 330 190 Z"
          fill={landColor}
          stroke={islandBorder}
          strokeWidth="1.2"
        />

        {/* Al Maryah Island (Financial Free Zone) */}
        <path
          d="M 315 210 C 325 195 345 195 350 210 C 355 225 345 240 335 240 C 325 240 310 225 315 210 Z"
          fill={landColor}
          stroke={islandBorder}
          strokeWidth="1.2"
        />

        {/* Saadiyat Island (Cultural District) */}
        <path
          d="M 360 110 C 410 90 490 110 520 140 C 550 170 530 210 480 210 C 430 210 390 190 360 160 C 340 140 340 120 360 110 Z"
          fill={landColor}
          stroke={islandBorder}
          strokeWidth="1.5"
        />

        {/* Yas Island (North East) */}
        <path
          d="M 520 80 C 580 60 650 80 670 120 C 690 160 660 210 610 210 C 560 210 530 170 510 140 C 500 110 500 90 520 80 Z"
          fill={landColor}
          stroke={islandBorder}
          strokeWidth="1.5"
        />

        {/* Eastern Mangroves Protected Lagoon */}
        <path
          d="M 320 290 Q 370 270 410 300 T 440 360 Q 390 380 340 360 Z"
          fill={isDarkTheme ? 'rgba(14, 159, 142, 0.25)' : 'rgba(14, 159, 142, 0.2)'}
          stroke="#0E9F8E"
          strokeWidth="1.2"
          strokeDasharray="2 2"
        />

        {/* Highway Arteries (Sheikh Zayed Bridge, Maqta, Salam St, E11, E10) */}
        <path
          d="M 180 340 L 330 330 L 440 370 L 620 400 L 780 430"
          fill="none"
          stroke={primaryRoad}
          strokeWidth="3"
        />
        <path
          d="M 280 250 L 340 220 L 400 170 L 520 140 L 600 130"
          fill="none"
          stroke={primaryRoad}
          strokeWidth="2.5"
        />
        <path
          d="M 330 330 L 350 250 L 370 200"
          fill="none"
          stroke={roadColor}
          strokeWidth="1.8"
        />

        {/* Mode Specific Vector Overlays */}
        {/* CATALOGUE SEARCH MODE: Footprints */}
        {mode === 'catalogue' && (
          <g id="catalogue-footprints">
            {/* Mangrove Habitat Extent 2027 (EAD) */}
            <path
              d="M 325 285 Q 365 265 415 295 T 445 355 Q 385 375 335 355 Z"
              fill={highlightedId === 1 ? 'rgba(31, 95, 173, 0.45)' : 'rgba(14, 159, 142, 0.22)'}
              stroke={highlightedId === 1 ? '#1F5FAD' : '#0E9F8E'}
              strokeWidth={highlightedId === 1 ? '2.5' : '1.5'}
              className="cursor-pointer transition-all"
              onMouseEnter={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setTooltip({ x: rect.left + 50, y: rect.top - 10, title: 'Mangrove Habitat Extent 2027', subtitle: 'EAD · 4,120 ha · Validated' });
              }}
              onMouseLeave={() => setTooltip(null)}
              onClick={() => onSelectFeature && onSelectFeature('1')}
            />

            {/* Coastal Protected Areas (EAD) - Card 2 Hovered Footprint */}
            <path
              d="M 460 120 C 510 110 540 140 520 180 C 490 200 450 170 460 120 Z"
              fill="rgba(31, 95, 173, 0.38)"
              stroke="#1F5FAD"
              strokeWidth="2.5"
              className="cursor-pointer transition-all"
              onMouseEnter={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setTooltip({ x: rect.left + 40, y: rect.top - 10, title: 'Coastal Protected Areas', subtitle: 'EAD · Marine Biosphere Reserve' });
              }}
              onMouseLeave={() => setTooltip(null)}
              onClick={() => onSelectFeature && onSelectFeature('2')}
            />

            {/* Mangrove Planting Sites (EAD) */}
            <circle cx="390" cy="310" r="14" fill="rgba(93, 170, 58, 0.4)" stroke="#5DAA3A" strokeWidth="1.5" />
            <circle cx="420" cy="330" r="10" fill="rgba(93, 170, 58, 0.4)" stroke="#5DAA3A" strokeWidth="1.5" />
            <circle cx="490" cy="160" r="16" fill="rgba(93, 170, 58, 0.4)" stroke="#5DAA3A" strokeWidth="1.5" />

            {/* Dashed Gold Polygon for "Draw Area" filter */}
            <polygon
              points="280,240 480,220 540,360 310,390"
              fill="rgba(255, 194, 14, 0.08)"
              stroke="#FFC20E"
              strokeWidth="2"
              strokeDasharray="6 4"
            />
          </g>
        )}

        {/* PARCELS CADASTRE MODE: Khalifa City parcel grid */}
        {mode === 'parcels' && (
          <g id="parcels-layer">
            {/* Urban block structure */}
            {Array.from({ length: 7 }).map((_, r) =>
              Array.from({ length: 9 }).map((_, c) => {
                const isSelected = r === 3 && c === 4;
                const px = 200 + c * 48;
                const py = 160 + r * 38;
                return (
                  <rect
                    key={`${r}-${c}`}
                    x={px}
                    y={py}
                    width="42"
                    height="32"
                    rx="3"
                    fill={isSelected ? '#1F5FAD' : isDarkTheme ? 'rgba(31, 95, 173, 0.15)' : 'rgba(31, 95, 173, 0.08)'}
                    stroke={isSelected ? '#FFC20E' : '#1F5FAD'}
                    strokeWidth={isSelected ? '2.5' : '1'}
                    className="cursor-pointer hover:fill-blue-500/30 transition-colors"
                  />
                );
              })
            )}
            <text x="392" y="300" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">
              PARCEL 0482
            </text>
          </g>
        )}

        {/* SCHOOLS BUFFER MODE (S07): Al Ain road buffer & schools */}
        {mode === 'schools-buffer' && (
          <g id="schools-buffer-layer">
            {/* Al Ain Major Arterial Roads in Amber */}
            <path
              d="M 120 180 L 320 280 L 520 260 L 720 340"
              fill="none"
              stroke="#E8A317"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M 320 100 L 320 280 L 420 500"
              fill="none"
              stroke="#E8A317"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* 500m Buffer Zone: Translucent Amber */}
            <path
              d="M 115 155 L 315 255 L 515 235 L 725 315 L 715 365 L 525 285 L 325 305 L 125 205 Z"
              fill="rgba(232, 163, 23, 0.22)"
              stroke="#E8A317"
              strokeWidth="1.5"
              strokeDasharray="4 2"
            />

            {/* District Boundary Outlines (Grey dashed) */}
            <polygon
              points="100,120 360,80 400,320 120,380"
              fill="none"
              stroke="#7A9CC6"
              strokeWidth="1.5"
              strokeDasharray="5 5"
            />
            <polygon
              points="360,80 680,100 740,380 400,320"
              fill="none"
              stroke="#7A9CC6"
              strokeWidth="1.5"
              strokeDasharray="5 5"
            />
            <text x="210" y="160" fill="#5B6B7F" fontSize="12" fontWeight="600">
              Al Jimi District
            </text>
            <text x="520" y="160" fill="#5B6B7F" fontSize="12" fontWeight="600">
              Al Muwaiji District
            </text>

            {/* Schools: Purple Points (#7B4FD6) */}
            {[
              { x: 240, y: 220, name: 'Al Ain Academy' },
              { x: 290, y: 260, name: 'Al Dhafra Private School' },
              { x: 340, y: 270, name: 'Liwa International School' },
              { x: 440, y: 270, name: 'Brighton College Al Ain' },
              { x: 490, y: 250, name: 'Al Ain English Speaking School' },
              { x: 380, y: 360, name: 'Global English School' },
              { x: 310, y: 190, name: 'Emirates National Schools' },
              { x: 560, y: 290, name: 'Al Khalil Model School' },
            ].map((sch, sidx) => (
              <g key={sidx} className="cursor-pointer">
                <circle cx={sch.x} cy={sch.y} r="7" fill="#7B4FD6" stroke="#FFFFFF" strokeWidth="2" />
                <circle cx={sch.x} cy={sch.y} r="12" fill="#7B4FD6" opacity="0.25" />
              </g>
            ))}
          </g>
        )}
      </svg>

      {/* Floating Map Controls (Top Right) */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        <div className="bg-white/95 dark:bg-[#13233D]/95 backdrop-blur rounded-lg border border-border dark:border-white/10 shadow-level-1 p-1 flex flex-col gap-1">
          <button
            onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 2.5))}
            className="w-8 h-8 rounded flex items-center justify-center text-secondaryText hover:text-navy-900 hover:bg-canvas dark:text-steel-400 dark:hover:text-white transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 0.75))}
            className="w-8 h-8 rounded flex items-center justify-center text-secondaryText hover:text-navy-900 hover:bg-canvas dark:text-steel-400 dark:hover:text-white transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            className="w-8 h-8 rounded flex items-center justify-center text-secondaryText hover:text-navy-900 hover:bg-canvas dark:text-steel-400 dark:hover:text-white transition-colors"
            title="Reset North"
          >
            <Compass className="w-4 h-4 text-gold-500" />
          </button>
        </div>
      </div>

      {/* Map Legend (Bottom Left) */}
      <div className="absolute bottom-4 left-4 z-10 bg-white/95 dark:bg-[#13233D]/95 backdrop-blur-md rounded-lg border border-border dark:border-white/10 px-3.5 py-2.5 shadow-level-1 text-[11px] space-y-1.5">
        <div className="font-semibold text-primaryText dark:text-white flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-blue-600 dark:text-gold-500" />
          <span>Active Layers & Legend</span>
        </div>
        <div className="flex items-center gap-4 text-secondaryText dark:text-steel-400">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-2 rounded-sm bg-[#0E9F8E]"></span>
            <span>Mangrove Habitats</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-2 rounded-sm bg-blue-600"></span>
            <span>Selected Footprint</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-2 rounded-sm border border-gold-500 border-dashed bg-gold-500/20"></span>
            <span>Draw Area</span>
          </div>
        </div>
      </div>

      {/* Scale Bar, Coordinates & Attribution (Bottom Right) */}
      <div className="absolute bottom-4 right-4 z-10 flex items-center gap-3 bg-white/90 dark:bg-[#13233D]/90 backdrop-blur rounded px-3 py-1.5 border border-border dark:border-white/10 text-[10px] font-mono text-secondaryText dark:text-steel-400">
        <div className="flex items-center gap-1 border-r border-border dark:border-white/10 pr-2.5">
          <div className="w-12 h-1 bg-navy-900 dark:bg-white flex justify-between">
            <div className="w-[1px] h-2 bg-navy-900 dark:bg-white -mt-0.5"></div>
            <div className="w-[1px] h-2 bg-navy-900 dark:bg-white -mt-0.5"></div>
          </div>
          <span className="ml-1 font-bold">5 km</span>
        </div>
        <div className="border-r border-border dark:border-white/10 pr-2.5">
          <span>24.4539° N, 54.3773° E</span>
        </div>
        <div>
          <span>WGS 84 / UTM 40N · DGE AD-SDI</span>
        </div>
      </div>

      {/* Tooltip Overlay */}
      {tooltip && (
        <div
          className="absolute z-20 pointer-events-none bg-navy-900 text-white rounded-md px-2.5 py-1.5 shadow-level-2 text-left"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <div className="text-[12px] font-semibold text-white">{tooltip.title}</div>
          <div className="text-[10px] text-steel-400">{tooltip.subtitle}</div>
        </div>
      )}
    </div>
  );
};
