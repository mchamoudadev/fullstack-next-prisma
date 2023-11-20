import { NextRequest, NextResponse } from "next/server";

import prisma from '../../../../../prisma/client'

import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'

import { v4 as uuidv4 } from 'uuid';


// index signature

interface FieldsValue {
    [key: string]: string;
}


const s3Client = new S3Client({
    region: process.env.AWS_BUCKET_REGION as string,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
    }
})

const uploadFile = async (file: Buffer, fileName: string): Promise<string> => {

    const bucketName = process.env.AWS_BUCKET_NAME as string;

    const upload = new Upload({
        client: s3Client,
        params: {
            Bucket: bucketName,
            Key: fileName,
            Body: file
        }
    })

    upload.on('httpUploadProgress', (progress) => {
        if (progress.loaded !== undefined && progress.total !== undefined) {
            console.log(`uploaded progress: ${progress.loaded} of ${progress.total}`)
        }
    })

    await upload.done()

    return `https://${bucketName}.s3.amazonaws.com/${fileName}`

}


export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {

    const formData = await request.formData();

    const felids: FieldsValue = {};
    const base64Images: string[] = [];
    const existingImages: string[] = [];


    for (const [key, value] of formData) {
        if (key.startsWith('newImages') && typeof value === 'string') {
            base64Images.push(value);
        } else if (key.startsWith("existingImages") && typeof value === 'string') {
            existingImages.push(value);
        } else if (typeof value === "string") {
            felids[key] = value;
        }
    }

    const newImageUrls = await Promise.all(base64Images.map(async (base64Image) => {

        const buffer = Buffer.from(base64Image.split(',')[1], 'base64');

        const fileName = `${uuidv4()}.jpeg`;

        return await uploadFile(buffer, fileName)
    }))

    const combinedGalleryUrls = [...existingImages, ...newImageUrls]

    try {
        const updatedProduct = await prisma?.product.update({
            where: {
                id: params.id,
            },
            data: {
                name: felids.name,
                categoryId: felids.categoryId,
                thumbnail: combinedGalleryUrls[0] || '', // Assuming first image as thumbnail
                gallery: combinedGalleryUrls,
                price: parseFloat(felids.price),
                description: felids.description,
                stockQuantity: parseInt(felids.stockQuantity, 10),
            }
        });

        return NextResponse.json(updatedProduct, { status: 200 });
    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json({ message: "Error registering product files" }, { status: 500 });
    }
}




export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {


    const product = await prisma.product.findUnique(
        {
            where: {
                id: params.id
            }
        }
    );

    if (!product) return NextResponse.json("Unknown product", { status: 404 });

    try {

        for (const imageUrl of product.gallery) {
            const key = imageUrl.split('/').pop();
            await s3Client.send(new DeleteObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: key
            }));
        }
    } catch (error) {
        console.error("error deleting product image from s3", error);
        return NextResponse.json("unmown error", { status: 500 });
    }

    try {

        const deleteProduct = await prisma.product.delete({
            where: { id: params.id }
        })

        return NextResponse.json(deleteProduct, { status: 200 });

    } catch (error) {
        console.error("error deleting product image from prisdma", error);
        return NextResponse.json("unmown error", { status: 500 });
    }
}

export async function GET(request: NextRequest) {


    const categories = await prisma.product.findMany(
        { orderBy: { created: "desc" } }

    );
    return NextResponse.json(categories, { status: 200 })

}