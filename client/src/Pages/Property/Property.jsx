import React from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getProperty } from "../../utils/api";
import { PuffLoader } from "react-spinners";
import { AiFillHeart } from "react-icons/ai";
import "./Property.css";
import { FaShower } from "react-icons/fa";
import { AiTwotoneCar } from "react-icons/ai";
import { MdMeetingRoom,MdLocationPin } from "react-icons/md";
import Map from "../../components/Map/Map";

const Property = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];
  // console.log(id);
  const { data, isError, isLoading } = useQuery({
    queryKey: ["resd", id],
    queryFn: () => getProperty(id),
  });

  console.log(data);

  if (isLoading) {
    return (
      <div className="wrapper flexCenter paddings" style={{ height: "60vh" }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <span>Error while Fetching Data</span>
        </div>
      </div>
    );
  }
  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container">
        {/* like btn */}
        <div className="like">
          <AiFillHeart size={24} color="white" />
        </div>
        {/* image */}
        <img src={data?.image} alt={data?.title} style={{ width: "100%" }} />
        <div className="flexCenter property-details">
            {/* left */}
            <div className="flexColStart left">
                {/* head */}
                <div className="flexStart head">
                    <span className="primaryText">{data?.title}</span>
                    <span className="orangeText" style={{fontSize:"1.5rem"}}>${data?.price}</span>
                </div>
                {/* Facilities */}
                <div className="flexStart facilities">
                    <div className="flexStart facility">
                        <FaShower size={20} color="#1F3E72"/>
                        <span>{data?.facilities?.bathrooms} Bathrooms</span>
                    </div>
                    <div className="flexStart facility">
                        <AiTwotoneCar size={20} color="#1F3E72"/>
                        <span>{data?.facilities?.parkings} Parkings</span>
                    </div>
                    <div className="flexStart facility">
                        <MdMeetingRoom size={20} color="#1F3E72"/>
                        <span>{data?.facilities?.rooms} rooms</span>
                    </div>
                </div>

                {/* description */}
                <span className="secondaryText">
                    {data?.description}
                </span>

                {/* address */}
                <div className="flexStart" style={{gap:"1rem"}}>
                    <MdLocationPin size={25}/>
                    <span className="secondaryText">
                        {
                            data?.address
                        },
                        {
                            data?.city
                        },
                        {
                            data?.country
                        }
                    </span>
                </div>

                {/* booking Button */}
                <button className="button">
                        Book Your Visit
                </button>
            </div>
            {/* right */}
            <div className="right">
                <Map address={data?.address} city={data?.city} country={data?.country}/>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Property;
