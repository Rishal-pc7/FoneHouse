'use client';

import { useState } from 'react';
import Trash2 from 'lucide-react/dist/esm/icons/trash-2';
import Loader2 from 'lucide-react/dist/esm/icons/loader-2';
import { deleteOfferAction } from './actions';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function DeleteOfferButton({ id, couponCode }: { id: number, couponCode: string }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const router = useRouter();

    const executeDelete = async () => {
        setIsDeleting(true);
        const success = await deleteOfferAction(id);
        if (success) {
            setShowConfirm(false);
            router.refresh();
        } else {
            setShowConfirm(false);
            setAlertMessage("Failed to delete offer.");
            setIsDeleting(false);
        }
    };

    return (
        <>
            <button 
                onClick={() => setShowConfirm(true)}
                disabled={isDeleting}
                className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                title="Delete Offer"
            >
                {isDeleting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
            </button>

            <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Offer</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete the offer "{couponCode}"? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button variant="outline" onClick={() => setShowConfirm(false)} disabled={isDeleting}>Cancel</Button>
                        <Button variant="destructive" onClick={executeDelete} disabled={isDeleting}>
                            {isDeleting ? 'Deleting...' : 'Delete'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={!!alertMessage} onOpenChange={(open) => !open && setAlertMessage(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Notice</DialogTitle>
                        <DialogDescription>
                            {alertMessage}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setAlertMessage(null)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
