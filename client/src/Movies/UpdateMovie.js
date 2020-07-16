import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from "axios"


const initialMovie = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: []
};

const UpdateMovie = (props) => {
    // const {push} = useHistory();
    const [movie, setMovie] = useState(initialMovie);
    const {push} = useHistory();
    const params = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${params.id}`)
            .then(res => {
                setMovie(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const changeHandler = e => {
        e.persist();
        let value = e.target.value;
        if (e.target.name === "stars") {
            value = e.target.value.split(',')
        }

        setMovie({
            ...movie, 
            [e.target.name]: e.target.value
        
        })
        console.log(movie);
    }

    const submitHandler = e => {
        e.preventDefault();
        // put request to items
        axios
            .put(`http://localhost:5000/api/movies/${params.id}`, movie)
            .then(res => {
                props.history.push('/movies');
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
                    value={movie.stars.join(',')}
                    onChange={changeHandler}
                    placeholder="Stars"
                />
                <button>Update Movie</button>
            </form>
        </div>
    )
}

export default UpdateMovie;