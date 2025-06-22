import Hero from "../components/Layout/Hero.jsx";
import GenderCollectionSection from "../components/Products/GenderCollectionSection.jsx";
import NewArrivals from "../components/Products/NewArrivals.jsx";

const Home = () => {
    return (
        <div>
            <Hero/>
            <GenderCollectionSection/>
            <NewArrivals/>
        </div>
    );
};

export default Home;