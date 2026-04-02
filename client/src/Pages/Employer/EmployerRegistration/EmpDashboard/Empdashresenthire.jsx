import { useEffect } from "react";
import "../EmpDashboard/Empdashresenthire.css";
import img from "../../../../Assets/rectangeimage.png";
import { useNavigate } from "react-router-dom";

function Empdashresenthire() {
    const employer=localStorage.getItem("employer")
    console.log(employer);
    const navigate=useNavigate()
    useEffect(()=>{
        if(employer===null){
            navigate("/login")
        }

    },[])
  return (
    <div className="container">
      <div className="container-head">
        <p>Our Best Candidates</p>
      </div>
      <div className="row ">
        <div className="col-6 viewhiring-main">
          <div className="viewhiring-boxmain">
            <div className="col-12 d-flex">
              <div className="col-6">
                <div className="viewhiring-boximage">
                  <img src={img} alt="image" width="152px" height="105px" />
                </div>
                <div className="viewhiring-boxcontent">
                  <p>Need A Plumber</p>
                  <span>INR 1500/Month</span>
                </div>
              </div>
              <div className="col-6 ">
                <p className="fulltime-secondinp">Full Time</p>
                <p className="fulltime-secondinp1">
                  Soften Technologies, Kadavnthara, kochi, 487631 <br />
                  example@gmail.com
                </p>
                <button type="submit" className="fulltime-buttonmain">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-6 viewhiring-main">
          <div className="viewhiring-boxmain">
            <div className="col-12 d-flex">
              <div className="col-6">
                <div className="viewhiring-boximage">
                  <img src={img} alt="image" width="152px" height="105px" />
                </div>
                <div className="viewhiring-boxcontent">
                  <p>Need A Plumber</p>
                  <span>INR 1500/Month</span>
                </div>
              </div>
              <div className="col-6 ">
                <p className="fulltime-secondinp">Full Time</p>
                <p className="fulltime-secondinp1">
                  Soften Technologies, Kadavnthara, kochi, 487631 <br />
                  example@gmail.com
                </p>
                <button type="submit" className="fulltime-buttonmain">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-6 viewhiring-main">
          <div className="viewhiring-boxmain">
            <div className="col-12 d-flex">
              <div className="col-6">
                <div className="viewhiring-boximage">
                  <img src={img} alt="image" width="152px" height="105px" />
                </div>
                <div className="viewhiring-boxcontent">
                  <p>Need A Plumber</p>
                  <span>INR 1500/Month</span>
                </div>
              </div>
              <div className="col-6 ">
                <p className="fulltime-secondinp">Full Time</p>
                <p className="fulltime-secondinp1">
                  Soften Technologies, Kadavnthara, kochi, 487631 <br />
                  example@gmail.com
                </p>
                <button type="submit" className="fulltime-buttonmain">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 viewhiring-main">
          <div className="viewhiring-boxmain">
            <div className="col-12 d-flex">
              <div className="col-6">
                <div className="viewhiring-boximage">
                  <img src={img} alt="image" width="152px" height="105px" />
                </div>
                <div className="viewhiring-boxcontent">
                  <p>Need A Plumber</p>
                  <span>INR 1500/Month</span>
                </div>
              </div>
              <div className="col-6 ">
                <p className="fulltime-secondinp">Full Time</p>
                <p className="fulltime-secondinp1">
                  Soften Technologies, Kadavnthara, kochi, 487631 <br />
                  example@gmail.com
                </p>
                <button type="submit" className="fulltime-buttonmain">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 viewhiring-main">
          <div className="viewhiring-boxmain">
            <div className="col-12 d-flex">
              <div className="col-6">
                <div className="viewhiring-boximage">
                  <img src={img} alt="image" width="152px" height="105px" />
                </div>
                <div className="viewhiring-boxcontent">
                  <p>Need A Plumber</p>
                  <span>INR 1500/Month</span>
                </div>
              </div>
              <div className="col-6 ">
                <p className="fulltime-secondinp">Full Time</p>
                <p className="fulltime-secondinp1">
                  Soften Technologies, Kadavnthara, kochi, 487631 <br />
                  example@gmail.com
                </p>
                <button type="submit" className="fulltime-buttonmain">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 viewhiring-main">
          <div className="viewhiring-boxmain">
            <div className="col-12 d-flex">
              <div className="col-6">
                <div className="viewhiring-boximage">
                  <img src={img} alt="image" width="152px" height="105px" />
                </div>
                <div className="viewhiring-boxcontent">
                  <p>Need A Plumber</p>
                  <span>INR 1500/Month</span>
                </div>
              </div>
              <div className="col-6 ">
                <p className="fulltime-secondinp">Full Time</p>
                <p className="fulltime-secondinp1">
                  Soften Technologies, Kadavnthara, kochi, 487631 <br />
                  example@gmail.com
                </p>
                <button type="submit" className="fulltime-buttonmain">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-bottombutton">
        <button type="submit">See More</button>
      </div>
    </div>
  );
}

export default Empdashresenthire;
