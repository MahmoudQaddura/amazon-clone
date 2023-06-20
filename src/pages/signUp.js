import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

function signUp() {
  const router = useRouter();
  const submitUser = async (event) => {
    event.preventDefault();
    const user = {
      name: event.target.userName.value,
      email: event.target.userEmail.value,
      password: event.target.userPassword.value,
    };
    await axios
      .post(`${process.env.host}/api/db/addUser`, { user })
      .then(function (response) {
        alert(response.data);
        signIn("CredentialsProvider", { callbackUrl: "/" });
      })
      .catch(function (error) {
        if (error.response) {
          alert(error.response.data);
        }
      });
  };
  return (
    <div className="flex  h-screen justify-end bg-gray-200">
      <form
        className=" relative flex flex-col flex-auto mt-30 space-y-3 m-auto items-center justify-center py-10 bg-white max-w-screen-lg mx-auto rounded-lg"
        onSubmit={submitUser}
      >
        <ArrowLeftOnRectangleIcon
          className="absolute top-2 left-2 h-8 text-amazon_blue hover:cursor-pointer"
          onClick={() => router.push("/")}
        />
        <div className="w-full flex flex-col space-y-3 m-auto items-center justify-center  ">
          <h1 className="text-amazon_blue text-xl border-b border-yellow-400  w-1/2 text-center pb-3">
            Create New Account
          </h1>

          <div className="flex flex-col flex-auto w-1/2">
            <label className="text-amazon_blue ">Full Name</label>
            <input
              required
              name="userName"
              type="text"
              className="bg-gray-200 text-black"
            />
          </div>

          <div className="flex flex-col flex-auto w-1/2">
            <label className="text-amazon_blue">Email</label>
            <input
              required
              name="userEmail"
              type="email"
              id=""
              className="bg-gray-200 text-black"
            />
          </div>

          <div className="flex flex-col flex-auto w-1/2">
            <label className="text-amazon_blue">Password</label>
            <input
              name="userPassword"
              required
              type="password"
              className="bg-gray-200 text-black"
            />
          </div>
        </div>
        <button className="button w-1/6 h-9 " type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
export default signUp;
