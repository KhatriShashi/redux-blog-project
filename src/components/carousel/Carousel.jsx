import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
const  CarouselItem = React.forwardRef((
    {
        className="",
        imageSrc,
        imageAlt,
        captionHeading,
        captionText,
        to,
    },
    ref
) => (
        <>
                <Carousel.Item className={className} ref={ref}>
                    <Link to={to}>
                    <img src={imageSrc} alt={imageAlt}/>
                    <Carousel.Caption>
                        <h2>{captionHeading}</h2>
                        <p>{captionText}</p>
                    </Carousel.Caption>
                    </Link>
                </Carousel.Item>
        </>
 ))
export default CarouselItem