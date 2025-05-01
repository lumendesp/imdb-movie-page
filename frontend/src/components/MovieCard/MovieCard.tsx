import { Link } from "react-router-dom";

import StarRating from "../StarRating/StarRating";

import "./MovieCard.css";

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
}

export default function MovieCard(props: Movie) {
  return (
    <li key={props.id} className="movie-card">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/original${props.poster_path}`}
          alt={props.title}
        />
      </div>
      <div className="movie-infos">
        <p className="movie-title">{props.title}</p>
        {props.vote_average > 0 && (
          <StarRating rating={props.vote_average} />
        )}
        <div className="hidden-content">
          {props.overview && (
            <p className="description">
              {props.overview.length > 100
                ? `${props.overview.substring(0, 100)}...`
                : props.overview}
            </p>
          )}
          <Link to={`/movie/${props.id}`} className="btn-default">Ver mais</Link>
          {/* <button className="btn-default">Ver mais</button> */}
        </div>
      </div>
    </li>
  );
}
