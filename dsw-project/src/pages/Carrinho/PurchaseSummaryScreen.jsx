import React from 'react';

const PurchaseSummaryScreen = ({ purchaseData }) => {
  const { cartItems, totalPrice, selectedCard } = purchaseData;
  const user = JSON.parse(localStorage.getItem("user_logged"));

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Resumo da Compra</h2>
      <ul style={styles.cartList}>
        {cartItems.map(item => (
          <li key={item.id} style={styles.cartItem}>
            <span style={styles.productCode}>Código do Produto: {item.produto}</span>
            <span style={styles.quantity}>Quantidade: {item.quantidade}</span>
          </li>
        ))}
      </ul>
      <p style={styles.totalPrice}>Total: R${totalPrice.toFixed(2)}</p>
      <p style={styles.selectedCard}>Cartão selecionado: {selectedCard}</p>
      <p style={styles.selectedCard}>Endereço de entrega: {user.user.enderecoEntrega}</p>
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
  totalPrice: {
    textAlign: 'right',
    fontSize: '18px',
    fontWeight: 'bold',
    marginTop: '10px',
  },
  selectedCard: {
    textAlign: 'right',
    fontSize: '18px',
    fontWeight: 'bold',
  },
};

export default PurchaseSummaryScreen;
