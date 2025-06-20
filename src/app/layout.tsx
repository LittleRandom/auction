import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"


import Providers from '@/app/providers'
import AuctionLogo from "@/components/ui/logo";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const menuItems = [
    {
      name: "Import",
      uri: "/protected/import/lots"
    },
    {
      name: "Events",
      uri: "/protected/import/events"
    },
  ]
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-20 items-center">
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full  flex justify-between items-center p-3 px-20 text-sm">
                  <div className="flex gap-5 items-center font-semibold">

                    <AuctionLogo
                      width="32px"
                      height="32px"
                    />
                    <NavigationMenu>
                      <NavigationMenuList>

                        {menuItems.map((item) => (
                          <NavigationMenuItem key={item.name}>
                            <Link href={item.uri} legacyBehavior passHref>
                              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                {item.name}
                              </NavigationMenuLink>
                            </Link>
                          </NavigationMenuItem>
                        ))}
                      </NavigationMenuList>
                    </NavigationMenu>

                  </div>

                  <HeaderAuth />
                </div>
              </nav>
              <div className="max-w-screen px-16 ">
                <Providers>{children}</Providers>
              </div>

              <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
                <p>
                  © Copyright 2025 Quoc Vu LLC. All Rights Reserved.
                </p>
                <ThemeSwitcher />
              </footer>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html >
  );
}
