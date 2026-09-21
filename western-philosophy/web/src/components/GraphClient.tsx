"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { GraphRelationship } from "@/lib/types";

interface Node {
  id: string;
  type: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const REL_TYPES: GraphRelationship["relationship"][] = [
  "influenced",
  "criticized",
  "rejected",
  "developed",
  "anticipated",
  "responded_to",
  "borrowed_from",
  "opposed",
  "continued",
  "transformed",
  "historically_contextualized_by",
];

const TYPE_COLOR: Record<string, string> = {
  philosopher: "#6b2b2b",
  school: "#1f3a5f",
  concept: "#2f6f4f",
};

const WIDTH = 760;
const HEIGHT = 520;

export default function GraphClient({ relationships }: { relationships: GraphRelationship[] }) {
  const [activeRels, setActiveRels] = useState<Set<string>>(new Set(REL_TYPES));
  const [selected, setSelected] = useState<string | null>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const nodesRef = useRef<Node[]>([]);

  const filtered = useMemo(
    () => relationships.filter((r) => activeRels.has(r.relationship)),
    [relationships, activeRels]
  );

  const nodeIds = useMemo(() => {
    const ids = new Map<string, string>();
    for (const r of filtered) {
      ids.set(r.from, r.from_type);
      ids.set(r.to, r.to_type);
    }
    return ids;
  }, [filtered]);

  useEffect(() => {
    const initial: Node[] = [...nodeIds.entries()].map(([id, type]) => ({
      id,
      type,
      x: WIDTH / 2 + (Math.random() - 0.5) * 200,
      y: HEIGHT / 2 + (Math.random() - 0.5) * 200,
      vx: 0,
      vy: 0,
    }));
    nodesRef.current = initial;
    // Force-directed layout is an imperative physics simulation driven by
    // requestAnimationFrame, not a value synchronized from an external
    // store -- setState here (and in the tick loop below) is the correct
    // tool, not the "hydrate from external source" pattern the
    // set-state-in-effect lint rule is meant to steer away from.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNodes(initial);

    let frame = 0;
    let raf: number;
    function tick() {
      const ns = nodesRef.current;
      // repulsion
      for (let i = 0; i < ns.length; i++) {
        for (let j = i + 1; j < ns.length; j++) {
          const dx = ns[i].x - ns[j].x;
          const dy = ns[i].y - ns[j].y;
          const distSq = Math.max(dx * dx + dy * dy, 1);
          const force = 1800 / distSq;
          const dist = Math.sqrt(distSq);
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;
          ns[i].vx += fx;
          ns[i].vy += fy;
          ns[j].vx -= fx;
          ns[j].vy -= fy;
        }
      }
      // attraction along edges
      for (const r of filtered) {
        const a = ns.find((n) => n.id === r.from);
        const b = ns.find((n) => n.id === r.to);
        if (!a || !b) continue;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
        const force = (dist - 110) * 0.01;
        a.vx += (dx / dist) * force;
        a.vy += (dy / dist) * force;
        b.vx -= (dx / dist) * force;
        b.vy -= (dy / dist) * force;
      }
      // integrate + center pull + damping
      for (const n of ns) {
        n.vx += (WIDTH / 2 - n.x) * 0.001;
        n.vy += (HEIGHT / 2 - n.y) * 0.001;
        n.vx *= 0.85;
        n.vy *= 0.85;
        n.x += n.vx;
        n.y += n.vy;
        n.x = Math.min(Math.max(n.x, 20), WIDTH - 20);
        n.y = Math.min(Math.max(n.y, 20), HEIGHT - 20);
      }
      frame += 1;
      if (frame < 220) {
        raf = requestAnimationFrame(tick);
      }
      setNodes([...ns]);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [nodeIds, filtered]);

  function toggle(rel: string) {
    setActiveRels((prev) => {
      const next = new Set(prev);
      if (next.has(rel)) next.delete(rel);
      else next.add(rel);
      return next;
    });
  }

  const nodeMap = new Map(nodes.map((n) => [n.id, n]));
  const selectedEdges = selected
    ? filtered.filter((r) => r.from === selected || r.to === selected)
    : [];

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-1.5">
        {REL_TYPES.map((rel) => (
          <button
            key={rel}
            onClick={() => toggle(rel)}
            className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors ${
              activeRels.has(rel)
                ? "border-brand bg-brand-soft text-brand-strong"
                : "border-line text-ink-3 hover:bg-surface-2"
            }`}
          >
            {rel.replace(/_/g, " ")}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
        <div className="overflow-hidden rounded-lg border border-line bg-surface">
          <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-[420px] w-full">
            {filtered.map((r, i) => {
              const a = nodeMap.get(r.from);
              const b = nodeMap.get(r.to);
              if (!a || !b) return null;
              const dim = selected && r.from !== selected && r.to !== selected;
              return (
                <line
                  key={i}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke="var(--line-strong)"
                  strokeOpacity={dim ? 0.15 : 0.6}
                  strokeWidth={1}
                />
              );
            })}
            {nodes.map((n) => (
              <g key={n.id} onClick={() => setSelected(n.id === selected ? null : n.id)} className="cursor-pointer">
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={selected === n.id ? 8 : 5.5}
                  fill={TYPE_COLOR[n.type] ?? "#6b2b2b"}
                  opacity={selected && selected !== n.id ? 0.35 : 1}
                />
                <text x={n.x + 8} y={n.y + 3} fontSize={10} fill="var(--ink-2)">
                  {n.id.replace(/-/g, " ")}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="rounded-lg border border-line bg-surface p-4">
          <h3 className="mb-2 text-[12.5px] font-semibold text-ink-2">
            {selected ? selected.replace(/-/g, " ") : "Click a node"}
          </h3>
          {selected ? (
            <ul className="space-y-2">
              {selectedEdges.map((e, i) => (
                <li key={i} className="text-[12.5px] text-ink-2">
                  <span className="font-medium text-ink">{e.from.replace(/-/g, " ")}</span>{" "}
                  <span className="text-brand">{e.relationship.replace(/_/g, " ")}</span>{" "}
                  <span className="font-medium text-ink">{e.to.replace(/-/g, " ")}</span>
                  <p className="mt-0.5 text-ink-3">{e.explanation}</p>
                  <Link href={`/library/${e.source_chapter}`} className="text-[11px] text-ink-3 hover:text-brand">
                    source: {e.source_chapter}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[12.5px] text-ink-3">
              Select a node to see its relationships, or use the filters above to trace a
              particular kind of influence across the book.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
