import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger);

const AnimatedText = () => {
    const boxRef = useRef(null);

    useGSAP(() => {
        // Get the box element
        const box = boxRef.current;
        const boxWidth = box.offsetWidth;
        
        // Calculate right side position (window width - box width)
        const rightSideX = window.innerWidth - boxWidth;
        
        // Create a timeline for sequential animations
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: boxRef.current,
                start: "top center",    
                end: "bottom top",      
                scrub: 1,               
                markers: true,          
            }
        });

        // Animate from top-right all the way to left side (no stopping at center)
        tl.fromTo(boxRef.current,
            {
                y: -200,           // Start 200px above
                x: rightSideX,     // Start at right side of window
                opacity: 0         
            },
            {
                y: 0,              // Move to center vertically
                x: -boxWidth,      // Move completely to left (off-screen)
                opacity: 1,
                duration: 3,
                ease: "power2.inOut"
            }
        );

    }, []);

    return (
        <div className="min-h-screen w-full bg-red-500 overflow-x-hidden" style={{ height: "200vh" }}>
            <div className="flex items-center justify-center h-screen">
                <div ref={boxRef} id="box" className='h-40 w-40 bg-blue-700'></div>
            </div>
        </div>
    )
}

export default AnimatedText;