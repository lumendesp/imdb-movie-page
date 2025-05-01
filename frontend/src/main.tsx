import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MovieList from "./components/MovieList/MovieList";
import MovieDetails from "./components/MovieDetails/MovieDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // O componente principal que renderiza a estrutura geral (incluindo o Navbar)
    children: [
      {
        path: "/", // Rota para a lista de filmes
        element: <MovieList />,
      },
      {
        path: "/movie/:id", // Rota para detalhes do filme
        element: <MovieDetails />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
