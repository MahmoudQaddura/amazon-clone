import { StarIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useSession } from "next-auth/react";

function ReviewBox({ reviews }) {
  const { data: session } = useSession();
  const submitReview = async (event) => {
    event.preventDefault();
    const review = {
      review: event.target.review.value,
      rating: event.target.rating.value,
      product_id: reviews[0].product_id,
      userName: session.user.name,
    };

    await axios
      .post(`${process.env.host}/api/db/addReview`, review)
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
        }
      });
  };
  return (
    <div className="flex  flex-col w-full items-center">
      <h1 className="text-xl">What People Have Said About This</h1>
      <div className="flex  flex-col bg-gray-300 w-full justify-center items-center px-1 rounded">
        {reviews
          ? reviews.map((review) => (
              <div className="flex flex-col items-start w-full mx-2 mt-2">
                <div className="flex mb-1">
                  <p className=" italic ml-1">{review.user.name}</p>
                  <div className="flex ml-2">
                    {Array(review.rating)
                      .fill()
                      .map((_, i) => (
                        <StarIcon key={i} className="h-5 text-yellow-500" />
                      ))}
                  </div>
                </div>
                <div className="w-full bg-white rounded mb-2 px-2 text-lg">
                  <p>{review.review}</p>
                </div>
              </div>
            ))
          : ""}
        <form className="w-1/2" onSubmit={submitReview}>
          <div className="flex flex-col items-center flex-auto mb-2">
            <label>Add Review</label>
            <input
              name="review"
              type="text"
              placeholder="What do you think?"
              className="bg-white text-black mb-1 w-full"
            />

            <input
              required
              name="rating"
              type="number"
              max={5}
              min={1}
              placeholder="Rate out of 5"
              className="w-1/2"
            />
            <button className="bg-gray-100 mt-1 w-1/4 rounded" type="submit">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReviewBox;
