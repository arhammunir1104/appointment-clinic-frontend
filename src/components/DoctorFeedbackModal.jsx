import { useContext, useState } from "react";
import { Modal, Box } from "@mui/material";
import { FaStar } from "react-icons/fa"; // For star rating
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const DoctorFeedbackModal = ({ getUserAppointments, showFeedback, setShowFeedback, appDat }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const {feedbackSubmit} = useContext(AppContext);

  const handleSubmit = async (e) => {
    try{
      e.preventDefault();
      const data = await feedbackSubmit(appDat?._id, rating, review);

      if(data?.data?.status === "success"){
        setShowFeedback(false);
        getUserAppointments();
        toast.success(data?.data?.message);
      }
      else{
        setShowFeedback(false);
        toast.error(data?.response?.data?.message);
      }
    }
    catch(e){
      toast.error(e.message);
    }
  };

  return (
    <Modal
      open={showFeedback}
      onClose={() => setShowFeedback(false)}
      className="p-2 backdrop-blur-[1px] flex justify-center items-center"
    >
      <Box className="bg-white rounded-xl shadow-lg w-[90%] md:w-[50%] max-w-lg p-6">
        {/* Doctor's Profile Section */}
        <div className="flex items-center gap-4 border-b pb-4 mb-4">
          <img
            src={appDat?.docData?.image}
            alt="Doctor"
            className="rounded-full w-[80px]  h-[80px] object-cover border border-gray-300"
          />
          <div>
            <h2 className="font-bold text-lg">{appDat?.docData?.name}</h2>
            <p className="text-gray-500">{appDat?.docData?.speciality}</p>
          </div>
        </div>

        {/* Feedback Section */}
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col mb-4">
            <label className="font-medium">Rating</label>
            <div className="flex items-center gap-1 mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`cursor-pointer transition-colors ${
                    star <= rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                  onClick={() => setRating(star)}
                  size={20}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col mb-4">
            <label className="font-medium">Review</label>
            <textarea
              required
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="border border-gray-300 rounded-md p-2 h-[80px] resize-none"
              placeholder="Write your review here..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/80 transition-all duration-300"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default DoctorFeedbackModal;
