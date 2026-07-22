type Props = {
  item: {
    id: string;
    label: string;
  };
};

export default function NavigationItem({ item }: Props) {
  return (
    <a
      href={`#${item.id}`}
      className="text-sm font-medium text-white/70 transition-colors duration-300 hover:text-white"
    >
      {item.label}
    </a>
  );
}
