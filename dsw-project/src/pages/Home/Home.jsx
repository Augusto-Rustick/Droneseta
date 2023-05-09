import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  return (
    <>
      <div className="container overflow-visible mt-5 h-100">
        <div className="sub-container container overflow-visible mt-5 h-100">
          <h1 className="text-center font-weight-bold pt-5">Droneseta</h1>
          <p className="text-md-center w-75 h-75 p-3 text-justify">
            Bem-vindo(a) à Droneseta, a loja de camisetas mais inovadora do mercado!
            Aqui você encontra uma grande variedade de modelos exclusivos, perfeitos para quem quer se destacar com estilo.
          </p>
          <p className="text-md-center w-75 h-75 p-3 text-justify">
            Além de oferecermos produtos de qualidade a preços acessíveis, temos um grande diferencial:
            a entrega por drones! Isso mesmo, nossas entregas são realizadas de maneira rápida e eficiente pelos nossos
            drones, que garantem uma entrega segura e sem atrasos.
          </p>
          <p className="text-md-center w-75 h-75 p-3 text-justify">
            A Droneseta é uma loja virtual feita por estudantes universitários, com o objetivo de trazer inovação ao mercado
            de e-commerce. Nós trabalhamos incansavelmente para oferecer a melhor experiência de compra aos nossos clientes,
            desde o processo de escolha dos produtos até a entrega.
          </p>
          <p className="text-md-center w-75 h-75 p-3 text-justify">
            Navegue pelo nosso site e descubra as nossas coleções de camisetas exclusivas, feitas com materiais de qualidade
            e estampas criativas. Compre agora e experimente a emoção de receber sua encomenda diretamente do céu!
          </p>
          <p className="text-md-center w-75 h-75 p-3 text-justify">
            Aproveite também nossas promoções e ofertas especiais, e fique sempre ligado em nossas redes sociais para não
            perder nenhuma novidade da Droneseta. Seja bem-vindo(a) à nossa loja virtual, e boas compras!
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
