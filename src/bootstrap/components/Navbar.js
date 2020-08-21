import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

export default function Navbar(){

    const [state, setState] = useState({user : null, isLoaded : false});

    useEffect(()=>{
        async function user(){
            try {

                const token = sessionStorage.getItem('token');
                
                const fetchOptions = {
                    method : 'POST',
                    headers : new Headers({'Authorization' : `bearer ${token}`})
                };

                const response = await fetch('http://localhost:8000/api/auth/me', fetchOptions);

                const data = await response.json();

                console.log(data)
                
                setState({isLoaded : true, user : data});

            } catch (error) {
                console.log(error);
            }
        }

        user();
    }, []);

    async function logout(e){
        try {
            e.preventDefault();

            const token = sessionStorage.getItem('token');
                
                const fetchOptions = {
                    method : 'POST',
                    headers : new Headers({'Authorization' : `bearer ${token}`})
                };

                const response = await fetch('http://localhost:8000/api/auth/logout', fetchOptions);

                const data = await response.json();

                console.log(data);

        } catch (error) {
            console.log(error);
        }
    }

    if(state.isLoaded)
        return (
            <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{backgroundColor: '#B0E0E6'}}>
                {
                    state.user.is_admin ? <Link className="navbar-brand" to="/userBooks">Livros comprados pelos usuários</Link>
                    : <Link className="navbar-brand" to="/userBooks">Seus livros</Link>
                }
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/books">Livros da digital-library <span className="sr-only">(current)</span></Link>
                        </li>
                        {
                            state.user.is_admin ? 
                                <li className="nav-item">
                                    <Link className="nav-link" to="/users">
                                        Usuários cadastrados na digital-library
                                    </Link>
                                </li> : null
                        }
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Dados Pessoais
                            </Link>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown" style={{backgroundColor: '#B0E0E6'}}>
                                <Link className="dropdown-item" to={`users/${state.user.email}/show`}>Ver seus dados !</Link>
                                <Link className="dropdown-item" to={`users/${state.user.email}/edit`}>Atualizar seus dados !</Link>
                                <Link className="dropdown-item" to={`/users/${state.user.email}/password/edit`}>Atualizar sua senha !</Link>
                            </div>
                        </li>
                    </ul>
                    
                    <Link onClick={logout} className="text-body" style={{textDecoration : 'none'}}>Logout</Link>
                </div>
            </nav>
        );
    
        return null;
}