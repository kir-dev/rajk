import React from "react";

export default function NavBar() {
    return (<div className = 'bg-rajk-green w-full p-2 flex justify-between'>
        <div>
            <img src = '/rajk_logo2_white.png' alt = 'Rajka'></img>
        </div>
        
        <div className = 'flex justify-end w-full gap-8 m-4'>
            <p className = 'text-white text-lg'>Home</p>
            <p className = 'text-white text-lg'>Contact</p>
            <p className = 'text-white text-lg'>Contact</p>
            <p className = 'text-white text-lg'>Contact</p>
        </div>
    </div>)
}
