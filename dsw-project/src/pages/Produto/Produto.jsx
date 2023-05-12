import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductScreen = () => {
    const [camisas, setCamisas] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/produto/list')
            .then(response => {
                setCamisas(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.grid}>
                {camisas.map(camisa => (
                    <div key={camisa.id} style={styles.camisaContainer}>
                        <img src={process.env.PUBLIC_URL + `/images/camisas/mbranca.jpeg`} alt="Foto da camisa" style={styles.foto} />
                        <div style={styles.infoContainer}>
                            <p style={styles.nome}>{camisa.nome}</p>
                            <p style={styles.modelo}>Modelo: {camisa.modelo}</p>
                            <p style={styles.preco}>Preço: R$ {camisa.preco}</p>
                            <hr style={styles.separator} />
                            <button style={styles.buyButton} onClick={() => alert('Botão clicado ' + camisa.codigo)}>Comprar</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        border: '1px solid #000',
        margin: '100px 10px 10px 10px',
        padding: '20px',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
    },
    camisaContainer: {
        border: '1px solid black',
        borderRadius: '8px',
        padding: '10px',
        margin: '5px',
        textAlign: 'center',
    },
    foto: {
        width: '100px',
        height: '100px',
        marginBottom: '10px',
    },
    infoContainer: {
        textAlign: 'center',
    },
    nome: {
        fontWeight: 'bold',
        marginBottom: '5px',
    },
    modelo: {
        marginBottom: '5px',
    },
    preco: {
        marginBottom: '5px',
    },
    separator: {
        margin: '10px 0',
        border: 'none',
        borderTop: '1px solid black',
    },
    buyButton: {
        backgroundColor: '#4CAF50',
        border: 'none',
        color: 'white',
        padding: '15px 32px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        margin: '4px 2px',
        cursor: 'pointer',
    },
};

export default ProductScreen;
