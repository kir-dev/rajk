"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {BiSolidLeftArrow, BiSolidRightArrow} from "react-icons/bi";
import Image from "next/image";
import {CommunityPicture, Event} from "@/payload-types";
import {isMedia} from "@/utils/isMedia";

const NextArrow = (props: { onClick?: () => void }) => {
    const {onClick} = props;
    return (
        <div
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 h-full flex items-center justify-center cursor-pointer w-24"
            style={{background: ""}}
            onClick={onClick}
        >
            <BiSolidRightArrow size={40} color="white"/>
        </div>
    );
};

const PrevArrow = (props: { onClick?: () => void }) => {
    const {onClick} = props;
    return (
        <div
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 h-full flex items-center justify-center cursor-pointer w-24"
            onClick={onClick}
            style={{background: ""}}
        >
            <BiSolidLeftArrow size={40} color="white"/>
        </div>
    );
};

interface MyCarouselProps {
    data: Event[] | CommunityPicture[];
    clickable: boolean;
}

export function MyCarousel(props: MyCarouselProps) {
    const settings = {
        className: "overflow-hidden",
        variableWidth: true,
        centerMode: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 5000,
        nextArrow: <NextArrow/>,
        prevArrow: <PrevArrow/>,
    };

    const TypedSlider = Slider as unknown as React.ComponentType<any>; //eslint-disable-line

    return (
        <div className="slider-container" id="carousel">
            <TypedSlider {...settings}>
                {props.data.map((doc) => (
                    <div key={doc.id} className="h-64 w-auto outline-none px-2">
                        <div className="transition-all duration-300 ease-in-out hover:scale-105 h-full w-auto">
                            {props.clickable ? (
                                <a href={`/esemenyek/${doc.id}`} className="block relative h-full aspect-video">
                                    {isMedia(doc.picture) ? (
                                        <Image
                                            src={doc.picture.url ?? "/rajk_strucc_black.png"}
                                            alt={doc.picture.alt ?? "/rajk_strucc_black.png"}
                                            fill
                                            sizes="400px"
                                            className="object-cover"
                                            priority={false}
                                        />
                                    ) : null}
                                </a>
                            ) : (
                                <div className="relative h-full aspect-video">
                                    {isMedia(doc.picture) ? (
                                        <Image
                                            src={doc.picture.url ?? "/rajk_strucc_black.png"}
                                            alt={doc.picture.alt ?? "/rajk_strucc_black.png"}
                                            fill
                                            sizes="400px"
                                            className="object-cover"
                                            priority={false}
                                        />
                                    ) : null}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </TypedSlider>
        </div>
    );
}

export default MyCarousel;