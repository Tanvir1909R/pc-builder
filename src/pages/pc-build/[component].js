import ProductCard from "@/components/ProductCard";
import RootLayout from "@/components/RootLayout";
import Head from "next/head";
import { useRouter } from "next/router";

const BuildComponents = ({data}) => {
  const route = useRouter();
  const component = route.query.component;
  return (
    <>
      <Head>
        <title>BuilderHut - All type of {component}</title>
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
                All {component}
              </h1>
            </div>
            <div className="grid grid-cols-4 gap-5">
              {data?.map((product) => (
                <ProductCard
                  product={product}
                  route={`/products/details/${product.id}`}
                  isBuild={true}
                  key={product.id}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BuildComponents;

BuildComponents.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export const getServerSideProps = async (ctx) => {
  const result = await fetch(`${process.env.NEXT_PUBLIC_MAIN_URL}/api/products`);
  const data = await result.json();
  if (!result.ok) {
    throw new Error(`Failed to fetch data: ${result.statusText}`);
  }
  const filterData = data.filter(
    (product) => product.category === ctx.params.component
  );
  return {
    props: {
      data: filterData,
    },
  };
};
