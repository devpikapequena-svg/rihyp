'use client'

import HeaderRiHappy from '@/components/HeaderRiHappy'
import FooterRiHappy from '@/components/FooterRiHappy'
import ProdutosGrid from '@/components/ProdutosGrid'
import ProdutosCategoriasBanner from '@/components/ProdutosCategoriasBanner'
import { useIsMobile } from '@/hooks/use-mobile'

export default function NovidadesPage() {
  const isMobile = useIsMobile()

  return (
    <>
      <HeaderRiHappy />

      {/* 🎁 Banner RiHappy completo — oculto no mobile */}
      {!isMobile && (
        <section className="relative w-full flex flex-col items-center justify-center overflow-hidden bg-[#2f1b5e]">
          {/* 🖼️ Parte superior */}
          <img
            src="https://rihappynovo.vtexassets.com/assets/vtex.file-manager-graphql/images/9a153d0f-d992-4621-8cfe-fe18e069b724___075478be8f2c398d8184fc838f4d0c48.png"
            alt="Banner RiHappy Parte 1"
            className="w-full h-auto"
            draggable={false}
          />

          {/* 🖼️ Parte inferior */}
          <div className="relative w-full">
            <img
              src="https://rihappynovo.vtexassets.com/assets/vtex.file-manager-graphql/images/390bfbb1-5489-450f-b354-06552c2712f6___2d099c754e8dc942f6d36bf6d0c9490f.png"
              alt="Banner RiHappy Parte 2"
              className="w-full h-auto block -mt-[2px]"
              draggable={false}
            />

            <ProdutosCategoriasBanner />
          </div>

          {/* 🧸 Imagens centrais (sobrepostas no banner) */}
          <div className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center gap-0 px-6 -translate-y-[200px]">
            <img
              src="https://rihappynovo.vtexassets.com/assets/vtex.file-manager-graphql/images/f2aa71c0-7d22-48fb-aa21-cece57cb6c43___4ce21fa9f7fc247d5d4e45479a757219.png"
              alt="As novidades mais aguardadas você encontra aqui!"
              className="w-[420px] md:w-[500px] h-auto translate-y-[-90px]"
              loading="eager"
            />
            <img
              src="https://rihappynovo.vtexassets.com/assets/vtex.file-manager-graphql/images/0aaa39db-7bb4-49c5-a879-5effc102451c___3604dfda8ea128206bb626cccd0fb5b5.png"
              alt="Super Lançamentos RiHappy"
              className="w-[520px] md:w-[900px] h-auto translate-y-[-110px]"
              loading="eager"
            />
          </div>
        </section>
      )}

      {/* 🎠 Banner principal — escondido no mobile */}
      {!isMobile && (
        <section className="w-full bg-[#37265a] flex justify-center py-10">
          <div className="max-w-[1300px] w-full px-6">
            <img
              src="https://rihappynovo.vtexassets.com/assets/vtex.file-manager-graphql/images/e2f0f93d-8b06-4bff-9611-414f1de8eaa1___cc94586b7e4bb3a08a95043f8e085a84.png"
              alt="Banner principal RiHappy"
              className="rounded-2xl w-full h-auto shadow-md"
            />
          </div>
        </section>
      )}

    {/* 🧸 Cards abaixo do banner */}
<section className="w-full bg-[#37265a] flex justify-center pb-24 md:pb-32">
  <div
    className={`max-w-[1300px] mx-auto ${
      isMobile
        ? 'flex gap-4 overflow-x-auto px-4 scrollbar-hide scroll-smooth snap-x snap-mandatory'
        : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6'
    }`}
  >
    {[
      {
        src: 'https://rihappynovo.vtexassets.com/assets/vtex.file-manager-graphql/images/9b66dafe-4023-4c42-91aa-8829df0dc37e___3f2c9549a0ae2ab99983f26e1c5686d8.png',
        alt: 'Novidades Hot Wheels',
      },
      {
        src: 'https://rihappynovo.vtexassets.com/assets/vtex.file-manager-graphql/images/433f07dd-86ea-46cc-80a5-b32b643a7fd4___cf2cc69f9c7bfcbe20b80d9af31f2887.png',
        alt: 'Construindo a Diversão LEGO',
      },
      {
        src: 'https://rihappynovo.vtexassets.com/assets/vtex.file-manager-graphql/images/aae45eb1-936b-4949-953d-474bb8b29e36___8184e13561f47f1a25d44e2435ec89ec.png',
        alt: 'Funko - Para Completar a Coleção',
      },
    ].map((item, i) => (
      <div
        key={i}
        className={`${
          isMobile ? 'min-w-[100%] snap-center shrink-0' : 'w-full'
        } flex justify-center`}
      >
        <img
          src={item.src}
          alt={item.alt}
          className={`rounded-2xl shadow-md hover:scale-[1.02] transition-transform duration-200
            ${isMobile ? 'w-[95%] h-[500px] object-cover mt-6' : 'w-full h-auto'}
          `}
        />
      </div>
    ))}
  </div>
</section>


      {/* 🛒 Produtos gerais */}
      <ProdutosGrid />

      <FooterRiHappy />
    </>
  )
}
