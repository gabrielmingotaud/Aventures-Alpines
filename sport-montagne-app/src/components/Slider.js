import React, { useState, useEffect } from "react";

export default function Slider(unSlider) {

    // Style du composant
    const style = `
    .imgCarousel{
        height: 100vh;
        width: 100%;
    }
    `;

    let [id, setCount] = useState(0);

    useEffect(() => {
        //Implementing the setInterval method
        const interval = setInterval(() => { // Change d'image toutes les 3 secondes
            setCount(id + 1 > unSlider.images.length - 1 ? id - (unSlider.images.length - 1) : id + 1);
        }, 3000);
        //Clearing the interval
        return () => clearInterval(interval);
    }, [id, unSlider.images.length]);

    return (
        <div className="slider">
            <style>{style}</style>
            <img src={unSlider.images[id]} className="imgCarousel" id="imgSlide" alt=""></img>
        </div>
    );
}