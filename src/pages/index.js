import ProductCard from "@/components/ProductCard";
import RootLayout from "@/components/RootLayout";
import Slider from "@/components/Slider";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const bannerImg = ["/hero1-1.webp", "/hero1-2.webp", "/hero1.webp"];
const categories = [
  {
    image: "/icon/cpu.png",
    name: "CPU/Processor",
    link: "cpu",
  },
  {
    image: "/icon/motherboard.png",
    name: "Motherboard",
    link: "motherboard",
  },
  {
    image: "/icon/ram.png",
    name: "RAM",
    link: "ram",
  },
  {
    image: "/icon/power-supply.png",
    name: "Power Supply",
    link: "power-supply",
  },
  {
    image: "/icon/storage.png",
    name: "Storage Device",
    link: "storage-device",
  },
  {
    image: "/icon/monitor.png",
    name: "Monitor",
    link: "monitor",
  },
];

const Home = ({ data }) => {
  return (
    <>
      <Head>
        <title>BuilderHut - Computer Components</title>
        <meta
          name="description"
          content="Check & Get Your Desired Product for building your dream pc"
        />
      </Head>
      <section>
        <div className="Container">
          <div className=" p-2">
            <div className="banner my-5 grid grid-cols-3 gap-5">
              <div className="col-span-2">
                <Slider bannerImgs={bannerImg} />
              </div>
              <div className="col-span-1 flex flex-col">
                <div className="mb-2">
                  <Image
                    src="/hero2.webp"
                    width={200}
                    height={200}
                    layout="responsive"
                  />
                </div>
                <div>
                  <Image
                    src="/hero3.webp"
                    width={200}
                    height={200}
                    layout="responsive"
                  />
                </div>
              </div>
            </div>
            <div className="my-20">
              <div className="text-center mb-10">
                <h1 className="text-2xl font-semibold">Featured Products</h1>
                <p>Check & Get Your Desired Product!</p>
              </div>
              <div className="grid grid-cols-4 gap-5">
                {data?.map((product) => (
                  <ProductCard
                    product={product}
                    route={`/products/details/${product.id}`}
                    key={product.id}
                  />
                ))}
              </div>
            </div>
            <div className="my-20">
              <div className="text-center mb-10">
                <h1 className="text-2xl font-semibold">Featured Category</h1>
                <p>Get Your Desired Product from Featured Category!</p>
              </div>
              <div className="flex justify-between items-center">
                {categories?.map((category, idx) => (
                  <Link key={idx} href={`/products/${category.link}`}>
                    <div className="flex flex-col justify-center items-center shadow-md p-5 rounded-md w-[150px]">
                      <div>
                        <Image
                          src={category.image}
                          width={50}
                          height={50}
                          alt="category"
                        />
                      </div>
                      <div>
                        <h3>{category.name}</h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

Home.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export const getStaticProps = async () => {
  const result = await fetch(`${process.env.NEXT_PUBLIC_MAIN_URL}/api/products`);
  const data = await result.json();
  let newData = [];
  for (let i = 0; i <= 5; i++) {
    const randomNumber = Math.floor(Math.random() * data.length);
    newData.push(data[randomNumber]);
  }
  return {
    props: {
      data: newData,
    },
  };
};
