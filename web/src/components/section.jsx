import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const useOnScreen = (ref, threshold = 0.3) => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { threshold }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, threshold]);

  return isIntersecting;
};

const PanoramicSection = () => {
  const [isActive, setIsActive] = useState(false);
  const [showSmallImages, setShowSmallImages] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef();
  
  const isOnScreen = useOnScreen(sectionRef, 0.5); 

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  useEffect(() => {
    if (isOnScreen && !isActive) {
      setIsActive(true);
      setTimeout(() => setShowSmallImages(true), 300);
    } else if (!isOnScreen && isActive) {
      setShowSmallImages(false);
      setTimeout(() => setIsActive(false), 200);
    }
  }, [isOnScreen]);
  
  return (
    <section 
      ref={sectionRef}
      className="w-full bg-white py-12 md:py-16"
    >
      <div className="max-w-6xl mx-auto px-4 w-full">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ 
            opacity: isActive ? 0 : 1,
            y: isActive ? -20 : 0
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={`text-center ${isActive ? 'pointer-events-none' : ''}`}
          style={{ marginBottom: isActive ? '0' : '2rem' }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold">Panoramic Views</h2>
        </motion.div>

        <div className="relative h-[350px] sm:h-[380px] md:h-[450px]">
          <motion.div 
            className="flex h-full"
            animate={{
              flexDirection: isActive && !isMobile ? 'row' : 'column',
              gap: isActive && !isMobile ? '2rem' : '0rem'
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {/* Left side content - appears on scroll */}
            <motion.div 
              className="flex-1 pointer-events-none relative"
              initial={{ opacity: 0, x: -50 }}
              animate={{ 
                opacity: isActive ? 1 : 0,
                x: isActive ? 0 : -50,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <AnimatePresence mode="wait">
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="pr-0 md:pr-8 absolute top-0 left-0 w-full md:w-auto"
                  >
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold mb-3 md:mb-4 text-center md:text-left">Panoramic Views</h2>
                    <h3 className="text-xl font-bold mb-3 md:mb-4 text-center md:text-left">Marrakech from Above</h3>
                    <p className="text-base md:text-lg text-black/80 mb-4 md:mb-6 max-w-md mx-auto md:mx-0 text-center md:text-left">
                      Soar over the Red City and beyond in our safe and comfortable hot-air balloons. 
                      Each flight is a new masterpiece painted by the sky.
                    </p>
                    
                    <div className="flex justify-center md:justify-start gap-4 md:gap-6">
                      <AnimatePresence>
                        {showSmallImages && (
                          <>
                            <motion.img
                              src="/images/one.jpg"
                              alt="Breakfast"
                              className="w-28 h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 object-cover rounded-xl md:rounded-2xl shadow-lg"
                              initial={{ opacity: 0, x: 20, scale: 0.9 }}
                              animate={{ opacity: 1, x: 0, scale: 1 }}
                              exit={{ opacity: 0, x: 20, scale: 0.9 }}
                              transition={{ 
                                duration: 0.3,
                                delay: 0.1
                              }}
                            />
                            <motion.img
                              src="/images/too.png"
                              alt="Balloons"
                              className="w-28 h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 object-cover rounded-xl md:rounded-2xl shadow-lg"
                              initial={{ opacity: 0, x: 20, scale: 0.9 }}
                              animate={{ opacity: 1, x: 0, scale: 1 }}
                              exit={{ opacity: 0, x: 20, scale: 0.9 }}
                              transition={{ 
                                duration: 0.3,
                                delay: 0.2
                              }}
                            />
                          </>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Main Image */}
            <motion.div 
              className="flex justify-center items-center h-full cursor-pointer"
              animate={{
                width: isActive && !isMobile ? '50%' : '100%'
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <motion.img
                src="/images/panoramic.png"
                alt="Panoramic Balloon"
                className="object-cover rounded-2xl md:rounded-3xl shadow-xl h-full w-full"
                animate={{
                  height: isActive ? '100%' : '100%',
                  maxWidth: isActive && !isMobile ? '400px' : '100%'
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                whileHover={{ scale: isMobile ? 1 : 1.02 }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PanoramicSection;