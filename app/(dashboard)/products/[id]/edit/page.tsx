import { notFound } from "next/navigation";

import { getProductById } from "@/lib/products";



export default async function EditProductPage({

  params,

}: {

  params: Promise<{ id: string }>;

}) {

  const { id } = await params;



  const product = await getProductById(id);



  if (!product) {

    notFound();

  }



  return (

    <div className="max-w-5xl mx-auto py-8">

      <h1 className="text-3xl font-bold mb-6">

        Edit Product

      </h1>



      <pre className="rounded-lg bg-gray-100 p-6 overflow-auto">

        {JSON.stringify(product, null, 2)}

      </pre>

    </div>

  );

}