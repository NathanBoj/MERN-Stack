import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";

function Movies() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const fetchUserMovies = async () => {
      try {
        const userId = localStorage.getItem('userId');
        console.log(userId);
        const res = await axios.get(`http://localhost:8800/movies/${userId}`);
        setMovies(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserMovies();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/movies/`, { data: { id } });
      const userId = localStorage.getItem('userId');
      const res = await axios.get(`http://localhost:8800/movies/${userId}`);
      setMovies(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Movies place</h1>
      <div className='movies'>
        {movies.map(movie => (
          <div className='movie' key={movie.id}>
            {movie.cover && <img src={movie.cover} alt="" />}
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
            <span>{movie.rating}</span>
            <button className='delete' onClick={() => handleDelete(movie.id)}>Delete</button>
            <button className='update'>
              <Link to={`/update/${movie.id}`}>
                Update
              </Link>
            </button>
          </div>
        ))}
      </div>
      <button>
        <Link to="/add">Add New Movie</Link>
      </button>
    </div>
  )
}

export default Movies