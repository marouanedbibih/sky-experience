const Footer = () => {

    return (
            <footer className="bg-[#885E3C] text-white py-10 mt-0">
              <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start gap-8">
                {/* Bloc gauche : logo et contact */}
                <div className="flex-1 min-w-[220px] flex flex-col gap-3">
                  <img src="/images/skyexp.png" alt="SKY EXPERIENCE Logo" className="h-14 w-auto mb-2" style={{ maxWidth: 160 }} />
                  <div className="font-bold text-sm mb-1">ADRESS:</div>
                  <div className="text-sm font-bold underline leading-tight">3ème Étage Bureau N° 16, Angle Bd<br/>Moulay Rachid, Marrakech 40000</div>
                  <div className="flex items-center gap-2 mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-.659 1.591l-7.591 7.591a2.25 2.25 0 01-3.182 0L3.909 8.584A2.25 2.25 0 013.25 6.993V6.75" /></svg>
                    <span className="font-bold text-sm">CONTACT</span>
                  </div>
                  <a href="mailto:contact@skyexperience-marrakech.com" className="text-xs underline">contact@skyexperience-marrakech.com</a>
                  <div className="mt-2 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h0a2.25 2.25 0 002.25-2.25v-2.1a1.35 1.35 0 00-1.012-1.31l-3.2-.8a1.35 1.35 0 00-1.638.65l-.7 1.4a11.25 11.25 0 01-5.1-5.1l1.4-.7a1.35 1.35 0 00.65-1.638l-.8-3.2A1.35 1.35 0 007.6 4.5h-2.1A2.25 2.25 0 003.25 6.75v0z" /></svg>
                    <span className="text-xs font-bold">Customer support:</span>
                    <a href="tel:+212661445327" className="text-xs font-bold underline">+212661445327</a>
                  </div>
                </div>
                {/* Bloc centre : menu navigation */}
                <div className="flex-1 min-w-[180px] flex flex-col gap-2 mt-8 md:mt-0">
                  <div className="font-bold mb-2">Useful Links</div>
                  <ul className="space-y-2 text-sm">
                    <li><a href="/" className="hover:underline font-bold">• Home</a></li>
                    <li><a href="/about" className="hover:underline font-bold">• About us</a></li>
                    <li><a href="/booking" className="hover:underline font-bold">• Flights</a></li>
                    <li><a href="/contact" className="hover:underline font-bold">• Contact</a></li>
                  </ul>
                </div>
                {/* Bloc droite : réseaux sociaux */}
                <div className="flex-1 min-w-[120px] flex flex-col items-start md:items-end gap-3 mt-8 md:mt-0">
                  <div className="font-bold mb-2">JOIN US</div>
                  <div className="flex gap-4">
                    <a href="#" aria-label="Facebook" className="inline-flex items-center justify-center w-8 h-8 rounded bg-white/10 border border-white"><svg fill="white" viewBox="0 0 24 24" className="w-5 h-5"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg></a>
                    <a href="#" aria-label="Instagram" className="inline-flex items-center justify-center w-8 h-8 rounded bg-white/10 border border-white"><svg fill="white" viewBox="0 0 24 24" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.131 4.602.425 3.635 1.392 2.668 2.359 2.374 3.532 2.315 4.808 2.256 6.088 2.243 6.497 2.243 12c0 5.503.013 5.912.072 7.192.059 1.276.353 2.449 1.32 3.416.967.967 2.14 1.261 3.416 1.32 1.28.059 1.689.072 7.192.072s5.912-.013 7.192-.072c1.276-.059 2.449-.353 3.416-1.32.967-.967 1.261-2.14 1.32-3.416.059-1.28.072-1.689.072-7.192s-.013-5.912-.072-7.192c-.059-1.276-.353-2.449-1.32-3.416C19.051.425 17.878.131 16.602.072 15.322.013 14.913 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.881 0 1.44 1.44 0 012.881 0z"/></svg></a>
                  </div>
                </div>
        </div>
      </footer>

    );
};

export default Footer;