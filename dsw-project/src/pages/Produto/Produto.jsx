import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductScreen = () => {
    const [camisas, setCamisas] = useState([]);
    const [camisaOriginal, setCamisaOriginal] = useState(null);
    const user = localStorage.getItem('user_logged');

    useEffect(() => {
        axios
            .get('http://localhost:8080/produto/list')
            .then(response => {
                const data = response.data;
                setCamisaOriginal(data);

                // Verificar se há códigos duplicados
                const uniqueCamisas = [];
                const seenCodes = new Set();

                for (const camisa of data) {
                    camisa.codigo = camisa.codigo.substring(2); // Ignorar os dois primeiros caracteres

                    if (!seenCodes.has(camisa.codigo)) {
                        seenCodes.add(camisa.codigo);
                        uniqueCamisas.push({ ...camisa, tamanhoSelecionado: null, quantidade: 0 });
                    }
                }

                setCamisas(uniqueCamisas);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const tamanhos = ['PP', 'P', 'M', 'G', 'GG'];

    const handleTamanhoChange = (event, camisaId) => {
        const tamanhoSelecionado = event.target.value;

        setCamisas(prevCamisas => {
            return prevCamisas.map(camisa => {
                if (camisa.id === camisaId) {
                    return { ...camisa, tamanhoSelecionado };
                }
                return camisa;
            });
        });
    };

    const handleQuantidadeChange = (event, camisaId) => {
        const quantidade = parseInt(event.target.value) || 0;

        setCamisas(prevCamisas => {
            return prevCamisas.map(camisa => {
                if (camisa.id === camisaId) {
                    return { ...camisa, quantidade };
                }
                return camisa;
            });
        });
    };

    const handleButtonClick = (tamanho, codigo, quantidade) => {
        if (!tamanho) {
            alert('Informe um tamanho para adicionar o produto ao carrinho');
            return;
        }

        quantidade = Math.floor(quantidade)
        if(quantidade < 1){
            alert('Informe uma quantidade de camisas para comprar.');
            return;
        }

        tamanho = tamanho.length === 1 ? `_${tamanho}` : tamanho;
        const camisaEncontrada = camisaOriginal.find(
            camisa => camisa.tamanho === tamanho && camisa.codigo === codigo
        );
        if (!camisaEncontrada) {
            alert('Camisa não encontrada');
        }

        alert(
            'A ' +
            camisaEncontrada.nome +
            (camisaEncontrada.tipo == 'F' ? ' Feminina ' : ' Masculina ') +
            'foi adicionada ao carrinho com quantidade: ' +
            quantidade
        );
    };


    return (
        <div style={styles.container}>
            <div style={styles.grid}>
                {camisas.map(camisa => (
                    <div key={camisa.id} style={styles.camisaContainer}>
                        <img
                            src={process.env.PUBLIC_URL + `/images/camisas/` + camisa.codigo + '.jpeg'}
                            alt="Foto da camisa"
                            style={styles.foto}
                        />
                        <div style={styles.infoContainer}>
                            <p style={styles.nome}>{camisa.nome + ((camisa.codigo.startsWith("F")) ? " Feminina" : " Masculina")}</p>
                            <p style={styles.modelo}>Modelo: {camisa.modelo}</p>
                            <p style={styles.preco}>Preço: R$ {camisa.preco}</p>
                            {user && (
                                <>
                                    <hr style={styles.separator} />
                                    <div style={styles.tamanhoContainer}>
                                        {tamanhos.map(tamanho => (
                                            <label key={tamanho} style={styles.tamanhoLabel}>
                                                <input
                                                    type="radio"
                                                    value={tamanho}
                                                    checked={tamanho === camisa.tamanhoSelecionado}
                                                    onChange={event => handleTamanhoChange(event, camisa.id)}
                                                    style={styles.tamanhoInput}
                                                />
                                                {tamanho}
                                            </label>
                                        ))}
                                    </div>
                                    <hr style={styles.separator} />
                                    <div style={styles.quantidadeContainer}>
                                        <label style={styles.quantidadeLabel}>
                                            Quantidade:
                                            <input
                                                type="text"
                                                min="0"
                                                value={camisa.quantidade}
                                                onChange={event => handleQuantidadeChange(event, camisa.id)}
                                                style={styles.quantidadeInput}
                                            />
                                        </label>
                                    </div>
                                    <hr style={styles.separator} />
                                    <button
                                        style={styles.buyButton}
                                        onClick={() => handleButtonClick(camisa.tamanhoSelecionado, camisa.codigo, camisa.quantidade)}
                                    >
                                        Adicionar ao Carrinho
                                    </button>
                                </>
                            )}
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
    tamanhoLabel: {
        margin: '0px 5px'
    },
    quantidadeInput:{
        marginLeft: '10px',
        width: '40px',
    },
};

export default ProductScreen;
