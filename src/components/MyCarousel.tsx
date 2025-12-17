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
    // Filter and limit data to 3 events when clickable (Events)
    const getDisplayData = () => {
        if (!props.clickable) {
            return props.data; // For community pictures, show all
        }

        // For events, limit to 3 and prioritize upcoming events
        const events = props.data as Event[];
        const today = new Date();

        // Separate future and past events
        const futureEvents = events.filter(event => new Date(event.date) >= today);
        const pastEvents = events.filter(event => new Date(event.date) < today);

        // Sort past events in reverse chronological order (most recent first)
        pastEvents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        // Take up to 3 future events, fill with past events if needed
        const displayEvents = [...futureEvents.slice(0, 3)];
        const remaining = 3 - displayEvents.length;

        if (remaining > 0) {
            displayEvents.push(...pastEvents.slice(0, remaining));
        }

        return displayEvents;
    };

    const displayData = getDisplayData();

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
                    centerMode: true,
                    centerPadding: '20px',
                    variableWidth: false,
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 9999,
                settings: {
                    centerMode: true,
                    centerPadding: '0px',
                    variableWidth: true,
                }
            }
        ]
    };

    const TypedSlider = Slider as unknown as React.ComponentType<any>; //eslint-disable-line

    return (
        <div className="slider-container px-4 md:px-8" id="carousel">
            <TypedSlider {...settings}>
                {displayData.map((doc) => (
                    <div key={doc.id} className="h-64 outline-none px-2 md:px-4">
                        <div className="transition-all duration-300 ease-in-out hover:scale-105 h-full w-full md:w-96">
                            {props.clickable ? (
                                <a href={`/esemenyek/${doc.id}`} className="block relative h-full w-full">
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
                                <div className="relative h-full w-full">
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