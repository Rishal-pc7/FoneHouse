import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {

    try {
        const { id } = await params
        const product = await prisma.products.findUnique({
            where: {
                id: parseInt(id)
            }
        })
        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 })
        }
        return NextResponse.json({ message: 'Product found', data: product }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error as string }, { status: 500 })


    }
}
import { uploadImage } from "../../utils"

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const formData = await request.formData()

        const name = formData.get('name') as string;
        const description = formData.get('description') as string | null;
        const price = parseFloat(formData.get('price') as string);
        const category = formData.get('category') as string;
        const brand = formData.get('brand') as string;
        const stock = parseInt(formData.get('stock') as string);
        const isInStock = formData.get('isInStock') === 'true';
        const warrantyYears = parseInt(formData.get('warrantyYears') as string) || 1;
        const shipping = formData.get('shipping') as string || 'FREE';
        const specificationsString = formData.get('specifications') as string | null;
        const specifications = specificationsString ? JSON.parse(specificationsString) : undefined;

        let mainImage = formData.get('existing_img') as string || "";
        const imgFile = formData.get('img') as File | null;
        if (imgFile && imgFile.size > 0) {
            mainImage = await uploadImage(imgFile, name);
        }

        let additionalImages: string[] = [];
        const existingImages = formData.getAll('existing_images') as string[];
        if (existingImages) {
            existingImages.forEach(img => additionalImages.push(img));
        }

        const imageFiles = formData.getAll('images') as File[];
        if (imageFiles && imageFiles.length > 0) {
            const uploadedImages = await Promise.all(
                imageFiles.map((image: File, i: number) => {
                    if (image.size > 0) {
                        return uploadImage(image, name + "-" + i);
                    }
                    return null;
                })
            );
            uploadedImages.forEach((img: string | null) => {
                if (img) additionalImages.push(img);
            });
        }

        const product = await prisma.products.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name,
                description,
                price,
                category,
                brand,
                stock,
                isInStock,
                warrantyYears,
                shipping,
                img: mainImage,
                images: additionalImages,
                specifications
            }
        })
        return NextResponse.json({ message: 'Product updated successfully', data: product }, { status: 200 })
    } catch (error) {
        console.log("Error updating product:", error);
        return NextResponse.json({ error: error as string }, { status: 500 })
    }
}