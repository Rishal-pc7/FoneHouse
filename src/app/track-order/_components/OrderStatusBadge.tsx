"use client";

import { motion } from "framer-motion";
import { SPECIAL_STATUSES } from "./data";

type Props = { status: string };

export default function OrderStatusBadge({ status }: Props) {
    const config = SPECIAL_STATUSES[status];
    if (!config) return null;

    const Icon = config.icon;

    return (
        <div className="p-6 md:p-12 flex flex-col items-center justify-center gap-4 text-center">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                className={`w-20 h-20 rounded-2xl flex items-center justify-center border-2 bg-card ${config.border} ${config.color}`}
            >
                <Icon className="w-9 h-9" />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <p className={`text-xl font-bold font-urbanist ${config.color}`}>{config.label}</p>
                <p className="text-sm text-muted-foreground mt-1 max-w-sm">{config.description}</p>
            </motion.div>
        </div>
    );
}
