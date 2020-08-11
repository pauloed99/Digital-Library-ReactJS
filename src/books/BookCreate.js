import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

export default function BookCreate(){

    const [state, setState] = useState({name : '', description : '', year : '',
    language : '', author : '', pages : '', price : '', isLoaded : false});
    
    function inputChange(e){
        setState({...state, [e.target.name] : e.target.value});
    }

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

    async function create(e){
        try {
            e.preventDefault();

            const token = sessionStorage.getItem('token');

            const fetchConfig = {
                method : 'POST',
                body : JSON.stringify(state),
                headers : new Headers({'Content-Type': 'application/json',
                'Authorization' : `bearer ${token}`})
            };
    
            const response = await fetch('http://localhost:8000/api/books', 
            fetchConfig);

            const data = await response.json();

            console.log(data);

        } catch (error) {
            console.log(`Erro ao adicionar o livro, erro : ${error}`);
        }
       

    }

    if(state.isLoaded)
        return (
            <>
                <h1 className="text-center text-info display-3">Adicione livros na digital-library !</h1>
                <hr className="bg-info"/>

                <div className="card container mt-4 mb-4 border border-primary bg-info text-white">
                    <div className="card-body">
                        <form>
                            <label htmlFor="name">Nome : </label>
                            <input className="form-control" id="name" 
                            placeholder="Digite o nome do livro" onChange={inputChange} name="name"/>

                            <label htmlFor="description" className="mt-4">Descrição : </label>
                            <textarea type="text" className="form-control" id="description" 
                            placeholder="Digite a descrição do livro" onChange={inputChange} name="description"/>

                            <label htmlFor="year" className="mt-4">Ano : </label>
                            <input type="number" className="form-control" id="year" 
                            placeholder="Digite o ano do livro" onChange={inputChange} name="year"/>

                            <label htmlFor="language" className="mt-4">Linguagem : </label>
                            <input type="text" className="form-control" id="language" 
                            placeholder="Digite a linguagem do livro" onChange={inputChange} name="language"/>

                            <label htmlFor="author" className="mt-4">Autor : </label>
                            <input type="text" className="form-control" id="author" 
                            placeholder="Digite o autor do livro" onChange={inputChange} name="author"/>

                            <label htmlFor="pages" className="mt-4">Páginas : </label>
                            <input type="number" className="form-control" id="pages" 
                            placeholder="Digite o número de páginas do livro" onChange={inputChange} name="pages"/>

                            <label htmlFor="price" className="mt-4">Preço : </label>
                            <input type="text" className="form-control" id="price" 
                            placeholder="Digite o preço do livro" onChange={inputChange} name="price"/>


                            <button onClick={create} className="btn btn-success mt-4">Add Book !</button>
                        </form>
                    </div>
                </div>
            </>
        );

    return null;        
}