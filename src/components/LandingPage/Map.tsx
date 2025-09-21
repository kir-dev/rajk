'use client';

import React, {useEffect} from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function Map() {
    useEffect(() => {
        if (typeof window !== "undefined") {
            // Check if map container exists
            const container = document.getElementById('map');
            if (!container) return;

            const rajkCoordinates: [number, number] = [47.49251303722601, 19.06775072583742];


            const map = L.map('map', {
                attributionControl: false,
                zoomControl: true,
                dragging: true,
                scrollWheelZoom: false,
                doubleClickZoom: false,
                boxZoom: false,
                touchZoom: false,
                closePopupOnClick: false,
            }).setView(rajkCoordinates, 16);

            L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                subdomains: 'abcd',
                maxZoom: 19,
            }).addTo(map);

            const markerHtml = `
                    <svg width="40" height="50" viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                            <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                        <path d="M20 0C9 0 0 9 0 20C0 35 20 50 20 50C20 50 40 35 40 20C40 9 31 0 20 0Z" fill="#1C9647" filter="url(#glow)"/>
                        <circle cx="20" cy="20" r="8" fill="#FBFBEF"/>
                    </svg>
                `;

            const customIcon = L.divIcon({
                className: 'custom-map-pin',
                html: markerHtml,
                iconSize: [40, 50],
                iconAnchor: [20, 50],
                popupAnchor: [0, -50]
            });

            const marker = L.marker(rajkCoordinates, { icon: customIcon }).addTo(map);
            marker.bindPopup('<strong>Rajk Szakkollégium</strong><br>Budapest, Horánszky utca 6').openPopup();

            // Force map to update its size after rendering
            setTimeout(() => {
                map.invalidateSize();
            }, 100);

            return () => {
                map.remove();
            };
        }
    }, []);

    return (
        <>
            <style>
                {`
                #map {
                    border-radius: 12px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    overflow: hidden;
                    filter: brightness(1.2) contrast(1.1);
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
                    transition: all 0.3s ease;
                }
                #map:hover {
                    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.4);
                    filter: brightness(1.3) contrast(1.15);
                }
                .leaflet-control-zoom {
                    background-color: rgba(10, 10, 10, 0.8) !important;
                    border: 1px solid rgba(255, 255, 255, 0.1) !important;
                    border-radius: 8px !important;
                    overflow: hidden;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;
                }
                .leaflet-control-zoom a {
                    color: #FBFBEF !important;
                    background-color: transparent !important;
                    transition: all 0.2s ease;
                }
                .leaflet-control-zoom a:hover {
                    background-color: rgba(28, 150, 71, 0.7) !important;
                    color: white !important;
                }
                .custom-map-pin {
                    animation: pulse 2s infinite;
                    background: transparent;
                    border: none;
                }
                @keyframes pulse {
                    0% { filter: drop-shadow(0 0 0 rgba(28, 150, 71, 0.7)); }
                    70% { filter: drop-shadow(0 0 8px rgba(28, 150, 71, 0.7)); }
                    100% { filter: drop-shadow(0 0 0 rgba(28, 150, 71, 0)); }
                }
                .leaflet-popup-content-wrapper {
                    background-color: rgba(10, 10, 10, 0.9) !important;
                    border: 1px solid rgba(28, 150, 71, 0.5) !important;
                    border-radius: 10px !important;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3) !important;
                }
                .leaflet-popup-content {
                    color: #FBFBEF !important;
                    font-family: var(--font-open-sans), sans-serif;
                    font-size: 14px !important;
                    margin: 12px 12px !important;
                    line-height: 1.5;
                }
                .leaflet-popup-content strong {
                    color: #1C9647;
                }
                .leaflet-popup-tip {
                    background: rgba(10, 10, 10, 0.9) !important;
                    border: 1px solid rgba(28, 150, 71, 0.5) !important;
                }
                `}
            </style>
            <div id="map" className="relative" style={{ height: '400px', width: '100%', marginTop: 0}} />
        </>
    );
}