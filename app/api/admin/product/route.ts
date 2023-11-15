import { NextRequest, NextResponse } from "next/server";
import { categorySchema } from "../../../validationSchema/categorySchema";
import prisma from '../../../../prisma/client'

import { S3Client } from '@aws-sdk/client-s3'
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


export async function POST(request: NextRequest) {

    const formData = await request.formData();

    const felids: FieldsValue = {};
    const base64Images: string[] = [];

    for (const [key, value] of formData) {
        if (key.startsWith('newImages') && typeof value === 'string') {
            base64Images.push(value);
        } else if (typeof value === "string") {
            felids[key] = value;
        }
    }

    const newImageUrls = await Promise.all(base64Images.map(async (base64Image) => {

        const buffer = Buffer.from(base64Image.split(',')[1], 'base64');

        const fileName = `${uuidv4()}.jpeg`;

        return await uploadFile(buffer, fileName)
    }))
    
    try {
        const newProduct = await prisma?.product.create({
            data: {
                name: felids.name,
                categoryId: felids.categoryId,
                thumbnail: newImageUrls[0] || '', // Assuming first image as thumbnail
                gallery: newImageUrls,
                price: parseFloat(felids.price),
                description: felids.description,
                stockQuantity: parseInt(felids.stockQuantity, 10),
            }
        });

        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json({ message: "Error registering product files" }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {


    const categories = await prisma.product.findMany(
        { orderBy: { created: "desc" } }

    );
    return NextResponse.json(categories, { status: 200 })

}