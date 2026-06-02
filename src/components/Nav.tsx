import { Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { useProfile } from "@/lib/profile";
import { useAuth } from "@/lib/auth";
import { useHydrated } from "@/hooks/use-hydrated";
import { SearchModal } from "./SearchModal";
import { AuthModal } from "./AuthModal";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const isHydrated = useHydrated();
  const count = useCart((s) => s.count());
  const toggle = useCart((s) => s.toggle);
  const signedIn = useProfile((s) => s.profile.signedIn);
  
  const { user, isSignedIn, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3 glass border-b border-white/5" : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 flex items-center justify-between">
          <Link to="/" className="font-display text-2xl tracking-tighter">
            Aethera
          </Link>
          <nav className="hidden md:flex gap-8 text-[11px] uppercase tracking-[0.25em] font-medium">
            <Link to="/shop" className="hover:text-accent transition-colors">Collections</Link>
            <Link to="/worlds" className="hover:text-accent transition-colors">Worlds</Link>
            <Link to="/lookbook" className="hover:text-accent transition-colors">Lookbook</Link>
            <Link to="/manifesto" className="hover:text-accent transition-colors">Manifesto</Link>
          </nav>
          <div className="flex items-center gap-5 font-mono text-[11px]" suppressHydrationWarning>
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden sm:block hover:text-accent transition-colors"
            >
              Search
            </button>
            
            {isHydrated ? (
              isSignedIn && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="hover:text-accent transition-colors cursor-pointer">
                    {user.name}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="font-display">{user.email}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link to="/account" className="w-full">
                      <DropdownMenuItem>My Account</DropdownMenuItem>
                    </Link>
                    <Link to="/account" className="w-full">
                      <DropdownMenuItem>Orders</DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={logout}
                      className="text-destructive cursor-pointer"
                    >
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <button
                  onClick={() => setAuthOpen(true)}
                  className="hover:text-accent transition-colors"
                >
                  Sign in
                </button>
              )
            ) : (
              <span>Sign in</span>
            )}

            <button
              onClick={toggle}
              className="relative px-4 py-1.5 border border-white/15 rounded-full hover:border-accent hover:text-accent transition-all"
            >
              Bag · {isHydrated ? String(count).padStart(2, "0") : "00"}
            </button>
          </div>
        </div>
      </header>
      
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
