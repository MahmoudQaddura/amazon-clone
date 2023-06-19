import Image from "next/legacy/image";
import CurrencyFormat from "react-currency-format";

import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";
import { useRouter } from "next/router";
function Product({ id, title, price, description, category, image }) {
  const router = useRouter();
  const quantity = 1;
  const dispatch = useDispatch();
  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      quantity,
    };
    console.log(product);
    dispatch(addToBasket(product));
  };

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>

      <Image src={image} height={200} width={200} objectFit="contain" />

      <h4 className="my-3 line-clamp-2">{title}</h4>

      <p className="text-xs my-2 line-clamp-2">{description}</p>

      <div className="mb-5">
        <CurrencyFormat
          value={price}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />
      </div>

      <button onClick={addItemToBasket} className="mt-auto mb-1 button">
        Add to Basket
      </button>
      <button onClick={() => router.push(`/product/${id}`)} className=" button">
        View Details
      </button>
    </div>
  );
}

export default Product;
