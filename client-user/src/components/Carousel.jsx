import { useState } from "react"
import Carousel from 'react-bootstrap/Carousel';
import '../assets/carousel.css'
import { Link } from "react-router-dom";

function Banner({ picture }) {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            {
                picture.movies.map((pic) => {
                    return (
                        <Carousel.Item key={pic.id}>
                            <div>
                                <div>
                                    <img
                                        className="d-block w-100 carousel-img"
                                        src={pic.imgUrl}
                                        alt={pic.title}
                                    />
                                </div>
                            </div>
                            <Carousel.Caption key={pic.id}>
                                <span className="carousel-text-h1"> {pic.title} </span>
                                <br/>
                                <Link to ={`/movies/${pic.id}`}><span className="carousel-text">Read More</span></Link>
                            </Carousel.Caption>
                        </Carousel.Item>
                    )
                })
            }

            </Carousel>
    )
}



export default Banner