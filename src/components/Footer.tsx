export function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 md:px-10 pt-24 pb-10 mt-20 relative grain">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 mb-24">
          <div className="md:col-span-7">
            <h2 className="font-display text-5xl md:text-7xl tracking-tighter leading-[0.95] max-w-[18ch]">
              Stay synchronized with the next drop.
            </h2>
            <form className="mt-10 flex border-b border-white/30 pb-3 max-w-md group focus-within:border-accent transition-colors">
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="bg-transparent w-full text-[11px] tracking-[0.3em] font-mono uppercase outline-none placeholder:text-white/30"
              />
              <button type="button" className="text-[11px] font-mono tracking-[0.3em] font-bold hover:text-accent">
                JOIN
              </button>
            </form>
            <p className="mono-label mt-4 normal-case tracking-widest">
              No spam. One transmission per drop. Cancel any time.
            </p>
          </div>
          <div className="md:col-span-5 grid grid-cols-2 gap-10 mono-label text-foreground">
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-accent transition-colors">Shipping</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Care guide</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Sizing</a></li>
            </ul>
            <ul className="space-y-3 text-right">
              <li><a href="#" className="hover:text-accent transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">TikTok</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Discord</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Press</a></li>
            </ul>
          </div>
        </div>
        <div className="font-display italic text-[18vw] md:text-[14rem] leading-none opacity-[0.05] select-none overflow-hidden text-center">
          Aethera
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/5 mono-label normal-case tracking-widest">
          <span>© 2026 Aethera Systems Co.</span>
          <span>Engineered in Milan · Composed in India</span>
        </div>
      </div>
    </footer>
  );
}
