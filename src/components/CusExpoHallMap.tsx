import  { useRef } from "react";

/* ===============================
   Types
================================ */
export type HallLayoutConfig = {
  hall: {
    name: string;
    width: number;   // meters
    height: number;  // meters
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
    status?: "available" | "booked";
    price?: number;
  }[];
  areas?: any[];
};

type Props = {
  config: HallLayoutConfig;
  tool?: "select"; // customer uses select only
  onSelect?: (item: {
    type: "stall";
    id: string;
    meta: any;
  }) => void;
};

/* ===============================
   Constants
================================ */
const SCALE = 15; // px per meter

/* ===============================
   Component
================================ */
export default function ExpoHallMap({
  config,
  onSelect,
}: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const widthPx = config.hall.width * SCALE;
  const heightPx = config.hall.height * SCALE;

  return (
    <div className="relative w-full h-full overflow-auto bg-gray-50">
      {/* Background Image */}
      {config.background?.type === "image" && (
        <img
          src={config.background.src}
          alt="Hall Map"
          className="absolute top-0 left-0 pointer-events-none select-none"
          style={{ width: widthPx, height: heightPx }}
        />
      )}

      {/* SVG Overlay */}
      <svg
        ref={svgRef}
        width={widthPx}
        height={heightPx}
        className="relative"
      >
        {/* Grid */}
        {Array.from({ length: config.hall.width }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={i * SCALE}
            y1={0}
            x2={i * SCALE}
            y2={heightPx}
            stroke="#eee"
          />
        ))}
        {Array.from({ length: config.hall.height }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1={0}
            y1={i * SCALE}
            x2={widthPx}
            y2={i * SCALE}
            stroke="#eee"
          />
        ))}

        {/* Stalls */}
        {config.stalls.map((s) => {
          const isBooked = s.status === "booked";

          return (
            <g key={s.id}>
              <rect
                x={s.x * SCALE}
                y={s.y * SCALE}
                width={s.width * SCALE}
                height={s.height * SCALE}
                rx={2}
                fill={isBooked ? "#f3f4f6" : "#ffffff"}
                stroke={isBooked ? "#9ca3af" : "#f97316"}
                strokeWidth={2}
                className={
                  isBooked
                    ? "cursor-not-allowed"
                    : "cursor-pointer hover:fill-orange-50"
                }
                onClick={() => {
                  if (!isBooked) {
                    onSelect?.({
                      type: "stall",
                      id: s.id,
                      meta: s,
                    });
                  }
                }}
              />

              {/* Stall Label */}
              <text
                x={s.x * SCALE + 6}
                y={s.y * SCALE + 14}
                fontSize="10"
                fill="#111827"
                pointerEvents="none"
              >
                {s.id}
              </text>

              {/* Booked Tag */}
              {isBooked && (
                <text
                  x={s.x * SCALE + 6}
                  y={s.y * SCALE + 28}
                  fontSize="9"
                  fill="#dc2626"
                  pointerEvents="none"
                >
                  Booked
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
