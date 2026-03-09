"use server"
import { v2 as cloudinary, UploadApiErrorResponse, UploadApiResponse } from "cloudinary"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
export async function uploadImage(image: File,public_id:string):Promise<string> {
        const arrayBuffer = await image.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer)
        return new Promise<string>((resolve,reject)=>{
        cloudinary.uploader.upload_stream(
            {folder:"fonehouse/products",resource_type:"image",public_id:public_id},
            (error:UploadApiErrorResponse|undefined,result:UploadApiResponse|undefined)=>{
                if(error){
                    console.error('Failed to upload image:', error);
                    return reject(error);
                }
                if(!result) return reject(new Error('Cloudinary returned no result'))
                resolve(result.secure_url)
            }
        ).end(buffer);
        })
}