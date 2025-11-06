'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import HeaderCheckoutRiHappy from '@/components/HeaderCheckoutRiHappy'
import Image from 'next/image'
import { useState } from 'react'

export default function IdentificacaoPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // pega os dados do produto que vieram do checkout anterior
  const produtoJSON = searchParams.get('produto')
  const quantidade = Number(searchParams.get('quantidade')) || 1
  const produto = produtoJSON ? JSON.parse(produtoJSON) : null

  const [email, setEmail] = useState(searchParams.get('email') || '')
  const [erro, setErro] = useState(false)

  function finalizarCompra() {
    if (!email || !email.includes('@')) {
      setErro(true)
      return
    }
    setErro(false)

    // envia o e-mail + produto + quantidade para a próxima etapa
    router.push(
      `/checkout/identificacao-dados?email=${encodeURIComponent(email)}&produto=${encodeURIComponent(
        JSON.stringify(produto)
      )}&quantidade=${quantidade}`
    )
  }

  return (
    <>
      <HeaderCheckoutRiHappy />

      {/* Fundo geral */}
      <div className="bg-[#f9f6f6] min-h-[80vh] flex items-center justify-center px-6 py-10">
        <div className="bg-white max-w-[700px] w-full rounded-lg shadow-sm border border-gray-100 p-10 text-center">
          <h1 className="text-[22px] md:text-[24px] font-bold text-gray-800 mb-8">
            Para finalizar a compra, informe seu e-mail.
          </h1>

          {/* Campo de email */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-full max-w-[480px] flex flex-col text-left">
              <label
                htmlFor="email"
                className="font-semibold text-gray-800 text-[15px] mb-1"
              >
                Digite seu email aqui
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemplo@dominio.com"
                className={`w-full border rounded-md px-3 py-2 text-sm outline-none ${
                  erro
                    ? 'border-red-500 focus:ring-2 focus:ring-red-300'
                    : 'border-gray-300 focus:ring-2 focus:ring-yellow-400'
                }`}
              />
              {erro && (
                <span className="text-[13px] text-red-500 mt-1">
                  Campo obrigatório.
                </span>
              )}
            </div>
          </div>

          {/* Botão */}
          <button
            onClick={finalizarCompra}
            className="bg-[#39b54a] hover:bg-[#2fa53f] text-white font-bold py-3 px-10 rounded-md text-[16px] transition-all"
          >
            FINALIZAR COMPRA
          </button>

          {/* Informações de segurança */}
          <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="text-left">
              <h3 className="font-bold text-gray-800 mb-3">
                Usamos seu e-mail de forma 100% segura para:
              </h3>
              <ul className="text-[14px] text-gray-700 space-y-1">
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✔</span> Identificar seu perfil
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✔</span> Notificar sobre o andamento do seu pedido
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✔</span> Gerenciar seu histórico de compras
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✔</span> Acelerar o preenchimento de suas informações
                </li>
              </ul>
            </div>

            {/* Cadeado ilustrativo */}
            <div className="opacity-20">
              <Image
                src="https://cdn-icons-png.flaticon.com/512/61/61457.png"
                alt="Cadeado segurança"
                width={110}
                height={110}
              />
            </div>
          </div>
        </div>
      </div>

      {/* RODAPÉ */}
      <footer className="bg-white border-t border-gray-200 mt-12 pt-10 pb-8">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between gap-10 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold mb-5 text-[17px]">Pagamentos disponíveis</h4>
            <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
              {[
                'creditoNewFooter2.svg',
                'paymentNupay.png',
                'pixNewFooter2.svg',
                'pixInstalmentsNewFooter2.svg',
              ].map((icon, i) => (
                <img
                  key={i}
                  src={`https://rihappynovo.vtexassets.com/arquivos/${icon}`}
                  alt=""
                  width={80}
                  height={60}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold mb-4 text-[17px]">Segurança e certificações</h4>
            <div className="flex items-center gap-3 flex-wrap justify-center md:justify-start">
              <img
                src="https://cdn.confi.com.vc/reputation/106207.png"
                alt="Selo Confi"
                width={80}
              />
              <img
                src="https://rihappynovo.vtexassets.com/arquivos/selo-certificado-vtex-footer.png"
                alt="VTEX Certified"
                width={80}
              />
              <img
                src="https://rihappynovo.vtexassets.com/assets/vtex.file-manager-graphql/images/8e43b15a-a025-49b1-965f-ac8bab47a563___40820f29b33209c24ace7c319260bb09.png"
                alt="Tuna Pix"
                width={80}
              />
            </div>
          </div>
        </div>

        {/* 🧾 Rodapé inferior */}
        <div className="max-w-[1300px] mx-auto px-6 mt-10 pt-5 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-800 leading-snug">
          <p className="max-w-[1000px] text-left text-[8.5px]">
            <span className="font-semibold text-[13px] block mb-[10px]">
              Mais informações
            </span>
            Aviso Importante: Todos os preços e condições deste site são válidos apenas para compras no site e não se aplicam
            para nossas lojas físicas. Os brinquedos divulgados em nosso site possuem certificação dos órgãos autorizados - OCP’s
            (Organismos de Certificação de Produtos). Ri Happy é uma empresa do Grupo Ri Happy S/A, com escritório
            administrativo na Av. Engenheiro Luís Carlos Berrini, 105 - Cidade Monções, São Paulo/SP, inscrita no CNPJ
            58.731.682/0001-11 -{' '}
            <a
              href="mailto:atendimento@rihappy.com.br"
              className="text-[#4b2993] underline hover:text-[#64229B] transition"
            >
              atendimento@rihappy.com.br
            </a>.
          </p>

          <Image
            src="https://rihappynovo.vtexassets.com/arquivos/ico-vtex-mobile.png"
            alt="VTEX"
            width={60}
            height={20}
            className="opacity-90"
          />
        </div>
      </footer>
    </>
  )
}
