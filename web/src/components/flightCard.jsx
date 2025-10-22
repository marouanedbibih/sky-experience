import { motion } from 'framer-motion';
import { useState } from 'react';

export default function AnimatedCard({ title, overview, image, price, rating, category, id }) {
  const [isHovered, setIsHovered] = useState(false);

  // Function to get category badge text
  const getCategoryBadge = (category) => {
    switch(category) {
      case 'vip': return 'VIP';
      case 'romantic offer': return 'Romantic';
      case 'most reserved': return 'Most Reserved';
      default: return category;
    }
  };

  return (
      <motion.div
        className="relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer"
        animate={{
          width: isHovered ? '320px' : '280px',
          height: isHovered ? '400px' : '280px'
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {/* Image container */}
        <motion.div
          className="relative overflow-hidden"
          animate={{
            height: isHovered ? '240px' : '100%',
            borderRadius: isHovered ? '16px 16px 0 0' : '16px'
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <motion.img
            src={image}
            alt={title}
            className="w-full object-cover"
            animate={{
              height: isHovered ? '240px' : '280px'
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
          
          {/* Price Badge */}
          <motion.div
            className="absolute top-0 right-0 bg-red-400 text-white rounded-bl-2xl px-4 py-2"
            initial={{ opacity: 1 }}
            animate={{ 
              opacity: isHovered ? 0 : 1,
              scale: isHovered ? 0.8 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-lg font-bold">${price}</div>
            <div className="text-xs">/Adult</div>
          </motion.div>

          {/* Status Badge */}
          <motion.span
            className="absolute top-3 right-0 bg-[#f39c12] text-white text-xs font-bold px-4 py-1 rounded-l-xl"
            animate={{
              opacity: isHovered ? 1 : 0,
              x: isHovered ? 0 : 50
            }}
            transition={{ duration: 0.3, delay: isHovered ? 0.2 : 0 }}
          >
            {getCategoryBadge(category)}
          </motion.span>
          
          {/* Overlay content for non-hovered state */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4"
            animate={{
              opacity: isHovered ? 0 : 1,
              y: isHovered ? 20 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-white">
              <div className="font-bold text-lg mb-1">
                {title}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-yellow-400 text-lg">★</span>
                <span className="text-sm font-bold">{rating}/5</span>
                <motion.a
                  href={`/flights/${id}`}
                  className="ml-auto bg-red-500 text-white px-3 py-1 rounded-full font-bold text-xs hover:bg-red-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Check Details
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Expanded content container */}
        <motion.div
          className="bg-white"
          animate={{
            height: isHovered ? '160px' : '0px',
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.4, ease: "easeInOut", delay: isHovered ? 0.1 : 0 }}
        >
          <motion.div
            className="p-4 h-full flex flex-col justify-between"
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20
            }}
            transition={{ duration: 0.3, delay: isHovered ? 0.2 : 0 }}
          >
            <div>
              <div className="font-bold text-lg text-black mb-1">
                {/* {title} */}
                {title.length > 25 ? `${title.substring(0, 25)}...` : title}
              </div>
              <div className="text-lg mb-1">
                {overview.length > 50 ? `${overview.substring(0, 50)}...` : overview}
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-sm font-bold">{rating}/5</span>
              <motion.a
                href={`/flights/${id}`}
                className="ml-auto bg-[#d35400] text-white px-4 py-1 rounded-full font-bold text-xs hover:bg-[#b8441f] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Check Details
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
  );
}