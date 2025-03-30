import './ShowUser.css';
import { useState } from 'react';
import { useSelector } from "react-redux";
import useFetchUser from '../hooks/useFetchUser';


function ShowUser() {
    const [usernameInput, setUsernameInput] = useState('');
    const [newUsernameInput, setnewUsernameInput] = useState('');


    useFetchUser(newUsernameInput); // fetch con el valor recogido en el input


    // Obtener el estado global de Redux
    const userData = useSelector(state => state.user.userData);
    const loadingState = useSelector(state => state.user.loading);
    const errorState = useSelector(state => state.user.error);


    // Manejador de cambio de estado en el input
    const handleSearchChange = (e) => {
        setUsernameInput(e.target.value);
    };


    // Manejador de búsqueda
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setnewUsernameInput(usernameInput);
    };


    return (
        <div className='gitUsersSearch'>
            <h1>Usuarios GitHub</h1>
            <h2>Obtén más información sobre el usuario que elijas.</h2>


            <form onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    placeholder="UserName"
                    value={usernameInput}
                    onChange={handleSearchChange}
                />
                <button type="submit">Buscar</button>
            </form>


            {loadingState && <p>Cargando...</p>}
            {errorState && <p>{errorState}</p>}


            {userData && (
                <div className="userContainer">
                    <h2>{userData.login}</h2>
                    <h3>{userData.name}</h3>
                    <img src={userData.avatar_url} alt={userData.name} />
                    <h4>Seguidores: {userData.followers}</h4>
                    <h4>Repositorios públicos: {userData.public_repos}</h4>
                </div>
            )}


            {!userData && !loadingState && !errorState && newUsernameInput && (
                <p>No se encontró el usuario</p>
            )}
        </div>
    );
}


export default ShowUser;




/* *****************************************************************
FUNCIÓN ANTES DE REDUX
********************************************************************


import './ShowUser.css';
import { useState } from "react";
import useFetchUser from '../hooks/useFetchUser';


function ShowUser() {


    const [searchInput, setSearchInput] = useState('');
    const [username, setUsername] = useState('');
    const { user, loading, error } = useFetchUser({ username });


    // Manejador de cambio de estado en el valor del input
    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };


    // Manejador de búsqueda
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchInput.trim() !== "") {
            setUsername(searchInput);
        }
    };


    return (
        <div className='gitUsersSearch'>
            <h1>Usuarios GitHub</h1>
            <h2>Obtén más información sobre el usuario que elijas.</h2>


            <form onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    placeholder="UserName"
                    value={searchInput}
                    onChange={handleSearchChange}
                />
                <button type="submit">Buscar</button>
            </form>


            {loading && <p>Cargando...</p>}
            {error && <p>{error}</p>}


            {user && (
                <div className="userContainer">
                    <h2>{user.login}</h2>
                    <h3>{user.name}</h3>
                    <img src={user.avatar_url} alt={user.name} />
                    <h4>Seguidores: {user.followers}</h4>
                    <h4>Repositorios públicos: {user.public_repos}</h4>
                </div>
            )}


            {!user && !loading && !error && username && (
                <p>No se encontró el usuario</p>
            )}
        </div>
    );
}


export default ShowUser;


***************************************************************** */