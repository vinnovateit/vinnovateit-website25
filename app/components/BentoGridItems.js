import cn from "@/lib/cn";
import { ArrowRight } from "lucide-react";

function BentoGridItem({ className, title, description }) {
  return (
    <div
      className={cn(
        // Darker gradient border + white glow
        "relative rounded-2xl p-px bg-gradient-to-tr from-slate-800 to-purple-600 shadow-[0_0_20px_6px_rgba(255,255,255,0.2)]",
        className
      )}
    >
      <div className="flex flex-col justify-between h-full rounded-xl bg-slate-900 p-6">
        <div className="flex-1">
          <h3
            className="mb-4 text-3xl font-semibold text-white"
            style={{ fontFamily: "Orbitron, monospace" }}
          >
            {title}
          </h3>
          <p
            className="text-sm leading-relaxed text-purple-100 opacity-80"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            {description}
          </p>
        </div>

        {/* Button matching the screenshot */}
        <div className="mt-6 flex items-center justify-end">
          <button className="flex items-center gap-2 rounded-full bg-purple-800 px-6 py-2 text-sm text-white transition duration-200 hover:bg-purple-700">
            explore
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default BentoGridItem;