import { ChevronRight } from "lucide-react";

type Props = {
    subtotal: number;
    total: number;
};

export default function OrderSummary({ subtotal, total }: Props) {
    return (
        <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-3xl p-6 md:p-8 shadow-xl">
            <h3 className="text-lg font-bold mb-6">Order Summary</h3>
            <div className="space-y-3 font-urbanist">
                <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="font-medium text-foreground">${subtotal.toFixed(2)}</span>
                </div>
                <div className="border-t border-border/50 pt-4 mt-4 flex justify-between items-center text-lg">
                    <span className="font-bold font-manrope">Total</span>
                    <span className="font-bold text-2xl text-transparent bg-clip-text bg-linear-to-r from-brandBlue to-brandGreen">
                        ${total.toFixed(2)}
                    </span>
                </div>
            </div>
            <button
                className={[
                    "w-full mt-8 bg-background border border-border hover:bg-muted",
                    "text-foreground px-4 py-3 rounded-xl font-bold transition-all",
                    "flex items-center justify-center gap-2 group",
                ].join(" ")}
            >
                Download Invoice
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );
}
