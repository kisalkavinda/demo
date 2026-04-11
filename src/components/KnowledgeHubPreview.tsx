'use client';

export default function KnowledgeHubPreview() {
  return (
    <section className="relative w-full py-32 px-6 md:px-24 bg-[#0e0804] text-white z-20">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center md:text-left space-y-4">
          <span className="text-white/60 text-sm tracking-widest uppercase">The Platform</span>
          <h2 className="text-4xl md:text-6xl font-serif tracking-wide">
            Beyond the Mine
          </h2>
          <p className="text-white/70 max-w-2xl text-lg font-light">
            GemHaven connects the depths of Ratnapura to the world&apos;s finest markets, ensuring traceability, certification, and fair value at every step.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            title="Mine to Market Traceability"
            description="Track every gemstone's journey using blockchain-backed immutable records from raw extraction to polished gem."
          />
          <FeatureCard 
            title="Gem Certification"
            description="Integration with premier Sri Lankan and global gem authorities to provide digital, verifiable grading reports."
          />
          <FeatureCard 
            title="Global Marketplace"
            description="A curated transparent B2B trading floor connecting verified local miners with global jewelry houses and collectors."
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ title, description }: { title: string, description: string }) {
  return (
    <div className="border border-white/10 p-8 rounded-sm bg-white/[0.02] hover:bg-white/[0.05] transition-colors group">
      <h3 className="text-xl font-serif mb-3 tracking-wide group-hover:text-amber-200 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-white/60 font-light leading-relaxed">
        {description}
      </p>
    </div>
  );
}
