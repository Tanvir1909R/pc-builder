import RootLayout from "@/components/RootLayout";
import Head from "next/head";
import Image from "next/image";
import StarRatings from "react-star-ratings";

const ProductDetails = ({ data }) => {
  return (
    <>
    <Head>
        <title>BuilderHut - {data.name}</title>
        <meta
          name="description"
          content={`The details about ${data.name}`}
        />
      </Head>
      <section>
        <div className="Container">
          <div className="p-2">
            <div className="grid grid-cols-3 gap-5 my-10 border-b">
              <div className="col-span-1">
                <Image
                  src={data.image}
                  width={520}
                  height={520}
                  alt="product"
                />
              </div>
              <div className="col-span-2">
                <div className="mb-5">
                  <h1 className="text-2xl font-semibold mb-3">{data.name}</h1>
                  <p className="badge badge-ghost p-2">
                    Price : <span className="font-bold">{data.price}৳</span>
                  </p>
                  <p className="badge badge-ghost p-2">
                    Status : <span className="font-bold">{data.status}</span>
                  </p>
                  <p className="badge badge-ghost p-2">
                    Category :{" "}
                    <span className="font-bold">{data.category}</span>
                  </p>
                </div>
                <div>
                  <h2 className="text-xl mb-4 font-semibold">Key Features :</h2>
                  <div>
                    {data.features.map((feature, idx) => (
                      <p className="font-medium" key={idx}>
                        {feature}
                      </p>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center">
                    <div className="mr-5">
                      <h2 className="font-medium text-xl">Rating :</h2>
                      <StarRatings
                        rating={data.rating}
                        starRatedColor="gold"
                        starEmptyColor="gray"
                        starDimension="25px"
                        starSpacing="2px"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="my-10">
                <h1 className="text-2xl font-semibold underline">Description</h1>
                <p className="mt-5 font-medium">{data.description}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;

ProductDetails.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export const getStaticPaths = async () => {
  const result = await fetch(`${process.env.NEXT_PUBLIC_MAIN_URL}/api/products`);
  const data = await result.json();
  const paths = data.map((product) => ({
    params: { productId: product.id },
  }));

  return {
    paths,
    fallback: false,
  };
};
export const getStaticProps = async (ctx) => {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_MAIN_URL}/api/product/${ctx.params.productId}`
  );
  const data = await result.json();
  return {
    props: {
      data,
    },
  };
};
