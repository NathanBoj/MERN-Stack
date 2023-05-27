import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Add() {
    const userId = localStorage.getItem('userId');

    const [movie, setMovie] = useState({
        title: "",
        description: "",
        rating: null,
        cover: "",
        uid: userId,
    });

    const navigate = useNavigate()

    const handleChange = (e) => {
        setMovie((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleClick = async e => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:8800/movies", movie)
            navigate("/movies")
        } catch (error) {
            console.log(error)
        }
    }

    console.log(movie)

    return (
        <div className='form'>
            <h1>Add new Movie</h1>
            <input type='text' placeholder='title' onChange={handleChange} name="title" />
            <input type='text' placeholder='desc' onChange={handleChange} name="description" />
            <input type='number' placeholder='rating' onChange={handleChange} name="rating" />
            <input type='text' placeholder='Cover' onChange={handleChange} name="cover" />
            <button onClick={handleClick}>Submit</button>
        </div>
    )
}


export default Add