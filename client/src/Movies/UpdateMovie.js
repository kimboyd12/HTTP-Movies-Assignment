import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from "axios"


const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: []
};

const UpdateMovie = props => {
    const {push} = useHistory();
    const {movie, setMovie} = useState(initialMovie);
    const {id} = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                setMovie(res.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    const changeHandler = e => {
        e.persist();
        let value = e.target.value;
        if (e.target.name === "metascore") {
            value = parseInt(value, 10);
        }

        setMovie({
            ...movie, 
            [e.target.name]: value
        })
    }

    const submitHandler = e => {
        e.preventDefault();
        // put request to items
        axios
            .put('http://localhost:5000/api/movies/${id}', movie)
            .then(res => {
                props.setMovie(res.data);
                push(`/movies/${id}`);
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={submitHandler}>
                <input 
                    type="text"
                    name="title"
                    value={movie.title}
                    onChange={changeHandler}
                    placeholder="Title"
                />
                 <input 
                    type="text"
                    name="director"
                    value={movie.director}
                    onChange={changeHandler}
                    placeholder="Director"
                />
                <input 
                    type="text"
                    name="metascore"
                    value={movie.metascore}
                    onChange={changeHandler}
                    placeholder="Metascore"
                />
                <input 
                    type="text"
                    name="stars"
                    value={movie.stars}
                    onChange={changeHandler}
                    placeholder="Stars"
                />
                <button>Update Movie</button>
            </form>
        </div>
    )
}

export default UpdateMovie;