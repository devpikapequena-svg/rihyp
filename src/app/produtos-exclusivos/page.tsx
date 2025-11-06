'use client'

import { useState, useEffect } from 'react'
import HeaderRiHappy from '@/components/HeaderRiHappy'
import FooterRiHappy from '@/components/FooterRiHappy'
import ProdutosGrid from '@/components/ProdutosGrid'
import useEmblaCarousel from 'embla-carousel-react'
import { useIsMobile } from '@/hooks/use-mobile'

type CategoriaKey =
  | 'jogos'
  | 'blocos'
  | 'bonecas'
  | 'mini veículos'
  | 'primeira infância'

interface Produto {
  img: string
  title: string
  price: string
  discount: string
}

export default function NovidadesPage() {
  const [activeTab, setActiveTab] = useState<CategoriaKey>('jogos')
  const [quantidades, setQuantidades] = useState<Record<number, number>>({})
  const isMobile = useIsMobile()

  const alterarQuantidade = (index: number, delta: number) => {
    setQuantidades((prev) => ({
      ...prev,
      [index]: Math.max(1, (prev[index] || 1) + delta),
    }))
  }

  const enviarParaCheckout = (produto: Produto, quantidade: number) => {
    const produtoParam = encodeURIComponent(JSON.stringify(produto))
    window.location.href = `/checkout/cart?produto=${produtoParam}&quantidade=${quantidade}`
  }

  const produtosPorCategoria: Record<CategoriaKey, Produto[]> = {
    jogos: [
      { img: 'https://rihappynovo.vtexassets.com/arquivos/ids/9118730-175-175?v=638948496969830000', title: 'Jogo de Cartas - Pokemon - Box Greninja & Kingdra', price: 'R$ 33,24', discount: '-80%' },
      { img: 'https://rihappynovo.vtexassets.com/arquivos/ids/8327956-175-175?v=638858452517600000', title: 'Jogo de Tabuleiro - Monopoly - Harry Potter - Hasbro', price: 'R$ 16,39', discount: '-80%' },
      { img: 'https://rihappynovo.vtexassets.com/arquivos/ids/7407184-175-175?v=638748094920200000', title: 'Jogo de Cartas - Dobble - Stitch - Galápagos', price: 'R$ 19,90', discount: '-80%' },
      { img: 'https://rihappynovo.vtexassets.com/arquivos/ids/8360668-175-175?v=638900910672470000', title: 'Jogo De Tabuleiro - Monopoly - Pokémon - Hasbro', price: 'R$ 31,90', discount: '-80%' },
    ],
    blocos: [
      { img: 'https://rihappynovo.vtexassets.com/arquivos/ids/7925968-175-175?v=638778344818900000', title: 'Bloco de Montar - TUDO - Tubarão Martelo', price: 'R$ 21,99', discount: '-80%' },
      { img: 'https://rihappynovo.vtexassets.com/arquivos/ids/6471902-175-175?v=638621054628500000', title: 'Bloco de Montar - TUDO - Torre Eiffel Musical', price: 'R$ 23,99', discount: '-80%' },
      { img: 'https://rihappynovo.vtexassets.com/arquivos/ids/6451973-175-175?v=638615145711330000', title: 'Bloco De Montar - Tudo - Big Ben Musical', price: 'R$ 64,99', discount: '-80%' },
      { img: 'https://rihappynovo.vtexassets.com/arquivos/ids/6445136-175-175?v=638614996165930000', title: 'Blocos de Montar - TUDO - Copan - 403 Peças', price: 'R$ 47,99', discount: '-80%' },
    ],
    bonecas: [
      { img: 'https://rihappynovo.vtexassets.com/arquivos/ids/8074290-175-175?v=638787003274230000', title: 'Boneca - ILY - Vestido Olaf - Disney', price: 'R$ 58,99', discount: '-80%' },
      { img: 'https://rihappynovo.vtexassets.com/arquivos/ids/6384289-175-175?v=638594473921400000', title: 'Mini Boneca - Cry Babies - Magic - Tears - Disney', price: 'R$ 29,99', discount: '-80%' },
      { img: 'https://rihappynovo.vtexassets.com/arquivos/ids/5862767-175-175?v=638290244187000000', title: 'ILY - Aurora Casual - Disney', price: 'R$ 29,99', discount: '-80%' },
      { img: 'https://rihappynovo.vtexassets.com/arquivos/ids/5916478-175-175?v=638315886323070000', title: 'Boneca - ILY - Elsa Saia - Disney', price: 'R$ 29,99', discount: '-80%' },
    ],
    'mini veículos': [
      { img: 'https://rihappynovo.vtexassets.com/arquivos/ids/9119640-175-175?v=638948563721930000', title: 'Conjunto Caminhão E Carrinho - New Truck Plataforma', price: 'R$ 25,63', discount: '-80%' },
      { img: 'https://rihappynovo.vtexassets.com/arquivos/ids/7543826-175-175?v=638762683033300000', title: 'Caminhão do Lixo - Limpando a Cidade - Fanfun', price: 'R$ 64,56', discount: '-80%' },
      { img: 'https://rihappynovo.vtexassets.com/arquivos/ids/4775668-175-175?v=637995449997800000', title: 'Mini Veículo - Avião - FanFun', price: 'R$ 47,99', discount: '-80%' },
      { img: 'https://rihappynovo.vtexassets.com/arquivos/ids/5485704-175-175?v=638122605055630000', title: 'Caminhão - Truckssauro - Festa dos Dinossauros', price: 'R$ 38,23', discount: '-80%' },
    ],
    'primeira infância': [
      { img: 'https://rihappynovo.vtexassets.com/arquivos/ids/6410268-175-175?v=638609889275770000', title: 'MNM CHOCALHO ELEFANTE', price: 'R$ 20,58', discount: '-80%' },
      { img: 'https://rihappynovo.vtexassets.com/arquivos/ids/6453786-175-175?v=638615990122470000', title: 'Brinquedo - Tucano Musical - Minimi', price: 'R$ 12,94', discount: '-80%' },
      { img: 'https://rihappynovo.vtexassets.com/arquivos/ids/390854-175-175?v=636995936086670000', title: 'Cozinha Portátil e Acessórios - Fan Fun', price: 'R$ 15,45', discount: '-80%' },
      { img: 'https://rihappynovo.vtexassets.com/arquivos/ids/6691834-175-175?v=638630653051470000', title: 'Livrinho de Banho - Fazendinha - Minimi', price: 'R$ 19,34', discount: '-80%' },
    ],
  }

  const produtosAtuais = produtosPorCategoria[activeTab]

  return (
    <>
      <HeaderRiHappy />

      {/* 🌍 Banner Responsivo */}
      <section
        className={`relative w-full flex items-center justify-center overflow-hidden ${
          isMobile ? 'bg-[#ffdf00] flex-col py-8' : ''
        }`}
        style={
          !isMobile
            ? {
                backgroundImage:
                  "url('https://rihappynovo.vtexassets.com/assets/vtex.file-manager-graphql/images/62e22be8-dcd8-4467-a255-7796f5aaefe9___bd19f7b51925b712713a6064059d5c80.png')",
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: '100% auto',
                height: '440px',
              }
            : {}
        }
      >
        {isMobile ? (
          <>
            <img
              src="https://rihappynovo.vtexassets.com/assets/vtex.file-manager-graphql/images/15b7049c-2b22-4339-aaa1-5518733824dd___d6a4efff8fe1e610a1d5d6db6b313f7c.png"
              alt="Brinquedos"
              className="w-[85%] max-w-[380px] object-contain"
            />
          </>
        ) : (
          <div className="relative flex flex-row items-center justify-center w-full max-w-[1300px] px-4 gap-0 h-full -translate-x-32">
            <div className="flex items-center justify-end w-1/2 pr-0 h-full">
              <img
                src="https://rihappynovo.vtexassets.com/assets/vtex.file-manager-graphql/images/15b7049c-2b22-4339-aaa1-5518733824dd___d6a4efff8fe1e610a1d5d6db6b313f7c.png"
                alt="Brinquedos"
                className="w-[80%] max-w-[600px] object-contain"
              />
            </div>
            <div className="flex flex-col items-start justify-center w-1/2 -translate-x-20 h-full">
              <img
                src="https://rihappynovo.vtexassets.com/assets/vtex.file-manager-graphql/images/5a9decc6-72df-4a41-8e64-27a3121071cc___d9add607486404777f86cb4a8c52ad7c.png"
                alt="Texto"
                className="w-[130%] max-w-[900px] object-contain"
              />
            </div>
          </div>
        )}
      </section>

      {/* 🟣 Categorias + Produtos */}
      <section className={`bg-[#ffdf00] ${isMobile ? 'py-8' : 'py-20'}`}>
        <div className="max-w-[1300px] mx-auto px-4 md:px-6">
       {/* 🔸 CATEGORIAS */}
<div
  className={`flex flex-wrap justify-center ${
    isMobile
      ? 'overflow-x-auto scrollbar-hide gap-3 pb-4 snap-x snap-mandatory'
      : 'gap-5 mb-10'
  }`}
>
  {(Object.keys(produtosPorCategoria) as CategoriaKey[]).map((tab, i) => (
    <button
      key={i}
      onClick={() => setActiveTab(tab)}
      className={`${
        activeTab === tab
          ? 'bg-[#6a5acd] text-white shadow-lg scale-105'
          : 'bg-white text-gray-700'
      } ${
        isMobile
          ? 'px-5 py-2 text-[13px]'
          : 'px-8 py-2.5 text-[15px]'
      } rounded-full font-semibold whitespace-nowrap capitalize snap-center transition-all duration-200 shadow-sm border border-[#d1c8ff]`}
    >
      {tab}
    </button>
  ))}
</div>


          {/* 🔹 PRODUTOS */}
          <div
            className={`grid ${
              isMobile
                ? 'grid-cols-2 gap-4 mt-2'
                : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6'
            }`}
          >
            {produtosAtuais.map((p, i) => {
              const qtd = quantidades[i] || 1
              return (
                <div
                  key={i}
                  className={`bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition flex flex-col overflow-hidden ${
                    isMobile ? 'pb-2' : ''
                  }`}
                >
                  {/* ❤️ */}
                  <button className="absolute right-3 top-3 bg-white w-7 h-7 rounded-full shadow-sm border border-gray-200 flex items-center justify-center hover:bg-gray-100 z-10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.6"
                      stroke="#555"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.239-4.5-5-4.5-1.74 0-3.31.906-4 2.292A4.48 4.48 0 008 3.75c-2.761 0-5 2.015-5 4.5 0 7.25 9 12 9 12s9-4.75 9-12z"
                      />
                    </svg>
                  </button>

                  {/* 🧸 Imagem */}
                  <div
                    className={`flex justify-center items-center ${
                      isMobile ? 'h-[140px] mt-4' : 'h-[200px] mt-6'
                    }`}
                  >
                    <img
                      src={p.img}
                      alt={p.title}
                      className={`object-contain ${
                        isMobile ? 'w-[110px] h-[110px]' : 'w-[160px] h-[160px]'
                      }`}
                    />
                  </div>

                  {/* 🔸 Nome e Preço */}
                  <div
                    className={`px-3 flex flex-col justify-between flex-grow ${
                      isMobile ? 'mt-1' : ''
                    }`}
                  >
                    <h3
                      className={`font-semibold text-[#1a1a1a] leading-snug ${
                        isMobile ? 'text-[12.5px]' : 'text-[14.5px]'
                      }`}
                    >
                      {p.title}
                    </h3>

                    <div className="mt-2 flex items-center justify-between">
                      <p
                        className={`font-bold text-[#00a650] ${
                          isMobile ? 'text-[15px]' : 'text-[18px]'
                        }`}
                      >
                        {p.price}
                      </p>
                      <span
                        className={`bg-[#e53935] text-white font-bold rounded ${
                          isMobile
                            ? 'text-[11px] px-1.5 py-[1px]'
                            : 'text-[12px] px-2 py-[2px]'
                        }`}
                      >
                        {p.discount}
                      </span>
                    </div>
                  </div>

                  {/* ➕ Adicionar */}
                  <div className="border-t border-gray-100 mt-2 px-3 pt-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => alterarQuantidade(i, -1)}
                          className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center text-[16px] text-gray-700 hover:bg-gray-100"
                        >
                          –
                        </button>
                        <span className="text-[13px] font-semibold select-none">
                          {qtd}
                        </span>
                        <button
                          onClick={() => alterarQuantidade(i, 1)}
                          className="w-6 h-6 rounded-full bg-[#00a650] text-white flex items-center justify-center text-[16px] font-bold hover:bg-[#00944d]"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => enviarParaCheckout(p, qtd)}
                        className={`flex items-center justify-center gap-1.5 bg-[#39b54a] hover:bg-[#33a243] text-white font-semibold rounded-md transition shadow-sm ${
                          isMobile
                            ? 'px-3 py-[5px] text-[12px]'
                            : 'px-5 py-[7px] text-[14px]'
                        }`}
                      >
                        <span>Adicionar</span>
                      </button>
                    </div>

                    <p
                      className={`text-center text-gray-500 mt-2 ${
                        isMobile ? 'text-[10px]' : 'text-[12px]'
                      }`}
                    >
                      Vendido e entregue por{' '}
                      <span className="font-semibold text-[#1a1a1a]">
                        RiHappy
                      </span>
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Banner inferior */}
      <section className="bg-white py-10">
        <div className="w-full flex justify-center px-4">
          <img
            src="https://rihappynovo.vtexassets.com/assets/vtex.file-manager-graphql/images/3ce02743-a3ed-4560-aff4-99376da92952___205e7000274bde49bd741cd67e3b7532.png"
            alt="Compra Internacional"
            className={`object-contain ${
              isMobile ? 'max-w-[400px]' : 'max-w-[1300px]'
            }`}
          />
        </div>
      </section>

      <ProdutosGrid />
      <FooterRiHappy />
    </>
  )
}
