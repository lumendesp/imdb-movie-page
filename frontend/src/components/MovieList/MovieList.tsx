import { useEffect, useState, useRef } from "react";
import axios from "axios";

import "./MovieList.css";
import MovieCard from "../MovieCard/MovieCard";

export interface MovieType {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
}

export default function MovieList() {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [page, setPage] = useState(1); // Estado para a página atual
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    getMovies();
  }, [page]);

  const getMovies = async () => {
    setIsLoading(true);
    try {
      const response = await axios({
        method: "GET",
        url: "https://api.themoviedb.org/3/discover/movie",
        params: {
          api_key: "905ecd5258afe63f05ecf631fa9e3bed",
          language: "pt-BR",
          page,
        },
      });
      setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // UseEffect para configurar o IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [isLoading]);

  return (
    <>
      <ul className="movie-list">
        {movies.map((movie) => (
          <MovieCard
            id={movie.id}
            title={movie.title}
            overview={movie.overview}
            poster_path={movie.poster_path}
            vote_average={movie.vote_average}
          />
        ))}
      </ul>
      <div
        ref={observerRef}
        style={{ height: "20px", background: "transparent" }}
      >
        {isLoading && <p>Carregando mais filmes...</p>}
      </div>
    </>
  );
}
