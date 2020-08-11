import React, { useState, useEffect } from 'react';
import Pagination from '../bootstrap/components/Pagination';
import {Link} from 'react-router-dom';

export default function BookIndex(){

    const [state, setState] = useState({books : null, isLoaded : false});

    useEffect(()=>{
        async function books(){
            try {
                const token = sessionStorage.getItem('token');
                
                const fetchOptions = {
                    method : 'GET',
                    headers : new Headers({'Authorization' : `bearer ${token}`})
                };

                const response = await fetch('http://localhost:8000/api/books', fetchOptions);

                const data = await response.json();
                
                setState({isLoaded : true, books : data.books});
 
            } catch (error) {
                console.log(error);
            }
        }

        books();
    }, []);

    async function prevPage(e){
        try {
            e.preventDefault();

            const token = sessionStorage.getItem('token');

            const fetchOptions = {
                method : 'GET',
                headers : new Headers({'Authorization' : `bearer ${token}`})
            };
    
            const response = await fetch(state.books.next_page_url, 
            fetchOptions);

            const data = await response.json();

            console.log(data);

            
        } catch (error) {
            console.log(`Erro ao mostrar os livros, erro : ${error}`);
        }
    }

    async function nextPage(e){
        try {
            e.preventDefault();

            const token = sessionStorage.getItem('token');

            const fetchOptions = {
                method : 'GET',
                headers : new Headers({'Authorization' : `bearer ${token}`})
            };
    
            const response = await fetch(state.books.next_page_url, fetchOptions);

            const data = await response.json();

            console.log(data);

            
        } catch (error) {
            console.log(`Erro ao mostrar os livros, erro : ${error}`);
        }
    }

    if(state.isLoaded)
        return (
            <>
                <h1 className="text-center text-info display-3">Livros da digital-library !</h1>
                <hr className="bg-info"/>

                <div className="card container mt-4 mb-4 border border-primary bg-info text-white">
                    <div className="card-body">
                        {
                            state.books.data.map((book) => (
                                <div key ={book.id} 
                                className="card container mt-4 border border-primary bg-info text-white">
                                    <div className="card-body">
                                        <img src={book.image} height="300" alt={`Livro de id ${book.id}`}/>
                                        <hr className="bg-secondary"/>
                                        <p className="mt-4">Id : {book.name}</p>
                                        <hr className="bg-secondary"/>
                                        <p>Autor : {book.author}</p>
                                        <hr className="bg-secondary"/>
                                        <p>Preço : R$ {book.price}</p>
                                        <hr className="bg-secondary"/>
                                        <Link to={`/books/${book.id}/show`}>
                                            <button className="btn btn-primary">Saiba mais !</button>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        }
                        <Pagination prevPage={prevPage} nextPage={nextPage} />
                    </div>
                </div>
            </>
        );

    return null;      

}