import Image from "next/image";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import CurrencyFormat from "react-currency-format";
function Product({ id, title, price, description, category, image }) {
  //DONT FORGET
  const [rating] = useState(2); //TODO RATING FROM USERS FETCHED FROM DB
  //DONT FORGET
  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>

      <Image src={image} height={200} width={200} objectFit="contain" />

      <h4 className="my-3 line-clamp-2">{title}</h4>

      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon className="h-5 text-yellow-500" />
          ))}
      </div>

      <p className="text-xs my-2 line-clamp-2">{description}</p>

      <div className="mb-5">
        <CurrencyFormat
          value={price}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />
      </div>

      <button className="mt-auto button">Add to Basket</button>
    </div>
  );
}

export default Product;
