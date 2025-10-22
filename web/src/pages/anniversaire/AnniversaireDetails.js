import { useState } from "react";
import "../../App.css";
import AnimatedCard from "../../components/flightCard";

const AnniversaireDetails = () => {
  // Images pour la colonne de miniatures
  const thumbnails = [
    '/images/birthday1.jpg',
    '/images/birthday2.jpg',
    '/images/birthday3.jpg',
    '/images/private4.png',
  ];
  const [mainImg, setMainImg] = useState('/images/birthday.jpg');
  return (
    <div className="min-h-screen bg-[#ecd3bb] flex flex-col items-center">
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-8 mt-12 px-4">
        {/* Colonne gauche : miniatures */}
        <div className="flex flex-row md:flex-col gap-3 md:gap-4 items-center md:items-start">
          {thumbnails.map((src, idx) => (
            <img
              key={src}
              src={src}
              alt={"Anniversaire thumbnail " + (idx+1)}
              className={`w-16 h-16 md:w-20 md:h-20 object-cover rounded-xl border-2 ${mainImg===src ? 'border-orange-500' : 'border-transparent'} cursor-pointer`}
              onClick={() => setMainImg(src)}
            />
          ))}
        </div>
        {/* Centre : image principale + infos */}
        <div className="flex-1 flex flex-col items-center md:items-start">
          <h1 className="text-2xl md:text-3xl font-extrabold mb-4 mt-2 md:mt-0">
            <span className="font-black">ANNIVERSAIRE Hot-Air Balloon Flight</span>
          </h1>
          <img src={mainImg} alt="Anniversaire main" className="w-full max-w-xl h-56 md:h-64 object-cover rounded-2xl mb-6" />
          <h2 className="text-xl md:text-2xl font-bold mb-2">🎁 Pack Anniversaire</h2>
          <ul className="list-disc pl-6 text-base md:text-lg text-black/80 mb-4">
            <li>🚗 Transport aller-retour privé depuis votre hôtel ou domicile à Marrakech</li>
            <li>🎈 Vol en montgolfière privé, rien que pour vous</li>
            <li>🎂 Gâteau d’anniversaire personnalisé avec le prénom du célébré</li>
            <li>🥐 Petit-déjeuner gourmand servi après le vol, aux saveurs marocaines</li>
            <li>📸 Photos souvenirs imprimées + numériques prises pendant le vol et à l’embarquement</li>
            <li>📜 Certificat de vol "Spécial Anniversaire" personnalisé</li>
            <li>🎉 Décoration festive du panier : ballons, banderoles « Joyeux Anniversaire »</li>
          </ul>
          <h3 className="text-lg md:text-xl font-bold mb-2">🗓️ Réservation</h3>
          <ul className="list-disc pl-6 text-base md:text-lg text-black/80 mb-4">
            <li>Minimum 7 jours à l’avance</li>
            <li>Offre valable toute l’année, sous réserve des conditions météo</li>
          </ul>
          <div className="text-base md:text-lg text-black/90 mb-4">
            <p>✨ Un moment suspendu entre ciel et terre, pour célébrer une nouvelle année de la plus belle des façons.</p>
          </div>
        </div>
        {/* Colonne droite : calendrier, prix, boutons */}
        <div
          className="w-full md:w-80 flex flex-col items-center bg-white rounded-2xl shadow-lg p-6 mt-4 md:mt-0"
          style={{
            minHeight: "480px",
            justifyContent: "flex-start",
            boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
            borderRadius: "20px"
          }}
        >
          {/* Calendrier style CLASSIC */}
          <div className="w-full mb-6">
            <div className="flex justify-between items-center mb-2">
              <button className="text-xl font-bold bg-transparent border-none cursor-pointer">&lt;</button>
              <div className="text-lg font-bold">May <span className="font-normal">2025</span></div>
              <button className="text-xl font-bold bg-transparent border-none cursor-pointer">&gt;</button>
            </div>
            <div className="grid grid-cols-7 text-center text-xs text-gray-500 mb-1 w-full">
              {['Mon','Tue','Wen','Thu','Fri','Sat','Sun'].map(d => <div key={d}>{d}</div>)}
            </div>
            <div className="grid grid-cols-7 text-center text-base gap-y-1 w-full">
              {Array.from({length:31},(_,i)=>(<div key={i} className="py-1">{i+1}</div>))}
            </div>
          </div>
          <div className="w-full flex flex-row justify-between items-center mb-4">
            <span className="font-bold text-lg">Price :</span>
            <span className="text-3xl font-extrabold text-[#e74c3c]">$200</span>
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
              Definitely a bucket list experience. Everything went smoothly on the day. Jamal and the team were great, really friendly and checked In with us throughout the morning to check we were enjoying the experience. Good value for the money with breakfast and transfers included. Thank you to Jamal. The pilot and the rest of the team.
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
          <p className="mb-2">A Magical Celebration in the Skies</p>
          <p className="mb-2">Make this birthday truly unforgettable with an exclusive hot-air balloon flight above the stunning landscapes of Marrakech. Designed with care, elegance, and a touch of wonder, this private experience is perfect for celebrating life, love, and unforgettable milestones.</p>
          <p className="mb-2">Float gracefully above Berber villages, golden desert dunes, and the majestic Atlas Mountains as the sun rises—just you, the open sky, and the person you're celebrating. Every detail is tailored to mark the occasion in a truly extraordinary way.</p>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-yellow-400 text-xl">★★★★★</span>
        </div>
        <h3 className="text-2xl font-bold mb-2">What's Included</h3>
        <ul className="list-disc pl-6 text-base md:text-lg text-black/80 mb-16">
          <li>🎈 Private hot-air balloon flight for the birthday guest and their companions
</li>
          <li>🚗 Round-trip luxury transport from your hotel or residence in Marrakech</li>
          <li>☕ Warm welcome with Moroccan tea and refreshments in an elegant private lounge</li>
          <li>🔧 Behind-the-scenes access to the balloon preparation and inflation process</li>
          <li>👨‍✈️ Personal safety briefing from your experienced, certified pilot</li>
          <li>🌄 1-hour flight offering breathtaking panoramic views of the desert, villages, and mountains</li>
          <li>🥐 Gourmet birthday breakfast with personalized Moroccan delicacies</li>
          <li>🎂 Custom birthday cake with the guest's name, served in the sky or upon landing</li>
          <li>📸 Professional souvenir photos, both printed and digital</li>
          <li>📜 Personalized flight certificate, a keepsake to remember this exceptional birthday</li>
        </ul>
      </div>
      {/* FLIGHT suggestion section */}
      <div className="w-full max-w-6xl mx-auto mb-0 px-4">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-8">FLIGHT suggestion</h2>
        
        <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch mb-16">
          <AnimatedCard />
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
                <div className="font-bold text-lg text-black bg-white/70 px-2 py-1 rounded mb-1 w-fit">ROYAL <span className="font-normal">Hot-Air Balloon Flight in Marrakech</span></div>
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
};

export default AnniversaireDetails;
