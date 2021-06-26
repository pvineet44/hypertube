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
  });
  return (
    <Container>
      <FilterSection>HOME </FilterSection>
      <MoviesList>
          {
            movies.map((movie, index) => (
              <MovieTab key={index} image = {movie.images.poster}>
                {

                }
              </MovieTab>
            ))
          }
      </MoviesList>
    </Container>
  );
}

const Container = styled.div`
  // display: flex;
  height: 100vh;
  // justify-content: center;
  // align-items: center;
  color: red;
  margin: 0;
  // background: white;
`;

const FilterSection = styled.div`
  height: 50px;
  margin-top: 70px;
  width: 100vw;
  background: cyan;
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
  background-image: url(${props => props.image});
`
export default Home;
