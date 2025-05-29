import Link from "@/components/Link";
import Carousel from "@/components/Carousel/carrossel";


interface TitleProps {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: React.ReactNode;
}

function Title({ as, children }: TitleProps) {
  const Tag = as;
  return (
    <Tag className="text-4xl font-bold text-center text-green-500 mb-6">
      {children}
    </Tag>
  );
}

export default function Home() {
  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans">
      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-500 to-teal-600 p-8 text-center shadow-lg">
        <h1 className="text-5xl font-extrabold tracking-tight">FrontierLess</h1>
        <p className="mt-3 text-xl opacity-90">A experiência de intercâmbio que transforma seu inglês</p>
      </header>

      {/* Section 1 */}
      <main className="container mx-auto px-4 py-16 space-y-20">
        <section className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <Title as="h2">Não tem uma conta?</Title>
            <div className="bg-gray-800 p-8 rounded-lg shadow-xl">
              <p className="mb-4 text-lg text-gray-300">
                Bem-vindo à nossa rede social Frontierless! Aqui você encontra viagens para intercâmbio com informações atualizadas.
              </p>
              <p className="mb-6 text-gray-300">
                Se você é novo por aqui e quer ter essa experiência, aproveite e se cadastre clicando abaixo:
              </p>
              <Link
                href="/register"
                className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-semibold rounded-lg shadow-md transition transform hover:-translate-y-1 flex items-center justify-center"
              >
                Cadastrar-se
              </Link>
              <p className="mt-6 text-gray-300">
                Já tem uma conta? Faça login novamente:
              </p>
              <Link
                href="/login"
                className="block mt-4 w-full py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg shadow-md transition flex items-center justify-center"
              >
                Fazer Login
              </Link>
            </div>
          </div>

          <div className="lg:w-1/2 w-full animate-slideInRight">
            <Carousel
              images={[
                { src: "/img/osaka.png", alt: "Osaka, Japão" },
                { src: "/img/roma.png", alt: "Roma, Itália" },
                { src: "/img/Salvador.png", alt: "Salvador, Brasil" },
                { src: "/img/Nova York.png", alt: "Nova York, Estados Unidos" },
              ]}
            />
          </div>

        </section>

        {/* Section 2 */}
        <section className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 w-full animate-slideInRight">
            <Carousel
              images={[
                { src: "/img/osaka.png", alt: "Osaka, Japão" },
                { src: "/img/roma.png", alt: "Roma, Itália" },
                { src: "/img/Salvador.png", alt: "Salvador, Brasil" },
                { src: "/img/Nova York.png", alt: "Nova York, Estados Unidos" },
              ]}
            />
          </div>


          <div className="lg:w-1/2 order-1 lg:order-2">
            <Title as="h2">Acesse nosso Feed</Title>
            <div className="bg-gray-800 p-8 rounded-lg shadow-xl">
              <p className="mb-6 text-gray-300">
                Para acessar o feed do nosso site e descobrir projetos para viagens incríveis, siga o link abaixo:
              </p>
              <Link
                href="/feed"
                className="block w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-semibold rounded-lg shadow-md transition transform hover:-translate-y-1 flex items-center justify-center"
              >
                Acessar Feed
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-center p-6 border-t border-gray-700">
        <p className="text-gray-500">© 2024 FrontierLess. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}