'use client'

import { useEffect, useState, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import './globals.css'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'
import { Inter } from 'next/font/google'
import ModalCEP from "@/components/ModalCEP"
import { CartProvider } from '@/context/CartContext'
import MobileBottomBar from '@/components/MobileBottomBar'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isNavigating, setIsNavigating] = useState(false)
  const isNotFoundPage = pathname === '/_not-found'

  useEffect(() => {
    if (isNotFoundPage) return

    setIsNavigating(true)
    const timer = setTimeout(() => setIsNavigating(false), 500)

    const handleLoad = () => {
      setIsNavigating(false)
      clearTimeout(timer)
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
      const observer = new MutationObserver(() => {
        if (document.readyState === 'complete') {
          handleLoad()
          observer.disconnect()
        }
      })
      observer.observe(document.body, { childList: true, subtree: true })
    }

    return () => {
      window.removeEventListener('load', handleLoad)
      clearTimeout(timer)
    }
  }, [pathname, searchParams, isNotFoundPage])

  return (
    <>
      {isNavigating && !isNotFoundPage && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
          <div className="loading-spinner" />
        </div>
      )}

      <div
        className={cn(
          'min-h-screen bg-background font-sans antialiased transition-opacity duration-300',
          isNavigating && !isNotFoundPage ? 'opacity-0' : 'opacity-100'
        )}
      >
        {children}
        <MobileBottomBar />
        <Toaster />
      </div>
    </>
  )
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname()

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <title>Ri Happy Brinquedos</title>
        <meta
          name="description"
          content="Compre brinquedos e diversão na Ri Happy! Produtos oficiais com até 80% de desconto."
        />
        <meta name="robots" content="index, follow" />

        {/* 🟣 Pixel Utmify */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.pixelId = "69120dc9ebe043c730df046b";
              var a = document.createElement("script");
              a.setAttribute("async", "");
              a.setAttribute("defer", "");
              a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
              document.head.appendChild(a);
            `,
          }}
        />

        {/* 🟦 Meta Pixel (Facebook) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1151107670468235');
              fbq('track', 'PageView');
            `,
          }}
        />

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1151107670468235&ev=PageView&noscript=1"
          />
        </noscript>
      </head>

      <body className={cn('overflow-y-scroll font-sans', inter.variable)}>
        <CartProvider>
          <Suspense fallback={null}>
            <LayoutContent>{children}</LayoutContent>

            {/* Exibe o modal só na home */}
            {pathname === "/" && <ModalCEP />}
          </Suspense>
        </CartProvider>
      </body>
    </html>
  )
}
