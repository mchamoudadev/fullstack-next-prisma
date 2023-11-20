"use server"

import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3"


const s3Client = new S3Client({
    region: process.env.AWS_BUCKET_REGION as string,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
    }
})


export const deleteFromS3 = async (url: string, gallery: string[], productId?: string) => {

    try {

        if (!productId) return { error: true, message: "please provide the productId" }

        const key = url.split('/').pop();

        await s3Client.send(new DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key
        }));

        const newGallery = gallery.filter(image => image !== url)

        const updated = await prisma?.product.update({
            where: {
                id: productId
            },
            data: {
                thumbnail: newGallery[0],
                gallery: newGallery
            }
        })

        return { error: false, message: { key, url } }

    } catch (error) {
        return { error: true, message: error }
    }
}
