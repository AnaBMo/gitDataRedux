import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setLoading, setError } from "../redux/userSlice";


function useFetchUser(username) {
  const dispatch = useDispatch();
 
  const user = useSelector(state => state.user.userData);
  const loading = useSelector(state => state.user.loading);
  const error = useSelector(state => state.user.error);


  const fetchApi = async (username) => {
    if (!username || typeof username !== 'string') {
      console.error("Error: username no es un string válido:", username);
      return;
    }


    dispatch(setLoading(true));
    dispatch(setError(""));


    try {
      const response = await fetch(`https://api.github.com/users/${username.toLowerCase()}`, {
      });


      if (!response.ok) {
        throw new Error("Usuario no encontrado 🔴");
      }


      const result = await response.json();
      dispatch(setUser(result)); // guardar datos en el estado global
    } catch (err) {
      dispatch(setError(err.message));
      dispatch(setUser(null));
    } finally {
      dispatch(setLoading(false));
    }
  };


  useEffect(() => {
    if (username) {
      fetchApi(username);
    } else {
      dispatch(setUser(null));
    }
  }, [username, dispatch]);


  return { user, loading, error };
}


export default useFetchUser;






/* *******************************************************************
Código antes de Redux
*******************************************************************
import { useEffect, useState } from "react";


function useFetchUser({ username }) {
 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const fetchApi = async (username) => {
    if (!username) return;
   
    setLoading(true);
    setError("");


    try {
      const response = await fetch(`https://api.github.com/users/${username.toLowerCase()}`);
     
      if (!response.ok) {
        throw new Error("Usuario no encontrado 🔴");
      }


      const result = await response.json();
      console.log(result);
      setUser(result);
    } catch (err) {
      setError(err.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (username) {
      fetchApi(username);
    } else {
      setUser(null);
    }
  }, [username]);


  return { user, loading, error };
}


export default useFetchUser;


******************************************************************* */