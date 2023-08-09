import prisma from "@/lib/prismadb";
import ProductForms from "./components/products-form"

const ProductIdPage = async ({ params }) => {
  const product = await prisma.product.findUnique({
    where: {
      id: params.productId,
    },
    include:{
      images:true
    }
  });
  
  return (
    <div className="flex flex-col">
      <div className="space-y-4 flex-1 p-8 pt-6">
        <ProductForms initialData={product}/>
      </div>
    </div>
  );
};

export default ProductIdPage;
