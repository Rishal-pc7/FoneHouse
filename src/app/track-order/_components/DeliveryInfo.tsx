import { MapPin, Phone } from "lucide-react";

type Customer = {
    name: string;
    address: string;
    phone: string;
    email: string;
};

type Props = { customer: Customer };

export default function DeliveryInfo({ customer }: Props) {
    return (
        <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-3xl p-6 md:p-8 shadow-xl">
            <h3 className="text-lg font-bold mb-4">Delivery Information</h3>
            <div className="space-y-4">
                <div className="flex gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                        <p className="font-semibold text-sm">{customer.name}</p>
                        <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                            {customer.address}
                        </p>
                    </div>
                </div>
                <div className="flex gap-3 items-center">
                    <Phone className="w-5 h-5 text-muted-foreground shrink-0" />
                    <p className="text-sm text-foreground">{customer.phone}</p>
                </div>
            </div>
        </div>
    );
}
