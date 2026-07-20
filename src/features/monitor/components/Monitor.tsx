"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Cpu,
  MemoryStick,
  FolderGit2,
  GitCommitHorizontal,
} from "lucide-react";
import { DEV } from "@/constants/dev";
import { PROJECTS } from "@/features/projects/data/projects";

const SYSTEM_STATS = [
  {
    label: "CPU",
    value: 74,
    icon: Cpu,
    color: "from-cyan-400 to-blue-500",
  },
  {
    label: "Memory",
    value: 58,
    icon: MemoryStick,
    color: "from-purple-400 to-fuchsia-500",
  },
  {
    label: "Projects",
    value: PROJECTS.length * 5,
    icon: FolderGit2,
    color: "from-emerald-400 to-green-500",
  },
  {
    label: "Commits",
    value: 91,
    icon: GitCommitHorizontal,
    color: "from-orange-400 to-red-500",
  },
];

const STACK_USAGE = [
  ["React", 95],
  ["Next.js", 92],
  ["Node.js", 90],
  ["React Native", 82],
  ["Docker", 75],
  ["MongoDB", 86],
  ["Elasticsearch", 72],
] as const;

const RECENT_ACTIVITY = [
  {
    title: "Built Desktop Window Manager",
    time: "Today",
  },
  {
    title: "Added Wallpaper Engine",
    time: "Yesterday",
  },
  {
    title: "Electron Debugger",
    time: "2 days ago",
  },
  {
    title: "Notification System",
    time: "Last week",
  },
];
export function Monitor() {
  const [mounted, setMounted] = useState(false);

  const heatmap = useMemo(buildHeatmap, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="space-y-4 p-5">
      <SystemOverview mounted={mounted} />

      <TechRadar mounted={mounted} />

      <RecentActivity />

      <ContributionGraph cells={heatmap} />
    </div>
  );
}

function SystemOverview({ mounted }: { mounted: boolean }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl">
      <div className="border-b border-white/10 px-5 py-4">
        <div className="text-[11px] uppercase tracking-[0.25em] text-[var(--text-2)]">
          System Overview
        </div>

        <div className="mt-1 text-2xl font-bold">Developer Workstation</div>
      </div>

      <div className="grid grid-cols-2 gap-4 p-5 xl:grid-cols-4">
        {SYSTEM_STATS.map((item) => (
          <SystemCard key={item.label} mounted={mounted} {...item} />
        ))}
      </div>
    </section>
  );
}

function SystemCard({
  label,
  value,
  icon: Icon,
  color,
  mounted,
}: {
  label: string;
  value: number;
  icon: any;
  color: string;
  mounted: boolean;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-4 transition-all duration-500 hover:scale-[1.02] hover:border-white/20">
      <div
        className={`absolute inset-0 bg-gradient-to-br opacity-20 ${color} `}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-wide text-[var(--text-2)]">
            {label}
          </span>

          <Icon size={18} className="text-white/70" />
        </div>

        <div className="mt-3 text-4xl font-black">
          {value}
          <span className="text-base font-semibold text-white/50">%</span>
        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-[1800ms]`}
            style={{
              width: mounted ? `${value}%` : "0%",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function TechRadar({ mounted }: { mounted: boolean }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl">
      <div className="border-b border-white/10 px-5 py-4">
        <div className="text-[11px] uppercase tracking-[0.25em] text-[var(--text-2)]">
          Tech Radar
        </div>

        <div className="mt-1 text-xl font-bold">Primary Skills</div>
      </div>

      <div className="grid grid-cols-2 gap-4 p-5 lg:grid-cols-3">
        {STACK_USAGE.map(([name, level]) => (
          <RadarSkill key={name} mounted={mounted} name={name} level={level} />
        ))}
      </div>
    </section>
  );
}

function RadarSkill({
  name,
  level,
  mounted,
}: {
  name: string;
  level: number;
  mounted: boolean;
}) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-all duration-300 hover:border-accent/50 hover:bg-white/[0.06]">
      <div className="flex items-center justify-between">
        <span className="font-medium">{name}</span>

        <span className="text-sm text-white/50">{level}%</span>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-[1800ms]"
          style={{
            width: mounted ? `${level}%` : "0%",
          }}
        />
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-white/50">
        <span>Beginner</span>
        <span>Expert</span>
      </div>
    </div>
  );
}

function RecentActivity() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl">
      <div className="border-b border-white/10 px-5 py-4">
        <div className="text-[11px] uppercase tracking-[0.25em] text-[var(--text-2)]">
          Recent Activity
        </div>

        <div className="mt-1 text-xl font-bold">Engineering Timeline</div>
      </div>

      <div className="space-y-4 p-5">
        {RECENT_ACTIVITY.map((activity, index) => (
          <ActivityItem
            key={activity.title}
            activity={activity}
            isLast={index === RECENT_ACTIVITY.length - 1}
          />
        ))}
      </div>
    </section>
  );
}

function ActivityItem({
  activity,
  isLast,
}: {
  activity: {
    title: string;
    time: string;
  };
  isLast: boolean;
}) {
  return (
    <div className="relative flex gap-4">
      {!isLast && (
        <div className="absolute left-[11px] top-6 h-full w-px bg-white/10" />
      )}

      <div className="relative z-10 mt-1 h-6 w-6 rounded-full border border-cyan-400/30 bg-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,.35)]">
        <div className="absolute inset-1 animate-pulse rounded-full bg-cyan-400" />
      </div>

      <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-all duration-300 hover:bg-white/[0.06]">
        <div className="flex items-center justify-between">
          <div className="font-medium">{activity.title}</div>

          <span className="text-xs text-white/40">{activity.time}</span>
        </div>

        <div className="mt-2 text-sm text-white/50">
          Successfully completed and merged into the production workspace.
        </div>
      </div>
    </div>
  );
}

function buildHeatmap() {
  return Array.from({ length: 52 }).flatMap((_, week) =>
    Array.from({ length: 7 }).map((__, day) => ({
      id: `${week}-${day}`,
      value: Math.floor(Math.random() * 5),
      active: Math.random() > 0.55,
    })),
  );
}

function ContributionGraph({
  cells,
}: {
  cells: ReturnType<typeof buildHeatmap>;
}) {
  const total = cells.filter((c) => c.active).length;

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.25em] text-[var(--text-2)]">
            Contributions
          </div>

          <div className="mt-1 text-xl font-bold">Engineering Activity</div>
        </div>

        <div className="text-right">
          <div className="text-3xl font-black">{total}</div>

          <div className="text-xs text-white/40">Active Days</div>
        </div>
      </div>

      <div className="overflow-x-auto p-5">
        <ContributionGrid cells={cells} />
      </div>
    </section>
  );
}

function ContributionGrid({ cells }: { cells: any }) {
  return (
    <div className="inline-flex gap-1">
      {Array.from({ length: 52 }).map((_, week) => (
        <div key={week} className="flex flex-col gap-1">
          {Array.from({ length: 7 }).map((__, day) => {
            const cell = cells[week * 7 + day];

            return (
              <ContributionCell
                key={cell.id}
                value={cell.value}
                active={cell.active}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

function ContributionCell({
  value,
  active,
}: {
  value: number;
  active: boolean;
}) {
  const colors = [
    "bg-white/5",
    "bg-cyan-900",
    "bg-cyan-700",
    "bg-cyan-500",
    "bg-cyan-300",
  ];

  return (
    <div
      className={`h-3 w-3 rounded-[4px] transition-all duration-500 hover:scale-150 hover:ring-2 hover:ring-cyan-300 ${
        active ? colors[value] : "bg-white/5"
      } `}
    />
  );
}
