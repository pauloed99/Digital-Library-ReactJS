import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

export default function UserPasswordReset(){
    const [state, setState] = useState({password : '', password2 : '', password3 : '', isLoaded : false});

    const {email} = useParams();

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

                const response = await fetch(`http://localhost:8000/api/users/${email}`,
                fetchOptions);

                const data = await response.json();

                setState({isLoaded : true});

            } catch (error) {
                console.log(error);
            }
        }
        show();
    }, [email]);

    async function updatePassword(e){
        try {
            e.preventDefault();

            const token = sessionStorage.getItem('token');
            
            const fetchOptions = {
                method : 'PUT',
                body : JSON.stringify(state),
                headers : new Headers({'Authorization' : `bearer ${token}`,
                'Content-Type': 'application/json'})
            };

            const response = await fetch(`http://localhost:8000/api/users/${email}/password`,
            fetchOptions);

            const data = await response.json();

            console.log(data);

        } catch (error) {
            console.log(error);
        }
    }

    if(state.isLoaded)
        return(
            <>
                <h1 className="text-center text-info display-3">Redefina a sua senha !</h1>
                <hr className="bg-info"/>

                <div className="card container mt-4 border border-primary bg-info text-white">
                    <div className="card-body">
                        <form>
                            <label htmlFor="password" className="mt-4">Antiga Senha : </label>
                            <input type="password" className="form-control" id="password" 
                            placeholder="Digite sua senha" onChange={inputChange} name="password"/>

                            <label htmlFor="password2" className="mt-4">Nova Senha : </label>
                            <input type="password" className="form-control" id="password2" 
                            placeholder="Digite sua senha" onChange={inputChange} name="password2"/>

                            <label htmlFor="password3" className="mt-4">Senha de confirmação : </label>
                            <input type="password" className="form-control" id="password3" 
                            placeholder="Digite sua senha novamente" onChange={inputChange} name="password3"/>

                            <button onClick={updatePassword} className="btn btn-success mt-4">Reset Password !</button>
                        </form>
                    </div>
                </div>
            </>
        );
    return null;    
}