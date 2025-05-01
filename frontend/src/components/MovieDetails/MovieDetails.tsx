// MovieDetails.tsx
import "./MovieDetails.css";
import StarRating from "../StarRating/StarRating";
import Comments from "../Comments/Comments";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  runtime: number;
  genres: { id: number; name: string }[];
}

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetails | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            params: {
              api_key: "905ecd5258afe63f05ecf631fa9e3bed",
              language: "pt-BR",
            },
          }
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do filme:", error);
      }
    };
    fetchMovieDetails();
  }, [id]);

  if (!movie) return <p>Carregando...</p>;

  return (
    <div className="movie-details">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="movie-details-title">
        <h2>{movie.title}</h2>
        <span>
          {movie.vote_average > 0 && <StarRating rating={movie.vote_average} />}
        </span>
      </div>
      <p>{movie.overview}</p>
      <p>Lançamento: {movie.release_date}</p>
      <p>Duração: {movie.runtime} minutos</p>
      <p>Gêneros: {movie.genres.map((genre) => genre.name).join(", ")}</p>

      {/* Renderizando a seção de comentários */}
      {id && <Comments movieId={id} />}
    </div>
  );
}
