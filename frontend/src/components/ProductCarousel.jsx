import { Link } from "react-router-dom";
import { Message } from "./index";
import { useGetTopProductsQuery } from "../slices/productApiSlice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 3000,
  pauseOnHover: true,
  slidesToShow: 3,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      },
    },
  ],
};

export default function ProductCarousel() {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? null : error ? (
    <Message variant="danger">{error?.data?.message || error?.error}</Message>
  ) : (
    // <Carousel pause="hover" className="bg-primary mb-4">
    //   {products.map((product) => (
    //     <Carousel.Item key={product._id} interval={1000}>
    //       <Link to={`/products/${product._id}`}>
    //         <Image src={product.image} alt={product.name} fluid />
    //         <Carousel.Caption className="carousel-caption">
    //           <h2 className="text-white text-right">
    //             {product.name} (₹{product.price})
    //           </h2>
    //         </Carousel.Caption>
    //       </Link>
    //     </Carousel.Item>
    //   ))}
    // </Carousel>
    <Slider {...settings} className="mb-4">
      {products.map((item) => (
        <div className="slider-card" key={item._id}>
          <Link to={`/products/${item._id}`}>
            <div className="slider-image">
              <img src={item.image} alt={item.name} />
            </div>
          </Link>
          <div className="slider-content">
            <p>{item.name}</p>
          </div>
        </div>
      ))}
    </Slider>
  );
}
