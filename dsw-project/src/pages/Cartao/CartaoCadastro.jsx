import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const CadastroCartaoScreen = () => {
  const user = JSON.parse(localStorage.getItem('user_logged'));
  const [numero, setNumero] = useState('');
  const [validade, setValidade] = useState('');
  const [cvc, setCvc] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novoCartao = {
      cliente: user.user.id,
      numero: numero,
      validade: validade,
      cvc: cvc,
    };

    let response = null
    const url = 'http://localhost:8080/cartao/insert';

    try {
      response = await axios.post(url, novoCartao);
    } catch (error) {
      response = error.response;
    }
    navigate("/cartao");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Cadastro de Cartão</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="numero" style={styles.label}>
            Número:
          </label>
          <input
            type="text"
            id="numero"
            name="numero"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="validade" style={styles.label}>
            Validade:
          </label>
          <input
            type="text"
            id="validade"
            name="validade"
            value={validade}
            onChange={(e) => setValidade(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="cvc" style={styles.label}>
            CVC:
          </label>
          <input
            type="text"
            id="cvc"
            name="cvc"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>
          Salvar
        </button>
      </form>
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
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    marginBottom: '5px',
    fontSize: '16px',
    width: '100px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default CadastroCartaoScreen;
