import Navbar from "../NavbarFooter/Navbar";
import { Button } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Icones from '../components/Icones';
import Cards from '../components/Cards';
import Slider from '../components/Slider';
import Footer from "../NavbarFooter/Footer";
const Home = () => {
    return (
        <>
            <div><Navbar /></div>
            <div><Slider /></div>
            <div><Icones /></div>
            <div><Cards /></div>
            <div><Footer /></div>


        </>
    );
}
export default Home;