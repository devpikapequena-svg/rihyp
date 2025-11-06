"use client"
import { useEffect, useState } from "react"
import Image from "next/image"

export default function ModalHappyFriday() {
  const [show, setShow] = useState(false)
  const [cep, setCep] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Verifica se já existe um CEP salvo
    const savedCep = localStorage.getItem("userCEP")
    if (savedCep) {
      setShow(false) // não exibe o modal novamente
      return
    }

    const timer = setTimeout(() => setShow(true), 600)
    return () => clearTimeout(timer)
  }, [])

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "") // remove não dígitos
    if (value.length > 8) value = value.slice(0, 8)
    if (value.length > 5) value = value.replace(/(\d{5})(\d{1,3})/, "$1-$2")
    setCep(value)
  }

  const handleContinuar = () => {
    if (cep.length < 9) return alert("Digite um CEP válido.")
    setLoading(true)

    setTimeout(() => {
      localStorage.setItem("userCEP", cep) // salva o CEP no localStorage
      setLoading(false)
      setShow(false)
      console.log("CEP salvo e enviado:", cep)
    }, 1500)
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-black/20 backdrop-blur-sm flex items-center justify-center">
      <div className="relative w-[92%] max-w-[400px] rounded-3xl overflow-hidden shadow-2xl animate-fade-in">
        {/* Fundo */}
        <div className="relative h-[700px] w-full">
          <Image
            src="https://rihappynovo.vtexassets.com/assets/vtex.file-manager-graphql/images/24f50e57-6605-471d-8672-c2159852303f___d7c711f19305b0d9025ec51cff906b82.png"
            alt="Happy Friday"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Conteúdo sobreposto */}
        <div className="absolute left-0 right-0 bottom-[50px] px-6 flex flex-col items-center space-y-5">
          {/* Campo CEP */}
          <div className="flex w-full bg-white shadow-md border border-gray-200 h-[55px] rounded-full overflow-hidden">
            <input
              type="text"
              inputMode="numeric"
              placeholder="Digite o seu CEP..."
              className="flex-1 px-5 text-gray-500 outline-none text-[15px] font-medium rounded-l-full"
              value={cep}
              onChange={handleCepChange}
              maxLength={9}
            />
            <button
              onClick={handleContinuar}
              disabled={loading}
              className="bg-[#5E4DB2] text-white font-semibold text-sm px-8 rounded-r-full hover:bg-[#4b3a99] transition-all flex items-center justify-center"
            >
              {loading ? (
                <svg
                  className="w-5 h-5 animate-spin text-white"
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
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              ) : (
                "continuar"
              )}
            </button>
          </div>

          {/* Botão Localização */}
          <button
            onClick={() => alert("Usar minha localização")}
            className="w-full bg-white rounded-full py-3 text-black font-medium border border-gray-300 hover:bg-gray-50 transition flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path
                d="M16.032,6.5v0l0,0L3.5,11.856l6.331.848.847,6.33L16.031,6.5l0,0Z"
                transform="translate(-2.267 -5.267)"
                fill="#000"
              />
            </svg>
            usar minha localização
          </button>

          {/* LGPD */}
          <p className="text-white/80 text-xs text-center leading-snug mt-2">
            Para saber o que fazemos com seus dados,{" "}
            <a
              href="/politica-de-privacidade"
              target="_blank"
              className="underline text-white hover:text-yellow-300"
            >
              basta clicar aqui.
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
