import cn from "@/lib/cn";

function BentoGrid({ className, children }) {
  return (
    <div className={cn("mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-5 gap-4 md:auto-rows-[280px]", className)}>
      {children}
    </div>
  );
}

export default BentoGrid;