import axios from 'axios';
import { 
    GET_DOGS, 
    DELETE_DOG, 
    UPDATE_DOG, 
    GET_TEMPERAMENTS, 
    FILTER_BY_TEMPERAMENT, 
    FILTER_CREATED, FILTER_NAME, 
    FILTER_BY_WEIGHT, SEARCH_DOG, 
    GET_DETAIL, 
    CLEAR_DETAIL, 
    SET_CURRENT_PAGE } from "./types";

export const getDogs = () => {
    return function(dispatch){
        fetch("http://localhost:3001/dogs")
        .then(res => res.json())
        .then(data => dispatch({ type: GET_DOGS, payload: data }))
    }
}
    
export const deleteDog = (id) => {
    return async function(dispatch){
        try {
            await axios.delete(`http://localhost:3001/dogs/${id}`)
            return dispatch({type: DELETE_DOG, payload: id})
        } catch (error) {
            alert('Dog cannot be deleted')
        }
    }
}

export const updateDog = (id, payload) => {
    return async function(dispatch){
        try {
            let response = axios.put(`http://localhost:3001/dogs/${id}`, payload)
        } catch (error) {
            alert('Dog cannot be changed')
        }
    }
}

export const getTemperaments = () => {
    return function(dispatch){
        fetch("http://localhost:3001/temperaments")
        .then(res => res.json())
        .then(data => dispatch({ type: GET_TEMPERAMENTS, payload: data}))
    }
}

export const filterByTemperaments = (temperament) => {
    return { type: FILTER_BY_TEMPERAMENT, payload: temperament }
}

export const filterByName = (value) => {
    return { 
        type: FILTER_NAME, 
        payload: value 
    }
}

export const filterByCreate = (value) => {
    return { type: FILTER_CREATED, payload: value }
}



export const filterByWeight = (value) => {
    return {
        type: FILTER_BY_WEIGHT,
        payload: value
    }
}

export const getDetail = (id) => {
    return function(dispatch){
        fetch(`http://localhost:3001/dogs/${id}`)
        .then(res => res.json())
        .then(data => dispatch({ type: GET_DETAIL, payload: data}))
    }
}

export const clearDetail = (data) => {
    return {
        type: CLEAR_DETAIL,
        payload: data
    }
}

export const setCurrentPage = (page) => {
    return {
        type: SET_CURRENT_PAGE,
        payload: page
    }
}

export const postDog = (data) => {
    return async function(dispatch){
        try {
            const response = await axios.post("http://localhost:3001/dogs", data)
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}

export const searchDog = (name) => {
    try {
        return function(dispatch){
            fetch(`http://localhost:3001/dogs?name=${name}`)
            .then(res => res.json())
            .then(data => dispatch({ type: SEARCH_DOG, payload: data }))
        }
    } catch (error) {
        console.log(error.message)
    }
}

