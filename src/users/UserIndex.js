import React, { useState, useEffect } from 'react';
import Pagination from '../bootstrap/components/Pagination';


export default function UserIndex(){

    const [state, setState] = useState({users : null, isLoaded : false});

    useEffect(()=>{
        async function show(){
            try {
                const token = sessionStorage.getItem('token');
                
                const fetchOptions = {
                    method : 'GET',
                    headers : new Headers({'Authorization' : `bearer ${token}`})
                };

                const response = await fetch(`http://localhost:8000/api/users`, fetchOptions);

                const data = await response.json();

                console.log(data);

                setState({users : data.users , isLoaded : true});

            } catch (error) {
                console.log(error);
            }
        }
        show();
    }, []);

    async function nextPage(e){
        try {
            e.preventDefault();
            const token = sessionStorage.getItem('token');
                
            const fetchOptions = {
                method : 'GET',
                headers : new Headers({'Authorization' : `bearer ${token}`})
            };

            const response = await fetch(state.users.next_page_url, fetchOptions);

            const data = await response.json();

            console.log(data);

            setState({users : data.users , isLoaded : true});

            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    async function prevPage(e){
        try {
            e.preventDefault();
            const token = sessionStorage.getItem('token');
                
            const fetchOptions = {
                method : 'GET',
                headers : new Headers({'Authorization' : `bearer ${token}`})
            };

            const response = await fetch(state.users.prev_page_url, fetchOptions);

            const data = await response.json();

            setState({users : data.users , isLoaded : true});

            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    
    if(state.isLoaded === true)
        return (
            <>
                <h1 className="text-center text-info display-3">Usuários da digital-library !</h1>
                <hr className="bg-info"/>

                {
                    state.users.data.map((user) => (
                        <div key ={user.email} 
                        className="card container mt-4 border border-primary bg-info text-white">
                            <div className="card-body">
                                <p>Firstname : {user.firstname}</p>
                                <p>Lastname : {user.lastname}</p>
                                <p>Email : {user.email}</p>
                                <p>CPF : {user.cpf}</p>
                                <p>Created_at : {user.created_at}</p>
                                <p>Update_at : {user.update_at}</p>
                            </div>
                        </div>
                    ))
                }

                <Pagination prevPage={prevPage} nextPage={nextPage} />
            </>

        );
    return null;    
}