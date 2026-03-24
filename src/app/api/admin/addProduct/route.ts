import prisma from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"
import { uploadImage } from "../utils"

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        let mainImage = "";
        let additionalImages: string[] = [];

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

        const imgFile = formData.get('img') as File | null;
        if (imgFile) {
            mainImage = await uploadImage(imgFile, name);
        }

        const imageFiles = formData.getAll('images') as File[];
        if (imageFiles.length > 0) {
            additionalImages = await Promise.all(
                imageFiles.map((image: File, i: number) => {
                    return uploadImage(image, name + "-" + (i + 1));
                })
            );
        }
        const res = await prisma.products.create({
            data: {
                name,
                description: description || null,
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
        });
        return NextResponse.json(
            { message: "Product added successfully", data: res },
            { status: 200 }
        )

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: error },
            { status: 500 }
        )
    }
}