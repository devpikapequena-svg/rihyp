'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { usePathname } from 'next/navigation'

export default function MobileBottomBar() {
  const { cart } = useCart()
  const pathname = usePathname()

  // 🛑 Oculta a barra nas páginas de checkout (carrinho, identificação, pagamento, etc.)
  if (pathname.startsWith('/checkout')) return null

  // mostra o número total de itens no carrinho
  const totalItems = cart.reduce((acc, p) => acc + (p.quantity || 1), 0)

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] w-[90%] max-w-[360px] md:hidden">
      <div className="bg-white shadow-lg rounded-full flex justify-around items-center py-2 px-3 border border-gray-200">
        {/* 🏠 Início */}
        <Link
          href="/"
          className={`flex flex-col items-center text-[12px] font-medium transition ${
            pathname === '/' ? 'text-[#6a5acd]' : 'text-gray-600'
          }`}
        >
          <Image
            src="https://cdn-icons-png.flaticon.com/512/1946/1946436.png"
            alt="Início"
            width={22}
            height={22}
            className="mb-[2px]"
          />
          Início
        </Link>

        {/* 🛒 Carrinho */}
        <Link
          href="/checkout/cart"
          className={`relative flex flex-col items-center text-[12px] font-medium transition ${
            pathname.includes('/checkout') ? 'text-[#6a5acd]' : 'text-gray-600'
          }`}
        >
          <div className="relative">
            <Image
              src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
              alt="Carrinho"
              width={26}
              height={26}
            />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#e53935] text-white text-[10px] font-bold rounded-full w-[17px] h-[17px] flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
          <span className="mt-[1px]">Carrinho</span>
        </Link>

        {/* 👤 Conta */}
        <Link
          href="/conta"
          className={`flex flex-col items-center text-[12px] font-medium transition ${
            pathname.includes('/conta') ? 'text-[#6a5acd]' : 'text-gray-600'
          }`}
        >
          <Image
            src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
            alt="Conta"
            width={23}
            height={23}
            className="mb-[2px]"
          />
          Conta
        </Link>
      </div>
    </div>
  )
}
