import React from 'react';
import axios from 'axios';

const SeederList = ({ data }) => {
    const handleClickButton1 = async () => {
        const tamanho = ['PP', '_P', '_M', '_G', 'GG'];
        const cor = ['BRANCA', 'VERMELHA', 'AZUL', 'VERDE'];
        const preco = 49.98;
        const tipo = ['M', 'F'];

        const url = 'http://localhost:8080/produto/insert';

        let quantidade = 0;

        const insertProduto = async (data) => {
            try {
                const response = await axios.post(url, data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        tipo.forEach((tipoItem) => {
            tamanho.forEach((tamanhoItem) => {
                cor.forEach((corItem) => {
                    const codigo = `${tamanhoItem}${tipoItem}${corItem}`;

                    const lowercaseString = corItem.toLowerCase();
                    const primeiraLetraMaiuscula = lowercaseString.charAt(0).toUpperCase() + lowercaseString.slice(1);

                    const data = {
                        nome: `Camisa ${primeiraLetraMaiuscula}`,
                        tamanho: tamanhoItem,
                        preco: preco,
                        codigo: codigo,
                    };

                    quantidade++;
                    insertProduto(data);
                });
            });
        });

        console.log(quantidade);
    };

    const createPessoa = async (nome, isAdmin, url) => {
        const usuario = `${nome.toLowerCase()}`;
        const senha = isAdmin ? usuario : '123123';
        const is_admin = isAdmin;
        const endereco = 'Endereço de exemplo';
        const email = `${usuario}@example.com`;

        const data = {
            usuario,
            senha,
            is_admin,
            endereco,
            email,
        };

        try {
            const response = await axios.post(url, data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleClickButton2 = async () => {
        const nomes = ['Augusto', 'Maria', 'Pedro', 'Ana', 'Carlos'];
        const url = 'http://localhost:8080/cliente/insert';
        try {
            for (let i = 0; i < nomes.length; i++) {
                const nome = nomes[i];
                await createPessoa(nome, false, url);
            }
            console.log('Criação de clientes concluída.');
        } catch (error) {
            console.error('Erro ao criar clientes:', error);
        }
    };

    const handleClickButton3 = async () => {
        const nomeAdmin = 'Admin';
        const url = 'http://localhost:8080/administrador/insert';
        await createPessoa(nomeAdmin, true, url);
        console.log('Criação de admin concluída.');
    };

    const remove = () => {
        const url1 = 'http://localhost:8080/produto/delete/';
        const removeProdutos = async () => {
            try {
                const requests = [];
                for (let i = 1; i <= 80; i++) {
                    requests.push(axios.delete(url1 + i));
                }
                await Promise.all(requests);
                console.log('Exclusão de produtos concluída.');
            } catch (error) {
                console.error('Erro ao excluir produtos:', error);
            }
        };
        removeProdutos();
        return;
    }

    return (
        <div style={styles.container}>
            {data.map(item => (
                <div key={item.id} style={styles.buttonContainer}>
                    <span style={styles.text}>{item.text}</span>
                    <div style={styles.button}>
                        {item.id === 1 && (
                            <button onClick={handleClickButton1}>{item.buttonText}</button>
                        )}
                        {item.id === 2 && (
                            <button onClick={handleClickButton2}>{item.buttonText}</button>
                        )}
                        {item.id === 3 && (
                            <button onClick={handleClickButton3}>{item.buttonText}</button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

const styles = {
    container: {
        margin: '20px 0',
    },
    buttonContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '10px',
    },
    text: {
        marginRight: '10px',
    },
    button: {
        backgroundColor: '#ccc',
        padding: '10px',
        borderRadius: '5px',
    },
};

export default SeederList;
