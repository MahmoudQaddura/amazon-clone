import axios from "axios";
import { signIn } from "next-auth/react";

function signUp() {
  const submitUser = async (event) => {
    event.preventDefault();
    const user = {
      name: event.target.userName.value,
      email: event.target.userEmail.value,
      password: event.target.userPassword.value,
    };

    await axios
      .post(`${process.env.host}/api/db/addUser`, user)
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
    <div className="flex  h-screen justify-end bg-amazon_blue">
      <form
        className="flex flex-col flex-auto mt-30 space-y-3 m-auto items-center justify-center py-10 bg-amazon_blue-light max-w-screen-lg mx-auto"
        onSubmit={submitUser}
      >
        <h1 className="text-yellow-300 text-xl">Create New Account</h1>

        <div className="flex flex-col flex-auto">
          <label className="text-white">Full Name</label>
          <input
            required
            name="userName"
            type="text"
            className="bg-white text-black"
          />
        </div>

        <div className="flex flex-col flex-auto">
          <label className="text-white">Email</label>
          <input
            required
            name="userEmail"
            type="email"
            id=""
            className="bg-white text-black"
          />
        </div>

        <div className="flex flex-col flex-auto">
          <label className="text-white">Password</label>
          <input
            name="userPassword"
            required
            type="password"
            className="bg-white text-black"
          />
        </div>
        <button className="button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
export default signUp;
