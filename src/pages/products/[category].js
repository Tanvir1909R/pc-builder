import ProductCard from "@/components/ProductCard";
import RootLayout from "@/components/RootLayout";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

const ProductsWithCategory = ({ data }) => {
  const params = useRouter();
  const category = params.query.category;
  return (
    <>
      <Head>
        <title>BuilderHut - All type of {category}</title>
        <meta
          name="description"
          content="all type of ram you can check and buy"
        />
      </Head>
      <section>
        <div className="Container">
          <div className="p-2">
            <div className="mb-10">
              <h1 className="uppercase text-2xl font-bold underline">
                All {category}
              </h1>
            </div>
            <div className="grid grid-cols-4 gap-5">
              {data?.map((product) => (
                  <ProductCard product={product} route={`/products/details/${product.id}`} key={product.id} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductsWithCategory;

ProductsWithCategory.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export const getStaticPaths = async () => {
  const result = await fetch(`${process.env.NEXT_PUBLIC_MAIN_URL}/api/products`);
  const data = await result.json();
  const paths = data.map((product) => ({
    params: { category: product.category },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (ctx) => {
  const result = await fetch(`${process.env.NEXT_PUBLIC_MAIN_URL}/api/products`);
  const data = await result.json();
  const filterData = data.filter(
    (product) => product.category === ctx.params.category
  );
  return {
    props: {
      data: filterData,
    },
  };
};
