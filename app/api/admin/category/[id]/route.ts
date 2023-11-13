import { categorySchema } from "@/app/validationSchema/categorySchema";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {

    // update new category

    if (request.headers.get('content-length') === '0') {
        return NextResponse.json({ error: "you have to provide body information" }, { status: 400 })
    }

    const body = await request.json();

    const validation = categorySchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 })
    }

    const category = await prisma?.category.findUnique({
        where: {
            id: params.id
        }
    })

    if (!category) return NextResponse.json("unknown category please check out", { status: 404 })


    const updatedCategory = await prisma?.category.update({
        where: {
            id: params.id
        },
        data: {
            name: body.name
        }
    })
    return NextResponse.json(updatedCategory, { status: 200 })

}


export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {

    // update new category

    if (request.headers.get('content-length') === '0') {
        return NextResponse.json({ error: "you have to provide body information" }, { status: 400 })
    }



    const category = await prisma?.category.findUnique({
        where: {
            id: params.id
        }
    })

    if (!category) return NextResponse.json("unknown category please check out", { status: 404 })


    const deletedCategory = await prisma?.category.delete({
        where: {
            id: params.id
        }

    })
    return NextResponse.json(deletedCategory, { status: 200 })

}

