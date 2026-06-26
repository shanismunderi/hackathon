import React, { useMemo, useState } from "react";
import malabarMapUrl from "../assets/malabar_historical_map.png";
import oceanMapUrl from "../assets/indian_ocean_map.png";
import { ATLAS_NODES, ATLAS_ROUTES } from "../mabarData";

interface AtlasViewProps {
  t: any;
  theme: "dark" | "light";
  activeModalContent: any | null;
  setActiveModalContent: React.Dispatch<React.SetStateAction<any | null>>;
  handleNavigation: (view: any) => void;
}

const MALABAR_COORDINATES: Record<string, { x: number; y: number }> = {
  ponnani: { x: 530, y: 480 },
  calicut: { x: 460, y: 280 },
  kannur: { x: 420, y: 160 },
  darul_huda: { x: 480, y: 360 },
  hasanath: { x: 500, y: 390 },
};

const getRouteColor = (type: string) => {
  switch (type) {
    case "manuscript":
      return "#1e3a8a"; // Navy Blue
    case "scholar":
      return "#c5a880"; // Heritage Gold
    case "sufi":
      return "#e28a3e"; // Warm Orange
    case "trade":
      return "#b45309"; // Amber/Bronze
    case "remittance":
      return "#0b7a75"; // Muted Teal
    default:
      return "#1e3a8a";
  }
};

export default function AtlasView({
  t: _t,
  theme,
  activeModalContent: _activeModalContent,
  setActiveModalContent,
  handleNavigation,
}: AtlasViewProps) {
  // Atlas Internal States
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [filterPeriods, setFilterPeriods] = useState<string[]>([]);
  const [filterTypes, setFilterTypes] = useState<string[]>([]);
  const [filterGeos, setFilterGeos] = useState<string[]>([]);
  const [filterThemes, setFilterThemes] = useState<string[]>([]);
  const [mapMode, setMapMode] = useState<"ocean" | "malabar">("ocean");
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });
  const [showFiltersOverlay, setShowFiltersOverlay] = useState(true);
  const [showDetailsOverlay, setShowDetailsOverlay] = useState(true);

  // Zoom & Pan Helpers
  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.25, 4));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.5));
  const handleResetZoom = () => {
    setZoom(1);
    setPanX(0);
    setPanY(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsPanning(true);
    setStartPan({ x: e.clientX - panX, y: e.clientY - panY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return;
    setPanX(e.clientX - startPan.x);
    setPanY(e.clientY - startPan.y);
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const toggleFilter = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    val: string,
  ) => {
    if (list.includes(val)) {
      setList(list.filter((item) => item !== val));
    } else {
      setList([...list, val]);
    }
  };

  // Filter Atlas Calculation using useMemo
  const activeNodes = useMemo(() => {
    return ATLAS_NODES.filter((node) => {
      if (mapMode === "malabar" && node.geography !== "Malabar") return false;
      if (filterPeriods.length > 0 && !filterPeriods.includes(node.period))
        return false;
      if (filterTypes.length > 0 && !filterTypes.includes(node.type))
        return false;
      if (filterGeos.length > 0 && !filterGeos.includes(node.geography))
        return false;
      if (
        filterThemes.length > 0 &&
        !node.themes.some((themeVal) => filterThemes.includes(themeVal))
      )
        return false;
      return true;
    }).map((node) => {
      if (mapMode === "malabar" && MALABAR_COORDINATES[node.id]) {
        return {
          ...node,
          x: MALABAR_COORDINATES[node.id].x,
          y: MALABAR_COORDINATES[node.id].y,
        };
      }
      return node;
    });
  }, [mapMode, filterPeriods, filterTypes, filterGeos, filterThemes]);

  const activeNodeIds = useMemo(
    () => new Set(activeNodes.map((n) => n.id)),
    [activeNodes],
  );

  const activeRoutes = useMemo(() => {
    return ATLAS_ROUTES.filter((route) => {
      if (
        !activeNodeIds.has(route.startNode) ||
        !activeNodeIds.has(route.endNode)
      )
        return false;
      if (filterPeriods.length > 0 && !filterPeriods.includes(route.period))
        return false;
      if (filterThemes.length > 0 && !filterThemes.includes(route.theme))
        return false;
      return true;
    });
  }, [activeNodeIds, filterPeriods, filterThemes]);

  const activeNodeDetails = useMemo(() => {
    return ATLAS_NODES.find((n) => n.id === selectedNode) || null;
  }, [selectedNode]);

  const activeRouteDetails = useMemo(() => {
    return ATLAS_ROUTES.find((r) => r.id === selectedRoute) || null;
  }, [selectedRoute]);

  return (
    <section className="bg-dark-bg text-white py-12 px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36 min-h-[85vh] pt-10 sm:pt-15 w-full">
      <div className="mx-auto w-full max-w-350">
        {/* Atlas Title and Intro */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-teal/10 pb-8">
          <div>
            <span className="text-[12px] sm:text-sm font-semibold uppercase tracking-[0.2em] text-teal-light">
              Flagship Interactive Tool
            </span>
            <h1 className="text-3xl sm:text-5xl font-semibold uppercase mt-1 font-sans">
              Malabar Knowledge Atlas
            </h1>
            <p className="text-sm sm:text-base text-white/70 max-w-187.5 mt-3 font-light leading-relaxed font-sans">
              Visually mapping the historic and modern Indian Ocean networks
              connected to Malabar. Explore scholar migrations, Sufi lineages,
              manuscript circulations, port connections, and contemporary
              remittance flows.
            </p>
          </div>
          <div className="shrink-0">
            <button
              onClick={() => handleNavigation("home")}
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-white rounded-3xl px-6 py-2.5 text-xs font-semibold transition-all cursor-pointer"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              <span>Back to Home</span>
            </button>
          </div>
        </div>

        {/* Dashboard Workspace */}
        <div
          className={`relative ${
            isMapExpanded
              ? "flex flex-col h-[75vh] w-full border border-teal/10 rounded-[20px] bg-dark-bg overflow-hidden shadow-2xl"
              : "grid grid-cols-1 lg:grid-cols-4 gap-8 items-start"
          }`}
        >
          {/* Left Panel: Dynamic Filters */}
          {(!isMapExpanded || showFiltersOverlay) && (
            <div
              className={
                isMapExpanded
                  ? "absolute left-4 top-20 bottom-4 w-72 z-20 overflow-y-auto dark-glass-panel rounded-[20px] p-6 shadow-2xl flex flex-col gap-6"
                  : "lg:col-span-1 bg-dark-surface border border-teal/10 rounded-[20px] p-6 shadow-xl flex flex-col gap-6"
              }
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-4">
                <h3 className="font-semibold text-base font-sans text-gold">
                  Filter Atlas
                </h3>
                {isMapExpanded ? (
                  <button
                    onClick={() => setShowFiltersOverlay(false)}
                    className="text-white/40 hover:text-white cursor-pointer bg-transparent border-0 text-sm font-sans"
                  >
                    ✕
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setFilterPeriods([]);
                      setFilterTypes([]);
                      setFilterGeos([]);
                      setFilterThemes([]);
                    }}
                    className="text-xs text-terracotta hover:text-terracotta-light font-medium underline block text-left cursor-pointer bg-transparent border-0 p-0"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Filter: Periods */}
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/50 mb-3">
                  Time Period
                </h4>
                <div className="flex flex-col gap-2.5">
                  {["1300-1500", "1500-1700", "1700-1900", "1900-present"].map(
                    (period) => (
                      <label
                        key={period}
                        className="flex items-center gap-2.5 text-xs font-light text-white/80 cursor-pointer hover:text-white transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={filterPeriods.includes(period)}
                          onChange={() =>
                            toggleFilter(
                              filterPeriods,
                              setFilterPeriods,
                              period,
                            )
                          }
                          className="rounded border-white/10 bg-black/40 text-teal focus:ring-teal focus:ring-offset-0 h-4 w-4"
                        />
                        <span>
                          {period === "1900-present"
                            ? "1900–Present"
                            : period.replace("-", "–")}
                        </span>
                      </label>
                    ),
                  )}
                </div>
              </div>

              {/* Filter: Types */}
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/50 mb-3">
                  Category Type
                </h4>
                <div className="flex flex-col gap-2.5">
                  {[
                    { val: "scholar", label: "Scholar Migration" },
                    { val: "manuscript", label: "Manuscript Circulation" },
                    { val: "port", label: "Trade Port / Hub" },
                    { val: "institution", label: "Educational Institution" },
                    { val: "scholarly_centre", label: "Scholarly Centre" },
                  ].map((type) => (
                    <label
                      key={type.val}
                      className="flex items-center gap-2.5 text-xs font-light text-white/80 cursor-pointer hover:text-white transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={filterTypes.includes(type.val)}
                        onChange={() =>
                          toggleFilter(filterTypes, setFilterTypes, type.val)
                        }
                        className="rounded border-white/10 bg-black/40 text-teal focus:ring-teal focus:ring-offset-0 h-4 w-4"
                      />
                      <span>{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filter: Geography */}
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/50 mb-3">
                  Geography
                </h4>
                <div className="flex flex-col gap-2.5">
                  {[
                    "Malabar",
                    "Hadramawt",
                    "East Africa",
                    "Southeast Asia",
                    "Gulf",
                    "Cairo",
                  ].map((geo) => (
                    <label
                      key={geo}
                      className="flex items-center gap-2.5 text-xs font-light text-white/80 cursor-pointer hover:text-white transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={filterGeos.includes(geo)}
                        onChange={() =>
                          toggleFilter(filterGeos, setFilterGeos, geo)
                        }
                        className="rounded border-white/10 bg-black/40 text-teal focus:ring-teal focus:ring-offset-0 h-4 w-4"
                      />
                      <span>{geo}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filter: Themes */}
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/50 mb-3">
                  Theme
                </h4>
                <div className="flex flex-col gap-2.5">
                  {[
                    { val: "fiqh", label: "Jurisprudence (Fiqh)" },
                    { val: "tasawwuf", label: "Sufism (Tasawwuf)" },
                    {
                      val: "anti-colonial resistance",
                      label: "Anti-Colonial Resistance",
                    },
                    { val: "trade", label: "Monsoon Trade" },
                    { val: "education", label: "Sacred Education" },
                    { val: "finance", label: "Finance & Remittance" },
                  ].map((themeVal) => (
                    <label
                      key={themeVal.val}
                      className="flex items-center gap-2.5 text-xs font-light text-white/80 cursor-pointer hover:text-white transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={filterThemes.includes(themeVal.val)}
                        onChange={() =>
                          toggleFilter(
                            filterThemes,
                            setFilterThemes,
                            themeVal.val,
                          )
                        }
                        className="rounded border-white/10 bg-black/40 text-teal focus:ring-teal focus:ring-offset-0 h-4 w-4"
                      />
                      <span>{themeVal.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Center Panel: Map Canvas */}
          <div
            className={`${isMapExpanded ? "w-full h-[75vh]" : "lg:col-span-2"} flex flex-col gap-4 relative map-container`}
          >
            <div className="bg-dark-surface border border-teal/10 rounded-[20px] p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-md z-10">
              <div className="flex flex-wrap items-center gap-4 text-[10px] sm:text-xs">
                <span className="flex items-center gap-1.5 text-white/70">
                  <span className="h-2 w-2 rounded-full bg-gold animate-pulse"></span>
                  Active Hubs:{" "}
                  <strong className="text-white">{activeNodes.length}</strong>
                </span>
                <span className="flex items-center gap-1.5 text-white/70">
                  <span className="h-0.5 w-6 bg-teal inline-block"></span>
                  Active Routes:{" "}
                  <strong className="text-white">{activeRoutes.length}</strong>
                </span>

                {/* Map Mode Switcher */}
                <div className="flex items-center bg-black/45 rounded-full p-0.5 border border-white/10 ml-2">
                  <button
                    onClick={() => {
                      setMapMode("ocean");
                      setSelectedNode(null);
                      setSelectedRoute(null);
                    }}
                    className={`px-3 py-1 rounded-full text-[10px] font-semibold transition-all cursor-pointer border-0 ${
                      mapMode === "ocean"
                        ? "bg-teal text-white shadow-md"
                        : "bg-transparent text-white/60 hover:text-white"
                    }`}
                  >
                    Oceanic Network
                  </button>
                  <button
                    onClick={() => {
                      setMapMode("malabar");
                      setSelectedNode(null);
                      setSelectedRoute(null);
                    }}
                    className={`px-3 py-1 rounded-full text-[10px] font-semibold transition-all cursor-pointer border-0 ${
                      mapMode === "malabar"
                        ? "bg-teal text-white shadow-md"
                        : "bg-transparent text-white/60 hover:text-white"
                    }`}
                  >
                    Malabar District
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                {(selectedNode || selectedRoute) && (
                  <button
                    onClick={() => {
                      setSelectedNode(null);
                      setSelectedRoute(null);
                    }}
                    className="text-xs text-white/60 hover:text-white underline cursor-pointer bg-transparent border-0"
                  >
                    Reset Selection
                  </button>
                )}

                {/* Side Panel Toggles for Expanded Mode */}
                {isMapExpanded && (
                  <div className="flex items-center gap-1.5 border-r border-white/10 pr-3">
                    <button
                      onClick={() => setShowFiltersOverlay(!showFiltersOverlay)}
                      className={`px-2.5 py-1.5 rounded-lg border text-[10px] font-semibold transition-all cursor-pointer ${
                        showFiltersOverlay
                          ? "bg-gold/20 border-gold text-gold"
                          : "bg-white/5 border-white/10 text-white/70 hover:text-white"
                      }`}
                      title="Toggle Filters Panel"
                    >
                      Filters
                    </button>
                    <button
                      onClick={() => setShowDetailsOverlay(!showDetailsOverlay)}
                      className={`px-2.5 py-1.5 rounded-lg border text-[10px] font-semibold transition-all cursor-pointer ${
                        showDetailsOverlay
                          ? "bg-gold/20 border-gold text-gold"
                          : "bg-white/5 border-white/10 text-white/70 hover:text-white"
                      }`}
                      title="Toggle Details Panel"
                    >
                      Details
                    </button>
                  </div>
                )}

                {/* Zoom controls */}
                <div className="flex items-center bg-black/45 rounded-lg p-0.5 border border-white/10">
                  <button
                    onClick={handleZoomIn}
                    className="w-7 h-7 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/5 rounded transition-all cursor-pointer font-bold border-0 bg-transparent"
                    title="Zoom In"
                  >
                    +
                  </button>
                  <button
                    onClick={handleZoomOut}
                    className="w-7 h-7 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/5 rounded transition-all cursor-pointer font-bold border-0 bg-transparent"
                    title="Zoom Out"
                  >
                    -
                  </button>
                  <button
                    onClick={handleResetZoom}
                    className="w-7 h-7 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/5 rounded transition-all cursor-pointer border-0 bg-transparent"
                    title="Reset View"
                  >
                    ↺
                  </button>
                </div>

                {/* Expand Button */}
                <button
                  onClick={() => {
                    setIsMapExpanded(!isMapExpanded);
                    if (!isMapExpanded) {
                      setShowFiltersOverlay(true);
                      setShowDetailsOverlay(true);
                    }
                  }}
                  className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/15 text-white rounded-lg px-3 py-1.5 text-[10px] font-semibold transition-all cursor-pointer"
                  title={isMapExpanded ? "Contract Map" : "Expand Map"}
                >
                  {isMapExpanded ? (
                    <>
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M4 14h6v6M20 10h-6V4M14 10l7-7M10 14l-7 7" />
                      </svg>
                      <span>Minimize</span>
                    </>
                  ) : (
                    <>
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                      <span>Expand</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* SVG Canvas Container */}
            <div
              className={`relative border border-teal/10 rounded-[20px] bg-dark-bg overflow-hidden shadow-2xl p-2 group grow ${
                isPanning ? "cursor-grabbing" : "cursor-grab"
              }`}
            >
              <svg
                viewBox="0 0 1000 600"
                className="w-full h-full object-contain select-none"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <g transform={`translate(${panX}, ${panY}) scale(${zoom})`}>
                  {/* Map Background Image */}
                  <image
                    href={mapMode === "malabar" ? malabarMapUrl : oceanMapUrl}
                    x="0"
                    y="0"
                    width="1000"
                    height="600"
                    preserveAspectRatio="none"
                    opacity={
                      theme === "dark"
                        ? mapMode === "malabar"
                          ? "0.65"
                          : "0.55"
                        : mapMode === "malabar"
                          ? "0.85"
                          : "0.75"
                    }
                    style={{
                      mixBlendMode: theme === "dark" ? "screen" : "multiply",
                    }}
                  />

                  {/* Grid Lines */}
                  <g>
                    {Array.from({ length: 9 }).map((_, i) => (
                      <line
                        key={`vert-${i}`}
                        x1={(i + 1) * 100}
                        y1="0"
                        x2={(i + 1) * 100}
                        y2="600"
                        className="map-grid-line"
                      />
                    ))}
                    {Array.from({ length: 5 }).map((_, i) => (
                      <line
                        key={`horiz-${i}`}
                        x1="0"
                        y1={(i + 1) * 100}
                        x2="1000"
                        y2={(i + 1) * 100}
                        className="map-grid-line"
                      />
                    ))}
                  </g>

                  {/* Routes */}
                  <g>
                    {activeRoutes.map((route) => {
                      const start = ATLAS_NODES.find(
                        (n) => n.id === route.startNode,
                      );
                      const end = ATLAS_NODES.find(
                        (n) => n.id === route.endNode,
                      );
                      if (!start || !end) return null;

                      const isSelected = selectedRoute === route.id;
                      const routeColor = isSelected
                        ? "#ffffff"
                        : getRouteColor(route.type);
                      const opacity = selectedRoute
                        ? isSelected
                          ? "1.0"
                          : "0.15"
                        : "0.65";
                      const strokeWidth = isSelected ? 3.5 : 2.0;

                      return (
                        <path
                          key={route.id}
                          d={route.path}
                          fill="none"
                          stroke={routeColor}
                          strokeWidth={strokeWidth}
                          strokeOpacity={opacity}
                          strokeDasharray="6, 6"
                          className="animate-route-flow transition-all duration-300 cursor-pointer hover:stroke-teal hover:stroke-opacity-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRoute(route.id);
                            setSelectedNode(null);
                          }}
                        >
                          <title>{route.name}</title>
                        </path>
                      );
                    })}
                  </g>

                  {/* Nodes */}
                  <g>
                    {activeNodes.map((node) => {
                      const isSelected = selectedNode === node.id;
                      const opacity = selectedNode
                        ? isSelected
                          ? "1.0"
                          : "0.35"
                        : "1.0";
                      const color = isSelected ? "#c5a880" : "#0b1a30";

                      return (
                        <g
                          key={node.id}
                          className="cursor-pointer transition-all duration-300"
                          style={{ opacity }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedNode(node.id);
                            setSelectedRoute(null);
                          }}
                        >
                          <circle
                            cx={node.x}
                            cy={node.y}
                            r="16"
                            fill="none"
                            stroke={color}
                            strokeWidth="1"
                            className="animate-pulse-ring"
                          />
                          <circle
                            cx={node.x}
                            cy={node.y}
                            r="6"
                            fill={color}
                            className="map-node-glow"
                          />
                          <circle
                            cx={node.x}
                            cy={node.y}
                            r="22"
                            fill="transparent"
                          />
                          <text
                            x={node.x}
                            y={node.y + 20}
                            textAnchor="middle"
                            className={`font-sans text-[10px] tracking-wider uppercase font-semibold select-none ${
                              isSelected
                                ? "fill-gold font-bold"
                                : "fill-teal font-semibold"
                            }`}
                          >
                            {node.name}
                          </text>
                        </g>
                      );
                    })}
                  </g>
                </g>
              </svg>

              {/* Legends overlay */}
              <div className="absolute bottom-4 left-4 dark-glass-panel border border-teal/10 rounded-xl p-3 text-[10px] flex flex-col gap-1.5 shadow-xl max-w-50">
                <span className="font-semibold text-white/50 uppercase tracking-wider text-[9px] mb-1 font-sans">
                  Route Legends
                </span>
                <div className="flex items-center gap-2 text-white/80">
                  <span className="h-1.5 w-6 rounded bg-[#1e3a8a] block"></span>
                  <span>Manuscript</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <span className="h-1.5 w-6 rounded bg-[#c5a880] block"></span>
                  <span>Scholar</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <span className="h-1.5 w-6 rounded bg-[#e28a3e] block"></span>
                  <span>Sufi Network</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <span className="h-1.5 w-6 rounded bg-[#b45309] block"></span>
                  <span>Monsoon Trade</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <span className="h-1.5 w-6 rounded bg-[#0b7a75] block"></span>
                  <span>Remittance</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Detail Connections & Metadata */}
          {(!isMapExpanded || showDetailsOverlay) && (
            <div
              className={
                isMapExpanded
                  ? "absolute right-4 top-20 bottom-4 w-80 z-20 overflow-y-auto dark-glass-panel rounded-[20px] p-6 shadow-2xl flex flex-col justify-between"
                  : "lg:col-span-1 bg-dark-surface border border-teal/10 text-white rounded-[20px] p-6 shadow-xl min-h-115 flex flex-col justify-between"
              }
            >
              {/* Selected Node Details */}
              {activeNodeDetails && (
                <div className="flex flex-col gap-5 h-full">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold uppercase tracking-wider bg-teal/10 text-teal border border-teal/20 rounded px-2.5 py-0.5 inline-block">
                        {activeNodeDetails.type.replace("_", " ")}
                      </span>
                      {isMapExpanded && (
                        <button
                          onClick={() => setShowDetailsOverlay(false)}
                          className="text-white/40 hover:text-white cursor-pointer bg-transparent border-0 text-sm font-sans"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                    <h3 className="text-xl font-bold mt-2 text-teal font-sans">
                      {activeNodeDetails.name}
                    </h3>
                    <p className="text-[10px] text-white/50 font-light mt-1 uppercase tracking-wide">
                      Geography: {activeNodeDetails.geography} | Period:{" "}
                      {activeNodeDetails.period.replace("-", "–")}
                    </p>
                  </div>

                  <div className="border-t border-white/10 pt-4 grow">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-2">
                      Historical Importance
                    </h4>
                    <p className="text-xs font-light text-white/80 leading-relaxed font-sans">
                      {activeNodeDetails.importance}
                    </p>
                  </div>

                  {activeNodeDetails.associatedFigures && (
                    <div className="border-t border-white/10 pt-4">
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-2">
                        Associated Figures
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {activeNodeDetails.associatedFigures.map((fig) => (
                          <span
                            key={fig}
                            className="text-[10px] bg-white/5 rounded-full px-2.5 py-0.5 border border-white/10 text-white/80"
                          >
                            {fig}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Deep Connections to Archive & Research Hub */}
                  {(activeNodeDetails.bio ||
                    activeNodeDetails.kitabs ||
                    activeNodeDetails.papers) && (
                    <div className="border-t border-white/10 pt-4 mt-2">
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-gold mb-3 font-sans">
                        Linked Website Database
                      </h4>
                      <div className="flex flex-col gap-2">
                        {activeNodeDetails.bio && (
                          <button
                            onClick={() =>
                              setActiveModalContent({
                                type: "biography",
                                title: `Biography: ${activeNodeDetails.associatedFigures[0] || activeNodeDetails.name}`,
                                subtitle: `Scholarly Node Connection: ${activeNodeDetails.name}`,
                                content: activeNodeDetails.bio,
                              })
                            }
                            className="w-full text-left bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold/50 rounded-lg p-2.5 text-xs text-white flex items-center justify-between group transition-all cursor-pointer animate-fade-in"
                          >
                            <span className="font-medium">
                              Scholarly Biography
                            </span>
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                            >
                              <line x1="5" y1="12" x2="19" y2="12" />
                              <polyline points="12 5 19 12 12 19" />
                            </svg>
                          </button>
                        )}

                        {activeNodeDetails.kitabs &&
                          activeNodeDetails.kitabs.map((kitab) => (
                            <button
                              key={kitab.title}
                              onClick={() => {
                                setActiveModalContent({
                                  type: "kitab",
                                  id: kitab.link,
                                  title: kitab.title,
                                  subtitle: `Scholarly Node Connection: ${activeNodeDetails.name}`,
                                });
                              }}
                              className="w-full text-left bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold/50 rounded-lg p-2.5 text-xs text-white flex items-center justify-between group transition-all cursor-pointer"
                            >
                              <span className="font-semibold text-teal-light group-hover:text-gold transition-colors font-sans">
                                Kitab: {kitab.title} &rarr;
                              </span>
                            </button>
                          ))}

                        {activeNodeDetails.papers &&
                          activeNodeDetails.papers.map((paper) => (
                            <button
                              key={paper.title}
                              onClick={() => {
                                handleNavigation("research");
                              }}
                              className="w-full text-left bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold/50 rounded-lg p-2.5 text-xs text-white flex items-center justify-between group transition-all cursor-pointer"
                            >
                              <span className="font-semibold text-teal-light group-hover:text-gold transition-colors font-sans">
                                Research Paper Available &rarr;
                              </span>
                            </button>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Selected Route Details */}
              {activeRouteDetails && !activeNodeDetails && (
                <div className="flex flex-col gap-5 h-full">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold uppercase tracking-wider bg-gold/20 text-gold border border-gold/30 rounded px-2.5 py-0.5 inline-block">
                        {activeRouteDetails.type.toUpperCase()} ROUTE
                      </span>
                      {isMapExpanded && (
                        <button
                          onClick={() => setShowDetailsOverlay(false)}
                          className="text-white/40 hover:text-white cursor-pointer bg-transparent border-0 text-sm font-sans"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                    <h3 className="text-lg font-bold mt-2 text-white font-sans">
                      {activeRouteDetails.name}
                    </h3>
                    <p className="text-[10px] text-white/50 font-light mt-1 uppercase tracking-wide">
                      Theme: {activeRouteDetails.theme} | Period:{" "}
                      {activeRouteDetails.period.replace("-", "–")}
                    </p>
                  </div>

                  <div className="border-t border-white/10 pt-4 grow">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">
                      Network Flow Description
                    </h4>
                    <p className="text-xs font-light text-white/90 leading-relaxed font-sans">
                      {activeRouteDetails.description}
                    </p>
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/50 mb-1">
                      Route Path Endpoint Connection
                    </h4>
                    <p className="text-xs font-light text-white/70">
                      Connects{" "}
                      <span className="text-teal-light font-medium capitalize">
                        {activeRouteDetails.startNode}
                      </span>{" "}
                      to{" "}
                      <span className="text-teal-light font-medium capitalize">
                        {activeRouteDetails.endNode}
                      </span>
                      .
                    </p>
                  </div>
                </div>
              )}

              {/* Placeholder state: nothing selected */}
              {!activeNodeDetails && !activeRouteDetails && (
                <div className="flex flex-col items-center justify-center text-center py-16 grow relative">
                  {isMapExpanded && (
                    <div className="absolute right-0 top-0">
                      <button
                        onClick={() => setShowDetailsOverlay(false)}
                        className="text-white/40 hover:text-white cursor-pointer bg-transparent border-0 text-sm font-sans"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-white/30 mb-4 animate-pulse"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                    <path d="M2 12h20" />
                  </svg>
                  <h4 className="font-sans text-xs font-bold text-white/70">
                    Interactive Map Details
                  </h4>
                  <p className="text-[11px] text-white/50 font-light mt-2 max-w-50 leading-relaxed font-sans">
                    Click on any pulsing node hub or connecting animated route
                    line inside the map canvas to explore related history
                    database.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ATLAS ANALYTICS & MARITIME TREATIES GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12 pt-12 border-t border-teal/10">
          {/* Stats panel */}
          <div className="lg:col-span-1 bg-dark-surface border border-teal/10 rounded-[20px] p-6 shadow-xl flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-teal-light block mb-2">
                Atlas Analytics
              </span>
              <h3 className="text-lg font-bold text-teal uppercase font-sans">
                Connectivity Metrics
              </h3>
              <p className="text-xs text-white/50 font-light mt-2 leading-relaxed">
                Quantitative metrics summarizing the networked nodes and active
                scholarly exchange pathways cataloged in the Knowledge Atlas.
              </p>
            </div>

            <div className="flex flex-col gap-4 mt-6 grow justify-center">
              {[
                {
                  label: "Scholarly Centers",
                  count: "4 Active Nodes",
                  pct: "40%",
                },
                {
                  label: "Maritime Seaports",
                  count: "4 Historical Ports",
                  pct: "40%",
                },
                {
                  label: "Connecting Routes",
                  count: "11 Mapped Paths",
                  pct: "100%",
                },
                {
                  label: "Active Epistemic Themes",
                  count: "6 Interwoven Focuses",
                  pct: "60%",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center bg-black/20 px-4 py-3 rounded-xl border border-white/5"
                >
                  <span className="text-xs text-white/80">{item.label}</span>
                  <span className="text-xs font-bold text-gold font-mono">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Treaties showcase */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-gold-dark block mb-2">
                Sovereign Alliances
              </span>
              <h3 className="text-xl font-bold text-teal uppercase font-sans">
                Pre-Colonial Maritime Treaties
              </h3>
              <p className="text-xs text-white/50 font-light mt-2">
                Key historical treaties and agreements trade guilds and rulers
                negotiated to protect free navigation and shared risk across
                ports.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Zamorin-Hadrami Spices Pact (1520 CE)",
                  desc: "An agreement between the Calicut crown and Hadrami merchants establishing secure warehouses (pandikashala) and guaranteeing trade risk sharing during monsoons.",
                },
                {
                  title: "Zamorin-Aceh Naval Alliance (1568 CE)",
                  desc: "A coordinated military treaty signed in Calicut to launch joint attacks against Portuguese naval blockades in the Straits of Malacca.",
                },
                {
                  title: "Arakkal-Swahili Coast Agreement (1740 CE)",
                  desc: "Trade regulations specifying custom duties and salvaging rights for Kannur merchants operating in Swahili ports (Zanzibar and Kilwa).",
                },
                {
                  title: "Ponnani Scholastic Exchange Treaty (1605 CE)",
                  desc: "A cooperative educational agreement establishing stipend routes for scholars sailing from Java and Sumatra to study Shafi'i legal commentaries.",
                },
              ].map((treaty, idx) => (
                <div
                  key={idx}
                  className="bg-dark-surface border border-teal/10 rounded-2xl p-5 hover:border-gold/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <h4 className="text-xs font-bold text-gold uppercase tracking-wide">
                      {treaty.title}
                    </h4>
                    <p className="text-[11px] text-white/70 leading-relaxed font-light mt-2 font-sans">
                      {treaty.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
