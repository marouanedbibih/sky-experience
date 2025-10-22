import { useState } from "react";
import Header from "../../components/header/Header";

 export  default function RoyalFlightPage() {
  const thumbnails = [
    '/images/royal1.png',
    '/images/royal2.png',
    '/images/royal3.png',
    '/images/royal4.png',
  ];
  const [mainImg, setMainImg] = useState('/images/royal-main.png');
  return (
    <div className="min-h-screen bg-[#ecd3bb] flex flex-col items-center">
   
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-8 mt-12 px-4">
        {/* Colonne gauche : miniatures */}
        <div className="flex flex-row md:flex-col gap-3 md:gap-4 items-center md:items-start">
          {thumbnails.map((src, idx) => (
            <img
              key={src}
              src={src}
              alt={"Royal thumbnail " + (idx+1)}
              className={`w-16 h-16 md:w-20 md:h-20 object-cover rounded-xl border-2 ${mainImg===src ? 'border-orange-500' : 'border-transparent'} cursor-pointer`}
              onClick={() => setMainImg(src)}
            />
          ))}
        </div>
        {/* Centre : image principale + infos */}
        <div className="flex-1 flex flex-col items-center md:items-start">
          <h1 className="text-2xl md:text-3xl font-extrabold mb-4 mt-2 md:mt-0"><span className="font-black">ROYAL</span> Flight in Marrakech</h1>
          <img src={mainImg} alt="Royal main" className="w-full max-w-xl h-56 md:h-64 object-cover rounded-2xl mb-6" />
          <ul className="list-disc pl-6 text-base md:text-lg text-black/80 mb-4">
            <li>Luxury round-trip transport from your hotel</li>
            <li>VIP welcome with Moroccan tea and snacks</li>
            <li>1-hour hot-air balloon flight over Marrakech</li>
            <li>Traditional breakfast in a nomadic kasbah</li>
            <li>Personalized flight certificate included</li>
          </ul>
        </div>
        {/* Colonne droite : calendrier, prix, boutons */}
        <div className="w-full md:w-80 flex flex-col items-center bg-white rounded-2xl shadow-lg p-6 mt-4 md:mt-0">
          {/* Calendrier simplifié */}
          <div className="w-full mb-6">
            <div className="flex justify-between items-center mb-2">
              <button className="text-xl font-bold">&#60;</button>
              <div className="text-lg font-bold">May <span className="font-normal">2025</span></div>
              <button className="text-xl font-bold">&#62;</button>
            </div>
            <div className="grid grid-cols-7 text-center text-xs text-gray-500 mb-1">
              {['Mon','Tue','Wen','Thu','Fri','Sat','Sun'].map(d => <div key={d}>{d}</div>)}
            </div>
            <div className="grid grid-cols-7 text-center text-sm gap-y-1">
              {Array.from({length:31},(_,i)=>(<div key={i} className="py-1">{i+1}</div>))}
            </div>
          </div>
          <div className="w-full flex flex-row justify-between items-center mb-4">
            <span className="font-bold text-lg">Price :</span>
            <span className="text-3xl font-extrabold text-[#e74c3c]">$550</span>
          </div>
          <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg mb-3 transition">check availability</button>
          <button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 rounded-lg transition">CONTACT</button>
        </div>
      </div>
      {/* Bloc Reviews + Overview */}
      <div className="w-full max-w-6xl mx-auto mt-12 px-4">
        {/* Reviews */}
        <h2 className="text-2xl md:text-3xl font-extrabold mb-6">Reviews</h2>
        <div className="flex flex-col md:flex-row gap-6 mb-12">
          {/* Review 1 */}
          <div className="flex-1 bg-[#4d1f1f] text-white rounded-2xl shadow-lg p-5 flex flex-col gap-2 min-w-[220px]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-lg bg-[#5a2323] flex items-center justify-center text-white text-2xl font-bold">L</div>
              <div>
                <div className="font-bold">Lizzie MackQ</div>
                <div className="text-xs text-gray-200">il y a 6 mois</div>
              </div>
            </div>
            <div className="flex items-center gap-1 mb-2">
              {Array(5).fill(0).map((_,i) => <span key={i} className="text-yellow-400 text-lg">★</span>)}
            </div>
            <div className="text-xs md:text-sm">
              Definitely a bucket list experience. Everything went smoothly on the day. Jamal and the team were great, really friendly and checked in with us throughout the morning to check we were enjoying the experience. Good value for the money with breakfast and transfers included. Thank you to Jamal. The pilot and the rest of the team.
            </div>
          </div>
          {/* Review 2 */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-5 flex flex-col gap-2 min-w-[220px]">
            <div className="flex items-center gap-3 mb-2">
              <img src="/images/avatar1.png" alt="Silvia Gross" className="w-12 h-12 rounded-lg object-cover bg-gray-200" />
              <div>
                <div className="font-bold text-black">Silvia Gross</div>
                <div className="text-xs text-gray-500">il y a 3 semaines</div>
              </div>
            </div>
            <div className="flex items-center gap-1 mb-2">
              {Array(5).fill(0).map((_,i) => <span key={i} className="text-yellow-400 text-lg">★</span>)}
            </div>
            <div className="text-xs md:text-sm text-black">
              Une expérience sensationnelle. Je ne peux que recommander cette organisation.
            </div>
          </div>
          {/* Review 3 */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-5 flex flex-col gap-2 min-w-[220px]">
            <div className="flex items-center gap-3 mb-2">
              <img src="/images/avatar2.png" alt="OKTAY" className="w-12 h-12 rounded-lg object-cover bg-gray-200" />
              <div>
                <div className="font-bold text-black">OKTAY</div>
                <div className="text-xs text-gray-500">il y a 8 mois</div>
              </div>
            </div>
            <div className="flex items-center gap-1 mb-2">
              {Array(5).fill(0).map((_,i) => <span key={i} className="text-yellow-400 text-lg">★</span>)}
            </div>
            <div className="text-xs md:text-sm text-black">
              Loved the flight and view. Everything was very smooth.
            </div>
          </div>
        </div>
        {/* Overview */}
        <h2 className="text-3xl font-extrabold mb-4">Overview</h2>
        <div className="text-base md:text-lg text-black/90 mb-6 max-w-3xl">
          <p className="mb-2">A Royal Escape Above Marrakech</p>
          <p className="mb-2">Experience the ultimate in luxury and exclusivity with our Royal hot-air balloon flight. Perfect for special occasions or simply treating yourself to the best, this flight offers breathtaking views, VIP service, and unforgettable memories above the Red City and the Atlas Mountains.</p>
          <p className="mb-2">From the moment you arrive, you'll be treated like royalty. Enjoy a private transfer, a gourmet breakfast, and a flight certificate to commemorate your adventure.</p>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-yellow-400 text-xl">★★★★★</span>
        </div>
        <h3 className="text-2xl font-bold mb-2">What's Included</h3>
        <ul className="list-disc pl-6 text-base md:text-lg text-black/80 mb-16">
          <li>Luxury round-trip transport in a high-end vehicle from your hotel or riad</li>
          <li>VIP welcome with Moroccan tea and snacks</li>
          <li>Behind-the-scenes access to the balloon preparation and inflation process</li>
          <li>Personal safety briefing by your certified, experienced pilot</li>
          <li>A 1-hour royal flight with panoramic views of the Atlas Mountains, Berber villages, and Moroccan desert</li>
          <li>Gourmet traditional breakfast, personalized just for you, featuring refined local flavors</li>
          <li>Personalized flight certificate, as a keepsake of this extraordinary experience</li>
        </ul>
      </div>
      {/* FLIGHT suggestion section (réutilisé) */}
      <div className="w-full max-w-6xl mx-auto mb-0 px-4">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-8">FLIGHT suggestion</h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch mb-16">
          {/* CLASSIC */}
          <div className="relative bg-white rounded-2xl shadow-lg flex-1 flex flex-col overflow-hidden max-w-xs mx-auto">
            <img src="/images/classic.png" alt="Classic" className="w-full h-48 object-cover" />
            <span className="absolute top-3 right-0 bg-[#f39c12] text-white text-xs font-bold px-4 py-1 rounded-l-xl">Most reserved</span>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="font-bold text-lg text-black mb-1">CLASSIC <span className="font-normal">Hot-Air Balloon Flight in Marrakech</span></div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-yellow-400 text-lg">★</span>
                <span className="text-sm font-bold">4.9/5</span>
                <a href="/classic-flight" target="_blank" rel="noopener noreferrer" className="ml-auto bg-[#d35400] text-white px-4 py-1 rounded-full font-bold text-xs">Check Details</a>
              </div>
            </div>
          </div>
          {/* ROYAL (carte suggestion) */}
          <div className="relative bg-white rounded-2xl shadow-lg flex-1 flex flex-col overflow-hidden max-w-xs mx-auto">
            <img src="/images/royal-main.png" alt="Royal" className="w-full h-48 object-cover" />
            <span className="absolute top-3 right-3 bg-[#ff5e5e] text-white text-xs font-bold px-4 py-1 rounded-xl">VIP</span>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="font-bold text-lg text-white bg-black/70 px-2 py-1 rounded mb-1 w-fit">ROYAL <span className="font-normal">Hot-Air Balloon Flight in Marrakech</span></div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-yellow-400 text-lg">★</span>
                <span className="text-sm font-bold">4.9/5</span>
                <a href="/royal-flight" target="_blank" rel="noopener noreferrer" className="ml-auto bg-[#d35400] text-white px-4 py-1 rounded-full font-bold text-xs">Check Details</a>
              </div>
            </div>
          </div>
        </div>
      </div>
  
    </div>
  );
}
