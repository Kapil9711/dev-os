"use client";

type Props = {
  open: boolean;
};

export default function MobileMenu({ open }: Props) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40 bg-[#06080d]/95 backdrop-blur-xl lg:hidden"></div>
  );
}
