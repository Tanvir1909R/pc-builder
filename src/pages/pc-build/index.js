import RootLayout from "@/components/RootLayout";
import { removeProductBuild } from "@/redux/feature/buildProductSlice";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';

const pcBuild = () => {
  const dispatch = useDispatch();
  const { categoryBuildProducts } = useSelector(
    (state) => state.buildProductReducer
  );
  const handleCancel = (category) => {
    dispatch(removeProductBuild(category));
  };
  const handleComplete = () => {
    const emptyProduct = categoryBuildProducts.filter(
      (product) => !product.product.length
    );
    if (emptyProduct.length === 0) {
      console.log(true);
      toast.success('Build successful', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    } else {
      toast.error('fill the required component', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  };
  return (
    <>
      <Head>
        <title>BuilderHut - Pc Build</title>
        <meta
          name="description"
          content={`build your dream pc by those your favorite components`}
        />
      </Head>
      <section>
        <div className="Container">
          <div className="p-2 my-20">
            <div className="m-auto w-[80%] border py-2 px-5">
              <div className="flex justify-between items-center border-b pb-2">
                <h1 className="text-2xl">BuilderHut</h1>
                <div></div>
              </div>
              <div>
                {categoryBuildProducts.map((card, idx) => (
                  <div className="border-b" key={idx}>
                    <div className="flex items-center justify-between py-4 px-2">
                      <div className="flex items-center">
                        <Image
                          src={card.image}
                          width={40}
                          height={40}
                          alt="component icon"
                        />
                        <p className="ml-2">
                          {card.name} -{" "}
                          <span className="badge badge-ghost text-[13px]">
                            Required
                          </span>
                        </p>
                      </div>
                      <div>
                        {!card.product[0] && (
                          <Link href={`/pc-build/${card.link}`}>
                            <button className="btn btn-outline">Choose</button>
                          </Link>
                        )}
                      </div>
                    </div>
                    {card.product[0] && (
                      <div className="p-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Image
                              src={card.product[0]?.image}
                              width={40}
                              height={40}
                              alt="component icon"
                            />
                            <p className="ml-2">{card.product[0]?.name}</p>
                          </div>
                          <div className="flex items-center">
                            <p className="font-semibold mr-3">
                              {card.product[0]?.price}৳
                            </p>
                            <button
                              className="border py-1 px-3 font-bold"
                              onClick={() => handleCancel(card.link)}
                            >
                              X
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-end items-center my-5">
                <button className="btn btn-outline" onClick={handleComplete}>
                  Complete build
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default pcBuild;

pcBuild.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

// export const getServerSideProps = async (ctx) => {
//   const result = await fetch("http://localhost:5000/buildCategory");
//   const data = await result.json();
//   return {
//     props:{
//       data
//     }
//   }
// }
