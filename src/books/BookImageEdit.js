import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useParams } from 'react-router-dom';

export default function BookImageEdit(){

    const [state, setState] = useState({isLoaded : false});

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

    async function update(e){
        try {
            e.preventDefault();

            const token = sessionStorage.getItem('token');

            const image = new FormData();

            const imageData = document.querySelector('input[type="file"]').files[0];

            image.append("image", imageData);

            console.log(image);

            const fetchConfig = {
                method : 'POST',
                body : image,
                headers : new Headers({'Authorization' : `bearer ${token}`})
            };
    
            const response = await fetch(`http://localhost:8000/api/books/${id}/image`, 
            fetchConfig);

            const data = await response.json();

            console.log(data);

        } catch (error) {
            console.log(`Erro ao atualizar a imagem do livro, erro : ${error}`);
        }
       

    }

    if(state.isLoaded)
        return (
            <>
                <h1 className="text-center text-info display-3">Atualize as imagens do livros da digital-library !</h1>
                <hr className="bg-info"/>

                <div className="card container mt-4 border border-primary bg-info text-white">
                    <div className="card-body">
                        <form encType="multipart/form-data">
                            <label htmlFor="image">Imagem : </label>
                            <input className="form-control" id="image" type="file" />

                            <button onClick={update} className="btn btn-success mt-4">Update image of Book !</button>
                        </form>
                    </div>
                </div>
            </>
        );

    return null;        
}