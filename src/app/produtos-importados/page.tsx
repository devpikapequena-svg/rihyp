'use client'

import HeaderRiHappy from '@/components/HeaderRiHappy'
import FooterRiHappy from '@/components/FooterRiHappy'
import ProdutosImportados from '@/components/ProdutosImportados'
import useEmblaCarousel from 'embla-carousel-react'
import { useEffect } from 'react'
import { useIsMobile } from '@/hooks/use-mobile'

export default function NovidadesPage() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' })
  const isMobile = useIsMobile()

  useEffect(() => {
    if (!emblaApi) return
  }, [emblaApi])

  const categorias = [
    {
      nome: 'Blocos',
      img: 'https://rihappynovo.vtexassets.com/assets/vtex.file-manager-graphql/images/29c9af0e-7065-4f30-8ac6-be920b73b920___829bf24967e5c766b1712591f09f9399.png',
    },
    {
      nome: 'Bonecas',
      img: 'https://rihappynovo.vtexassets.com/assets/vtex.file-manager-graphql/images/e4af66f1-0cab-4a7a-9b11-11b6ea759ea8___e8ab85d37bac711a77843b6d0120e182.png',
    },
    {
      nome: 'Carrinhos',
      img: 'https://rihappynovo.vtexassets.com/assets/vtex.file-manager-graphql/images/82127768-ac5c-426b-944f-51b73bd09244___8419bb466829f423b88d19336d118f73.png',
    },
    {
      nome: 'Jogos',
      img: 'https://rihappynovo.vtexassets.com/assets/vtex.file-manager-graphql/images/17db83ca-ab57-4fa1-9b45-30256c15663d___bf221aff7ee28f6fd707279fd40cf79b.png',
    },
    {
      nome: 'Figuras',
      img: 'https://rihappynovo.vtexassets.com/assets/vtex.file-manager-graphql/images/d3295917-ac4c-418b-a778-f0e250a2964e___83fb83c012ee0f60316c1939cb0d405e.png',
    },
    {
      nome: 'Pelúcias',
      img: 'https://rihappynovo.vtexassets.com/assets/vtex.file-manager-graphql/images/810d2de1-bf45-47c6-95cb-a16f629a0207___3d02286a05500a95430f3e5a61e83d70.png',
    },
  ]

  return (
    <>
      {/* 🟡 HEADER */}
      <HeaderRiHappy />

      {/* 🌍 Banner principal — responsivo */}
      <section
        className={`relative w-full flex items-center justify-center overflow-hidden ${
          isMobile ? 'flex-col py-10 bg-[#2467e1]' : ''
        }`}
        style={
          !isMobile
            ? {
                backgroundImage:
                  "url('https://rihappynovo.vtexassets.com/assets/vtex.file-manager-graphql/images/921bd93f-8574-47aa-b1d6-676692698835___8b058b4459bf43009add805d105fde3a.png')",
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
            {/* MOBILE — versão simplificada */}

            <img
              src="https://rihappynovo.vtexassets.com/assets/vtex.file-manager-graphql/images/3e9d4cb3-5f36-471b-9e62-ccff4a681ad3___9db9c28f1f6d5966e9a33f43a98879f0.png"
              alt="Brinquedos RiHappy"
              className="w-[80%] max-w-[380px] object-contain"
            />
          </>
        ) : (
          <div className="relative flex flex-row items-center justify-center w-full max-w-[1300px] px-4 gap-0 h-full -translate-x-32">
            {/* 🧸 Lado esquerdo — brinquedos */}
            <div className="flex items-center justify-end w-1/2 pr-0 h-full">
              <img
                src="https://rihappynovo.vtexassets.com/assets/vtex.file-manager-graphql/images/3e9d4cb3-5f36-471b-9e62-ccff4a681ad3___9db9c28f1f6d5966e9a33f43a98879f0.png"
                alt="Brinquedos RiHappy"
                className="w-[70%] max-w-[600px] object-contain translate-x-0"
                draggable={false}
              />
            </div>

            {/* 🛫 Lado direito — texto + avião */}
            <div className="flex flex-col items-start justify-center w-1/2 -translate-x-20 h-full">
              <img
                src="https://rihappynovo.vtexassets.com/assets/vtex.file-manager-graphql/images/20cd7692-daa0-41cf-b349-e8059cdf078c___a69f77a08790114d1dd21fabfb10ddb7.png"
                alt="Do Mundo para a RiHappy"
                className="w-[130%] max-w-[900px] object-contain"
                draggable={false}
              />
            </div>
          </div>
        )}
      </section>

      {/* 🔵 CATEGORIAS — slider responsivo */}
      <section
        className={`${
          isMobile ? 'bg-[#2467e1] py-12' : 'bg-[#2467e1] py-24'
        }`}
      >
        <div className="max-w-[1400px] mx-auto flex flex-col items-center justify-center text-center">
          {/* Slider centralizado */}
          <div
            className={`overflow-hidden w-full ${isMobile ? 'px-4' : ''}`}
            ref={emblaRef}
          >
            <div
              className={`flex ${
                isMobile
                  ? 'gap-3 overflow-x-auto scrollbar-hide scroll-smooth'
                  : 'justify-center gap-6'
              }`}
            >
              {categorias.map((cat, i) => (
                <div
                  key={i}
                  className={`flex-none flex flex-col items-center justify-center ${
                    isMobile ? 'w-[130px]' : 'w-[200px]'
                  }`}
                >
                  <img
                    src={cat.img}
                    alt={cat.nome}
                    className={`${
                      isMobile
                        ? 'w-[120px] h-[120px]'
                        : 'w-[180px] h-[180px]'
                    } object-contain hover:scale-105 transition-transform duration-200`}
                  />
                  <p className="text-white text-sm font-medium mt-2">
                    {cat.nome}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 🟨 Banner frete grátis */}
        <div
          className={`w-full flex justify-center ${
            isMobile ? 'mt-10 px-4' : 'mt-24'
          }`}
        >
          <img
            src="https://rihappynovo.vtexassets.com/assets/vtex.file-manager-graphql/images/b66178b5-fd08-407b-bc09-16badddd0e68___f8a9687a0959844d71378499292c3cb8.png"
            alt="Compra Internacional com Frete Grátis"
            className={`rounded-md shadow-md ${
              isMobile ? 'w-full max-w-[420px]' : 'w-full max-w-[1300px]'
            }`}
            draggable={false}
          />
        </div>
      </section>

      {/* 🛒 PRODUTOS */}
      <ProdutosImportados />

      {/* ⚪ FOOTER */}
      <FooterRiHappy />
    </>
  )
}
