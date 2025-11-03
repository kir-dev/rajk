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
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 h-full flex items-center justify-center cursor-pointer w-16 md:w-24"
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
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 h-full flex items-center justify-center cursor-pointer w-16 md:w-24"
            onClick={onClick}
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
        centerMode: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 5000,
        nextArrow: <NextArrow/>,
        prevArrow: <PrevArrow/>,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    centerMode: false,
                    variableWidth: false,
                }
            },
            {
                breakpoint: 9999,
                settings: {
                    variableWidth: true,
                }
            }
        ]
    };

    const TypedSlider = Slider as unknown as React.ComponentType<any>; //eslint-disable-line

    return (
        <div className="slider-container px-4 md:px-8" id="carousel">
            <TypedSlider {...settings}>
                {props.data.map((doc) => (
                    <div key={doc.id} className="h-64 outline-none px-3 md:px-4">
                        <div className="transition-all duration-300 ease-in-out hover:scale-105 h-full w-full md:w-auto">
                            {props.clickable ? (
                                <a href={`/esemenyek/${doc.id}`} className="block relative h-full aspect-video">
                                    {isMedia(doc.picture) ? (
                                        <Image
                                            src={doc.picture.url ?? "/rajk_strucc_black.png"}
                                            alt={doc.picture.alt ?? "/rajk_strucc_black.png"}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 400px"
                                            className="object-cover rounded-lg"
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
                                            sizes="(max-width: 768px) 100vw, 400px"
                                            className="object-cover rounded-lg"
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