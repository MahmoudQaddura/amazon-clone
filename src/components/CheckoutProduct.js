import Image from "next/legacy/image";
import CurrencyFormat from "react-currency-format";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";
function CheckoutProduct({
  id,
  title,
  price,
  description,
  category,
  image,
  quantity,
}) {
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
    dispatch(addToBasket(product));
  };
  const removeItemToBasket = () => {
    dispatch(removeFromBasket({ id }));
  };

  return (
    <div className="grid grid-cols-5">
      <Image src={image} height={200} width={200} objectFit="contain" />

      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex font-bold">Quantity: {quantity}</div>
        <p className="text-xs my-2 line-clamp-3  ">{description}</p>
        <CurrencyFormat
          value={price * quantity}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />
      </div>

      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button onClick={addItemToBasket} className="button mt-auto ">
          Order More
        </button>
        <button onClick={removeItemToBasket} className="button mt-auto ">
          Remove from Basket
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
