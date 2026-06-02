import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Nav } from "@/components/Nav";
import { CartDrawer } from "@/components/CartDrawer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="mono-label text-accent mb-4">/ 404 — Signal lost</p>
        <h1 className="font-display text-7xl">Off-grid.</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          The page you're looking for has drifted out of frequency.
        </p>
        <div className="mt-8">
          <Link to="/" className="btn-luxury btn-luxury-filled inline-block">Return Home</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="mono-label text-accent mb-4">/ Transmission error</p>
        <h1 className="font-display text-5xl">Something glitched.</h1>
        <p className="mt-4 text-sm text-muted-foreground">Try again or head back to the lobby.</p>
        <div className="mt-8 flex justify-center gap-3">
          <button onClick={() => { router.invalidate(); reset(); }} className="btn-luxury btn-luxury-filled">Retry</button>
          <a href="/" className="btn-luxury">Home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Aethera — Obsidian Protocol" },
      { name: "description", content: "Engineered silk and chromatic armor. A futuristic luxury wardrobe, released in cinematic drops." },
      { name: "theme-color", content: "#0a0c0f" },
      { property: "og:title", content: "Aethera — Obsidian Protocol" },
      { property: "og:description", content: "Engineered silk and chromatic armor. A futuristic luxury wardrobe, released in cinematic drops." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,500;1,700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background text-foreground">
        <Nav />
        <Outlet />
        <CartDrawer />
      </div>
    </QueryClientProvider>
  );
}
