import { useState } from "react";
import "../../App.css";

const MariageDetails = () => {
  const thumbnails = [
    '/images/mariage0.png',
    '/images/mariage2.png',
    '/images/mariage3.png',
    '/images/mariage4.png',
  ];
  const [mainImg, setMainImg] = useState('/images/mariage-main.png');
  return (
    <div className="min-h-screen bg-[#ecd3bb] flex flex-col items-center">
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-8 mt-12 px-4">
        {/* Colonne gauche : miniatures */}
        <div className="flex flex-row md:flex-col gap-3 md:gap-4 items-center md:items-start">
          {thumbnails.map((src, idx) => (
            <img
              key={src}
              src={src}
              alt={"Mariage thumbnail " + (idx+1)}
              className={`w-16 h-16 md:w-20 md:h-20 object-cover rounded-xl border-2 ${mainImg===src ? 'border-orange-500' : 'border-transparent'} cursor-pointer`}
              onClick={() => setMainImg(src)}
            />
          ))}
        </div>
        {/* Centre : image principale + infos */}
        <div className="flex-1 flex flex-col items-center md:items-start">
          <h1 className="text-2xl md:text-3xl font-extrabold mb-4 mt-2 md:mt-0">
            <span className="font-black">MARIAGE Hot-Air Balloon Flight</span>
          </h1>
          <img src={mainImg} alt="Mariage main" className="w-full max-w-xl h-56 md:h-64 object-cover rounded-2xl mb-6" />
          <h2 className="text-xl md:text-2xl font-bold mb-2">💍 Pack Mariage</h2>
          <ul className="list-disc pl-6 text-base md:text-lg text-black/80 mb-4">
            <li>🚗 Transport privé aller-retour depuis votre hôtel ou domicile à Marrakech</li>
            <li>🎈 Vol en montgolfière privatisé pour les mariés et leurs invités</li>
            <li>💐 Décoration romantique du panier : fleurs, ballons, banderoles « Just Married »</li>
            <li>🥐 Petit-déjeuner gourmet servi après le vol, aux saveurs marocaines</li>
            <li>📸 Séance photo professionnelle pendant le vol et à l’embarquement</li>
            <li>📜 Certificat de vol "Spécial Mariage" personnalisé</li>
            <li>🎂 Gâteau de mariage personnalisé</li>
          </ul>
          <h3 className="text-lg md:text-xl font-bold mb-2">🗓️ Réservation</h3>
          <ul className="list-disc pl-6 text-base md:text-lg text-black/80 mb-4">
            <li>Minimum 14 jours à l’avance</li>
            <li>Offre valable toute l’année, sous réserve des conditions météo</li>
          </ul>
          <div className="text-base md:text-lg text-black/90 mb-4">
            <p>✨ Un moment suspendu entre ciel et terre pour célébrer l’amour de la plus belle des façons.</p>
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
            <span className="text-3xl font-extrabold text-[#e74c3c]">Sur devis</span>
          </div>
          <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg mb-3 transition">Demander un devis</button>
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
              <div className="w-12 h-12 rounded-lg bg-[#5a2323] flex items-center justify-center text-white text-2xl font-bold">A</div>
              <div>
                <div className="font-bold">Amira & Youssef</div>
                <div className="text-xs text-gray-200">il y a 2 mois</div>
              </div>
            </div>
            <div className="flex items-center gap-1 mb-2">
              {Array(5).fill(0).map((_,i) => <span key={i} className="text-yellow-400 text-lg">★</span>)}
            </div>
            <div className="text-xs md:text-sm">
              Un mariage féérique dans les airs ! Merci à toute l’équipe pour cette organisation parfaite et les souvenirs inoubliables.
            </div>
          </div>
          {/* Review 2 */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-5 flex flex-col gap-2 min-w-[220px]">
            <div className="flex items-center gap-3 mb-2">
              <img src="/images/avatar1.png" alt="Sophie Martin" className="w-12 h-12 rounded-lg object-cover bg-gray-200" />
              <div>
                <div className="font-bold text-black">Sophie Martin</div>
                <div className="text-xs text-gray-500">il y a 1 mois</div>
              </div>
            </div>
            <div className="flex items-center gap-1 mb-2">
              {Array(5).fill(0).map((_,i) => <span key={i} className="text-yellow-400 text-lg">★</span>)}
            </div>
            <div className="text-xs md:text-sm text-black">
              Une expérience magique pour notre union, tout était parfait du début à la fin.
            </div>
          </div>
        </div>
        {/* Overview */}
        <h2 className="text-3xl font-extrabold mb-4">Overview</h2>
        <div className="text-base md:text-lg text-black/90 mb-6 max-w-3xl">
          <p className="mb-2">A Dream Wedding Above Marrakech</p>
          <p className="mb-2">Celebrate your love with a unique hot-air balloon wedding flight. Enjoy breathtaking views, a romantic atmosphere, and a personalized experience for you and your guests.</p>
          <p className="mb-2">From the decoration to the gourmet breakfast, every detail is designed to make your big day unforgettable.</p>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-yellow-400 text-xl">★★★★★</span>
        </div>
        <h3 className="text-2xl font-bold mb-2">What's Included</h3>
        <ul className="list-disc pl-6 text-base md:text-lg text-black/80 mb-16">
          <li>🎈 Private hot-air balloon flight for two
</li>
          <li>💐 Romantic flowers or bouquet placed in the basket</li>
          <li>❤️ Personalized proposal setup
(floor banner, rose petals, aerial message, or custom sign)</li>
          <li>📸 Souvenir photos + optional video
(captured discreetly during the flight and proposal moment)</li>
          <li>🥐 Romantic breakfast after landing</li>
          <li>📜 “Yes for Life” flight certificate, to commemorate the moment</li>
        </ul>
      </div>
    </div>
  );
};

export default MariageDetails;
