import {useEffect, useRef, useState} from "react";
import {FaFilter} from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar.jsx";
import SortOptions from "../components/Products/SortOptions.jsx";
import ProductGrid from "../components/Products/ProductGrid.jsx";
import {useParams, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchProductDetails, fetchProductsByFilters} from "../redux/slices/productsSlice.js";

const CollectionPage = () => {
    const {collection} = useParams();
    const [searchParams] = useSearchParams()
    const dispatch = useDispatch();
    const {products, loading, error} = useSelector((state) => state.products);
    const queryParams = Object.fromEntries([...searchParams]);
    const sidebarRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchProductsByFilters({collection, ...queryParams}));
    }, [dispatch, collection, searchParams]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }
    const handleClickOutside = (e) => {
        // Close sidebar if clicked outside
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            setIsSidebarOpen(false);
        }
    }
    useEffect(() => {
        // Add Event listener for clicks
        document.addEventListener("mousedown", handleClickOutside);
        // Cleanup function
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <div className={"flex flex-col lg:flex-row"}>
            {/*Mobile Filter Button*/}
            <button
                onClick={toggleSidebar}
                className={"lg:hidden border p-2 flex justify-center items-center"}>
                <FaFilter className="mr-2"/> Filters
            </button>
            {/* Filter Sidebar */}
            <div
                ref={sidebarRef}
                className={`${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
            >
                <FilterSidebar/>
            </div>
            <div className={"flex-grow p-4"}>
                <h2 className={"text-2xl uppercase mb-4"}>All Collection</h2>
                {/* Sort options */}
                <SortOptions/>
                {/* Product grid */}
                <ProductGrid products={products} loading={loading} error={error} />
            </div>
        </div>
    );
};
export default CollectionPage;