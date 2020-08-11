import React, { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';

export default function BookShow(){

    const [state, setState] = useState({book : null, isLoaded : false});

    const {id} = useParams();

    useEffect(()=>{
        async function book(){
            try {
                const token = sessionStorage.getItem('token');
                
                const fetchOptions = {
                    method : 'GET',
                    headers : new Headers({'Authorization' : `bearer ${token}`})
                };

                const response = await fetch(`http://localhost:8000/api/books/${id}`, fetchOptions);

                const data = await response.json();
                
                setState({isLoaded : true, book : data.book});
 
            } catch (error) {
                console.log(error);
            }
        }

        book();
    }, [id]);

    async function erase(e){
        try {
            e.preventDefault();

            const token = sessionStorage.getItem('token');
                
            const fetchOptions = {
                method : 'DELETE',
                headers : new Headers({'Authorization' : `bearer ${token}`})
            };

            const response = await fetch(`http://localhost:8000/api/books/${id}`, fetchOptions);

            const data = await response.json();

            console.log(data);

        } catch (error) {
            console.log(error);
        }
    }

    if(state.isLoaded)
        return (
            <>
                <h1 className="text-center text-info display-3">Livros da digital-library !</h1>
                <hr className="bg-info"/>

                <div className="card container mt-4 mb-4 border border-primary bg-info text-white">
                    <div className="card-body">
                        <img src={state.book.image} height="300" alt={`Livro de id ${state.book.id}`}/>
                        <hr className="bg-secondary"/>
                        <p className="mt-4">Id : {state.book.name}</p>
                        <hr className="bg-secondary"/>
                        <p>Autor : {state.book.author}</p>
                        <hr className="bg-secondary"/>
                        <p>Preço : R$ {state.book.price}</p>
                        <hr className="bg-secondary"/>
                        <p className="text-justify">Descrição : {state.book.description}</p>
                        <hr className="bg-secondary"/>
                        <p>Ano : {state.book.price}</p>
                        <hr className="bg-secondary"/>
                        <p>Linguagem : {state.book.language}</p>
                        <hr className="bg-secondary"/>
                        <p>Páginas : {state.book.pages}</p>
                        <hr className="bg-secondary"/>

                        <Link to={`/books/${state.book.id}/edit`}>
                            <button className="btn btn-success">Edit book !</button>
                        </Link>

                        <br/>

                        <button className="btn btn-danger mt-4" onClick={erase}>Deletar livro!</button>

                        <br/>

                        <Link to={`/books/${state.book.id}/image/edit`}>
                            <button className="btn btn-primary mt-4">Atualizar Imagem do livro !</button>
                        </Link>
                    </div>
                </div>
            </>
        );

    return null;      

}