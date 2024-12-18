import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500, // Vitesse de défilement augmentée à 1.5 secondes
    arrows: false,
    appendDots: dots => (
      <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}>
        <ul style={{ margin: '0px', padding: '0px' }}>{dots}</ul>
      </div>
    ),
  };

  return (
    <Slider {...settings}>
      <div className="relative h-screen">
        <img
          src="https://www.e-marketing.fr/Assets/Img/BREVE/2021/4/359519/Sneakers-Quand-marques-surfent-business-edition-limitee-F.jpg"
          alt="Sneaker 1"
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold bg-black bg-opacity-50 p-4 rounded">
            Bienvenue chez Anisus Online Shop
          </h1>
        </div>
      </div>
      <div className="relative h-screen">
        <img
          src="https://www.cdiscount.com/pdt2/6/1/3/1/700x700/aih9102469962613/rw/sneaker-30x19cm-panneau-neon-led-chaussures-r.jpg"
          alt="Sneaker 2"
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold bg-black bg-opacity-50 p-4 rounded">
            Tendances et Exclusivités à ne pas Manquer
          </h1>
        </div>
      </div>
      <div className="relative h-screen">
        <img
          src="https://www.leparisien.fr/resizer/nCA0GQeg-VtDVBJpHF_AK1zEd7E=/932x582/arc-anglerfish-eu-central-1-prod-leparisien.s3.amazonaws.com/public/FHQVSY4244PATNZMQVAWS3KEV4.jpg"
          alt="Sneaker 3"
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold bg-black bg-opacity-50 p-4 rounded">
            Qualité, Confort et Style Inégalés
          </h1>
        </div>
      </div>
    </Slider>
  );
};

export default Carousel;
