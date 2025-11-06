'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import HeaderRiHappy from '@/components/HeaderRiHappy'
import FooterRiHappy from '@/components/FooterRiHappy'
import ProdutosGrid from '@/components/ProdutosGrid'

export default function HomePage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 4,
    minutes: 39,
    seconds: 10,
  })

  useEffect(() => {
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 2)

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance < 0) {
        clearInterval(timer)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)
      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <HeaderRiHappy />



      {/* 🧸 Ofertas Imperdíveis */}
      <section className="max-w-[1300px] mx-auto mt-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-6 justify-center items-start">
          {/* Banner principal */}
          <div className="flex-1 w-full">
            <a href="#" className="block rounded-lg overflow-hidden shadow-md md:shadow-lg">
              <Image
                src="https://rihappynovo.vtexassets.com/assets/vtex.file-manager-graphql/images/1fb25ef2-b41a-4fa1-8af6-4a848377d615___eab5dffb30c3ce66561ecdebbd73ea65.png"
                alt="Ofertas imperdíveis"
                width={641}
                height={375}
                className="w-full h-auto object-cover"
              />
            </a>
          </div>

          {/* Coluna lateral */}
          <div className="flex-1 flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center">
              <p className="text-[14px] sm:text-[15px] font-medium text-[#444] text-center sm:text-left">
                ⚡️Receba embalado em até 3 horas!
              </p>
              <a
                href="#"
                className="text-[13px] sm:text-[14px] underline text-[#64229B] hover:text-[#e85c00] text-center sm:text-right"
              >
                *políticas de frete
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                'https://rihappynovo.vtexassets.com/assets/vtex.file-manager-graphql/images/905fd165-e874-4d54-9e6a-eac12061b9ce___e1bede2deb3e84ed9732136d488ef38c.png',
                'https://rihappynovo.vtexassets.com/assets/vtex.file-manager-graphql/images/353fb5fb-8b9c-4303-bddf-f20748c39022___4f9526b99c36573cd2530c26617bc9a9.png',
                'https://rihappynovo.vtexassets.com/assets/vtex.file-manager-graphql/images/36d39de9-fb34-44cd-ae78-8f3925daecd0___4813f332107658212b71ed7d41f52bde.png',
              ].map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt="Banner lateral"
                  width={300}
                  height={250}
                  className="rounded-md w-full object-contain"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 🎁 Presente por idade */}
      <section className="max-w-[1300px] mx-auto mt-10 px-4 md:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 gap-3 sm:gap-0">
          <h2 className="text-[18px] md:text-[20px] font-semibold text-[#1a1a1a] text-center sm:text-left">
            🎁 Presente por idade
          </h2>
          <a href="/presentes-por-idade" className="text-[#4b2993] underline text-[15px] hover:text-[#e85c00] text-center sm:text-right">
            ver todas
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-5 w-full">
          {[
            { label: 'até 1 ano', color: '#8cd2f4', textColor: '#004250' },
            { label: '1 a 2 anos', color: '#9ad8cf', textColor: '#004250' },
            { label: '3 a 5 anos', color: '#a9d78d', textColor: '#004250' },
            { label: '6 a 8 anos', color: '#fff383', textColor: '#5a2900' },
            { label: '+9 anos', color: '#f9b7d0', textColor: '#7e1e45' },
          ].map((item, i) => (
            <a
              key={i}
              href="#"
              className="rounded-full flex items-center justify-center text-[16px] md:text-[22px] font-extrabold transition transform hover:scale-[1.05] shadow-sm h-[60px] md:h-[80px]"
              style={{
                backgroundColor: item.color,
                color: item.textColor,
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </section>


      <ProdutosGrid />

    

      <div className="h-16 md:h-20"></div>
      <FooterRiHappy />
    </>
  )
}
