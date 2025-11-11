'use client'

import { useRouter } from 'next/navigation'
import HeaderCheckoutRiHappy from '@/components/HeaderCheckoutRiHappy'
import { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext' // ✅ usa carrinho global

export default function IdentificacaoDadosPage() {
  const router = useRouter()
  const { cart } = useCart() // ✅ pega produtos direto do contexto global

  const [mostrarEntrega, setMostrarEntrega] = useState(false)
  const [mostrarPagamento, setMostrarPagamento] = useState(false)
  const [cep, setCep] = useState('')
  const [endereco, setEndereco] = useState<any>(null)
  const [loadingCEP, setLoadingCEP] = useState(false)
  const [pagamento, setPagamento] = useState<any>(null)
  const [modalPixAberto, setModalPixAberto] = useState(false)
  const [loadingPagamento, setLoadingPagamento] = useState(false)

  const [formEntrega, setFormEntrega] = useState({
    numero: '',
    complemento: '',
    destinatario: '',
  })

  const [form, setForm] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    cpf: '',
    telefone: '',
    aceitouTermos: false,
  })

  const [erro, setErro] = useState(false)

  // ✅ Calcula total do carrinho
  const total = cart
    .reduce((acc, produto) => {
      const preco =
        typeof produto.price === 'string'
          ? parseFloat(produto.price.replace('R$', '').replace(',', '.'))
          : Number(produto.price)
      return acc + preco * (produto.quantity || 1)
    }, 0)
    .toFixed(2)

  // 🔍 Buscar CEP
  async function buscarEndereco() {
    if (!cep || cep.length < 8) return alert('Digite um CEP válido.')
    try {
      setLoadingCEP(true)
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const data = await res.json()
      if (data.erro) {
        alert('CEP não encontrado.')
        setEndereco(null)
      } else {
        setEndereco(data)
      }
    } catch {
      alert('Erro ao buscar CEP.')
    } finally {
      setLoadingCEP(false)
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleEntregaChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormEntrega({ ...formEntrega, [e.target.name]: e.target.value })
  }

function continuarEntrega() {
  const camposInvalidos = []
  if (!form.nome.trim()) camposInvalidos.push('nome')
  if (!form.sobrenome.trim()) camposInvalidos.push('sobrenome')
  if (!validarEmail(form.email)) camposInvalidos.push('email')
  if (form.cpf && !validarCPF(form.cpf)) camposInvalidos.push('cpf')
  if (form.telefone && !validarTelefone(form.telefone)) camposInvalidos.push('telefone')

  if (camposInvalidos.length > 0) {
    setErro(true)
    alert(`Preencha corretamente: ${camposInvalidos.join(', ')}`)
    return
  }

  setErro(false)
  setMostrarEntrega(true)
}


  function continuarPagamento() {
    if (!endereco || !formEntrega.numero || !formEntrega.destinatario) {
      alert('Preencha o endereço completo antes de continuar.')
      return
    }
    setMostrarPagamento(true)
  }

  async function gerarPagamento() {
    if (!form.aceitouTermos) {
      alert('Você precisa aceitar os termos antes de continuar.')
      return
    }

    setLoadingPagamento(true)
    try {
      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${form.nome} ${form.sobrenome}`,
          email: form.email,
          phone: form.telefone,
          cpf: form.cpf,
          amount: total,
          externalId: `order_${Date.now()}`,
          items: cart.map((produto, i) => ({
id: (produto as any).id || `${i + 1}`,
            title: produto.title,
            unitPrice:
              typeof produto.price === 'string'
                ? parseFloat(produto.price.replace('R$', '').replace(',', '.'))
                : Number(produto.price),
            quantity: produto.quantity || 1,
          })),
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        alert(data.error || 'Erro ao gerar pagamento.')
        return
      }

      setPagamento(data.data)
      setModalPixAberto(true)
    } catch (err) {
      console.error('Erro ao gerar pagamento:', err)
      alert('Erro interno ao gerar pagamento.')
    } finally {
      setLoadingPagamento(false)
    }
  }

  function PixTimer({ onExpire }: { onExpire: () => void }) {
    const [secondsLeft, setSecondsLeft] = useState(25 * 60)
    useEffect(() => {
      if (secondsLeft <= 0) {
        onExpire()
        return
      }
      const interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(interval)
    }, [secondsLeft, onExpire])

    const minutes = Math.floor(secondsLeft / 60)
    const seconds = secondsLeft % 60
    const formatted = `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`
    return (
      <p className="text-center text-[#555] text-sm mb-3">
        Tempo restante: <b>{formatted}</b>
      </p>
    )
  }

  // Funções de validação simples
function validarEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
function validarCPF(cpf: string) {
  return /^\d{11}$/.test(cpf.replace(/\D/g, ''))
}
function validarTelefone(tel: string) {
  return /^\d{10,11}$/.test(tel.replace(/\D/g, ''))
}
function validarCEP(cep: string) {
  return /^\d{8}$/.test(cep)
}

  return (
    <>
      <HeaderCheckoutRiHappy />

      <main className="bg-[#fbf9f9] min-h-screen py-12">
<div className="max-w-[1300px] mx-auto px-6 grid grid-cols-1 md:grid-cols-[1fr_1.1fr_1fr] gap-7">
    {/* 🔸 DADOS PESSOAIS */}
<div
  className={`bg-white border border-[#c7c7c7] rounded-md shadow-[0_0_6px_rgba(0,0,0,0.05)] transition-all duration-300 overflow-hidden ${
    mostrarEntrega ? 'p-4 min-h-[120px] h-auto' : 'p-7'
  }`}
>
  <h2 className="text-[18px] font-bold text-[#333] mb-2 flex justify-between items-center">
    Dados pessoais
    {mostrarEntrega && (
      <button
        onClick={() => setMostrarEntrega(false)}
        className="text-[13px] text-[#4b2993] font-semibold hover:underline"
      >
        Alterar ▾
      </button>
    )}
  </h2>

  {!mostrarEntrega ? (
    <>
      <p className="text-[14px] text-[#666] mb-6">
        Solicitamos apenas as informações essenciais
      </p>

      {/* Nome */}
      <label className="block text-sm font-semibold text-[#444] mb-1">
        Primeiro nome
      </label>
      <input
        name="nome"
        type="text"
        value={form.nome}
        onChange={handleChange}
        className={`w-full border rounded-md px-3 py-[9px] text-sm mb-1 outline-none focus:ring-2 ${
          erro && !form.nome
            ? 'border-red-500 focus:ring-red-300'
            : 'border-[#ccc] focus:ring-yellow-400'
        }`}
      />
      {erro && !form.nome && (
        <p className="text-red-500 text-xs mb-3">Campo obrigatório.</p>
      )}

      {/* Sobrenome */}
      <label className="block text-sm font-semibold text-[#444] mb-1">
        Último nome
      </label>
      <input
        name="sobrenome"
        type="text"
        value={form.sobrenome}
        onChange={handleChange}
        className={`w-full border rounded-md px-3 py-[9px] text-sm mb-1 outline-none focus:ring-2 ${
          erro && !form.sobrenome
            ? 'border-red-500 focus:ring-red-300'
            : 'border-[#ccc] focus:ring-yellow-400'
        }`}
      />
      {erro && !form.sobrenome && (
        <p className="text-red-500 text-xs mb-3">Campo obrigatório.</p>
      )}

      {/* Email */}
      <label className="block text-sm font-semibold text-[#444] mb-1">
        E-mail
      </label>
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        className={`w-full border rounded-md px-3 py-[9px] text-sm mb-3 outline-none focus:ring-2 ${
          erro && !form.email
            ? 'border-red-500 focus:ring-red-300'
            : 'border-[#ccc] focus:ring-yellow-400'
        }`}
      />
      {erro && !form.email && (
        <p className="text-red-500 text-xs mb-3 -mt-2">Campo obrigatório.</p>
      )}

      {/* CPF e Telefone */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-sm font-semibold text-[#444] mb-1">CPF</label>
          <input
            name="cpf"
            type="text"
            value={form.cpf}
            onChange={handleChange}
            className="w-full border border-[#ccc] rounded-md px-3 py-[9px] text-sm outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#444] mb-1">Telefone</label>
          <input
            name="telefone"
            type="text"
            value={form.telefone}
            onChange={handleChange}
            className="w-full border border-[#ccc] rounded-md px-3 py-[9px] text-sm outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
      </div>

      <p className="text-[13px] text-[#4b2993] underline cursor-pointer">
        Incluir dados de pessoa jurídica
      </p>

      <div className="mt-4 flex items-start gap-2">
        <input type="checkbox" className="mt-[3px]" />
        <label className="text-[13px] text-[#444] leading-tight">
          Desejo receber e-mails, SMS e mensagens pelo WhatsApp com novidades e ofertas
        </label>
      </div>

      <button
        onClick={continuarEntrega}
        className="w-full bg-[#39b54a] hover:bg-[#2fa53f] text-white font-semibold py-[10px] rounded-md text-[15px] transition-all mt-6"
      >
        IR PARA A ENTREGA
      </button>
    </>
  ) : (
    // ✅ MODO COMPACTO (após envio)
    <div className="text-[14px] text-[#333] leading-tight space-y-[2px]">
      <p className="font-medium">{form.email}</p>
      <p>{form.nome} {form.sobrenome}</p>
      {form.telefone && (
        <p className="text-[13px] text-[#555]">Telefone: {form.telefone}</p>
      )}
    </div>
  )}
</div>


       {/* 📦 ENTREGA + PAGAMENTO */}
<div className="flex flex-col gap-4">

  {/* === ENTREGA === */}
  <div className="bg-white border border-[#c7c7c7] rounded-md p-6 shadow-[0_0_6px_rgba(0,0,0,0.05)]">
    <h3 className="font-semibold text-[#333] mb-2 text-left text-[16px] flex justify-between items-center">
      Entrega
      {mostrarPagamento && (
        <button className="text-[13px] text-[#4b2993] font-semibold hover:underline">
          Alterar ▾
        </button>
      )}
    </h3>

    {!mostrarEntrega ? (
      <p className="text-[#777] text-center">Aguardando o preenchimento dos dados</p>
    ) : mostrarPagamento ? (
      // ✅ Card compacto pós-entrega
      <div className="text-[14px] text-[#333]">
        <p>{endereco.logradouro}, {formEntrega.numero}</p>
        <p>{endereco.bairro} - {endereco.localidade} / {endereco.uf}</p>
        <p>{cep}</p>
        <p className="text-[13px] text-[#555]">Em até 3 dias úteis</p>
        <p className="text-green-600 font-medium mt-1">Grátis</p>
        <button className="w-full mt-3 bg-[#eee] text-[#333] rounded-md py-2 text-[13px] font-medium">
          alterar opções de entrega
        </button>
      </div>
    ) : (
      // 🟣 Card completo antes de pagamento (igual já está)
      <>
        {/* Campo de CEP */}
        <div className="flex flex-col mb-3">
          <label className="text-sm font-semibold text-[#333] mb-1">CEP</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={cep}
              onChange={(e) => setCep(e.target.value.replace(/\D/g, '').slice(0, 8))}
              placeholder="Digite seu CEP"
              className={`flex-1 border rounded-md px-3 py-[9px] text-sm outline-none focus:ring-2 focus:ring-[#4b2993] ${
                endereco ? 'border-green-500' : 'border-gray-300'
              }`}
            />
            {endereco && <span className="text-green-600 font-bold text-lg">✓</span>}
          </div>
          <a
            href="https://buscacepinter.correios.com.br/"
            target="_blank"
            className="text-[#4b2993] text-[13px] underline mt-1 self-end"
          >
            Não sei meu CEP
          </a>
        </div>

        {!endereco ? (
          <button
            onClick={buscarEndereco}
            disabled={loadingCEP}
            className="w-full bg-[#7c59b0] hover:bg-[#6b4b9a] text-white font-semibold py-[8px] rounded-md text-[14px] transition-all mb-4"
          >
            {loadingCEP ? 'Carregando...' : 'Buscar endereço'}
          </button>
        ) : (
          <>
            <p className="font-semibold text-[14px] mb-2 text-[#333]">Forma de entrega</p>
            <div className="border border-[#e7e0f5] bg-[#f9f8ff] rounded-md p-3 flex justify-between items-center mb-4">
              <div>
                <p className="text-[#4b2993] font-semibold text-sm">Normal</p>
                <p className="text-[#666] text-[13px]">Em até 3 dias úteis</p>
              </div>
              <span className="text-green-600 font-bold text-[14px]">Grátis</span>
            </div>

            <div className="border border-[#eee] rounded-md p-3 mb-4 text-sm">
              <p className="text-[#4b2993] font-medium">{endereco.logradouro}</p>
              <p className="text-[#666]">{endereco.bairro} - {endereco.localidade}/{endereco.uf}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-[13px] font-semibold text-[#4b2993]">Número</label>
                <input
                  name="numero"
                  value={formEntrega.numero}
                  onChange={handleEntregaChange}
                  className="w-full border-2 border-[#4b2993] rounded-md px-3 py-[7px] text-sm outline-none focus:ring-2 focus:ring-[#4b2993]"
                />
              </div>
              <div>
                <label className="text-[13px] font-semibold text-[#4b2993]">Complemento</label>
                <input
                  name="complemento"
                  placeholder="Opcional"
                  value={formEntrega.complemento}
                  onChange={handleEntregaChange}
                  className="w-full border-2 border-[#4b2993] rounded-md px-3 py-[7px] text-sm outline-none focus:ring-2 focus:ring-[#4b2993]"
                />
              </div>
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-[13px] font-semibold text-[#4b2993]">Destinatário</label>
              <input
                name="destinatario"
                value={formEntrega.destinatario}
                onChange={handleEntregaChange}
                className="w-full border-2 border-[#4b2993] rounded-md px-3 py-[7px] text-sm outline-none focus:ring-2 focus:ring-[#4b2993]"
              />
            </div>

            <button
              onClick={continuarPagamento}
              className="w-full bg-[#39b54a] hover:bg-[#2fa53f] text-white font-semibold py-[10px] rounded-md text-[15px] transition-all"
            >
              IR PARA O PAGAMENTO
            </button>
          </>
        )}
      </>
    )}
  </div>

  {/* === PAGAMENTO === */}
  <div className="bg-white border border-[#c7c7c7] rounded-md p-6 shadow-[0_0_6px_rgba(0,0,0,0.05)]">
    <h3 className="font-semibold text-[#333] mb-3 text-left text-[16px]">Pagamento</h3>

    {!mostrarPagamento ? (
      <p className="text-[#777] text-center text-sm">
        Aguardando preenchimento do endereço
      </p>
    ) : (
      // ✅ Card de pagamento igual à RiHappy
      <div className="text-center">

        {/* Métodos */}
        <div className="space-y-3 mb-5">
          <button className="w-full bg-[#6a4bbf] text-white font-semibold py-2 rounded-md flex items-center justify-center gap-2">
            Pix
          </button>
          <button className="w-full border border-dashed border-[#ccc] py-2 rounded-md text-[#555] text-[14px] flex items-center justify-center gap-2">
            Cartão de crédito
          </button>
        </div>

        <img
          src="https://img.icons8.com/color/48/pix.png"
          alt="Pix"
          className="mx-auto w-[100px] mb-8"
        />

        <div className="flex items-center justify-center gap-6 text-[#444] text-[13px]">
          <div className="text-center">
            <div className="border border-[#ccc] rounded-full w-6 h-6 flex items-center justify-center mx-auto text-[12px] mb-1">
              1
            </div>
            <p>Aperte em Finalizar<br />compra para gerar o QR</p>
          </div>
          <div className="border-t border-[#ccc] w-8 translate-y-[-16px]" />
          <div className="text-center">
            <div className="border border-[#ccc] rounded-full w-6 h-6 flex items-center justify-center mx-auto text-[12px] mb-1">
              2
            </div>
            <p>Confira os dados e realize o<br />pagamento pelo app do banco</p>
          </div>
        </div>
      </div>
    )}
  </div>
</div>

{/* 🧾 RESUMO */}
<div className="bg-white border border-[#c7c7c7] rounded-md p-5 shadow-[0_0_6px_rgba(0,0,0,0.05)]">
  <h3 className="font-semibold text-[17px] mb-4 text-[#333]">Resumo da Compra</h3>

 {cart.length > 0 ? (
  <>
    {cart.map((produto, i) => (
      <div
        key={i}
        className="flex items-center gap-4 border border-[#eee] rounded-md p-3 mb-5"
      >
        <div className="relative">
          <img
            src={produto.img}
            alt={produto.title}
            className="w-[70px] h-[70px] object-contain rounded-md"
          />
          <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[11px] font-semibold rounded-full px-[6px] py-[1px]">
            {produto.quantity || 1}x
          </span>
        </div>
        <div className="flex flex-col text-left w-full">
          <p className="font-medium text-[14px] leading-tight text-[#333] line-clamp-2">
            {produto.title}
          </p>
          <span className="text-[12px] text-[#666]">
            Vendido e entregue por <b>Ri Happy</b>
          </span>
        </div>
      </div>
    ))}

      {/* Totais */}
      <div className="space-y-2 text-sm text-[#333] mb-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>R$ {total}</span>
        </div>
        <div className="flex justify-between">
          <span>Entrega</span>
          <span className="text-green-600 font-medium">Grátis</span>
        </div>
        <hr />
        <div className="flex justify-between font-bold text-green-600 text-[16px]">
          <span>Total</span>
          <span>R$ {total}</span>
        </div>
      </div>

      {/* Aceite dos termos */}
      <div className="flex flex-col gap-2 mb-4">
        <label className="flex items-start gap-2 text-[13px] text-[#333] leading-snug">
          <input
            type="checkbox"
            checked={form.aceitouTermos || false}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, aceitouTermos: e.target.checked }))
            }
            className="mt-[2px] accent-[#4b2993] cursor-pointer"
          />
          <span>
            Li e aceito os{' '}
            <a href="#" className="text-[#4b2993] underline">
              Termos de Uso
            </a>
            , as{' '}
            <a href="#" className="text-[#4b2993] underline">
              Políticas de Privacidade
            </a>{' '}
            e o{' '}
            <a href="#" className="text-[#4b2993] underline">
              Regulamento do Programa de Fidelidade
            </a>
            .
          </span>
        </label>

        {/* Mensagem de erro */}
        {!form.aceitouTermos && (
          <div className="bg-[#fcecec] border border-[#f5b7b1] text-[#c0392b] text-[12px] rounded-md p-2 leading-snug">
            Precisamos que concorde com nossos Termos de Uso, Políticas de Privacidade e
            Regulamento do Programa antes de seguir.
          </div>
        )}
      </div>

<button
  onClick={gerarPagamento}
  disabled={!form.aceitouTermos || loadingPagamento}
  className={`w-full flex items-center justify-center gap-2 font-semibold text-[15px] rounded-md py-[10px] transition-all ${
    form.aceitouTermos
      ? 'bg-[#39b54a] hover:bg-[#2fa53f] text-white'
      : 'bg-[#a8e1b3] text-white cursor-not-allowed'
  }`}
>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 11c0-1.105.895-2 2-2h6a2 2 0 012 2v8a2 2 0 01-2 2H14a2 2 0 01-2-2v-8zm0 0V7a4 4 0 10-8 0v4"
          />
        </svg>
{loadingPagamento ? 'Gerando pagamento...' : 'finalizar compra'}
      </button>
    </>
  ) : (
    <p className="text-sm text-[#777] text-center py-10">
      Nenhum produto encontrado no checkout.
    </p>
  )}
</div>

        </div>
      </main>
{modalPixAberto && pagamento && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-md shadow-lg w-[420px] p-6 relative">
      <button
        onClick={() => setModalPixAberto(false)}
        className="absolute top-3 right-3 text-[#555] hover:text-black text-lg font-bold"
      >
        ✕
      </button>

      <img
        src="https://img.icons8.com/color/48/pix.png"
        alt="Pix"
        className="mx-auto w-[50px] mb-3"
      />

      {/* 🕒 Temporizador em tempo real */}
      <PixTimer onExpire={() => setModalPixAberto(false)} />

      <div className="flex flex-col items-center mb-4">
        <img
          src={`data:image/png;base64,${pagamento?.pix?.qrcode_base64 || ''}`}
          alt="QR Code Pix"
          className="w-[180px] h-[180px] object-contain"
        />
        <p className="text-[13px] text-center text-[#444] mt-2">
          Escaneie o código com seu celular
        </p>
      </div>

      <div className="bg-[#f8f8f8] border border-[#ddd] rounded-md p-3 mb-3 text-center">
        <p className="text-[13px] text-[#333] leading-snug">
          <b className="text-[#39b54a]">TUNA PAGAMENTOS LTDA</b>, nossa parceira de
          pagamento PIX!
        </p>
      </div>


 {/* Código Pix para copiar */}
<div className="mt-3 text-center">
  <p className="text-[12px] text-[#666] mb-1 font-medium">
    Código Pix Copia e Cola:
  </p>

  <div className="bg-[#f9f9f9] border border-[#ddd] rounded-md p-2 text-[12px] break-all text-[#333] inline-block max-w-[90%]">
    {pagamento.pix.code}
  </div>

  <button
    className="text-[#4b2993] underline text-[12px] mt-2 block mx-auto hover:text-[#321c63] transition-colors"
  >
    Copiar código
  </button>
</div>


      <div className="border-t pt-2 mt-2 flex justify-between text-[14px] font-semibold text-[#333]">
        <span>Valor da compra</span>
        <span className="text-[#39b54a]">R$ {total}</span>
      </div>

    </div>
  </div>
)}


    </>
  )
}
