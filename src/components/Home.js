import axios from "axios";
import React, { useEffect, useState } from "react";

import styled from "styled-components";

function Home(props) {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios.get("https://localhost:3080/getMovies").then((response) => {
      console.log(response.data);
      setMovies(response.data)
    });
  }, []);
  return (
    <Container>
      <FilterSection>Filter section </FilterSection>
      <MoviesList>
        {
          movies.map((movie, index) => (
            <MovieTab key={index} image={movie.images.poster}>
              <MovieMeta>
                <MovieName>{movie.title}</MovieName>
                <MovieYear>IMDB: {movie.rating.percentage / 10}⭐</MovieYear>
                <MovieYear>({movie.year})</MovieYear>
                <MovieAbout>About: <br></br>{movie.synopsis}</MovieAbout>
              </MovieMeta>
            </MovieTab>
          ))
        }
      </MoviesList>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  margin: 0;
`;

const FilterSection = styled.div`
  height: 50px;
  margin-top: 70px;
  width: 100vw;
  background: skyblue;
  color: black;
`;

const MoviesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
`;


const MovieTab = styled.div`
  width: 250px;
  margin: 5px;
  height: 400px;
  border: 1px solid gray;
  border-radius: 5px;
  background: url(${props => props.image});
  background-size: contain;
  div {
    visibility:hidden;
  }
  &: hover{
    background: url(${props => props.image}) rgba(0, 0, 0, 0.7);
    background-size: contain;
    background-blend-mode: multiply;
    div {
      visibility: visible;
    }
  }
`

const MovieMeta = styled.div`
  color: white;
  margin-top: 0;
  margin-left: 5px;
`

const MovieName = styled.h3``

const MovieYear = styled.div``

const MovieAbout = styled.p``

export default Home;
