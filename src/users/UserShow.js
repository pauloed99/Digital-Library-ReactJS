import React, { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';

export default function UserShow(){

    const [state, setState] = useState({user : null, isLoaded : false});

    const {email} = useParams();
    
    useEffect(()=>{
        async function show(){
            try {
                const token = sessionStorage.getItem('token');
                
                const fetchOptions = {
                    method : 'GET',
                    headers : new Headers({'Authorization' : `bearer ${token}`})
                };

                const response = await fetch(`http://localhost:8000/api/users/${email}`, fetchOptions);

                const data = await response.json();

                setState({user : data.user , isLoaded : true});

            } catch (error) {
                console.log(error);
            }
        }
        show();
    }, [email]);

    async function erase(e){
        try {
            e.preventDefault();

            const token = sessionStorage.getItem('token');
                
            const fetchOptions = {
                method : 'DELETE',
                headers : new Headers({'Authorization' : `bearer ${token}`})
            };

            const response = await fetch(`http://localhost:8000/api/users/${email}`, fetchOptions);

            const data = await response.json();

            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    if(state.isLoaded)
        return (
            <>
                <h1 className="text-center text-info display-3">Veja seus dados pessoais na digital-library !</h1>
                <hr className="bg-info"/>

                <div className="card container mt-4 border border-primary bg-info text-white">
                    <div className="card-body">
                        <form>
                            <label htmlFor="firstname">Nome : </label>
                            <input type="text" className="form-control" id="firstname" 
                            placeholder="Digite seu nome" readOnly value={state.user.firstname}/>

                            <label htmlFor="lastname" className="mt-4">Sobrenome : </label>
                            <input type="text" className="form-control" id="lastname" 
                            placeholder="Digite seu sobrenome" readOnly value={state.user.lastname}/>

                            <label htmlFor="email" className="mt-4">Email : </label>
                            <input type="email" className="form-control" id="email" 
                            placeholder="Digite seu email" readOnly value={state.user.email}/>

                            <label htmlFor="cpf" className="mt-4">CPF : </label>
                            <input type="text" className="form-control" id="cpf" 
                            placeholder="Digite seu cpf" readOnly value={state.user.cpf}/>

                            <Link to={`/users/${email}/edit`}>
                                <button className="btn btn-success mt-4">Edit User !</button>
                            </Link>

                            <br />

                            <Link to={`/users/${email}/password/edit`}>
                                <button className="btn btn-primary mt-4">Edit Password !</button>
                            </Link>

                            <br />

                            <button onClick={erase} className="btn btn-danger mt-4">Delete User !</button>
                            
                        </form>
                    </div>
                </div>
            </>

        );

    return null;    
}