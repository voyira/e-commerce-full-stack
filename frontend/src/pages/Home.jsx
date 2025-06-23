import Hero from "../components/Layout/Hero.jsx";
import GenderCollectionSection from "../components/Products/GenderCollectionSection.jsx";
import NewArrivals from "../components/Products/NewArrivals.jsx";
import ProductDetails from "../components/Products/ProductDetails.jsx";

const Home = () => {
    return (
        <div>
            <Hero/>
            <GenderCollectionSection/>
            <NewArrivals/>
            {/*bestseller*/}
            <h2 className={"text-3xl text-center font-bold mb-4"}>Best Seller</h2>
            <ProductDetails/>
        </div>
    );
};

export default Home;