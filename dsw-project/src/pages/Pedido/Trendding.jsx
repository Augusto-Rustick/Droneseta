import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CartScreen = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/pedido/listBySituacao/3');
        const combinedPedidos = combinePedidos(response.data);
        const sortedPedidos = sortPedidos(combinedPedidos);
        setPedidos(sortedPedidos);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPedidos();
  }, []);

  // Função para combinar pedidos com o mesmo ID de produto
  const combinePedidos = (pedidos) => {
    const combined = pedidos.reduce((result, pedido) => {
      const existing = result.find(item => item.produto === pedido.produto);
      if (existing) {
        existing.quantidade += pedido.quantidade;
      } else {
        result.push({
          produto: pedido.produto,
          quantidade: pedido.quantidade
        });
      }
      return result;
    }, []);
    return combined;
  };

  const sortPedidos = (pedidos) => {
    const sorted = [...pedidos];
    sorted.sort((a, b) => b.quantidade - a.quantidade);
    return sorted;
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Carrinho de Compras</h2>
      <>
        {pedidos.length === 0 ? (
          <p style={styles.emptyMessage}>Não existem pedidos feitos e efetuados.</p>
        ) : (
          <>
            <ul style={styles.cartList}>
              {pedidos.map(item => (
                <li key={item.produto} style={styles.cartItem}>
                  <span style={styles.productCode}>Código do Produto: {item.produto}</span>
                  <span style={styles.quantity}>Quantidade: {item.quantidade}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  title: {
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '20px',
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: '18px',
  },
  cartList: {
    listStyle: 'none',
    padding: '0',
  },
  cartItem: {
    marginBottom: '10px',
    padding: '10px',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
  },
  productCode: {
    flex: '1',
    fontWeight: 'bold',
  },
  quantity: {
    marginLeft: '10px',
  },
  removeButton: {
    marginLeft: '10px',
    padding: '5px 10px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cardSelect: {
    marginTop: '10px',
    marginBottom: '100px',
    padding: '5px',
    borderRadius: '4px',
    marginLeft: 'auto',
    display: 'block',
  },
  entregaButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'block',
    margin: '0 auto',
  },
  totalPrice: {
    textAlign: 'right',
    fontSize: '18px',
    fontWeight: 'bold',
    marginTop: '10px',
  },
};

export default CartScreen;
