'use client';

export default function CTAFooter() {
  return (
    <footer className="w-full bg-[#0e0804] text-white py-24 border-t border-white/10 z-20 relative">
      <div className="max-w-4xl mx-auto text-center space-y-10 px-6">
        <h2 className="text-4xl md:text-5xl font-serif tracking-wide drop-shadow-md">
          Ready to discover authenticity?
        </h2>
        <p className="text-white/60 text-lg font-light">
          From the depths of Ratnapura to the world&apos;s gem markets.
        </p>
        
        <button 
          className="px-8 py-4 bg-white text-[#0e0804] font-medium tracking-wide uppercase text-sm hover:bg-amber-100 hover:scale-105 transition-all duration-300 rounded-sm"
          aria-label="Explore GemHaven platform"
        >
          Explore GemHaven
        </button>

        <div className="pt-24 flex flex-col md:flex-row items-center justify-between text-white/40 text-xs tracking-widest uppercase border-t border-white/10">
          <span>&copy; {new Date().getFullYear()} GemHaven Sri Lanka</span>
          <div className="flex space-x-6 mt-6 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
