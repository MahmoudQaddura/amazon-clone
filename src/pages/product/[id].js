import { useDispatch } from "react-redux";
import Header from "../../components/Header";
import { StarIcon } from "@heroicons/react/24/solid";
import CurrencyFormat from "react-currency-format";
import Image from "next/image";
import { addToBasket } from "../../slices/basketSlice";
import axios from "axios";
import ReviewBox from "../../components/ReviewBox";

function Page({ product }) {
  const { id, name, description, price, image } = product;
  const title = name;
  const quantity = 1;
  const category = product.category.name;
  const Pcategory = product.category.parent.name;

  let rating = 0;
  product.reviews.map((review) => {
    rating += review.rating;
  });
  rating = Math.round(rating / product.reviews.length);

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
    <div className="bg-gray-200 ">
      <Header />
      <div className="bg-gray-200  max-w-screen-lg mx-auto flex overflow-auto">
        <div className="relative items-center space-y-6 flex flex-col m-5 bg-white z-30 p-10 rounded ">
          <p className="absolute top-2 right-2 text-s italic text-black">
            {Pcategory} / {category}
          </p>

          <Image
            src={image}
            height={400}
            width={250}
            alt=""
            loading="lazy"
            style={{ objectFit: "contain" }}
          />

          <h4 className="my-3 text-lg ">{title}</h4>

          <div className="flex">
            {!rating
              ? ""
              : Array(rating)
                  .fill()
                  .map((_, i) => (
                    <StarIcon key={i} className="h-5 text-yellow-500" />
                  ))}
          </div>

          <div className="mb-5 font-bold">
            <CurrencyFormat
              className="text-xl"
              value={price}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />
          </div>

          {/* <p className="font-bold">Left in Stock: {product.quantity}</p> */}
          <p className="text-s my-2 ">{description}</p>

          <ReviewBox key={product.reviews.id} product={product} />
          <button
            onClick={addItemToBasket}
            className="mt-auto mb-1 button w-60"
          >
            Add to Basket
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;

export async function getServerSideProps({ query }) {
  const id = query.id;
  //a POST request to the API endpoint which deals with the Database
  const response = await axios
    .post(`${process.env.HOST}/api/db/getProductById`, { id: id })
    .catch((error) => console.log(error));

  const reviews = await axios
    .post(`${process.env.HOST}/api/db/getReviews`, { id: id })
    .catch((error) => console.log(error));
  //The request contains many things we don't need like Headers and whatnot. We're only interested in the data
  const product = response.data;
  Object.assign(product, { reviews: [...reviews.data] });

  //This will return to this page
  return {
    props: { product },
  };
}
