const MOBILE_PATTERN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Crect x='14' y='8' width='38' height='68' rx='7' stroke='%233277bc' stroke-width='2' fill='none'/%3E%3Crect x='22' y='14' width='22' height='3' rx='1.5' fill='%233277bc'/%3E%3Ccircle cx='33' cy='66' r='3.5' stroke='%233277bc' stroke-width='1.5' fill='none'/%3E%3Cpath d='M100 30 Q110 20 120 30' stroke='%233277bc' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3Cpath d='M95 24 Q110 10 125 24' stroke='%233277bc' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3Cpath d='M90 18 Q110 0 130 18' stroke='%233277bc' stroke-width='1' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='110' cy='34' r='2' fill='%233277bc'/%3E%3Ccircle cx='108' cy='118' r='9' stroke='%233277bc' stroke-width='1.5' fill='none'/%3E%3Ccircle cx='108' cy='118' r='3.5' fill='%233277bc' opacity='0.6'/%3E%3Ccircle cx='132' cy='118' r='9' stroke='%233277bc' stroke-width='1.5' fill='none'/%3E%3Ccircle cx='132' cy='118' r='3.5' fill='%233277bc' opacity='0.6'/%3E%3Cpath d='M117 118 Q120 110 123 118' stroke='%233277bc' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`;

export default function ShopHero() {
    return (
        <div className="relative border-b border-zinc-800/50 pt-24 pb-16 overflow-hidden">
            {/* Mobile-themed pattern – only covers the hero section */}
            <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none opacity-[0.055]"
                style={{ backgroundImage: MOBILE_PATTERN, backgroundSize: "160px 160px" }}
            />
            {/* Subtle static gradient orbs - GPU-safe: no blur, uses opacity only */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-brandBlue/8 rounded-full -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-1/3 w-[500px] h-48 bg-brandBlue/5 rounded-full translate-y-1/2 pointer-events-none" />

            <div className="container mx-auto px-4 text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 mb-8">
                    <span className="w-2 h-2 rounded-full bg-brandBlue" />
                    <span className="text-xs font-medium tracking-widest text-zinc-400 uppercase">Premium Selection</span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter text-transparent bg-clip-text bg-linear-to-br from-white via-zinc-200 to-zinc-600">
                    Shop Our<br />Collection
                </h1>

                <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-light tracking-wide">
                    Discover the latest mobile devices and genuine accessories.
                    Designed for performance, curated for you.
                </p>
            </div>
        </div>
    );
}
