import { motion } from "framer-motion";

export default function PageHero() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mx-auto text-center mb-12"
        >
            <h1
                className={[
                    "text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4",
                    "font-urbanist leading-tight",
                ].join(" ")}
            >
                Track Your{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-brandBlue to-brandGreen">
                    Order
                </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto font-manrope">
                Enter your order ID below to get real-time updates on your FoneHouse purchase.
            </p>
        </motion.div>
    );
}
