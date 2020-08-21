import React, { useState, useEffect } from 'react';
import Pagination from '../bootstrap/components/Pagination';
import {Link} from 'react-router-dom';

export default function UserBooksIndex(){

    const [state, setState] = useState({authUser : null, isLoaded : false, users : null});

    useEffect(()=>{
        async function userBooks(){
            try {
                const token = sessionStorage.getItem('token');

                const fetchOptions = {
                    method : 'POST',
                    headers : new Headers({'Authorization' : `bearer ${token}`})
                };
                
                const fetchOptions2 = {
                    method : 'GET',
                    headers : new Headers({'Authorization' : `bearer ${token}`})
                };
                
                const response = await fetch('http://localhost:8000/api/auth/me', fetchOptions)

                const response2 = await fetch('http://localhost:8000/api/userBooks', fetchOptions2);

                const user = await response.json();

                const data = await response2.json();

                console.log(data.users);
                
                setState({isLoaded : true, user : data.userBooks, authUser : user});
 
            } catch (error) {
                console.log(error);
            }
        }

        userBooks();
    }, []);

    async function prevPage(e){
        try {
            e.preventDefault();

            const token = sessionStorage.getItem('token');

            const fetchOptions = {
                method : 'GET',
                headers : new Headers({'Authorization' : `bearer ${token}`})
            };
    
            const response = await fetch(state.user.next_page_url, 
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
    
            const response = await fetch(state.user.next_page_url, fetchOptions);

            const data = await response.json();

            console.log(data);

            
        } catch (error) {
            console.log(`Erro ao mostrar os livros, erro : ${error}`);
        }
    }

    if(state.isLoaded && !state.authUser.is_admin)
        return (
            <>  
                <h1 className="text-center text-info display-3">Veja os dados do livro que você adicionou ao seu carrinho ! !</h1>
                <hr className="bg-info"/>


                {
                    state.user.data.books.map((book) => (
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

            </>
        );

    if(state.isLoaded && state.authUser.is_admin)
        return (
            <>  
                <h1 className="text-center text-info display-3">Veja os livros que os clientes compraram ! !</h1>
                <hr className="bg-info"/>


                {
                    state.user.data.books.map((book) => (
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
                                <Link to={`/userBooks/${book.id}/show`}>
                                    <button className="btn btn-primary">Saiba mais !</button>
                                </Link>
                            </div>
                        </div>
                    ))
                }

                <Pagination prevPage={prevPage} nextPage={nextPage} />

            </>
        )

    return null;      

}