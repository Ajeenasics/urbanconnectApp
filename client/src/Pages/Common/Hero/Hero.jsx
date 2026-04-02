
import { Container, Row } from 'react-bootstrap';
import './Hero.css';

function Hero() {
//   const[data,setData]=useState([])
//   useEffect(()=>{
//     axiosInstance.post('/viewalljobpost')
//     .then((res)=>{
//         console.log(res,"res");
//           setData(res.data.data)
//       })
//       .catch((err)=>{
//         alert("Failed to fetch user details")
//     });
// },[])

  return (
    <div className='home-hero'>
      <div className='home-hero-heading mx-5 mb-5 p-5 '>
        Get Your Hands Dirty on Your Terms: Find quick to click Jobs Now!
      </div>
      <Container className="text-center p-5">
        <Row className='p-5'>
          {/* <Col className="mx-1">
            <InputGroup className="mb-3 h-100">
              <Form.Control
                type="text"
                placeholder="Job Name"
                aria-label="JobName"
                aria-describedby="basic-input"
                className="custom-placeholder py-2 "
              />
            </InputGroup>
          </Col> */}
          {/* <Col className="mx-1">
            <InputGroup className='h-100'>
              <Form.Control
                type="text"
                placeholder="Category"
                aria-label="Text input dropdown button"
                className="custom-placeholder py-2"
              /> */}
              {/* <DropdownButton
                variant="light"
                title=""
                id="input-group-dropdown-2"
                align="end"
              >
                <Dropdown.Item href="#">Category1</Dropdown.Item>
                <Dropdown.Item href="#">Category2</Dropdown.Item>
                <Dropdown.Item href="#">Category3</Dropdown.Item>
              </DropdownButton> */}
            {/* </InputGroup>
          </Col> */}
          {/* <Col className="mx-1">
            <div className="d-grid gap-1 h-100">
              <Button variant="warning" className="text-white fs-6 py-2 h-100">Search Job</Button>
            </div>
          </Col> */}
        </Row>
      </Container>
    </div>
  )
}

export default Hero;
