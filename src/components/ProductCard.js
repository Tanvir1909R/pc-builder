import { setToProductBuild } from "@/redux/feature/buildProductSlice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import StarRatings from "react-star-ratings";

const ProductCard = ({ product, isBuild = false, route }) => {
  const Route = useRouter();
  const dispatch = useDispatch();
  const handleAdd = (data) => {
    dispatch(setToProductBuild(data));
    Route.push("/pc-build");
  };
  return (
    <div className="card border h-[465px]">
      <figure>
        <Link href={route}>
          <Image src={product.image} width={200} height={200} alt="component" />
        </Link>
      </figure>
      <div className="card-body">
        <h2>
          <span className="text-xl font-semibold">{product.name}</span> -{" "}
          <span className="badge badge-outline ">{product.status}</span>
        </h2>
        <p className="font-semibold text-xl text-red-500">{product.price}৳</p>
        <StarRatings
          rating={product.rating}
          starRatedColor="gold"
          starEmptyColor="gray"
          starDimension="20px"
          starSpacing="1px"
        />
        <div className="card-actions items-center justify-end mt-5">
          {isBuild && (
            <button
              className="mr-3 btn btn-outline"
              onClick={() => handleAdd(product)}
            >
              Add
            </button>
          )}
          <div className="badge badge-ghost">{product.category}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
