import React, { useState } from 'react';

export default function UserCreate(){

    const [input, setInput] = useState({firstname : '', lastname : '', cpf : '',
    email : '', password : '', password2 : ''});
    
    function inputChange(e){
        setInput({...input, [e.target.name] : e.target.value});
    }

    async function register(e){
        try {
            e.preventDefault();

            const fetchConfig = {
                method : 'POST',
                body : JSON.stringify(input),
                headers : new Headers({'Content-Type': 'application/json'})
            };
    
            const response = await fetch('http://localhost:8000/api/users', 
            fetchConfig);

            const data = await response.json();

            console.log(data);

        } catch (error) {
            console.log(`Erro de autenticação do usuário, erro : ${error}`);
        }
       

    }

    return (
        <>
            <h1 className="text-center text-info display-3">Registre sua Conta na digital-library !</h1>
            <hr className="bg-info"/>

            <div className="card container mt-4 border border-primary bg-info text-white">
                <div className="card-body">
                    <form>
                        <label htmlFor="firstname">Nome : </label>
                        <input type="text" className="form-control" id="firstname" 
                        placeholder="Digite seu nome" onChange={inputChange} name="firstname"/>

                        <label htmlFor="lastname" className="mt-4">Sobrenome : </label>
                        <input type="text" className="form-control" id="lastname" 
                        placeholder="Digite seu sobrenome" onChange={inputChange} name="lastname"/>

                        <label htmlFor="email" className="mt-4">Email : </label>
                        <input type="email" className="form-control" id="email" 
                        placeholder="Digite seu email" onChange={inputChange} name="email"/>

                        <label htmlFor="cpf" className="mt-4">CPF : </label>
                        <input type="text" className="form-control" id="cpf" 
                        placeholder="Digite seu cpf" onChange={inputChange} name="cpf"/>

                        <label htmlFor="password" className="mt-4">Senha : </label>
                        <input type="password" className="form-control" id="password" 
                        placeholder="Digite sua senha" onChange={inputChange} name="password"/>

                        <label htmlFor="password2" className="mt-4">Senha de confirmação : </label>
                        <input type="password" className="form-control" id="password2" 
                        placeholder="Digite sua senha novamente" onChange={inputChange} name="password2"/>

                        <button onClick={register} className="btn btn-success mt-4">Sign Up !</button>
                    </form>
                </div>
            </div>
        </>
    );
}