import React, { useEffect, useRef, useState } from "react";

export type HallLayoutConfig = {
  hall: {
    name: string;
    width: number;
    height: number;
    grid_unit: number;
  };
  background?: {
    type: "image" | "svg";
    src: string;
  };
  stalls: {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
  }[];
  areas: {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
  }[];
};

export type ToolMode = "select" | "add-stall" | "add-room" | "pan";

type Props = {
  config: HallLayoutConfig;
  tool: ToolMode;
  onChange: (c: HallLayoutConfig) => void;
  onSelect?: (item: any) => void;
};

const SCALE = 15;
const snap = (v: number, g: number) => Math.round(v / g) * g;

export default function ExpoHallMap({
  config,
  tool,
  onChange,
  onSelect,
}: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const [drag, setDrag] = useState<any>(null);
  const [resize, setResize] = useState<any>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const grid = config.hall.grid_unit;
  const wPx = config.hall.width * SCALE;
  const hPx = config.hall.height * SCALE;

  /* ===============================
     Map Import (Image / SVG)
  =============================== */

  function handleMapFile(file?: File) {
    if (!file) return;

    const url = URL.createObjectURL(file);
    const isSvg = file.type === "image/svg+xml" || file.name.endsWith(".svg");

    onChange({
      ...config,
      background: {
        type: isSvg ? "svg" : "image",
        src: url,
      },
    });
  }

  /* ===============================
     Mouse helpers
  =============================== */

  function mousePos(e: React.MouseEvent) {
    const r = svgRef.current!.getBoundingClientRect();
    return {
      x: (e.clientX - r.left) / (SCALE * zoom),
      y: (e.clientY - r.top) / (SCALE * zoom),
    };
  }

  /* ===============================
     Add objects
  =============================== */

  function addStall(x: number, y: number) {
    onChange({
      ...config,
      stalls: [
        ...config.stalls,
        {
          id: `S${config.stalls.length + 1}`,
          x: snap(x, grid),
          y: snap(y, grid),
          width: 3,
          height: 3,
        },
      ],
    });
  }

  function addRoom(x: number, y: number) {
    onChange({
      ...config,
      areas: [
        ...config.areas,
        {
          id: `R${config.areas.length + 1}`,
          x: snap(x, grid),
          y: snap(y, grid),
          width: 8,
          height: 6,
        },
      ],
    });
  }

  /* ===============================
     Zoom
  =============================== */

  function onWheel(e: React.WheelEvent) {
    e.preventDefault();
    setZoom((z) => Math.min(3, Math.max(0.5, z - e.deltaY * 0.001)));
  }

  /* ===============================
     Drag / Resize
  =============================== */

  function onMouseMove(e: React.MouseEvent) {
    if (drag) {
      const p = mousePos(e);
      onChange({
        ...config,
        stalls: config.stalls.map((s) =>
          s.id === drag.id
            ? {
                ...s,
                x: snap(p.x - drag.dx, grid),
                y: snap(p.y - drag.dy, grid),
              }
            : s
        ),
      });
    }

    if (resize) {
      const p = mousePos(e);
      onChange({
        ...config,
        stalls: config.stalls.map((s) =>
          s.id === resize.id
            ? {
                ...s,
                width: Math.max(grid, snap(p.x - s.x, grid)),
                height: Math.max(grid, snap(p.y - s.y, grid)),
              }
            : s
        ),
      });
    }
  }

  function stop() {
    setDrag(null);
    setResize(null);
  }

    useEffect(() => {
     setPan;
    }, []);

  /* ===============================
     Render
  =============================== */

  return (
    <div className="relative border overflow-hidden w-full h-full">
      {/* Map Import Overlay */}
      {!config.background && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-gray-50 border-dashed border-2">
          <label className="px-4 py-2 border rounded cursor-pointer bg-white">
            Import Hall Map (PNG / JPG / SVG)
            <input
              type="file"
              accept=".png,.jpg,.jpeg,.svg"
              hidden
              onChange={(e) =>
                e.target.files && handleMapFile(e.target.files[0])
              }
            />
          </label>
        </div>
      )}

      <div
        onWheel={onWheel}
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: "0 0",

        }}
      >
        {/* Background */}
        {config.background?.type === "image" && (
          <img
            src={config.background.src}
            alt="Hall map"
            className="absolute pointer-events-none select-none"
            style={{ width: wPx, height: hPx }}
          />
        )}

        {config.background?.type === "svg" && (
          <object
            data={config.background.src}
            type="image/svg+xml"
            className="absolute pointer-events-none"
            style={{ width: wPx, height: hPx }}
          />
        )}

        {/* SVG Overlay */}
        <svg
          ref={svgRef}
          width={wPx}
          height={hPx}
          onMouseMove={onMouseMove}
          onMouseUp={stop}
          onMouseLeave={stop}
          onClick={(e) => {
            if (tool === "add-stall") {
              const p = mousePos(e);
              addStall(p.x, p.y);
            }
            if (tool === "add-room") {
              const p = mousePos(e);
              addRoom(p.x, p.y);
            }
          }}
        >
          {/* GRID */}
          {Array.from({ length: config.hall.width }).map((_, i) => (
            <line
              key={i}
              x1={i * SCALE}
              y1={0}
              x2={i * SCALE}
              y2={hPx}
              stroke="#eee"
            />
          ))}

          {/* ROOMS */}
          {config.areas.map((a) => (
            <rect
              key={a.id}
              x={a.x * SCALE}
              y={a.y * SCALE}
              width={a.width * SCALE}
              height={a.height * SCALE}
              fill="rgba(59,130,246,0.3)"
              stroke="#2563eb"
              onClick={() => onSelect?.({ type: "area", id: a.id, meta: a })}
            />
          ))}

          {/* STALLS */}
          {config.stalls.map((s) => (
            <g key={s.id}>
              <rect
                x={s.x * SCALE}
                y={s.y * SCALE}
                width={s.width * SCALE}
                height={s.height * SCALE}
                fill="white"
                stroke="#333"
                onMouseDown={(e) => {
                  const p = mousePos(e);
                  setDrag({ id: s.id, dx: p.x - s.x, dy: p.y - s.y });
                  onSelect?.({ type: "stall", id: s.id, meta: s });
                }}
              />
              <rect
                x={(s.x + s.width) * SCALE - 6}
                y={(s.y + s.height) * SCALE - 6}
                width={6}
                height={6}
                fill="#f97316"
                onMouseDown={(e) => {
                  e.stopPropagation();
                  setResize({ id: s.id });
                }}
              />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
