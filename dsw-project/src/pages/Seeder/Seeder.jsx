import React from 'react';
import SeederList from './SeederList';

const Seeder = () => {
    const data = [
        { id: 1, text: 'Povoar camisa ', buttonText: 'Povoar' },
        { id: 2, text: 'Povoar clientes  ', buttonText: 'Povoar' },
        { id: 3, text: 'Povoar admins    ', buttonText: 'Povoar' },
    ];

    const handleButtonClick = (id) => {
        // Lógica para lidar com o clique do botão
        console.log(`Botão ${id} clicado`);
    };

    return (
        <div>
            <h1>Seeder</h1>
            <SeederList data={data} handleButtonClick={handleButtonClick} />
        </div>
    );
};

export default Seeder;
