import Navbar from "../NavbarFooter/Navbar";
import { Button } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"
const Home = () => {
    return ( 
        <>
        <Navbar/>
        
<button>this is <button></button></button>
<main>
    <Container>
        <Row className="px-4 my-5">
            <Col sm={7}>
               <Image src="Airbnb.png" 
               fluid
               rounded
               className=""
               /> 
                sm=8</Col>
            <Col sm={5}>
                <h1 class="font-weigh-light">Welcome</h1>
            <p class ="mt-4">
                Welcome to your home away from home! Discover comfort, style, and convenience in our carefully curated selection of Airbnb listings. Whether you're seeking a cozy cabin nestled in nature, a chic urban loft in the heart of the city, or a charming seaside cottage with breathtaking views, we have the perfect accommodation to make your stay unforgettable. Immerse yourself in local culture, create lasting memories, and experience the world like never before with Airbnb.
                </p>
                <Button variant="outline-primary">Book Now</Button>
                sm=4</Col>
        </Row>
    <Row>
        <Card className="text-center bg-secondary text-white mt-5 py-4">
            <Card.Body>This is some text</Card.Body>
        </Card>
    </Row>
    <Row>
        <Col>
        <Card style={{width: "18rem"}}>
            <Card.Img variant="top" src="Venezia.png/100px180"/>
            <Card.Body>
                <Card.Title>Venezia,Italy</Card.Title>
                <Card.Text>
                7-14 July
                $263 night
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
        </Col>
        <Col>
        <Card style={{width: "18rem"}}>
            <Card.Img variant="top" src="Maldives.png/100px180"/>
            <Card.Body>
                <Card.Title>Maldives</Card.Title>
                <Card.Text>
                May 1-6
                $452 night
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
        </Col>
        <Col>
        <Card style={{width: "18rem"}}>
            <Card.Img variant="top" src="Boge.jpg/100px180"/>
            <Card.Body>
                <Card.Title>Boge,Rugove</Card.Title>
                <Card.Text>
                June 12-16
                $48 night
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
        </Col>
    </Row>
    </Container>
</main>
</>
    );
}
export default Home;