import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

import Error from './Error';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios'; 

const Btn = styled.button`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #fff;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #326ac0;
        cursor: pointer;
    }
`;

const Formulario = ({ setMoneda, setCriptomoneda }) => {

    // State de criptomonedas
    const [listacripto, setCripto] = useState([]);
    const [error, setError] = useState(false);


    // Monedas
    const MONEDAS = [
        { codigo: 'USD', nombre: 'Dolar Estadounidense'},
        { codigo: 'MXN', nombre: 'Peso Mexicano'},
        { codigo: 'EUR', nombre: 'Euro'},
        { codigo: 'GBP', nombre: 'Libra Esterlina'}
    ];

    // Utilizar useMoneda
    const [ moneda, SelectMonedas ] = useMoneda('Elige tu moneda', '', MONEDAS);

    // Utilizar useCriptomoneda
    const [ criptomoneda, SelectCripto] = useCriptomoneda('Elige tu criptomoneda', '', listacripto);

    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await axios.get(url);

            setCripto(resultado.data.Data);
        }
        consultarAPI();
    }, []);

    const cotizarMoneda = e => {
        e.preventDefault();

        if(moneda === '' || criptomoneda === '') {    // Validacion
            setError(true);
            return;
        }

        setError(false);    // pasar datos al main comp
        setMoneda(moneda);
        setCriptomoneda(criptomoneda);
    }

    return ( 
        <form
            onSubmit={cotizarMoneda}
        >
            { error ? <Error mensaje="Todos los campos son obligatorios"/> : null  }
            <SelectMonedas />

            <SelectCripto />
            <Btn
                type="submit"
                value="Calcular"
            >Calcular</Btn>
        </form>
    );
}

export default Formulario;