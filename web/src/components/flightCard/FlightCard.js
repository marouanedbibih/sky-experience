import { StarIcon } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

// Helper function to get appropriate icons for program items
const getProgramIcon = (miniTitle) => {
  const iconMap = {
    'Transport': '🚗',
    'VIP private transport': '🚗',
    'Safety Briefing': '🦺',
    'Private safety briefing': '🦺',
    'Flight': '⏱️',
    'Hour Flight': '⏱️',
    '1 Hour Flight': '⏱️',
    'Breakfast': '🥐',
    'Gourmet breakfast': '🥐',
    'Certificate': '📜',
    'Flight Certificate': '📜',
    'Photos': '📸',
    'Professional Photos': '📸',
    'Insurance': '🛡️',
    'Full Insurance': '🛡️',
    'Champagne': '🍾',
    'Champagne Toast': '🍾'
  };
  
  // Find matching icon or use default
  for (const [key, icon] of Object.entries(iconMap)) {
    if (miniTitle.includes(key)) {
      return icon;
    }
  }
  
  return '✅'; // Default icon
};

export default function FlightCard({
  mainImage, // Changed from imageSrc to mainImage
  title,
  price,
  program = [], // Changed from features to program
  buttonText = 'Book now',
  imageLink,
  rating,
  category
}) {
  return (
    <div className="flex flex-col p-8 gap-8 w-full bg-[#eec09a] rounded-2xl max-w-full md:max-w-none">
      {/* Title at the very top */}
      <div className="flex justify-between items-start w-full">
        <div>
          <h3 className="text-2xl font-bold text-black" style={{textIndent: "0px"}}>
            {title}
          </h3>
          {category && (
            <span className="inline-block bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full mt-2">
              {category}
            </span>
          )}
        </div>
        <span className="text-lg font-bold text-black">
          Price: <span className="text-[#b94c2a] text-2xl">${price}</span>
        </span>
      </div>

      {/* Content row (image + details) */}
      <div className="flex flex-col md:flex-row gap-8 items-stretch">
        {/* Image Section */}
        <div className="w-full md:w-2/5 flex items-center justify-center">
          {imageLink ? (
            <Link to={imageLink} className="block w-full h-full">
              <img 
                src={mainImage} 
                alt={title}
                className="rounded-2xl object-cover w-full h-[300px] md:h-[340px] transition-transform hover:scale-105 cursor-pointer"
                style={{ objectPosition: 'center' }}
                onError={(e) => {
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300' fill='%23f3f4f6'%3E%3Cpath d='M200 150c-20 0-40-10-50-25l-25 15c15 25 45 40 75 40s60-15 75-40l-25-15c-10 15-30 25-50 25z' fill='%23d35400'/%3E%3Ccircle cx='200' cy='120' r='15' fill='%23d35400'/%3E%3C/svg%3E";
                }}
              />
            </Link>
          ) : (
            <img 
              src={mainImage} 
              alt={title}
              className="rounded-2xl object-cover w-full h-[300px] md:h-[340px]"
              style={{ objectPosition: 'center' }}
              onError={(e) => {
                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300' fill='%23f3f4f6'%3E%3Cpath d='M200 150c-20 0-40-10-50-25l-25 15c15 25 45 40 75 40s60-15 75-40l-25-15c-10 15-30 25-50 25z' fill='%23d35400'/%3E%3Ccircle cx='200' cy='120' r='15' fill='%23d35400'/%3E%3C/svg%3E";
              }}
            />
          )}
        </div>

        {/* Details Section */}
        <div className="w-full md:w-3/5 flex flex-col justify-between">
          {/* Rating (if available and > 0) */}
          {rating > 0 && (
            <div className="flex items-center mb-4">
              <span className="text-lg mr-1">
                <StarIcon className="fill-yellow-500 text-yellow-500" />
              </span>
              <span className="text-sm font-bold text-gray-700">
                {rating}/5
              </span>
            </div>
          )}


          {/* Program Features */}
          <ul className="space-y-3">
            {program.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-2xl mt-1">{getProgramIcon(item.miniTitle)}</span>
                <div>
                  <span className="font-bold text-black block mb-1">
                    {item.miniTitle}
                  </span>
                  <div className="text-black/80 text-sm">
                    {item.text}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex justify-end mt-8">
            <Link 
              to={imageLink || "/booking"} 
              className="bg-[#b94c2a] hover:scale-110 transition-all duration-300 hover:bg-orange-600 text-white px-8 py-3 rounded-md font-bold text-lg uppercase tracking-wider shadow-lg"
            >
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}