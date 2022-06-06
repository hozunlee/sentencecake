import React, { useEffect, useState } from "react";

const Letter = <T extends { imgSrc?: string }>(imgKey: T, src: {}) => {
    const [imgSrc, setImgSrc] = useState<string>();

    useEffect(() => {
        console.log(imgKey.imgSrc);
        const getImg = <T extends unknown>(img: T) => {
            fetch(`https://source.unsplash.com/featured/?${img}`).then(
                (response) => {
                    // document.body.style.backgroundImage = `url(${response.url})`;
                    setImgSrc(response.url);
                }
            );
        };
        getImg(imgKey.imgSrc);
    }, [imgKey]);
    return (
        <div className="flex justify-center">
            <img src={imgSrc} alt="img" className="w-1/2" />
        </div>
    );
};

export default Letter;
