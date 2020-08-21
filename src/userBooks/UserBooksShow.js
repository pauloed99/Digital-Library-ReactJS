import React, { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';

export default function UserBooksIndex(){

    const [state, setState] = useState({user : null, isLoaded : false});

    const {id} = useParams();

    useEffect(()=>{
        async function userBook(){
            try {
                const token = sessionStorage.getItem('token');
                
                const fetchOptions = {
                    method : 'GET',
                    headers : new Headers({'Authorization' : `bearer ${token}`})
                };

                const response = await fetch(`http://localhost:8000/api/userBooks${id}`, fetchOptions);

                const data = await response.json();
                
                setState({isLoaded : true, userBook : data.userBook});
 
            } catch (error) {
                console.log(error);
            }
        }

        userBook();
    }, [id]);

    if(state.isLoaded)
        return (
            <>
                <h1 className="text-center text-info display-3">Dados do livro comprado por um usuário !</h1>
                <hr className="bg-info"/>

                {
                    state.userBook.books.map((book) => (
                        <div key ={book.id} 
                        className="card container mt-4 border border-primary bg-info text-white">
                            <div className="card-body"> 
                                <hr className="bg-secondary"/>
                                <p className="mt-4">Id : {book.name}</p>
                                <hr className="bg-secondary"/>
                                <p>Autor : {book.author}</p>
                                <hr className="bg-secondary"/>
                                <p>Preço : R$ {book.price}</p>
                                <hr className="bg-secondary"/>                         
                            </div>
                        </div>
                    ))
                }

            </>
        );

    return null;      

}