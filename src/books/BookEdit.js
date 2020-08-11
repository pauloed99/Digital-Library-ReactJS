import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import {useParams} from 'react-router-dom';

export default function BookEdit(){

    const [state, setState] = useState({name : '', description : '', year : '',
    language : '', author : '', pages : '', price : '', isLoaded : false});
    
    function inputChange(e){
        setState({...state, [e.target.name] : e.target.value});
    }

    const {id} = useParams();

    useEffect(()=>{
        async function authorization(){
            try {
                const token = sessionStorage.getItem('token');

                const email = jwt_decode(token).sub;
                
                const fetchOptions = {
                    method : 'GET',
                    headers : new Headers({'Authorization' : `bearer ${token}`})
                };

                const response = await fetch(`http://localhost:8000/api/users/${email}`, fetchOptions);

                const data = await response.json();

                console.log(data);
                if(data.user.is_admin)
                    setState({isLoaded : true});
                else    
                    setState({isLoaded : false});

            } catch (error) {
                console.log(error);
            }
        }

        authorization();
    }, []);

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

                console.log(data);

                const {name, description, year, author, language, pages, price} = data.book;
                
                setState({isLoaded : true, name, description, year, author, language, pages, price});

            } catch (error) {
                console.log(error);
            }
        }

        book();
    }, [id]);

    async function edit(e){
        try {
            e.preventDefault();

            const token = sessionStorage.getItem('token');

            const fetchOptions = {
                method : 'PUT',

                body : JSON.stringify({name : state.name, description : state.description,
                year : state.year, author : state.author, language : state.language,
                pages : state.pages, price : state.price}),

                headers : new Headers({'Authorization' : `bearer ${token}`, 'Content-Type': 'application/json'})
            };
    
            const response = await fetch(`http://localhost:8000/api/books/${id}`, 
            fetchOptions);

            const data = await response.json();

            console.log(data);

            
        } catch (error) {
            console.log(`Erro ao atualizar o livro, erro : ${error}`);
        }
    }

    if(state.isLoaded)
        return (
            <>
                <h1 className="text-center text-info display-3">Atualiza um livro da digital-library !</h1>
                <hr className="bg-info"/>

                <div className="card container mt-4 mb-4 border border-primary bg-info text-white">
                    <div className="card-body">
                        <form>
                            <label htmlFor="name">Nome : </label>
                            <input className="form-control" id="name" defaultValue={state.name}
                            placeholder="Digite o nome do livro" onChange={inputChange} name="name"/>

                            <label htmlFor="description" className="mt-4">Descrição : </label>
                            <textarea type="text" className="form-control" id="description"
                            placeholder="Digite a descrição do livro" onChange={inputChange} 
                            name="description" defaultValue={state.description}/>

                            <label htmlFor="year" className="mt-4">Ano : </label>
                            <input type="number" className="form-control" id="year" 
                            placeholder="Digite o ano do livro" onChange={inputChange} name="year"
                            defaultValue={state.year}/>

                            <label htmlFor="language" className="mt-4">Linguagem : </label>
                            <input type="text" className="form-control" id="language" 
                            placeholder="Digite a linguagem do livro" onChange={inputChange} name="language"
                            defaultValue={state.language}/>

                            <label htmlFor="author" className="mt-4">Autor : </label>
                            <input type="text" className="form-control" id="author" defaultValue={state.author}
                            placeholder="Digite o autor do livro" onChange={inputChange} name="author"/>

                            <label htmlFor="pages" className="mt-4">Páginas : </label>
                            <input type="number" className="form-control" id="pages" defaultValue={state.pages}
                            placeholder="Digite o número de páginas do livro" onChange={inputChange} name="pages"/>

                            <label htmlFor="price" className="mt-4">Preço : </label>
                            <input type="text" className="form-control" id="price" defaultValue={state.price}
                            placeholder="Digite o preço do livro" onChange={inputChange} name="price"/>


                            <button onClick={edit} className="btn btn-success mt-4">Update Book !</button>
                        </form>
                    </div>
                </div>
            </>
        );

    return null;        
}