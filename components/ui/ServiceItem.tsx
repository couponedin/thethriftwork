import type { Service } from "@/lib/types";

type ServiceItemProps = {
  service: Service;
  index?: number;
  active?: boolean;
  onSelect?: () => void;
};

/** Legacy list item — prefer the interactive Services tabs. */
export function ServiceItem({
  service,
  index = 0,
  active = false,
  onSelect,
}: ServiceItemProps) {
  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        className={`w-full text-left flex items-center gap-4 rounded-2xl px-5 py-4 transition-colors duration-300 ${
          active
            ? "bg-white text-black"
            : "bg-transparent text-white/45 hover:text-white/75"
        }`}
      >
        <span className="tabular-nums text-sm opacity-50">{index + 1}.</span>
        <span className="font-sans text-[17px] font-medium tracking-[-0.02em]">
          {service.title}
        </span>
      </button>
    </li>
  );
}
