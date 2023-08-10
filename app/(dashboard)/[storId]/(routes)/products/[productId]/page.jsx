import prisma from "@/lib/prismadb";
import ProductForms from "./components/products-form";

const ProductIdPage = async ({ params }) => {
  const product = await prisma.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });
  const categories = await prisma.Category.findMany({
    where: {
      storeId: params.storId,
    },
  });
  const sizes = await prisma.size.findMany({
    where: {
      storeId: params.storId,
    },
  });
  const colors = await prisma.color.findMany({
    where: {
      storeId: params.storId,
    },
  });
  return (
    <div className="flex flex-col">
      <div className="space-y-4 flex-1 p-8 pt-6">
        <ProductForms
          initialData={product}
          categories={categories}
          colors={colors}
          sizes={sizes}
        />
      </div>
    </div>
  );
};

export default ProductIdPage;
