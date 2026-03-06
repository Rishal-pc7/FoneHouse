"use client";

import { motion } from "framer-motion";
import { STATUS_STEPS } from "./data";

type Props = {
    currentStatusIndex: number;
};

export default function OrderProgress({ currentStatusIndex }: Props) {
    const progress = (currentStatusIndex / (STATUS_STEPS.length - 1)) * 100;

    return (
        <div className="p-6 md:p-12">
            <div className="relative">
                {/* Track line */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-border/40 -translate-y-1/2 hidden md:block rounded-full" />
                <div className="absolute top-0 left-[30px] h-full w-1 bg-border/40 md:hidden rounded-full" />

                {/* Active line */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
                    className="absolute top-1/2 left-0 h-1 bg-brandBlue -translate-y-1/2 hidden md:block rounded-full"
                />
                <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${progress}%` }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
                    className="absolute top-0 left-[30px] w-1 bg-brandBlue flex md:hidden rounded-full"
                />

                <div className="flex flex-col md:flex-row justify-between relative gap-8 md:gap-0">
                    {STATUS_STEPS.map((step, index) => {
                        const isCompleted = index <= currentStatusIndex;
                        const isCurrent = index === currentStatusIndex;
                        const StepIcon = step.icon;
                        const iconClass = isCurrent
                            ? "border-brandBlue text-brandBlue shadow-[0_0_30px_rgba(50,119,188,0.3)]"
                            : isCompleted
                                ? "border-brandBlue/80 text-brandBlue/80 bg-brandBlue/5"
                                : "border-border text-muted-foreground";

                        return (
                            <div key={step.id} className="flex md:flex-col items-center gap-4 md:gap-3 z-10 relative">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                        delay: 0.2 + index * 0.1,
                                        type: "spring",
                                        stiffness: 200,
                                        damping: 20,
                                    }}
                                    className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-colors duration-500 relative bg-card ${iconClass}`}
                                >
                                    {isCurrent && (
                                        <span className="absolute inset-0 rounded-2xl animate-ping border border-brandBlue opacity-20 hidden md:block" />
                                    )}
                                    <StepIcon className="w-7 h-7" />
                                </motion.div>

                                <div className="md:text-center mt-0 md:mt-2">
                                    <p className={`font-bold text-sm md:text-base ${isCompleted ? "text-foreground" : "text-muted-foreground"}`}>
                                        {step.label}
                                    </p>
                                    {isCurrent && (
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-xs text-brandBlue font-medium mt-1 md:block"
                                        >
                                            Current Status
                                        </motion.p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
