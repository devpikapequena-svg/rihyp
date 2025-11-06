'use client'

import { useCart } from '@/context/CartContext'
import HeaderCheckoutRiHappy from '@/components/HeaderCheckoutRiHappy'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useIsMobile } from '@/hooks/use-mobile'

export default function CheckoutPage() {
  const { cart, removeFromCart } = useCart()
  const router = useRouter()
  const isMobile = useIsMobile()

  const [cep, setCep] = useState('')
  const [endereco, setEndereco] = useState<any>(null)
  const [loadingCEP, setLoadingCEP] = useState(false)

  // 🧮 Total do carrinho
  const subtotal = cart.reduce((acc, produto) => {
    const preco = parseFloat(
      String(produto.price).replace('R$', '').replace(/\./g, '').replace(',', '.').trim()
    )
    return acc + (isNaN(preco) ? 0 : preco) * (produto.quantity || 1)
  }, 0)

  async function buscarEndereco() {
    if (!cep || cep.length < 8) return alert('Digite um CEP válido.')
    try {
      setLoadingCEP(true)
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const data = await res.json()
      if (data.erro) {
        alert('CEP não encontrado.')
        setEndereco(null)
      } else setEndereco(data)
    } catch {
      alert('Erro ao buscar CEP.')
    } finally {
      setLoadingCEP(false)
    }
  }

  useEffect(() => {
    if (cart.length === 0) router.push('/')
  }, [cart, router])

  if (cart.length === 0) return null

  return (
    <>
      <HeaderCheckoutRiHappy />

      <main
        className={`max-w-[1300px] mx-auto ${
          isMobile ? 'px-4 py-6' : 'px-8 py-12'
        } transition-all`}
      >
        <div
          className={`grid ${
            isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-[1.2fr_0.8fr] gap-10'
          }`}
        >
          {/* 🧸 PRODUTOS */}
          <section
            className={`bg-white border border-gray-200 rounded-lg shadow-sm ${
              isMobile ? 'p-4' : 'p-6'
            }`}
          >
            <h2
              className={`font-bold text-[#333] ${
                isMobile ? 'text-[18px] mb-4' : 'text-[20px] mb-6'
              }`}
            >
              Meu carrinho
            </h2>

            {cart.map((produto, i) => {
              const preco = parseFloat(
                String(produto.price)
                  .replace('R$', '')
                  .replace(/\./g, '')
                  .replace(',', '.')
                  .trim()
              )
              const totalItem = (preco * (produto.quantity || 1)).toFixed(2)

              return (
                <div
                  key={i}
                  className={`border-b border-gray-100 pb-4 mb-4 flex ${
                    isMobile
                      ? 'flex-col items-start gap-3'
                      : 'items-center justify-between gap-6'
                  }`}
                >
                  {/* Imagem + Título */}
                  <div className="flex items-center gap-4">
                    <img
                      src={produto.img}
                      alt={produto.title}
                      className="w-[90px] h-[90px] object-contain"
                    />
                    <div>
                      <p className="font-semibold text-[#333] leading-snug">
                        {produto.title}
                      </p>
                      <p className="text-[13px] text-gray-500">
                        Vendido e entregue por <b>Ri Happy</b>
                      </p>
                    </div>
                  </div>

                  {/* Preços e ações */}
                  <div
                    className={`flex ${
                      isMobile
                        ? 'flex-col items-start gap-2 mt-2'
                        : 'flex-row items-center gap-6'
                    }`}
                  >

                    <p className="text-gray-600 text-[14px]">
                      Qtd: {produto.quantity || 1}
                    </p>
                    <p className="text-[#00a650] font-bold">
                      R$ {totalItem.replace('.', ',')}
                    </p>
                    <button
                      onClick={() => removeFromCart(produto.slug)}
                      className="text-red-500 hover:text-red-700 text-[13px] font-semibold"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              )
            })}

            {/* FRETE */}
            <div
              className={`mt-6 ${
                isMobile ? 'max-w-full' : 'max-w-[400px]'
              } border border-gray-200 rounded-md bg-gray-50 p-4`}
            >
              {!endereco ? (
                <>
                  <p className="text-gray-700 text-[15px] font-medium mb-3">
                    Calcule o frete
                  </p>
                  <div
                    className={`flex ${
                      isMobile ? 'flex-col gap-3' : 'flex-row gap-2'
                    }`}
                  >
                    <input
                      type="text"
                      value={cep}
                      onChange={(e) =>
                        setCep(e.target.value.replace(/\D/g, '').slice(0, 8))
                      }
                      placeholder="Digite seu CEP"
                      className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                    <button
                      onClick={buscarEndereco}
                      disabled={loadingCEP}
                      className="bg-[#6a4bbf] hover:bg-[#5d3ea9] text-white font-semibold rounded-md text-sm px-5 py-2 transition disabled:opacity-60"
                    >
                      {loadingCEP ? 'Carregando...' : 'Calcular'}
                    </button>
                  </div>
                  <p className="text-[12px] text-gray-500 mt-2">
                    Não sabe o CEP?{' '}
                    <a
                      href="https://buscacepinter.correios.com.br/"
                      target="_blank"
                      className="text-[#007aff] hover:underline"
                    >
                      Clique aqui
                    </a>
                    .
                  </p>
                </>
              ) : (
                <>
                  <p className="text-gray-700 text-sm mb-2">
                    <b>Entrega:</b> {endereco.logradouro}, {endereco.bairro} —{' '}
                    {endereco.localidade}/{endereco.uf}{' '}
                    <button
                      onClick={() => setEndereco(null)}
                      className="text-[#007aff] hover:underline ml-1"
                    >
                      alterar
                    </button>
                  </p>
                  <div className="flex items-start gap-2">
                    <input type="radio" checked readOnly className="mt-[3px]" />
                    <p className="text-[13px] text-gray-600">
                      Normal — até 3 dias úteis <b>Grátis</b>
                    </p>
                  </div>
                </>
              )}
            </div>
          </section>

          {/* 💳 RESUMO */}
          <aside
            className={`bg-white border border-gray-200 rounded-lg shadow-sm ${
              isMobile ? 'p-5' : 'p-6'
            }`}
          >
            <h2
              className={`font-bold text-[#333] ${
                isMobile ? 'text-[18px] mb-4' : 'text-[20px] mb-5'
              }`}
            >
              Resumo do pedido
            </h2>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Digite seu cupom"
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button className="bg-[#6a4bbf] hover:bg-[#5d3ea9] text-white px-4 rounded-md text-sm font-semibold">
                aplicar
              </button>
            </div>

            <p className="text-[11px] text-gray-500 mb-4">
              Válido apenas para produtos vendidos e entregues por Ri Happy.
            </p>

            <div className="flex justify-between text-gray-700 text-[15px] mb-2">
              <span>Subtotal</span>
              <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between text-gray-700 text-[15px] mb-2">
              <span>Entrega</span>
              <span className="text-green-600 font-medium">
                {endereco ? 'Grátis' : '—'}
              </span>
            </div>

            <hr className="my-3" />

            <div className="flex justify-between text-xl font-bold text-green-600 mb-5">
              <span>Total</span>
              <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
            </div>

            <button
              disabled={!endereco}
              onClick={() => router.push('/checkout/identificacao')}
              className={`w-full py-3 rounded-md text-[16px] font-semibold shadow-md mb-3 transition-all ${
                endereco
                  ? 'bg-[#39b54a] hover:bg-[#2fa53f] text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              continuar para pagamento
            </button>

            <button
              onClick={() => router.push('/')}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-md text-[15px] transition-all"
            >
              escolher mais produtos
            </button>
          </aside>
        </div>
      </main>
    </>
  )
}
