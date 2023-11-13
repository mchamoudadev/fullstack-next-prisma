import React from 'react'
import CategoryForm from '../_components/CategoryForm'
import { notFound } from 'next/navigation';

const CategoryUpdatePage = async ({ params }: { params: { id: string } }) => {

  let category;

  try {
    category = await prisma?.category.findUnique({ where: { id: params.id } })

    if (!category) notFound();
  } catch (err) {
    notFound();
  }






  return (
    <div>
      <CategoryForm category={category}/>
    </div>
  )
}

export default CategoryUpdatePage