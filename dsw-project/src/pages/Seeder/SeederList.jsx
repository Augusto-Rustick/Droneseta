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
            } catch (error) {
                console.error(error);
            }
        };

        var jaFoiUma = false

        tipo.forEach((tipoItem) => {
            tamanho.forEach((tamanhoItem) => {
                cor.forEach((corItem) => {
                    const codigo = `${tamanhoItem}${tipoItem}${corItem}`;

                    const lowercaseString = corItem.toLowerCase();
                    const primeiraLetraMaiuscula = lowercaseString.charAt(0).toUpperCase() + lowercaseString.slice(1);

                    const nomeCamisa = 'Camiseta ' + corItem.toLowerCase() + ' ' + (tipoItem == 'F' ? 'feminina' : 'masculina')
                    const descricao = nomeCamisa + ': estilo e conforto em uma única peça. Tecido de alta qualidade,' +
                        ' design elegante e versátil. Perfeita para qualquer ocasião, do casual ao formal. ' +
                        'Ajuste impecável e durabilidade excepcional.'


                    const data = {
                        nome: `Camisa ${primeiraLetraMaiuscula}`,
                        tamanho: tamanhoItem,
                        preco: preco,
                        codigo: codigo,
                        tipo: tipoItem,
                        descricao
                    };

                    quantidade++;
                    insertProduto(data);
                    if (!jaFoiUma) {
                        console.log(data)
                        jaFoiUma = true;
                    }
                });
            });
        });
    };

    const createPessoa = async (nome, isAdmin, url) => {
        const usuario = `${nome.toLowerCase()}`;
        const senha = '123123';
        const is_admin = isAdmin;
        const endereco = 'Endereço de moradia';
        const enderecoEntrega = 'Endereço de entrega';
        const email = `${usuario}@example.com`;
        const cpf = Math.floor(Math.random() * 90000000000) + 10000000000;

        const data = {
            usuario,
            senha,
            is_admin,
            endereco,
            email,
            enderecoEntrega,
            cpf
        };

        try {
            const response = await axios.post(url, data);
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
        } catch (error) {
            console.error('Erro ao criar clientes:', error);
        }
    };

    const handleClickButton3 = async () => {
        const nomeAdmin = 'admin';
        const url = 'http://localhost:8080/administrador/insert';
        await createPessoa(nomeAdmin, true, url);
    };

    const handleClickButton4 = async () => {
        try {
            const userId = 1;
            const productIds = [16, 17, 18, 20, 21, 22];

            const ordersPromises = productIds.map(productId =>
                axios.post('http://localhost:8080/pedido/insert', {
                    cliente: userId,
                    produto: productId,
                    quantidade: (Math.floor(Math.random() * 10) + 1),
                    situacao: 1,
                })
            );

            await Promise.all(ordersPromises);
        } catch (error) {
            console.error('Erro ao criar pedidos:', error);
        }
    };

    const handleClickButton5 = async () => {
        const userId = 1;
        var numero = '12345'
        var cvc = '12'
        var validade = '12/2'
        const url = 'http://localhost:8080/cartao/insert';

        try {
            for (let i = 0; i < 5; i++) {
                const data = {
                    numero: (numero + i),
                    cvc: (cvc + i),
                    validade: (validade + i),
                    cliente: userId
                }
                const response = await axios.post(url, data);
            }
        } catch (error) {
            console.error('Erro ao criar cartões:', error);
        }
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
                        {item.id === 4 && (
                            <button onClick={handleClickButton4}>{item.buttonText}</button>
                        )}
                        {item.id === 5 && (
                            <button onClick={handleClickButton5}>{item.buttonText}</button>
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
