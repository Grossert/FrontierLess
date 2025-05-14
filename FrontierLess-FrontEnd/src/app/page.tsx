import Link from "@/components/Link";

interface Props {
  children?: React.ReactNode;
  as?: any;
}

function Title({ children, as }: Props) {
  const Tag = as;
  return (
    <>
      <Tag className="text-5xl font-bold text-center text-green-500 mb-6">
        {children}
      </Tag>
    </>
  );
}

export default function Home() {
  return (
    <div className="bg-white">
      <header className="bg-green-600 p-6 text-gray-800 text-center">
        <h1 className="text-4xl font-bold">FrontierLess</h1>
        <p className="mt-2">A experiência de intercâmbio que transforma seu inglês.</p>
      </header>

      {/* Primeira Seção - Imagem à Direita e Links à Esquerda */}
      <main className="flex flex-col lg:flex-row items-center justify-between p-6 bg-gray-800">
        {/* Parte Esquerda - Links */}
        <div className="flex flex-col items-center lg:w-1/2">
          <Title as="h2">Não tem uma conta?</Title>

          <div className="space-y-4 mt-8 text-center">
            <p className="text-white">bem vindo ao nossa rede social Frontierless! Aqui você vai encontrar
              sua viagem para intercâmbio, com todas as informações atualizadas!</p>
            <p className="text-white">Se você é novo por aqui e quer ter essa experiência, aproveite e se cadastre clicando abaixo:</p>
            <Link href="/register">
              Ir para Cadastrar-se
            </Link>
            <p className="text-white">Se você já tem uma conta, pode acessa-la novamente com o link abaixo!</p>
            <Link href="/login">
              Ir para Login
            </Link>
          </div>
        </div>

        {/* Parte Direita - Imagem */}
        <div className="lg:w-1/2 flex justify-center">
          <img
            src="/img/osaka.png/"
            alt="FrontierLess"
            className="h-full w-auto object-contain rounded-lg shadow-lg"
          />
        </div>
      </main>

      {/* Segunda Seção - Imagem à Esquerda e Links à Direita */}
      <section className="flex flex-col lg:flex-row items-center justify-between p-6 mt-6 bg-gray-800">
        {/* Parte Esquerda - Nova Imagem */}
        <div className="lg:w-1/2 flex justify-center">
          <img
            src="/img/roma.png/" // Substitua pelo caminho da nova imagem
            alt="Nova Imagem"
            className="h-full w-auto object-contain rounded-lg shadow-lg"
          />
        </div>

        {/* Parte Direita - Links Novos */}
        <div className="flex flex-col items-center lg:w-1/2">
          <Title as="h2">Acesse nosso Feed</Title>

          <div className="space-y-4 mt-8 text-center">
            <p className="text-white">Para acessar o Feed do nosso site, para mais informações dos projetos para viagens incríveis,
              siga o link abaixo!
            </p>
            <Link href="/feed">
              Ir para o Feed
            </Link>

          </div>
        </div>
      </section>

      <footer className="bg-gray-100 text-center p-4">
        <p className="text-gray-600">© 2024 FrontierLess. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
