import React from "react";
import Slider from "react-slick";
import "./SportsSlider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const sportsData = [
  { name: "Football", img: "football.png" },
  { name: "Basketball", img: "basketball.png" },
  { name: "Cricket", img: "cricket.png" },
  { name: "Tennis", img: "tennis.png" },
];

const SportsSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const handleClick = (sport) => {
    alert(`you have selected ${sport.name}`);
    // Logic for displaying information
  };

  return (
    <div className="sports-slider">
      <h2>Choose Sports</h2>
      <Slider {...settings}>
        {sportsData.map((sport, index) => (
          <div
            key={index}
            className="sport-card"
            onClick={() => handleClick(sport)}
          >
            <img src={sport.img} alt={sport.name} />
            <div className="sport-name">{sport.name}</div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SportsSlider;
