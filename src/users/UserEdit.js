import React, { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';

export default function UserIndex(){

    const [state, setState] = useState(
        {firstname : '', lastname : '', email : '', cpf : '', isLoaded : false}
    );

    const userEmail = useParams().email;
 
    function inputChange(e){
        setState({...state, [e.target.name] : e.target.value});
    }

    useEffect(()=>{
        async function show(){
            try {
                const token = sessionStorage.getItem('token');
                
                const fetchOptions = {
                    method : 'GET',
                    headers : new Headers({'Authorization' : `bearer ${token}`})
                };

                const response = await fetch(`http://localhost:8000/api/users/${userEmail}`, fetchOptions);

                const data = await response.json();

                const {firstname, lastname, email, cpf} = data.user;

                setState({firstname , lastname, email, cpf, isLoaded : true});

            } catch (error) {
                console.log(error);
            }
        }
        show();
    }, [userEmail]);

    async function edit(e){
        try {
            e.preventDefault();

            const token = sessionStorage.getItem('token');

            console.log(state);
                
            const fetchOptions = {
                method : 'PUT',
                body : JSON.stringify(state),
                headers : new Headers({'Authorization' : `bearer ${token}`, 'Content-Type': 'application/json'})
            };

            const response = await fetch(`http://localhost:8000/api/users/${userEmail}`, fetchOptions);

            const data = await response.json();

            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    if(state.isLoaded === true)
        return (
            <>
                <h1 className="text-center text-info display-3">Registre sua Conta na digital-library !</h1>
                <hr className="bg-info"/>

                <div className="card container mt-4 border border-primary bg-info text-white">
                    <div className="card-body">
                        <form>
                            <label htmlFor="firstname">Nome : </label>
                            <input type="text" className="form-control" id="firstname" 
                            placeholder="Digite seu nome" onChange={inputChange} name="firstname"
                            defaultValue={state.firstname}/>

                            <label htmlFor="lastname" className="mt-4">Sobrenome : </label>
                            <input type="text" className="form-control" id="lastname" 
                            placeholder="Digite seu sobrenome" onChange={inputChange} name="lastname"
                            defaultValue={state.lastname}/>

                            <label htmlFor="cpf" className="mt-4">CPF : </label>
                            <input type="text" className="form-control" id="cpf" 
                            readOnly value={state.cpf}/>

                            <label htmlFor="email" className="mt-4">Email : </label>
                            <input type="email" className="form-control" id="email" 
                            readOnly value={state.email}/>

                            <button onClick={edit} className="btn btn-success mt-4">Edit User !</button>
                        </form>
                    </div>
                </div>
            </>
    );

    return null;    
}