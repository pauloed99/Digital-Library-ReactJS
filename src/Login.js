import React, { useState } from 'react';
import {Link} from 'react-router-dom';

export default function UserCreate(){

    const [input, setInput] = useState({email : '', password : ''});
    
    function inputChange(e){
        setInput({...input, [e.target.name] : e.target.value});
    }

    async function login(e){
        try {
            e.preventDefault();
            
            const fetchConfig = {
                method : 'POST',
                body : JSON.stringify(input),
                headers : new Headers({'Content-Type': 'application/json'})
            };
    
            const response = await fetch('http://localhost:8000/api/auth/login', 
            fetchConfig);

            const data = await response.json();

            console.log(data);

            sessionStorage.setItem('token', data.access_token);

        } catch (error) {
            console.log(`Erro de autenticação do usuário, erro : ${error}`);
        }
       

    }

    return (
        <>
            <h1 className="text-center text-info display-4 mt-4">
                Efetue o seu Login para acessar a digital-library !
            </h1>
            <hr className="bg-info"/>

            <div className="card container mt-4 border border-primary bg-info text-white">
                <div className="card-body">
                    <form>
                        <label htmlFor="email">Email : </label>
                        <input type="email" className="form-control" id="email" 
                        placeholder="Digite seu email" onChange={inputChange} name="email"/>

                        <label htmlFor="password" className="mt-4">Password : </label>
                        <input type="password" className="form-control" id="password" 
                        placeholder="Digite sua senha" onChange={inputChange} name="password"/>

                        <button className="btn btn-success mt-4" onClick={login}>Sign In !</button>

                        <br/>

                        <Link to="/register">
                            <button className="btn btn-primary mt-4">Sign Up !</button>
                        </Link>
                    </form>
                </div>
            </div>
        </>
    );
}