'use client';

import React, { useState } from 'react';
import { Product } from '../products.types';
import ProductsHeader from './ProductsHeader';
import ProductsFilters from './ProductsFilters.client';
import ProductsDesktopTable from './ProductsDesktopTable.client';
import ProductsMobileTable from './ProductsMobileTable.client';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteProduct } from '../products.actions';

interface Props {
    initialProducts: Product[];
}

export default function ProductsTableWrapper({ initialProducts }: Props) {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [isLoading, setIsLoading] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [alertMessage, setAlertMessage] = useState<string | null>(null);

    const handleDeleteClick = (id: number) => setDeleteId(id);

    const confirmDelete = async () => {
        if (!deleteId) return;
        setIsLoading(true);
        const result = await deleteProduct(deleteId);

        if (result.success) {
            setProducts(prev => prev.filter(p => p.id !== deleteId));
        } else {
            setAlertMessage('Failed to delete product');
        }

        setDeleteId(null);
        setIsLoading(false);
    };

    return (
        <div className="space-y-6">
            <ProductsHeader />
            <ProductsFilters />
            <ProductsDesktopTable products={products} onDeleteClick={handleDeleteClick} />
            <ProductsMobileTable products={products} onDeleteClick={handleDeleteClick} />

            <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Product</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this product? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button variant="outline" onClick={() => setDeleteId(null)} disabled={isLoading}>Cancel</Button>
                        <Button variant="destructive" onClick={confirmDelete} disabled={isLoading}>
                            {isLoading ? 'Deleting...' : 'Delete'}
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
        </div>
    );
}
