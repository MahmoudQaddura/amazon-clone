import { useSelector } from "react-redux";
import Header from "../components/Header";
import Image from "next/legacy/image";
import { selectItems, selectTotal } from "../slices/basketSlice";
import CheckoutProduct from "../components/CheckoutProduct";
import CurrencyFormat from "react-currency-format";
import { useSession } from "next-auth/react";
function Checkout() {
  const total = useSelector(selectTotal);
  const { data: session } = useSession();
  const items = useSelector(selectItems);
  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-lg mx-auto">
        {/* LEFT */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
          />
          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4 ">
              {items.length === 0 ? "Your Basket is Empty" : "Shopping Basket"}
            </h1>

            {items.map((item, i) => (
              <CheckoutProduct
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                rate={item.rate}
                description={item.description}
                category={item.category}
                image={item.image}
              />
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div
          className={`flex ${
            items.length === 0 && "hidden"
          } flex-col bg-white p-10 shadow-md`}
        >
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items):{"  "}
                <span className="font-bold">
                  <CurrencyFormat
                    value={total}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </span>
              </h2>

              <button
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                {!session ? "Please Sign In" : "Proceed to Checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Checkout;
