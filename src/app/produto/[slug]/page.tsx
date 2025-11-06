'use client'

import { useParams, useRouter } from 'next/navigation'
import HeaderRiHappy from '@/components/HeaderRiHappy'
import FooterRiHappy from '@/components/FooterRiHappy'
import { produtos } from '@/data/produtos'
import { produtosNovidades } from '@/data/produtosnovidades'
import { useCart } from '@/context/CartContext'
import { useState } from 'react'
import { useIsMobile } from '@/hooks/use-mobile' // ✅ importa o hook

export default function ProdutoPage() {
  const { slug } = useParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const isMobile = useIsMobile()
  const [quantidade, setQuantidade] = useState(1)
  const [adding, setAdding] = useState(false)

  // 🔍 procura o produto
  const produto =
    produtos.find((p) => p.slug === slug) ||
    produtosNovidades.find((p) => p.slug === slug)

  if (!produto) {
    return (
      <>
        <HeaderRiHappy />
        <main className="min-h-[60vh] flex flex-col items-center justify-center">
          <h1 className="text-2xl font-semibold text-gray-700">
            Produto não encontrado
          </h1>
        </main>
        <FooterRiHappy />
      </>
    )
  }

  // 🟢 Função comprar agora (igual ao grid, mas redireciona)
  const handleComprarAgora = () => {
    setAdding(true)
    addToCart({ ...produto, quantity: quantidade })
    setTimeout(() => {
      setAdding(false)
      router.push('/checkout/cart')
    }, 700)
  }

  return (
    <>
      <HeaderRiHappy />

      <main
        className={`max-w-[1300px] mx-auto ${
          isMobile ? 'px-4 py-8 flex flex-col gap-8' : 'px-8 py-16 grid grid-cols-[0.9fr_1.1fr] gap-24'
        }`}
      >
        {/* 🧸 IMAGEM PRINCIPAL */}
        <div
          className={`flex flex-col items-center ${
            isMobile ? 'gap-3' : 'justify-start gap-4 translate-x-8'
          }`}
        >
          <img
            src={produto.img}
            alt={produto.title}
            className={`object-contain ${
              isMobile ? 'w-[260px] h-[260px]' : 'w-[400px] h-[400px]'
            }`}
          />
          <p
            className={`text-gray-500 ${
              isMobile ? 'text-[13px] text-center' : 'text-sm'
            }`}
          >
            Importado — Entrega gratuita em até 15 dias úteis
          </p>
        </div>

        {/* 💬 DETALHES DO PRODUTO */}
        <div
          className={`flex flex-col ${
            isMobile
              ? 'items-center text-center gap-4'
              : 'gap-3 translate-x-32 max-w-[400px] items-start text-left'
          }`}
        >
          <h1
            className={`font-bold text-[#1a1a1a] leading-tight ${
              isMobile ? 'text-[19px]' : 'text-[22px]'
            }`}
          >
            {produto.title}
          </h1>

          {/* ⭐ Avaliação */}
          <div className="flex gap-1 mt-1 justify-center">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#FFD700"
                  viewBox="0 0 24 24"
                  className={`${
                    isMobile ? 'w-[16px] h-[16px]' : 'w-[18px] h-[18px]'
                  }`}
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 
                    9.24l-7.19-.61L12 2 9.19 
                    8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
          </div>

          {/* VENDEDOR + DESCONTO */}
          <div
            className={`flex items-center ${
              isMobile ? 'flex-col gap-2' : 'flex-row gap-2 mt-2'
            }`}
          >
            <span className="text-[12px] bg-gray-100 border border-gray-300 px-2 py-[2px] rounded text-gray-700 font-medium">
              Vendido e entregue por <b>Ri Happy</b>
            </span>
            <span className="text-[12px] bg-[#e53935] text-white px-2 py-[2px] rounded font-semibold">
              {produto.discount}
            </span>
          </div>

          {/* 💰 Preço */}
          <div className={`${isMobile ? 'mt-1' : 'mt-2'}`}>
            <p
              className={`font-bold text-[#00a650] ${
                isMobile ? 'text-[17px]' : 'text-[18px]'
              }`}
            >
              Por: 10x {produto.price}{' '}
              <span className="font-semibold">s/ juros</span>
            </p>
            <p
              className={`font-bold text-black ${
                isMobile ? 'text-[16px]' : 'text-[18px]'
              }`}
            >
              À vista:{' '}
              <span className="font-semibold">
                {produto.price.replace('R$', 'R$ ')}
              </span>
            </p>
          </div>

          {/* 🔢 QUANTIDADE */}
          <div
            className={`flex items-center ${
              isMobile ? 'gap-3 mt-3' : 'gap-2 mt-5'
            }`}
          >
            <button
              onClick={() => setQuantidade((q) => Math.max(1, q - 1))}
              className={`flex items-center justify-center rounded-full border border-gray-300 text-[18px] hover:bg-gray-100 ${
                isMobile ? 'w-9 h-9' : 'w-8 h-8'
              }`}
            >
              –
            </button>
            <span
              className={`font-semibold text-center ${
                isMobile ? 'text-[16px] w-8' : 'text-[16px] w-6'
              }`}
            >
              {quantidade}
            </span>
            <button
              onClick={() => setQuantidade((q) => q + 1)}
              className={`flex items-center justify-center rounded-full bg-[#00a650] text-white font-bold hover:bg-[#00924a] ${
                isMobile ? 'w-9 h-9 text-[20px]' : 'w-8 h-8 text-[18px]'
              }`}
            >
              +
            </button>
          </div>

          {/* 🛒 Botão comprar agora */}
          <button
            onClick={handleComprarAgora}
            disabled={adding}
            className={`flex items-center justify-center gap-2 ${
              adding ? 'bg-[#2fa53f]' : 'bg-[#39b54a] hover:bg-[#2fa53f]'
            } text-white font-semibold transition-all shadow-md rounded-md ${
              isMobile
                ? 'mt-6 w-full py-4 text-[15px]'
                : 'mt-6 w-[240px] px-8 py-3 text-[16px]'
            }`}
          >
            {adding ? (
              <>
                <svg
                  className="w-5 h-5 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3.5-3.5L12 1v4a8 8 0 11-8 8z"
                  ></path>
                </svg>
                <span>Adicionando...</span>
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-[20px] h-[20px]"
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
                <span>Comprar agora</span>
              </>
            )}
          </button>
        </div>
      </main>

      <FooterRiHappy />
    </>
  )
}
