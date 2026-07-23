"use client";

interface NavItem {
  id: string;
  label: string;
}

interface NavigationItemProps {
  item: NavItem;
  isActive: boolean;
  onClick: () => void;
}

export default function NavigationItem({
  item,
  isActive,
  onClick,
}: NavigationItemProps) {
  return (
    <a
      href={`#${item.id}`}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className="relative inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:[background:var(--glass)]"
      style={{ color: isActive ? "var(--text-1)" : "var(--text-2)" }}
    >
      {item.label}
    </a>
  );
}
