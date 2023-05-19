import React from 'react';
import { useNavigate } from "react-router-dom";

const RelatorioViagens = ({ entregaData }) => {
  const navigate = useNavigate();

  const handleRedirectHome = () => {
    navigate("/home");
  };

  return (
    <div>
      <h2>Relatório de Viagens</h2>
      {entregaData.map((viagem, index) => (
        <div key={index}>
          <h3>Viagem {index + 1}</h3>
          <p>Quantidade de camisetas transportadas: {viagem.quantidadeTransportada}</p>
          <ul>
            {viagem.pedidos.map((pedido) => (
              <li key={pedido.id}>
                Pedido {pedido.id}: {pedido.quantidade} camisetas
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button onClick={handleRedirectHome} style={styles.button}>Ir para a Home</button>
    </div>
  );
};

const styles = {
  button: {
    padding: '10px 20px',
    background: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '20px',
  },
};

export default RelatorioViagens;
