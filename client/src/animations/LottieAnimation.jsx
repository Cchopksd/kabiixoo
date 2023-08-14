import React, { useRef, useEffect } from 'react';
import lottie from 'lottie-web';

const LottieAnimation = ({ animationData, width, height }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const anim = lottie.loadAnimation({
            container: containerRef.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: animationData,
        });

        return () => {
            anim.destroy();
        };
    }, [animationData]);

    return <div ref={containerRef} style={{ width, height }}></div>;
};

export default LottieAnimation;