import React from 'react'
import { useSelector } from 'react-redux';
import Carousel from 'react-bootstrap/Carousel';
import CarouselItem from '../carousel/Carousel.jsx';
import blogServices from '../../appwrite/services.js';
function Home() {
  const activeBlog = useSelector((state) => state.blog.allActiveArticles);
  // Truncate Content
  const truncate = (content, maxLength) => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = content;
    let textContent = tempElement.textContent || tempElement.innerText;
    let truncatedText = textContent.length > maxLength
      ? textContent.substring(0, maxLength) + '...'
      : textContent;
    tempElement.innerHTML = truncatedText;
    return tempElement.innerHTML;
  }
  return (
    <>
      {
        activeBlog.length!==0  ? <div className="container py-lg-5 py-md-5 py-2">
          <Carousel>
            {
              activeBlog.slice(0, 5).map((item) => (
                <CarouselItem
                  key={item.$id}
                  className="heroImageCarousel"
                  imageSrc={blogServices.getFilePreview({ fileId: item.featuredImage })}
                  imageAlt={item.title}
                  captionHeading={item.title}
                  to={`/blog-details/${item.slug}/${item.$id}`}
                  captionText={truncate(item.content, 150)}
                />
              ))
            }
          </Carousel>
        </div>
        : <div>Loading....</div>
      }
    </>
  )
}

export default Home