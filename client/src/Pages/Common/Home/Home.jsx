
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaToolbox, FaCar, FaHammer, FaBuilding, FaPaintRoller, FaTruck, FaUtensils, FaUserPlus, FaSearch, FaPaperPlane, FaStar } from 'react-icons/fa';
import { FaBoltLightning } from 'react-icons/fa6';
import './Home.css';
// import mario from '../../../Assets/Ellipse 2.png';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Hero from '../Hero/Hero';
import RecentJobOpen from './RecentJobOpen/RecentJobOpen';
import ClientTestimonials from './ClientTestimonials/ClientTestimonials';
const iconStyle = { color: 'black' };
// const iconColor = { color: 'gold' }
const categories = [
  { name: 'Electrician', icon: <FaBoltLightning style={iconStyle} /> },
  { name: 'Plumber', icon: <FaToolbox style={iconStyle} /> },
  { name: 'Mechanic', icon: <FaCar style={iconStyle} /> },
  { name: 'Carpenter', icon: <FaHammer style={iconStyle} /> },
  { name: 'Construction', icon: <FaBuilding style={iconStyle} /> },
  { name: 'Painting', icon: <FaPaintRoller style={iconStyle} /> },
  { name: 'Driver', icon: <FaTruck style={iconStyle} /> },
  { name: 'Food Processing', icon: <FaUtensils style={iconStyle} /> }
];

// const jobs = [
//   { location: 'Kochi', country: 'India', jobName: 'Electrician', jobType: 'Full Time', salary: '15k/Month', img: mario },
//   { location: 'Kochi', country: 'India', jobName: 'Driver', jobType: 'Part Time', salary: '1k/Day', img: mario },
//   { location: 'Tvm', country: 'India', jobName: 'Painting', jobType: 'Part Time', salary: '1k/Day', img: mario },
//   { location: 'Tvm', country: 'India', jobName: 'Gardening', jobType: 'Part Time', salary: '1k/Day', img: mario },
//   { location: 'Tvm', country: 'India', jobName: 'Carpenter', jobType: 'Full Time', salary: '15k/Month', img: mario },
//   { location: 'Kannur', country: 'India', jobName: 'Mechanic', jobType: 'Full Time', salary: '14k/Month', img: mario },
//   { location: 'Idukki', country: 'India', jobName: 'Food Processing', jobType: 'Full Time', salary: '12k/Month', img: mario },
//   { location: 'Tvm', country: 'India', jobName: 'Carpenter', jobType: 'Part Time', salary: '1k/Day', img: mario }
// ];



const Home = () => (
  <>
    <Navbar />
    <div className='container-fluid p-0'>
      <Hero />
      <div className='m-5 text-center'>
        <p className='border-info border-3 border-bottom border-dotted home-subheading'>Popular Category</p>
        <p className='home-para'>'Quick to click: Bridging the Gap Between Talent and Opportinity!'</p>
      </div>
      <Container className="mx-auto text-center">
        <Row>
          {categories.slice(0, 4).map((category, index) => (
            <Col key={index} xs={12} md={6} lg={3} className="mb-4">
              <Card className="bg-secondary-subtle text-white">
                <Card.Body className="d-flex flex-column align-items-center">
                  <div className="fs-1 mb-3">{category.icon}</div>
                  <Button variant="light" className='px-5'>{category.name}</Button>
                </Card.Body>    
              </Card>
            </Col>
          ))}
        </Row>
        <Row>
          {categories.slice(4).map((category, index) => (
            <Col key={index} xs={12} md={6} lg={3} className="mb-4">
              <Card className="bg-secondary-subtle text-white">
                <Card.Body className="d-flex flex-column align-items-center">
                  <div className="fs-1 mb-3">{category.icon}</div>
                  <Button variant="light" className='px-5'>{category.name}</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Container className='home-bg mb-0'>
        <div className='m-5 mb-0 text-center'>
          <Row className='m-5 text-center'>
            <p className='home-subheading'>How It Works?</p>
          </Row>
          <Row className='m-5'>
            <Col>
              <FaUserPlus className="fs-1 icon-color" />
              <h3 className='text-secondary h3-nowrap'>Create an Account</h3>
              <p>It is long established fact reader distracted readable content</p>
            </Col>
            <Col className='m-auto'>
              <i className="bi bi-arrow-right fs-1 w-100"></i>
            </Col>
            <Col>
              <FaSearch className="fs-1 icon-color" />
              <h3 className='text-secondary h3-nowrap'>Find Your Job</h3>
              <p>It is long established fact reader distracted readable content</p>
            </Col>
            <Col className='m-auto'>
              <i className="bi bi-arrow-right fs-1 w-100"></i>
            </Col>
            <Col>
              <FaPaperPlane className="fs-1 icon-color" />
              <h3 className='text-secondary h3-nowrap'>Apply</h3>
              <p>It is long established fact reader distracted readable content</p>
            </Col>
          </Row>
        </div>
      </Container>
      <Container>
        <Row className='mb-5 text-center'>
          <h2 className='home-subheading'>Recent Job Openings</h2>
          <p className='home-para icon-color'>Welcome to the world of jobs</p>
        </Row>
        <RecentJobOpen/>
      </Container>
      {/* <div className='m-5 text-center'>
        <p className=' home-subheading'>Best Candidate</p>
        <p className='home-para'>Our Best Candidates  For You!!</p>
      </div> */}
      {/* <div className='container-fluid m-auto'>
        <Row className="m-auto">
          {[...Array(4)].map((_, index) => (
            <Col key={index} xs={12} md={6} lg={3} className="mb-4">
              <Card className="border rounded border-secondary-subtle p-3 h-100 shadow-element">
                <Card.Body className="">
                  <Row>
                    <Col className="d-flex justify-content-center align-items-center">
                      <img src={mario} alt="candidate" className="img-fluid " />
                    </Col>

                  </Row>
                  <Row>
                    <Col className="text-center d-grid align-items-center">
                      <div className="text-center fw-bold">15k/Day</div>
                    </Col>
                  </Row>
                  <Row className="mt-2 text-center d-grid align-items-center">
                    <Col>
                      <div className="fw-bold">Location | Country</div>
                    </Col>
                  </Row>
                  <Row className="mt-2 text-center d-grid align-items-center">
                    <Col>
                      <div className="fw-bold">Employee Name</div>
                    </Col>
                  </Row>
                  <Row className="mt-2 text-center d-grid align-items-center">
                    <Col>
                      <div className="">Job Name</div>
                    </Col>
                  </Row>
                  <Row className="mt-2 text-center d-grid align-items-center">
                    <Col>
                      <div className="">Job Type</div>
                    </Col>
                  </Row>
                  <Row className="mt-3 text-center d-grid align-items-center">
                    <Col>
                      <Button variant="primary" className="card-button border-0 px-5">Request Now</Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Row className="m-auto">
          {[...Array(4)].map((_, index) => (
            <Col key={index} xs={12} md={6} lg={3} className="mb-4">
              <Card className="border rounded border-secondary-subtle p-3 h-100 shadow-element">
                <Card.Body className="">
                  <Row>
                    <Col className="d-flex justify-content-center align-items-center">
                      <img src={mario} alt="candidate" className="img-fluid " />
                    </Col>

                  </Row>
                  <Row>
                    <Col className="text-center d-grid align-items-center">
                      <div className="text-center fw-bold">15k/Day</div>
                    </Col>
                  </Row>
                  <Row className="mt-2 text-center d-grid align-items-center">
                    <Col>
                      <div className="fw-bold">Location | Country</div>
                    </Col>
                  </Row>
                  <Row className="mt-2 text-center d-grid align-items-center">
                    <Col>
                      <div className="fw-bold">Employee Name</div>
                    </Col>
                  </Row>
                  <Row className="mt-2 text-center d-grid align-items-center">
                    <Col>
                      <div className="">Job Name</div>
                    </Col>
                  </Row>
                  <Row className="mt-2 text-center d-grid align-items-center">
                    <Col>
                      <div className="">Job Type</div>
                    </Col>
                  </Row>
                  <Row className="mt-3 text-center d-grid align-items-center">
                    <Col>
                      <Button variant="primary" className="card-button border-0 px-5">Request Now</Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div> */}
      {/* <Container>
        <div className='m-5 text-center'>
          <p className=' home-para'>Client Testimonials</p>
          <h1 className='fw-bold'>What Our Customers Say About Us</h1>
        </div>
        <Row>
          <Col className='m-5'>
            <div id="carouselAutoplay" className='carousel slide' data-bs-ride="carousel">
              <div className='carousel-inner  '>
                <div className='carousel-item active'>
                  <div className='card-carousel-wrapper'>
                    <Card className="card-position shadow-element">
                      <Card.Body className='p-4'>
                        <Row>
                          <Col className='card-body-custom'>
                            <img src={mario} alt="pic" className="card-img-circle card-img-carousel" />
                          </Col>
                          <Col className='card-price text-end d-flex align-items-center justify-content-end'>
                            Adom
                          </Col>
                        </Row>
                        <Row className='mt-4'>
                          <Col className='card-location'>
                            March 20,2024
                          </Col>
                        </Row>
                        <Row className='mt-2'>
                          <Col className='card-text'>
                            This is an excellent app to find jobs.Recommended for those looking for Quick to click jobs.
                          </Col>
                        </Row>
                        <Row className='mt-3 text-center'>
                          <Col>
                            {[...Array(5)].map((_, index) => (
                              <FaStar key={index} style={iconColor} />
                            ))}

                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
                <div className='carousel-item '>
                  <div className='card-carousel-wrapper'>
                    <Card className="card-position shadow-element">
                      <Card.Body className='p-4'>
                        <Row>
                          <Col className='card-body-custom'>
                            <img src={mario} alt="pic" className="card-img-circle card-img-carousel" />
                          </Col>
                          <Col className='card-price text-end d-flex align-items-center justify-content-end'>
                            Adom
                          </Col>
                        </Row>
                        <Row className='mt-4'>
                          <Col className='card-location'>
                            March 20,2024
                          </Col>
                        </Row>
                        <Row className='mt-2'>
                          <Col className='card-text'>
                            This is an excellent app to find jobs.Recommended for those looking for Quick to click jobs.
                          </Col>
                        </Row>
                        <Row className='mt-3 text-center'>
                          <Col>
                            {[...Array(5)].map((_, index) => (
                              <FaStar key={index} style={iconColor} />
                            ))}

                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
                <div className='carousel-item'>
                  <div className='card-carousel-wrapper'>
                    <Card className="card-position shadow-element">
                      <Card.Body className='p-4'>
                        <Row>
                          <Col className='card-body-custom'>
                            <img src={mario} alt="pic" className="card-img-circle card-img-carousel" />
                          </Col>
                          <Col className='card-price text-end d-flex align-items-center justify-content-end'>
                            Adom
                          </Col>
                        </Row>
                        <Row className='mt-4'>
                          <Col className='card-location'>
                            March 20,2024
                          </Col>
                        </Row>
                        <Row className='mt-2'>
                          <Col className='card-text'>
                            This is an excellent app to find jobs.Recommended for those looking for Quick to click jobs.
                          </Col>
                        </Row>
                        <Row className='mt-3 text-center'>
                          <Col>
                            {[...Array(5)].map((_, index) => (
                              <FaStar key={index} style={iconColor} />
                            ))}
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselAutoplay" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselAutoplay" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>

          </Col>
        </Row>
      </Container> */}
      <ClientTestimonials/> 
    </div>
    <Footer />
  </>
);

export default Home;
