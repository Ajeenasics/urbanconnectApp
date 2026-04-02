import { useEffect, useState } from "react";
import axiosInstance from "../../Constants/Baseurl";
import { toast } from "react-toastify";
import "./Reviews.css";
import { imageBaseUrl } from "../../Constants/Baseurl";

function AddReviews({ onClose, workerId }) {
  const customerId = localStorage.getItem("custid");
  const url = imageBaseUrl;

  const [reviewdata, setReviewData] = useState({
    customerId: customerId,
    workerId: workerId,
    reviews: "",
  });
  console.log(reviewdata, "reviewdata");

  const [workerdata, setWorkerData] = useState();

  useEffect(() => {
    axiosInstance
      .post(`viewworkerbyid/${workerId}`)
      .then((res) => {
        console.log(res);
        setWorkerData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [workerId]);

  const changefn = (e) => {
    setReviewData({
      ...reviewdata,
      [e.target.name]: e.target.value,
    });
  };
  console.log(reviewdata);

  //   profile image

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setReviewData((prevState) => ({
          ...prevState,
          profile: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // ratings

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleClick = (index) => {
    const rate = parseInt(index);
    // setReviewData((prevState) => ({
    //     ...prevState,
    //     rating: index,
    //   }));
    setRating(rate);
  };

  function addRating() {
    console.log(workerId, rating);
    axiosInstance
      .post(`addRating/${workerId}`, { rating: rating })
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          toast.success(res.data.msg);
          onClose();
        } else {
          toast.warn("Something Went Wrong");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function addReviews() {
    axiosInstance
      .post(`addReviews`, reviewdata)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          toast.success(res.data.msg);
          onClose();
        } else {
          toast.warn("Something Went Wrong");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // form submit

  const submitfn = (a) => {
    a.preventDefault();
    addRating();
    addReviews();
  };

  return (
    <>
      <div className="container">
        <div className="">
          <div className="addreview-maincontainermainbox">
            <div className="addreview-maincontainermainboxtop">Add Review</div>
            <div className="container">
              <div className="row addreview-maininputs">
                <form onSubmit={submitfn}>
                  <div className="addreview-starrate ">
                    <div className="star-rating">
                      {[...Array(5)].map((star, index) => {
                        index += 1;
                        return (
                          <button
                            type="button"
                            key={index}
                            className={
                              index <= (hover || rating) ? "on" : "off"
                            }
                            onClick={() => handleClick(index)}
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(rating)}
                          >
                            <span className="star">&#9733;</span>
                          </button>
                        );
                      })}
                    </div>
                    {/* <p>Your rating: {rating}</p> */}

                    <div>
                      <div className="profile-pic-container">
                        <div className="profile-pic-wrapper">
                          <img
                            // src={reviewdata.profile || profileimg}
                            src={`${url}/${workerdata?.image?.filename}`}
                            alt="Profile"
                            className="profile-pic"
                          />
                          <label
                            htmlFor="profile-pic-upload"
                            className="profile-pic-edit"
                          >
                            {/* <FontAwesomeIcon icon={faEdit} /> */}
                          </label>
                          <input
                            id="profile-pic-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: "none" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 ">
                    <p>Worker Name</p>
                  </div>
                  <div className="col-12 mx-4 px-2">
                    {/* <input type='text' placeholder='Enter Job Name' name='jobname'  onChange={changefn} required/> */}
                    <h3>
                      <b>{workerdata?.name}</b>
                    </h3>
                  </div>
                  <div className="col-12 mt-3">
                    <p>Review</p>
                  </div>
                  <div className="col-12 addreview-maininputsi">
                    <textarea
                      type="text"
                      placeholder="Enter Work Details"
                      name="reviews"
                      onChange={changefn}
                      required
                    />
                  </div>
                  <div className="addreview-maininputsbutton">
                    <button type="submit">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddReviews;
