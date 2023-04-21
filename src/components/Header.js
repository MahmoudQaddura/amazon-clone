import Image from "next/legacy/image";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";
function Header() {
  const { data: session } = useSession();

  return (
    <header>
      {/* TOP NAV */}
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
        {/* LOGO */}
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0 pt-3 border border-amazon_blue  hover:border-white">
          <Image
            src="https://links.papareact.com/f90"
            width={150}
            height={40}
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>

        {/* SEARCH BAR */}
        <div className="hidden sm:flex items-center h-10 rounded-md flex-grow bg-yellow-400 hover:bg-yellow-500 hover:cursor-pointer">
          <input
            className="p-2 h-full w-6 flex-grow rounded-l-md flex-shrink focus:outline-none px-4"
            type="text"
          />
          <MagnifyingGlassIcon className="h-12 p-4" />
        </div>

        {/* RIGHT */}
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap ">
          <div
            onClick={!session ? signIn : signOut}
            className="Link border border-amazon_blue  hover:border-white"
          >
            <p>{session ? `Hello, ${session.user.name}` : "Sign In"}</p>
            <p className="font-extrabold md:text-sm">Account & Lists</p>
          </div>

          <div className="Link border border-amazon_blue  hover:border-white">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>

          <div className="relative Link flex items-center border border-amazon_blue  hover:border-white">
            <span className="absolute right-0 top-0 md:right-10 h-4 w-4 bg-yellow-400 rounded-full font-extrabold text-black text-center">
              #
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:inline font-extrabold md:text-sm mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>

      {/* BOTTOM NAV */}
      <div className="  items-center space-x-4 text-sm p-2 pl-6 bg-amazon_blue-light text-white  hidden  sm:flex">
        <p className="Link flex items-center">
          <Bars3Icon className="h-6 mr-1" />
          All
        </p>
        <p className="Link ">Prime Video</p>
        <p className="Link">Amazon Buisness</p>
        <p className="Link">Today's Deals</p>
        <p className="hidden lg:inline Link">Electronics</p>
        <p className="hidden lg:inline Link">Food & Grocery</p>
        <p className="hidden lg:inline Link">Prime</p>
        <p className="hidden xl:inline Link">Buy Again</p>
        <p className="hidden xl:inline Link">Shopper Toolkit</p>
        <p className="hidden xl:inline Link">Health & Personal Care</p>
      </div>
    </header>
  );
}

export default Header;
