import { NextRequest, NextResponse } from "next/server";
import { categorySchema } from "./validationSchema";
import prisma from '../../../../prisma/client'

export async function POST(request: NextRequest) {

    // register new category

    if(request.headers.get('content-length') === '0'){
        return NextResponse.json({error: "you have to provide body information"}, { status: 400 })
    }

    const body = await request.json();

    const validation = categorySchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 })
    }

    const newCategory = await prisma?.category.create({
        data: {
            name: body.name
        }
    })

    return NextResponse.json(newCategory, { status: 201 })
}

export async function GET(request: NextRequest) {

    // get all categories
    // return NextResponse.json("erroor", { status: 500 })
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories, { status: 200 })

}