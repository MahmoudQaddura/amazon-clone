import Image from "next/image";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";
import { useState } from "react";
import { useEffect } from "react";
import { selectCategories, setCategory } from "../slices/productSlice";
import axios from "axios";
function Header() {
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();
  const sendCategory = (event) => {
    event.preventDefault();
    dispatch(setCategory(event.target.dataset.name));
  };

  const { data: session } = useSession();
  const router = useRouter();
  const items = useSelector(selectItems);
  const [windowAvailable, setWindowAvailable] = useState(0);
  useEffect(() => setWindowAvailable(1), []);

  const submitSearch = async (event) => {
    event.preventDefault();
    await axios
      .post(`${process.env.host}/api/db/getProductByName`, {
        name: event.target.query.value,
      })
      .then(function (response) {
        router.push(`${process.env.host}/product/${response.data}`);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
        }
      });
  };
  return (
    <header className="sticky top-0 z-50">
      {/* TOP NAV */}
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
        {/* LOGO */}
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0 pt-3 border border-amazon_blue  hover:border-white">
          <Image
            onClick={() => router.push("/")}
            src="https://links.papareact.com/f90"
            width={150}
            height={40}
            style={{ objectFit: "cover" }}
            className="cursor-pointer"
          />
        </div>

        {/* SEARCH BAR */}

        <form
          className="hidden sm:flex items-center h-10 rounded-md flex-grow bg-yellow-400 hover:bg-yellow-500 hover:cursor-pointer"
          onSubmit={submitSearch}
        >
          <input
            className="p-2 h-full w-6 flex-grow rounded-l-md flex-shrink focus:outline-none px-4"
            name="query"
            type="text"
          />
          <button type="submit">
            <MagnifyingGlassIcon className="h-12 p-4" />
          </button>
        </form>

        {/* RIGHT */}
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap ">
          <div className="  border-amazon_blue  ">
            <p className=" Link" onClick={!session ? signIn : signOut}>
              {session ? `Hello, ${session.user.name}` : "Sign In"}
            </p>
            <p
              onClick={() => router.push("/signUp")}
              className="font-extrabold md:text-sm  Link"
            >
              {session ? `` : "Sign Up"}
            </p>
          </div>

          <div className="Link border border-amazon_blue  hover:border-white">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>

          <div
            onClick={() => router.push("/checkout")}
            className="relative Link flex items-center border border-amazon_blue  hover:border-white"
          >
            <span className="absolute right-0 top-0 md:right-10 h-4 w-4 bg-yellow-400 rounded-full font-extrabold text-black text-center">
              {items.length}
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:inline font-extrabold md:text-sm mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>

      {/* BOTTOM NAV */}
      {windowAvailable === 1 &&
      window.location.href === process.env.host + "/" ? (
        <div className="  items-center space-x-4 text-sm p-2 pl-6 bg-amazon_blue-light text-white  hidden  sm:flex">
          <a
            onClick={sendCategory}
            data-name={""}
            className="Link flex items-center"
          >
            <Bars3Icon data-name={""} className="h-6 mr-1" />
            All
          </a>

          {categories.map((category) => (
            <a
              onClick={sendCategory}
              data-name={category}
              className="Link"
              key={category}
            >
              {category}
            </a>
          ))}
        </div>
      ) : (
        ""
      )}
    </header>
  );
}

export default Header;
