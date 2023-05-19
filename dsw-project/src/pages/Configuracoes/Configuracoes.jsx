import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SettingsScreen = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user_logged'));
    setUser(userData);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      user: {
        ...prevUser.user,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      id: user.user.id,
      senha: e.target.elements.senha.value,
      endereco: e.target.elements.endereco.value,
      email: e.target.elements.email.value,
      is_admin: false,
      enderecoEntrega: e.target.elements.enderecoEntrega.value,
      cpf: e.target.elements.cpf.value,
    };

    let response = null
    const url = 'http://localhost:8080/cliente/update';

    try {
      response = await axios.put(url, data);
    } catch (error) {
      response = error.response;
    } finally {
      const updatedUser = { ...user };
      updatedUser.user.senha = data.senha;
      updatedUser.user.endereco = data.endereco;
      updatedUser.user.email = data.email;
      localStorage.setItem('user_logged', JSON.stringify(updatedUser));
      alert('Registro alterado com sucesso')
    }

  };

  if (!user) {
    return <p>Carregando...</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Configurações</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="usuario" style={styles.label}>Usuário:</label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            value={user.user.usuario || ''}
            onChange={handleChange}
            disabled // Desabilita o campo de usuário
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="senha" style={styles.label}>Senha:</label>
          <input
            type="text"
            id="senha"
            name="senha"
            value={user.user.senha || ''}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="cpf" style={styles.label}>CPF:</label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            value={user.user.cpf || ''}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="endereco" style={styles.label}>Endereço:</label>
          <input
            type="text"
            id="endereco"
            name="endereco"
            value={user.user.endereco || ''}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="enderecoEntrega" style={styles.label}>Endereço de entrega:</label>
          <input
            type="text"
            id="enderecoEntrega"
            name="enderecoEntrega"
            value={user.user.enderecoEntrega || ''}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.user.email || ''}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Salvar</button>
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
    width: '100px'
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


export default SettingsScreen;
