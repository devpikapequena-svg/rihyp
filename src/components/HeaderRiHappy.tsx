'use client'

import { useCart } from '@/context/CartContext'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useIsMobile } from '@/hooks/use-mobile'

export default function HeaderRiHappy() {
  const { cart } = useCart() // ✅ precisa vir antes do uso
  const totalItems = cart.reduce((acc, p) => acc + (p.quantity || 1), 0) // ✅ agora funciona

  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isMobile = useIsMobile()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* 🔸 Faixa branca topo */}
      <div
        className={`w-full bg-white text-sm font-semibold flex justify-center py-1 border-b border-gray-200 transition-all duration-500 ${
          isScrolled ? 'opacity-0 -translate-y-3 pointer-events-none' : 'opacity-100 translate-y-0'
        }`}
      >
        Ganhe R$10 de desconto,{' '}
        <a href="#" className="text-[#000] underline ml-1 hover:text-[#e85c00]">
          cadastre-se aqui!
        </a>
      </div>

      {/* ============= 💻 DESKTOP ============= */}
      {!isMobile && (
        <header
          className={`w-full sticky top-0 z-50 bg-[#ffde00] transition-all duration-300 ${
            isScrolled
              ? 'py-[3px] shadow-md'
              : 'pt-[10px] pb-[4px] border-b border-yellow-400'
          }`}
        >
          <div
            className={`max-w-[1300px] mx-auto flex items-center justify-between px-4 md:px-6 transition-all duration-300 ${
              isScrolled ? 'h-[58px]' : 'h-[90px]'
            }`}
          >
            {/* 🔹 Logo (sol + texto clicável) */}
            <Link
              href="/"
              className={`flex items-center transition-all duration-300 ${
                isScrolled ? 'mt-0' : '-mt-[20px]'
              } cursor-pointer`}
            >
              <div
                className={`w-[105px] h-[95px] bg-no-repeat bg-contain bg-center transition-all duration-500 ease-in-out ${
                  isScrolled
                    ? 'opacity-0 scale-90 -translate-y-1 pointer-events-none'
                    : 'opacity-100 scale-100 translate-y-0'
                }`}
                style={{
                  backgroundImage:
                    'url("https://rihappynovo.vtexassets.com/assets/vtex.file-manager-graphql/images/581e5b85-db12-4a8f-a04f-47568753882f___7e6656c3e80d67c19d177cac85745c52.png")',
                  marginRight: '-25px',
                }}
              ></div>

              <Image
                src="https://rihappyio.vtexassets.com/assets/vtex/assets-builder/rihappyio.rihappy-theme/4.7.14/images/logo-rihappy___cfa7eb65acd65ba6a052635ca6a8851b.svg"
                alt="Ri Happy"
                width={isScrolled ? 105 : 150}
                height={isScrolled ? 40 : 60}
                className="object-contain transition-all duration-300"
              />
            </Link>

            {/* 🔹 Centro (CEP + busca) */}
            <div
              className={`flex flex-col items-center flex-1 mx-8 transition-all duration-300 ${
                isScrolled ? 'mt-[0px]' : '-mt-[6px]'
              }`}
            >
              <div className="flex items-center justify-center gap-5 w-full">
                <span className="text-xs text-gray-900 flex items-center gap-1 whitespace-nowrap">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16" className="mt-[1px]">
                    <g transform="translate(0 1)">
                      <rect width="16" height="16" transform="translate(0 -1)" fill="none"></rect>
                      <path
                        d="M16.032,6.5v0l0,0L3.5,11.856l6.331.848.847,6.33L16.031,6.5l0,0Z"
                        transform="translate(-2.267 -5.267)"
                        fill="#444"
                      ></path>
                    </g>
                  </svg>
                  Entrega estimada: <strong>até 3 dias úteis</strong>
                </span>

                {/* Campo de busca */}
                <div className="relative flex-1 max-w-[420px]">
                  <input
                    type="text"
                    placeholder="Encontre aqui um mundo de diversão..."
                    className="w-full rounded-full px-5 py-2.5 pl-10 text-[15px] border border-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none shadow-sm"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 105.64 5.64a7.5 7.5 0 0010.61 10.61z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* 🔹 Ícones à direita */}
            <div className="flex items-center gap-3 transition-all duration-300">
              <Image
                src="https://rihappynovo.vtexassets.com/arquivos/icon-happy-mais-header-desktop-2x.png"
                alt="Happy Mais"
                width={isScrolled ? 34 : 46}
                height={isScrolled ? 34 : 46}
                className="transition-all duration-300"
              />

              {/* Ícones */}
              <div className="flex items-center gap-3">
                <Image src="https://cdn-icons-png.flaticon.com/512/2838/2838836.png" width={18} height={18} alt="Loja" />
                <Image src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png" width={18} height={18} alt="Favoritos" />
                <Image src="https://cdn-icons-png.flaticon.com/512/3209/3209884.png" width={18} height={18} alt="Usuário" />

                {/* 🛒 Carrinho com contador */}
                <Link href="/checkout/cart" className="relative">
                  <div className="w-9 h-9 bg-[#7640cc] rounded-full flex items-center justify-center shadow-sm hover:scale-105 transition">
                    <Image src="https://cdn-icons-png.flaticon.com/512/833/833314.png" width={18} height={18} alt="Carrinho" />
                  </div>
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#ff0000] text-white text-[11px] font-bold px-[6px] py-[1px] rounded-full shadow">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>

          {/* 🔻 MENU inferior */}
          <div
            className={`transition-all duration-500 ease-in-out ${
              isScrolled
                ? 'opacity-0 -translate-y-5 max-h-0 pointer-events-none'
                : 'opacity-100 translate-y-0 max-h-[100px]'
            }`}
          >
            <nav className="max-w-[1300px] mx-auto flex flex-wrap items-center justify-center px-6 pb-2">
              <div className="flex flex-wrap items-center justify-center gap-10 text-[14px] font-medium text-[#444444]">
                <Link href="#" className="hover:text-[#e85c00] flex items-center gap-1">
                  ☰ <span>Todos os departamentos</span>
                </Link>
                <Link href="/novidades" className="hover:text-[#e85c00]">Novidades</Link>
                <Link href="/happy-friday" className="hover:text-[#e85c00]">Happy Friday</Link>
                <Link href="/produtos-importados" className="hover:text-[#e85c00]">Importados</Link>
                <Link href="/produtos-exclusivos" className="hover:text-[#e85c00]">Exclusivos</Link>
              </div>
              <button className="bg-black text-white text-xs font-semibold px-5 py-1.5 rounded-full shadow ml-10">
                🟡 OUTLET
              </button>
            </nav>
          </div>
        </header>
      )}

    
 {/* ============= 📱 MOBILE ============= */}
{isMobile && (
  <header className="w-full sticky top-0 z-50 bg-[#ffde00] border-b border-yellow-400 shadow-sm">
    <div className="flex items-center justify-between px-4 py-3">
      {/* ☰ Menu hambúrguer */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Abrir menu"
        className="flex flex-col justify-center items-center w-9 h-9 bg-white rounded-full shadow-sm"
      >
        <span className="w-4 h-[2px] bg-[#444] mb-[4px] rounded"></span>
        <span className="w-4 h-[2px] bg-[#444] mb-[4px] rounded"></span>
        <span className="w-4 h-[2px] bg-[#444] rounded"></span>
      </button>

      {/* 🌞 Logo central */}
      <Link href="/" className="flex justify-center flex-1">
        <Image
          src="https://rihappyio.vtexassets.com/assets/vtex/assets-builder/rihappyio.rihappy-theme/4.7.14/images/logo-rihappy___cfa7eb65acd65ba6a052635ca6a8851b.svg"
          alt="Ri Happy"
          width={120}
          height={40}
        />
      </Link>

      {/* 👤 e 🛒 Ícones com contador */}
      <div className="flex items-center gap-2 relative">
        <Image
          src="https://cdn-icons-png.flaticon.com/512/3209/3209884.png"
          alt="Usuário"
          width={22}
          height={22}
        />

        {/* 🛒 Ícone de carrinho com contador */}
        <Link href="/checkout/cart" className="relative">
          <Image
            src="https://cdn-icons-png.flaticon.com/512/833/833314.png"
            alt="Carrinho"
            width={24}
            height={24}
          />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#7640cc] text-white text-[10px] font-bold px-[6px] py-[1px] rounded-full shadow">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </div>

    {/* 🔍 Busca abaixo da logo */}
    <div className="px-4 pb-3">
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar brinquedo..."
          className="w-full rounded-full px-10 py-2 text-[14px] border border-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 105.64 5.64a7.5 7.5 0 0010.61 10.61z"
          />
        </svg>
      </div>
    </div>

    {/* 🧭 Menu horizontal */}
    <div
      className={`overflow-x-auto whitespace-nowrap px-4 py-2 bg-[#fff5a0] border-t border-yellow-300 transition-all duration-300 ${
        menuOpen ? 'max-h-[300px]' : 'max-h-[50px]'
      }`}
    >
      <div className="flex gap-4">
        {[
          { label: 'Departamentos', href: '/' },
          { label: 'Crianças', href: '/dia-das-criancas' },
          { label: 'Novidades', href: '/novidades' },
          { label: 'Importados', href: '/produtos-importados' },
          { label: 'Exclusivos', href: '/produtos-exclusivos' },
        ].map(({ label, href }, i) => (
          <Link
            key={i}
            href={href}
            onClick={() => setMenuOpen(false)}
            className="px-4 py-1.5 rounded-full bg-white shadow-sm border text-[13px] font-semibold text-[#333] hover:bg-yellow-200 transition whitespace-nowrap"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  </header>
)}

    </>
  )
}
