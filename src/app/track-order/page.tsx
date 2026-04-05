import { Suspense } from "react";
import TrackOrderContent from "./_components/TrackOrderContent";

function Spinner() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-muted border-t-foreground rounded-full animate-spin" />
        </div>
    );
}

export default function TrackOrderPage() {
    return (
        <Suspense fallback={<Spinner />}>
            <TrackOrderContent />
        </Suspense>
    );
}
