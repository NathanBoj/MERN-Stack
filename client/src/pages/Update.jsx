import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Update() {

    const [movie,setMovie] = useState({
        title:"",
        description:"",
        rating: null,
        cover: "",

    });

    const navigate = useNavigate()
    const location = useLocation()

    const movieID = location.pathname.split("/")[2]

    const handleChange = (e) =>{
        setMovie((prev)=>({...prev, [e.target.name]: e.target.value}))
    }

    const handleClick = async e =>{
        e.preventDefault()
        try {
            await axios.put("http://localhost:8800/movies/" + movieID, movie)
            navigate("/movies")
        } catch (error) {
            console.log(error)
        }
    }

    console.log(movie)

    return (
        <div className='form'>
            <h1>Update Movie</h1>
            <input type='text' placeholder='title' onChange={handleChange} name="title"/>
            <input type='text' placeholder='desc' onChange={handleChange} name="description"/>
            <input type='number' placeholder='rating' onChange={handleChange} name="rating"/>
            <input type='text' placeholder='Cover' onChange={handleChange} name="cover"/>
            <button className='formButton' onClick={handleClick}>Update</button>
        </div>
    )
}

export default Update