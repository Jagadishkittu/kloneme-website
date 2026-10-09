import { Icon } from "@/components/ui/Icon";
import { PlayLogo } from "@/components/ui/PlayLogo";
import { site } from "@/content/site";

// App Store and Google Play buttons: dark pills, for light backgrounds (the hero and the footer)
export function StoreButtons({ size = "md", className }: { size?: "md" | "sm"; className?: string }) {
  const sm = size === "sm";
  const items = [
    { ...site.stores.appStore, logo: <Icon name="apple" className={sm ? "size-5 shrink-0" : "size-6 shrink-0"} /> },
    { ...site.stores.googlePlay, logo: <PlayLogo className={sm ? "size-[18px] shrink-0" : "size-[22px] shrink-0"} /> },
  ];
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className ?? ""}`}>
      {items.map((b) => (
        <a
          key={b.big}
          href={site.downloadUrl}
          target="_blank"
          rel="noopener"
          aria-label={b.label}
          className={`inline-flex items-center rounded-full bg-ink text-bg shadow-[0_14px_30px_-14px_rgba(23,20,29,0.6)] transition-transform hover:-translate-y-0.5 active:translate-y-0 ${
            sm ? "h-12 gap-2 pl-4 pr-5" : "h-14 gap-2.5 pl-[18px] pr-[22px]"
          }`}
        >
          {b.logo}
          <span className="flex flex-col text-left leading-[1.05]">
            <small className={`${sm ? "text-[9.5px]" : "text-[10.5px]"} font-medium opacity-80`}>{b.small}</small>
            <b className={`${sm ? "text-[17px]" : "text-[20px]"} font-semibold tracking-[-0.02em]`}>{b.big}</b>
          </span>
        </a>
      ))}
    </div>
  );
}
