import { useEffect, useState } from "react";

export function DropMarquee() {
  const [diff, setDiff] = useState<number | null>(null);
  useEffect(() => {
    const target = new Date();
    target.setDate(target.getDate() + 4);
    target.setHours(20, 0, 0, 0);
    const tick = () => setDiff(Math.max(0, target.getTime() - Date.now()));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);
  const v = diff ?? 0;
  const d = Math.floor(v / 86400000);
  const h = Math.floor((v / 3600000) % 24);
  const m = Math.floor((v / 60000) % 60);
  const s = Math.floor((v / 1000) % 60);
  const pad = (n: number) => String(n).padStart(2, "0");
  const time = diff === null ? "-- : -- : -- : --" : `${pad(d)} : ${pad(h)} : ${pad(m)} : ${pad(s)}`;

  const segment = (
    <>
      <span className="font-mono text-[10px] tracking-[0.35em] text-accent">
        Live Drop · Phase Shift Archive opens in {time}
      </span>
      <span className="font-display text-2xl">Phase Shift Archive</span>
      <span className="font-mono text-[10px] tracking-[0.35em] text-accent">
        / 45 of 200 reserved
      </span>
      <span className="font-display text-2xl">Invite-only early access</span>
    </>
  );

  return (
    <div className="border-y border-white/10 py-3 overflow-hidden whitespace-nowrap bg-background relative">
      <div className="flex w-max gap-12 items-center animate-[marquee_36s_linear_infinite]">
        {segment}
        {segment}
        {segment}
      </div>
    </div>
  );
}
