import React from "react";
import { Link } from "react-router-dom";
import "../../App.css";

const About = () => {
  return (
    <div  className="overflow-hidden" style={{ background: "#EAD8C0", minHeight: "100vh", width: '100%' }}>
      <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "48px 20px 0 20px" }}>
        {/* Carrés décoratifs */}
        <div style={{
          position: "absolute",
          top: 180,
          left: -80,
          width: 180,
          height: 180,
          border: "6px solid #C7B299",
          borderRadius: 24,
          zIndex: 0,
          opacity: 0.5
        }} />
        <div style={{
          position: "absolute",
          top: 500,
          right: -100,
          width: 220,
          height: 220,
          border: "8px solid #C7B299",
          borderRadius: 32,
          zIndex: 0,
          opacity: 0.5
        }} />

        <h1 style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "2.5rem",
          marginBottom: "30px",
          color: "#222",
          position: "relative",
          zIndex: 1
        }}>
          ABOUT US
        </h1>
        <img
          src="/images/aboutus.png"
          alt="Hot air balloons"
          style={{
            display: "block",
            margin: "0 auto",
            width: "100%",
            maxHeight: 400,
            objectFit: "cover",
            borderRadius: "20px",
            position: "relative",
            zIndex: 1
          }}
        />

        {/* Section responsive */}
        <div className="about-section" style={{ display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'center', marginTop: 48, marginBottom: 48 }}>
          {/* Texte gauche */}
          <div className="about-text">
            <h2 style={{ fontWeight: "bold", fontSize: "2.0rem" }}>
              Live a Unique Hot-Air Balloon Adventure<br />with Sky Experience!
            </h2>
            <h3 style={{ marginTop: 16, fontWeight: "bold", fontSize: "1.1rem" }}>
              The Sky Experience Adventures
            </h3>
            <ul style={{ marginTop: 10, marginBottom: 30, paddingLeft: 20 }}>
              <li>Soar above Marrakech and its breathtaking landscapes in the comfort of our modern hot-air balloons.</li>
              <li>Give yourself the gift of serenity and enjoy an unforgettable view of the Atlas Mountains, the palm groves of Marrakech, and much more.</li>
              <li>Every detail has been carefully thought out to make this experience unforgettable.</li>
            </ul>
          </div>

          {/* Images droite sous forme de grille */}
          <div className="about-images-grid">
            <img src="/images/about.png" alt="about" className="about-img-large" />
            <img src="/images/smiling-woman.png" alt="Smiling woman" className="about-img-small" />
            <img src="/images/balloon-landscape.png" alt="Balloon landscape" className="about-img-small" />
          </div>
        </div>

        {/* Deuxième section avec images à droite */}
        <div className="about-section" style={{ display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'center', marginTop: 48, marginBottom: 48 }}>
          {/* Texte gauche */}
          <div className="about-text">
            <h2 style={{ fontWeight: "bold", fontSize: "2.4rem", marginBottom: 0 }}>
              Safety and Comfort: Our Priorities
            </h2>
            <h3 style={{ fontWeight: "bold", fontSize: "1.3rem", margin: "18px 0 10px 0" }}>
              Safety first always
            </h3>
            <ul style={{ marginTop: 10, paddingLeft: 20 }}>
              <li>At Sky Experience, safety is our top priority.</li>
              <li>Our certified, experienced pilots will guide you throughout the adventure, ensuring you enjoy a safe and comfortable flight.</li>
              <li>We provide perfectly maintained hot-air balloons, tailored to meet your needs, guaranteeing both safety and comfort.</li>
            </ul>
          </div>
          {/* Images droite sous forme de bloc vertical */}
          <div className="about-images-grid-2">
            <img src="/images/group-basket.png" alt="Group in basket" className="about-img-large-2" />
            <img src="/images/happy-group.png" alt="Happy group" className="about-img-small-2" />
          </div>
        </div>
        {/* Troisième section avec bloc d'images à gauche et texte à droite */}
        <div className="about-section" style={{ display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'center', marginTop: 48, marginBottom: 48 }}>
          {/* Bloc images à gauche */}
          <div>
            <div className="about-images-grid-3">
              <img src="/images/balloon-basket.png" alt="Balloon basket" className="about-img-large-3" />
              <img src="/images/balloon-land.png" alt="Balloon landscape" className="about-img-small-3 left" />
              <img src="/images/ball.png" alt="Balloon background" className="about-img-small-3 right" />
            </div>
          </div>
          {/* Texte à droite */}
          <div className="about-text">
            <h2 style={{ color: "#2C2C2C", fontWeight: "bold", fontSize: "2rem", marginBottom: 20 }}>
              A Flight Tailored to Your Expectations
            </h2>
            <ul style={{ color: "#2C2C2C", fontSize: "1.1rem", lineHeight: 1.6 }}>
              <li style={{ marginBottom: 12 }}>
                Whether you choose a classic or private flight, every experience is carefully planned to give you a panoramic view of Marrakech like you've never seen before.
              </li>
              <li>
                Every moment in the air invites you to relax and fully appreciate the stunning beauty of the landscapes around you.
              </li>
            </ul>
          </div>
        </div>
        {/* Section relaxation avec fond d'image et overlay */}
        <div className="about-relax-section" style={{    background: "radial-gradient(black, #0000008a);"}}>
          <div className="about-relax-bg"></div>
          <div className="about-relax-overlay"></div>
          <div className="about-relax-content "> 
            <h2 style={{ fontSize: '2.2rem', fontWeight: 'bold', color: '#fff', textShadow: '0 2px 8px #0007' }}>A Moment of Relaxation and Wonder</h2>
            <p style={{ color: '#fff', fontSize: '1.15rem', marginTop: 12 }}>
              A hot-air balloon ride is a rare and peaceful experience, perfect for relaxation and awe.
            </p>
            <p style={{ color: '#fff', fontSize: '1.15rem' }}>
              Step into a spacious and comfortable balloon and let yourself drift away on the gentle breeze.
            </p>
            <p style={{ color: '#fff', fontSize: '1.15rem' }}>
              Experience the tranquility of flight as you take in the ever-changing scenery below.
            </p>
          </div>
        </div>


        {/* Section: A Journey Through Moroccan Landscapes */}
        


        {/* Section: Our Commitments: A Worry-Free Experience */}
        <section style={{ padding: '56px 0 0 0', margin: '0 -20px 48px -20px', borderRadius: 32 }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px' }}>
            <h2 style={{ fontWeight: 'bold', fontSize: '2.2rem', color: '#222', marginBottom: 8, textAlign: 'center', letterSpacing: '-1px' }}>
              Our Commitments: A Worry-Free Experience
            </h2>
            <div style={{ fontSize: '1.1rem', color: '#a43518', fontWeight: 600, marginBottom: 24, textAlign: 'center' }}>Relax, we handle every detail for you</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ flex: 1, minWidth: 260 }}>
                <p style={{ color: '#222', fontSize: '1.13rem', marginBottom: 14, lineHeight: 1.7 }}>
                  From reservation to landing, we've taken care of everything so you can fully relax and enjoy the moment. We handle all the logistics—transport, welcoming, safety briefings, and personalized souvenirs at the end of your adventure. All you have to do is focus on what matters: enjoying the experience.
                </p>
                <ul style={{ color: '#444', fontSize: '1.05rem', marginLeft: 18, marginBottom: 0, lineHeight: 1.6 }}>
                  <li>Easy booking and clear communication</li>
                  <li>Warm welcome and professional team</li>
                  <li>Safety briefings and certified pilots</li>
                  <li>Personalized souvenirs and memories</li>
                </ul>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1, minWidth: 260 }}>
                <div style={{ display: 'flex', gap: 16, justifyContent: 'flex-end' }}>
                  <img src="/images/one.jpg" alt="one" style={{ width: 180, height: 120, objectFit: 'cover', borderRadius: 18, boxShadow: '0 4px 16px #0001' }} />
                  <img src="/images/too.png" alt="Too" style={{ width: 100, height: 120, objectFit: 'cover', borderRadius: 18, boxShadow: '0 4px 16px #0001' }} />
                </div>
                <img src="/images/happy-group.png" alt="Happy group" style={{ width: 340, height: 100, objectFit: 'cover', borderRadius: 18, boxShadow: '0 4px 16px #0001', marginLeft: 0 }} />
              </div>
            </div>
          </div>
        </section>
        
      </div>
    </div>
  );
};

export default About;