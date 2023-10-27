import React, { useState, useEffect } from "react";
import Carousel from 'react-bootstrap/Carousel';
import '../assets/carousel.css';
import { Link } from "react-router-dom";

function Banner({ picture }) {
  const [currentMovies, setCurrentMovies] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (picture) {
      const current = picture.movies.filter((movie) => {
        return (
          movie.status.toLowerCase().includes('currently showing')
        );
      });
      setCurrentMovies(current);
    }
  }, [picture]);

  return (
    <>
      <Carousel activeIndex={activeIndex} prevIcon={null} nextIcon={null}>
        {currentMovies.map((pic) => (
          <Carousel.Item key={pic.id}>
            <div>
              <Link to={`/movies/${pic.id}`}>
                <img
                  className="d-block w-100 carousel-img"
                  src={pic.Stills[0].url}
                  alt={pic.title}
                />
              </Link>
            </div>

          </Carousel.Item>
          
        ))}
      </Carousel>
      <div className="movie-titles">
        {currentMovies.map((pic, index) => (
          <p
            key={pic.id}
            className={`movie-title ${index === activeIndex ? 'active' : ''}`}
            onClick={() => setActiveIndex(index)}
          >
            {pic.title} ({pic.year})
          </p>
        ))}
      </div>
      </>
  );
}

export default Banner;
