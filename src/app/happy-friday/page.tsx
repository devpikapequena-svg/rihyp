'use client'

import HeaderRiHappy from '@/components/HeaderRiHappy'
import FooterRiHappy from '@/components/FooterRiHappy'
import ProdutosGrid from '@/components/ProdutosGrid'
import useEmblaCarousel from 'embla-carousel-react'
import { useEffect } from 'react'

export default function NovidadesPage() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' })

  useEffect(() => {
    if (!emblaApi) return
  }, [emblaApi])

  const categorias = [
    { nome: 'Blocos', img: 'https://rihappynovo.vtexassets.com/assets/vtex.file-manager-graphql/images/9c04168d-dc31-4cf8-8e24-439c5639360f___bf4913cc5628e8816435927ce1b9b986.png' },
    { nome: 'Bonecas', img: 'https://rihappynovo.vtexassets.com/assets/vtex.file-manager-graphql/images/2dd299bb-270a-4fe5-8da2-8606ce26d7e8___838838c6a83053624c198efd0aea7767.png' },
    { nome: 'Carrinhos', img: 'https://rihappynovo.vtexassets.com/assets/vtex.file-manager-graphql/images/009a9b90-9c6b-4b1b-ab09-65de1320abaa___5d520c8a2e811520b42ed04b59f8ebf5.png' },
    { nome: 'Jogos', img: 'https://rihappynovo.vtexassets.com/assets/vtex.file-manager-graphql/images/ffb99399-ebf2-42bb-996b-d31527a59f87___5b0bfaf18a9c4656ede177592ad1699e.png' },
    { nome: 'Figuras', img: 'https://rihappynovo.vtexassets.com/assets/vtex.file-manager-graphql/images/da321042-3f07-4cc2-94b5-76529deb6548___2013d172a0bd6dbc8c536263cb9c399b.png' },
    { nome: 'Pelúcias', img: 'https://rihappynovo.vtexassets.com/assets/vtex.file-manager-graphql/images/ba1f819f-9d0b-4304-8750-4730b9d76492___67f6276b34cd6be7a0a67b64e95e2eba.png' },
    { nome: 'Diversão do bebê', img: 'https://rihappynovo.vtexassets.com/assets/vtex.file-manager-graphql/images/f679aeff-3f11-43a0-90be-b2944c05fe0b___d69966eba46dcc978a19638d4a328b24.png' },
    { nome: 'Esportes', img: 'https://rihappynovo.vtexassets.com/assets/vtex.file-manager-graphql/images/ac04d949-075a-46f5-9ed4-795eaeb7cc84___6585947637cd19ae013c03378669ee83.png' },
  ]

  // 🛒 Função universal para enviar o produto pro checkout
  const enviarParaCheckout = (produto: any, quantidade: number) => {
    const produtoParam = encodeURIComponent(JSON.stringify(produto))
    window.location.href = `/checkout/cart?produto=${produtoParam}&quantidade=${quantidade}`
  }

  const produtos = [
    {
      img: 'https://rihappy.vtexassets.com/arquivos/ids/8327956/PRE-VENDA--Jogo-de-Tabuleiro---Monopoly---Harry-Potter---Hasbro-0.jpg',
      title: 'Jogo de Tabuleiro - Monopoly - Harry Potter - Hasbro',
      price: 'R$ 29,99',
      discount: '-80%',
    },
    {
      img: 'https://rihappy.vtexassets.com/arquivos/ids/6454416/Brinquedo-Interativo---Andador-Infantil---Passo-a-Passo-Divertido---Dreams-ABC---Minimi-0.jpg',
      title: 'Brinquedo Interativo - Andador Infantil - Passo a Passo Divertido - Dreams ABC - Minimi',
      price: 'R$ 49,99',
      discount: '-80%',
    },
    {
      img: 'https://rihappy.vtexassets.com/arquivos/ids/8360668/Jogo-De-Tabuleiro---Monopoly---Pokemon---Hasbro-0.jpg',
      title: 'Jogo De Tabuleiro - Monopoly - Pokémon - Hasbro',
      price: 'R$ 39,99',
      discount: '-80%',
    },
    {
      img: 'https://rihappy.vtexassets.com/arquivos/ids/8862332/Patinete-Com-Led---Disney----Stitch---Azul---Bbr-Toys-0.jpg',
      title: 'Patinete Com Led - Disney - Stitch - Azul - Bbr Toys',
      price: 'R$ 99,99',
      discount: '-80%',
    },
  ]


  return (
    <>
      <HeaderRiHappy />

      {/* 🎁 Banner Dia das Crianças */}
      <section
        className="relative w-full flex flex-col items-center justify-center bg-[#000000] overflow-hidden"
        style={{
          backgroundImage:
            'url(https://rihappynovo.vtexassets.com/assets/vtex.file-manager-graphql/images/5e38eda8-a8f0-4240-9db3-2835cba1c3e1___a9e609e674b634d299de49a789799893.png)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center top',
          backgroundSize: 'contain',
        }}
      >
        <div className="relative w-full max-w-[1300px] flex items-center justify-center gap-8 py-6">
          <img
            src="https://rihappynovo.vtexassets.com/assets/vtex.file-manager-graphql/images/69550773-da5a-49f1-a797-1779f1af1fcb___a6afe174f3035f7e7244830e8b45cc3a.png"
            alt="Menino foguete"
            className="w-[40%] max-w-[500px] object-contain translate-x-[15%]"
            draggable={false}
          />
          <img
            src="https://rihappynovo.vtexassets.com/assets/vtex.file-manager-graphql/images/52db1f6e-c77c-434c-9680-479091ad3519___ac4e523f023b8dc9ba8e461bb8c4ec8e.png"
            alt="O Dia das Crianças Aprovado por Crianças"
            className="w-[70%] max-w-[900px] h-auto object-contain translate-x-[-10%]"
            draggable={false}
          />
        </div>
      </section>


      {/* 🛒 Grid de produtos */}
      <section className="bg-[#000000] py-14">
        <div className="max-w-[1300px] mx-auto px-6">
          <div className="flex flex-col mb-6">
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {produtos.map((p, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition relative flex flex-col overflow-hidden"
              >
                <button className="absolute right-3 top-3 bg-white w-7 h-7 rounded-full shadow-sm border border-gray-200 flex items-center justify-center hover:bg-gray-100">
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
                      d="M21 8.25c0-2.485-2.239-4.5-5-4.5-1.74 0-3.31.906-4 2.292A4.48 4.48 0 008 3.75c-2.761 
                      0-5 2.015-5 4.5 0 7.25 9 12 9 
                      12s9-4.75 9-12z"
                    />
                  </svg>
                </button>

                <div className="flex justify-center items-center h-[200px] mt-6">
                  <img src={p.img} alt={p.title} className="w-[160px] h-[160px] object-contain" />
                </div>

                <div className="px-4 flex flex-col justify-between flex-grow">
                  <h3 className="text-[14.5px] font-semibold text-[#1a1a1a] leading-snug mt-1">{p.title}</h3>
                  <div className="mt-[10px]">
                    <div className="flex items-center justify-between">
                      <p className="text-[18px] font-bold text-[#00a650]">{p.price}</p>
                      <span className="bg-[#e53935] text-white text-[12px] font-bold py-[1px] px-2 rounded">
                        {p.discount}
                      </span>
                    </div>
                  </div>
                </div>

                {/* botão adicionar com redirecionamento */}
                <div className="border-t border-gray-100 mt-2 p-3">
                  <button
                    onClick={() => enviarParaCheckout(p, 1)}
                    className="flex items-center justify-center gap-2 bg-[#39b54a] hover:bg-[#33a243] text-white font-semibold px-6 py-[8px] rounded-md text-[14px] transition shadow-sm w-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-[17px] h-[17px]"
                    >
                      <path
                        d="M7 18c-1.1 0-1.99.9-1.99 
                        2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 
                        0c-1.1 0-1.99.9-1.99 
                        2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7.16 
                        14l.84-2h8.6c.75 0 1.41-.41 
                        1.75-1.03l3.58-6.49A.996.996 0 
                        0019.07 3H5.21l-.94-2H1v2h2l3.6 
                        7.59-1.35 2.44C4.52 
                        13.37 5.48 15 7 15h12v-2H7.42c-.14 
                        0-.25-.11-.26-.24z"
                      />
                    </svg>
                    <span>Adicionar</span>
                  </button>
                  <p className="text-center text-[12px] text-gray-500 mt-[12px]">
                    Vendido e entregue por{' '}
                    <span className="font-semibold text-[#1a1a1a]">RiHappy</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>





      {/* 🛒 PRODUTOS */}
      <ProdutosGrid />

      {/* ⚪ FOOTER */}
      <FooterRiHappy />
    </>
  )
}
