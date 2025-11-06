'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useIsMobile } from '@/hooks/use-mobile'

export default function HeaderCheckoutRiHappy() {
  const pathname = usePathname()
  const isMobile = useIsMobile()

  // 🔹 Etapa ativa com base na rota
  const etapaAtiva = pathname.includes('/checkout/pagamento')
    ? 'pagamento'
    : pathname.includes('/checkout/identificacao')
    ? 'identificacao'
    : 'cart'

  return (
    <header className="w-full bg-[#ffde00] border-b border-yellow-300 py-3 relative z-20">
      <div
        className={`max-w-[1400px] mx-auto flex items-center justify-between ${
          isMobile ? 'flex-col gap-2 px-4' : 'px-6'
        }`}
      >
        {/* 🌞 LOGO */}
        <Link href="/" className="flex items-center justify-center">
          <Image
            src="https://rihappynovo.vteximg.com.br/arquivos/logoNewCheckout.png"
            alt="Ri Happy"
            width={isMobile ? 130 : 160}
            height={50}
            className="object-contain"
            priority
          />
        </Link>

        {/* ✅ ETAPAS */}
        {isMobile ? (
          // 📱 MOBILE — versão compacta
          <div className="flex items-center justify-center w-full mt-2">
            <div className="flex justify-around items-center w-full max-w-[340px]">
              {/* Etapa Carrinho */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-[40px] h-[40px] rounded-full flex items-center justify-center text-[22px] font-bold border-2 border-white ${
                    etapaAtiva === 'cart'
                      ? 'bg-white text-green-600 shadow-md'
                      : 'bg-[#ffde00] text-[#444]'
                  }`}
                >
                  🎁
                </div>
                <span
                  className={`text-[11px] mt-[3px] font-medium ${
                    etapaAtiva === 'cart' ? 'text-green-600' : 'text-[#333]'
                  }`}
                >
                  Carrinho
                </span>
              </div>

              {/* Etapa Identificação */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-[40px] h-[40px] rounded-full flex items-center justify-center text-[22px] font-bold border-2 border-white ${
                    etapaAtiva === 'identificacao'
                      ? 'bg-white text-green-600 shadow-md'
                      : 'bg-[#ffde00] text-[#444]'
                  }`}
                >
                  📋
                </div>
                <span
                  className={`text-[11px] mt-[3px] font-medium ${
                    etapaAtiva === 'identificacao'
                      ? 'text-green-600'
                      : 'text-[#333]'
                  }`}
                >
                  Identificação
                </span>
              </div>

              {/* Etapa Pagamento */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-[40px] h-[40px] rounded-full flex items-center justify-center text-[22px] font-bold border-2 border-white ${
                    etapaAtiva === 'pagamento'
                      ? 'bg-white text-green-600 shadow-md'
                      : 'bg-[#ffde00] text-[#444]'
                  }`}
                >
                  💳
                </div>
                <span
                  className={`text-[11px] mt-[3px] font-medium ${
                    etapaAtiva === 'pagamento'
                      ? 'text-green-600'
                      : 'text-[#333]'
                  }`}
                >
                  Pagamento
                </span>
              </div>
            </div>
          </div>
        ) : (
          // 💻 DESKTOP — padrão completo
          <div className="relative flex items-center justify-center flex-1 mx-20">
            {/* Linha central */}
            <div className="absolute top-[40%] translate-y-[-50%] left-[calc(50%-310px)] w-[620px] h-[3px] bg-white"></div>

            <div className="flex justify-between items-center w-[640px] mx-auto relative z-10">
              {/* Carrinho */}
              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-[60px] h-[60px] rounded-full border-[3px] border-white flex items-center justify-center shadow-md text-[28px] ${
                    etapaAtiva === 'cart' ? 'bg-white' : 'bg-[#ffde00]'
                  }`}
                >
                  🎁
                </div>
                <div
                  className={`text-[12px] font-medium rounded-full px-3 py-[2px] mt-1 ${
                    etapaAtiva === 'cart'
                      ? 'bg-white text-green-600 shadow-sm'
                      : 'text-[#333]'
                  }`}
                >
                  carrinho
                </div>
              </div>

              {/* Identificação */}
              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-[60px] h-[60px] rounded-full border-[3px] border-white flex items-center justify-center shadow-md text-[28px] ${
                    etapaAtiva === 'identificacao' ? 'bg-white' : 'bg-[#ffde00]'
                  }`}
                >
                  📋
                </div>
                <span
                  className={`text-[13px] mt-1 font-medium ${
                    etapaAtiva === 'identificacao'
                      ? 'text-green-600'
                      : 'text-[#333]'
                  }`}
                >
                  identificação
                </span>
              </div>

              {/* Pagamento */}
              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-[60px] h-[60px] rounded-full border-[3px] border-white flex items-center justify-center shadow-md text-[28px] ${
                    etapaAtiva === 'pagamento' ? 'bg-white' : 'bg-[#ffde00]'
                  }`}
                >
                  💳
                </div>
                <span
                  className={`text-[13px] mt-1 font-medium ${
                    etapaAtiva === 'pagamento'
                      ? 'text-green-600'
                      : 'text-[#333]'
                  }`}
                >
                  pagamento
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 🔒 Selo VTEX */}
        {!isMobile && (
          <div className="flex items-center justify-end">
            <Image
              src="https://rihappynovo.vtexassets.com/arquivos/selo-certificado-vtex-footer.png"
              alt="VTEX PCI Certified"
              width={105}
              height={60}
              className="object-contain"
            />
          </div>
        )}
      </div>
    </header>
  )
}
