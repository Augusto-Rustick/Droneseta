import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const CardScreen = () => {
  const [cards, setCards] = useState([]);
  const user = JSON.parse(localStorage.getItem('user_logged'));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/cartao/listUser/${user.user.id}`);
        setCards(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCards();
  }, []);

  const handleAddCard = () => {
    navigate("/cartao-cadastro");
  };


  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Cartões</h1>
      {cards.length === 0 ? (
        <p style={styles.message}>Não existem cartões cadastrados.</p>
      ) : (
        <ul style={styles.cardList}>
          {cards.map((card) => (
            <li key={card.id} style={styles.cardItem}>
              <span style={styles.cardInfo}>Número do Cartão: {card.numero}</span>
              <span style={styles.cardInfo}>Validade: {card.validade}</span>
              <span style={styles.cardInfo}>CVC: {card.cvc}</span>
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleAddCard} style={styles.addButton}>
        Adicionar Cartão
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  message: {
    marginBottom: '20px',
    fontSize: '16px',
  },
  cardList: {
    listStyleType: 'none',
    padding: '0',
  },
  cardItem: {
    marginBottom: '20px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  cardInfo: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '16px',
  },
  addButton: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '20px',
  },
};

export default CardScreen;
