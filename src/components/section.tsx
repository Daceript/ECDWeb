import type { ReactNode } from "react";

const variantClasses = {
  gray: "bg-gray-100",
  white: "bg-white",
} as const;

export default function Section({
  children,
  variant = "white",
  className = "",
  id,
}: {
  children?: ReactNode;
  variant?: keyof typeof variantClasses;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`${variantClasses[variant]} py-20 ${className}`}>
      <div className="container mx-auto px-4">{children}</div>
    </section>
  );
}
