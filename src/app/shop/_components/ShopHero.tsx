export default function ShopHero() {
    return (
        <div className="relative border-b border-zinc-800/50 dark:border-zinc-900/50 pt-24 pb-16 overflow-hidden">
            {/* Background Glow Effects */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brandBlue/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none mix-blend-screen" />
            <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-brandGreen/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-0 left-1/3 w-[600px] h-[300px] bg-brandRed/5 rounded-full blur-[100px] translate-y-1/2 pointer-events-none mix-blend-screen" />

            <div className="container mx-auto px-4 text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/50 border border-zinc-800 backdrop-blur-md mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <span className="w-2 h-2 rounded-full bg-brandBlue animate-pulse" />
                    <span className="text-xs font-medium tracking-widest text-zinc-400 uppercase">Premium Selection</span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter text-transparent bg-clip-text bg-linear-to-br from-white via-zinc-200 to-zinc-600 animate-in fade-in slide-in-from-bottom-6 duration-1000">
                    Shop Our<br />Collection
                </h1>

                <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-light tracking-wide animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
                    Discover the latest mobile devices and genuine accessories.
                    Designed for performance, curated for you.
                </p>
            </div>
        </div>
    );
}
