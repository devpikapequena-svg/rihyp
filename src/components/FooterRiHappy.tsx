'use client'

import Image from 'next/image'

export default function FooterRiHappy() {
  return (
    <>
      {/* 🎁 Seção de Cards Promocionais RiHappy */}
      <section className="bg-[#f9f7f7] py-24">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-6">
            {[
              {
                img: 'https://rihappynovo.vtexassets.com/assets/vtex.file-manager-graphql/images/7a7d43fa-79d4-40fc-8ccd-da0f8328fdcb___42cb0ba21c54901839b9506da4ab9a83.png',
                link: '/rihappy-para-empresas',
              },
              {
                img: 'https://rihappynovo.vtexassets.com/assets/vtex.file-manager-graphql/images/c55c8ef7-64f6-4cd3-9be4-bde16ea33045___cd5ea204b9f12b081fd2f428e5ee5c71.png',
                link: '/franquia',
              },
              {
                img: 'https://rihappynovo.vtexassets.com/assets/vtex.file-manager-graphql/images/3ef2b3d3-3c0e-425f-82a6-56ab09735018___f04f8b588eaf96ec426598cd8739e73e.png',
                link: '/nossas-lojas',
              },
              {
                img: 'https://rihappynovo.vtexassets.com/assets/vtex.file-manager-graphql/images/550971c8-cce7-427e-bcf5-14733a14a862___7186e63631ca86def5bb8da099756b0a.png',
                link: 'https://www.rihappy.com.vc/',
              },
            ].map((card, i) => (
              <a
                key={i}
                href={card.link}
                target={card.link.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="relative block rounded-[25px] overflow-hidden shadow-sm hover:shadow-md transition-transform duration-300 hover:-translate-y-[4px] w-[280px]"
              >
                <img
                  src={card.img}
                  className="w-full h-[360px] object-cover"
                  loading="lazy"
                  alt={`Card promocional ${i + 1}`}
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 🦄 Footer principal */}
      <footer className="bg-white border-t border-gray-200 pt-0 pb-8">
        <div className="max-w-[1300px] mx-auto px-6 flex flex-wrap md:flex-nowrap justify-between gap-8">
          {/* 🌞 Solzinho + Logo + Redes Sociais */}
          <div className="flex flex-col items-center md:items-start w-full md:w-[30%] text-center md:text-left">
            <Image
              src="https://rihappynovo.vtexassets.com/arquivos/solzinhoFooterNew.png"
              alt="Solzinho RiHappy"
              width={400}
              height={350}
              className="mb-4"
            />

            <div className="flex items-center justify-center md:justify-start gap-5">
              {[
                { href: 'https://www.instagram.com/rihappy/', icon: 'ico-instagram-new-home.svg' },
                { href: 'https://www.youtube.com/c/RiHappyBrinquedosOficial', icon: 'ico-yotube-new-home.svg' },
                { href: 'https://www.facebook.com/RiHappyBrinquedos', icon: 'ico-facebook-new-home.svg' },
                { href: 'https://pt.linkedin.com/company/grupo-ri-happy', icon: 'ico-linkedin-new-home.svg' },
              ].map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer">
                  <img
                    src={`https://rihappynovo.vtexassets.com/arquivos/${social.icon}`}
                    alt={social.icon}
                    width={85}
                    height={85}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* 📚 Menus (à direita da logo) */}
          <div className="flex flex-wrap justify-center md:justify-start gap-16 text-center w-full md:w-[65%] mt-16">
            {/* Coluna 1 - Institucional */}
            <div className="min-w-[200px]">
              <h3 className="font-bold mb-3 text-[18px]">Institucional</h3>
              <ul className="text-[14px] text-gray-700 space-y-[15px]">
                {[
                  'Sobre a Ri Happy',
                  'ESG',
                  'Solzinho',
                  'Assessoria de imprensa',
                  'Blog modo brincar',
                  'Nossas lojas',
                  'Trabalhe conosco',
                  'Mapa do site',
                  'Navegue na RiHappy',
                  'Marcas parceiras',
                ].map((item, i) => (
                  <li key={i} className="text-center">
                    <a href="#" className="hover:text-[#64229B] transition inline-block">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coluna 2 - Serviços */}
            <div className="min-w-[200px]">
              <h3 className="font-bold mb-3 text-[18px]">Serviços</h3>
              <ul className="text-[14px] text-gray-700 space-y-[15px]">
                {[
                  'Compre pelo delivery',
                  'Seja Embaixador',
                  'Consulta Happy Vale',
                  'Regulamentos',
                  'Ri Happy para empresas',
                  'Seja um franqueado',
                  'Venda com a gente',
                  'Proteja seus dados',
                  'Divertudo',
                ].map((item, i) => (
                  <li key={i} className="text-center">
                    <a href="#" className="hover:text-[#64229B] transition inline-block">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coluna 3 - Atendimento */}
            <div className="min-w-[200px]">
              <h3 className="font-bold mb-3 text-[18px]">Atendimento</h3>
              <ul className="text-[14px] text-gray-700 space-y-[15px]">
                {[
                  'Central de atendimento',
                  'Políticas de frete',
                  'Políticas de privacidade',
                  'Fale com o DPO/LGPD',
                  'Política de Trocas e Devoluções Ri Happy',
                  'Termos de uso e navegação',
                  'Marketplace - Termos e condições',
                  'Compra segura',
                  'Aviso sobre cookies',
                ].map((item, i) => (
                  <li key={i} className="text-center">
                    <a href="#" className="hover:text-[#64229B] transition inline-block">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 💳 Pagamentos e certificações */}
        <div className="max-w-[1200px] mx-auto mt-12 px-6 border-t border-gray-200 pt-6">
          <div className="flex flex-col md:flex-row items-start justify-center md:justify-start md:gap-10 gap-8 text-center md:text-left">
            {/* Pagamentos */}
            <div className="flex flex-col items-center md:items-start">
              <h4 className="font-bold mb-5 text-[17px]">Pagamentos disponíveis</h4>
              <div className="flex items-center gap-4 justify-center md:justify-start">
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
                    className="rounded-md"
                  />
                ))}
              </div>
            </div>

            {/* Certificados */}
            <div className="flex flex-col items-center md:items-start">
              <h4 className="font-bold mb-4 text-[17px]" style={{ fontFamily: '"Lilita One", sans-serif' }}>
                Segurança e certificações
              </h4>
              <div className="flex items-center gap-3 md:gap-4 justify-center md:justify-start">
                <img
                  src="https://cdn.confi.com.vc/reputation/106207.png"
                  alt="Selo Confi"
                  width={80}
                  height={60}
                  className="rounded-md"
                />
                <img
                  src="https://rihappynovo.vtexassets.com/arquivos/selo-certificado-vtex-footer.png"
                  alt="VTEX Certified"
                  width={80}
                  height={60}
                  className="rounded-md"
                />
                <img
                  src="https://rihappynovo.vtexassets.com/assets/vtex.file-manager-graphql/images/8e43b15a-a025-49b1-965f-ac8bab47a563___40820f29b33209c24ace7c319260bb09.png"
                  alt="Tuna - parceira de pagamento via Pix"
                  width={80}
                  height={60}
                  className="rounded-md"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 🧾 Rodapé inferior */}
        <div className="max-w-[1300px] mx-auto px-6 mt-10 pt-5 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-800 leading-snug">
          <p className="max-w-[1000px] text-left text-[8.5px]">
            <span className="font-semibold text-[13px] block mb-[10px]">Mais informações</span>
            Aviso Importante: Todos os preços e condições deste site são válidos apenas para compras no site e não se aplicam para
            nossas lojas físicas. Os brinquedos divulgados em nosso site possuem certificação dos órgãos autorizados - OCP’s
            (Organismos de Certificação de Produtos). Ri Happy é uma empresa do Grupo Ri Happy S/A, com escritório administrativo na
            Av. Engenheiro Luís Carlos Berrini, 105 - Cidade Monções, São Paulo/SP, inscrita no CNPJ 58.731.682/0001-11 -{' '}
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
