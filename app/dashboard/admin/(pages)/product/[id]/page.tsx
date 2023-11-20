import React from 'react'
import CategoryForm from '../_components/ProductForm'
import { notFound } from 'next/navigation';
import ProductForm from '../_components/ProductForm';

const CategoryUpdatePage = async ({ params }: { params: { id: string } }) => {

  let product;

  try {
    product = await prisma?.product.findUnique({ where: { id: params.id } })

    if (!product) notFound();
  } catch (err) {
    notFound();
  }

  return (
    <div>
      <ProductForm product={product} />
    </div>
  )
}

export default CategoryUpdatePage