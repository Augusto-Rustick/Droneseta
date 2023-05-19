import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const user = JSON.parse(localStorage.getItem("user_logged"));

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/pedido/listUser/' + user.user.id);
        setCartItems(response.data);

        // Calcular o total do preço
        const total = response.data.reduce((acc, item) => {
          return acc + item.quantidade * 49.90;
        }, 0);
        setTotalPrice(total);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveFromCart = async (itemId) => {
    try {
      // Fazer a requisição para remover o item do carrinho
      await axios.delete('http://localhost:8080/pedido/delete/' + itemId);

      // Atualizar a lista de itens do carrinho
      const updatedCartItems = cartItems.filter(item => item.id !== itemId);
      setCartItems(updatedCartItems);

      // Atualizar o total do preço
      const total = updatedCartItems.reduce((acc, item) => {
        return acc + item.quantidade * 49.90;
      }, 0);
      setTotalPrice(total);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFinalizePurchase = async () => {
    try {
      const ordersPromises = cartItems.map(item =>
        axios.post('http://localhost:8080/pedido/insert', {
          id: item.id,
          cliente: item.cliente,
          produto: item.produto,
          quantidade: item.quantidade,
          situacao: 2,
        })
      );

      await Promise.all(ordersPromises);
    } catch (error) {
      console.error('Erro ao criar pedidos:', error);
    }
    alert('Compra finalizada com sucesso!');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Carrinho de Compras</h2>
      {cartItems.length === 0 ? (
        <p style={styles.emptyMessage}>O carrinho está vazio.</p>
      ) : (
        <>
          <ul style={styles.cartList}>
            {cartItems.map(item => (
              <li key={item.id} style={styles.cartItem}>
                <span style={styles.productCode}>Código do Produto: {item.produto}</span>
                <span style={styles.quantity}>Quantidade: {item.quantidade}</span>
                <button
                  style={styles.removeButton}
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  Remover do Carrinho
                </button>
              </li>
            ))}
          </ul>
          <p style={styles.totalPrice}>Total: R${totalPrice.toFixed(2)}</p>
          <button
            style={styles.finalizeButton}
            onClick={handleFinalizePurchase}
          >
            Finalizar Compra
          </button>
        </>
      )}
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
  finalizeButton: {
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
