import React from "react";
import "./Residencies.css";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
// import data from "../../utils/slider.json";
import { sliderSettings } from "../../utils/common.js";
import PropertyCard from "../PropertyCard/PropertyCard.jsx";
import useProperties from "../../hooks/useProperties.jsx";
import { PuffLoader } from "react-spinners";

const Residencies = () => {
  const {data,isError,isLoading} = useProperties();

  if (isError) {
    return (
      <div className="wrapper">
        <span>Error while Fetching Data</span>
      </div>
    );
  }

  if(isLoading){
    return (
      <div className="wrapper flexCenter" style={{height:"60vh"}}>
          <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"/>
      </div>
    )
  }

  return (
    <section className="r-wrapper">
      <div className="paddings innerWidth r-container">
        <div className="r-head flexColStart">
          <span className="orangeText">Best Choices</span>
          <span className="primaryText">Popular Residencies</span>
        </div>

        <div className="swiper-container">
          <Swiper {...sliderSettings}>
            <SliderButtons />
            {data?.residencies.slice(12,20).map((card, i) => (
              <SwiperSlide key={i}>
                <PropertyCard card={card} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Residencies;

const SliderButtons = () => {
  const swiper = useSwiper();
  return (
    <div className="flexCenter r-buttons">
      <button onClick={() => swiper.slidePrev()} className="">
        &lt;
      </button>
      <button onClick={() => swiper.slideNext()}>&gt;</button>
    </div>
  );
};
