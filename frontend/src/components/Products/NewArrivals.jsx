import {FiChevronLeft, FiChevronRight} from "react-icons/fi";
import {Link} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import axios from "axios";

const NewArrivals = () => {
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const [newArrivals, setNewArrivals] = useState([]);

    useEffect(() => {
        const fetchNewArrivals = async () => {
            try{
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
                );
                setNewArrivals(response.data);
            }catch(error){
                console.log(error);
            }
        };
        fetchNewArrivals();
    },[])

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    }
    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = x - startX;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };
    const handleMouseUpOrLeave = () => {
        setIsDragging(false);
    };
    const scroll = (direction) => {
        const scrollAmount = direction === "left" ? -300 : 300;
        scrollRef.current.scrollBy({left: scrollAmount, behavior: "smooth"});
    }
    //Update Scroll Buttons
    const updateScrollButtons = () => {
        const container = scrollRef.current;
        if (container) {
            const leftScroll = container.scrollLeft;
            const rightScrollable =
                container.scrollWidth > leftScroll + container.clientWidth;
            setCanScrollLeft(leftScroll > 0);
            setCanScrollRight(rightScrollable);
        }
    }
    useEffect(() => {
        const container = scrollRef.current;
        if (container) {
            container.addEventListener("scroll", updateScrollButtons);
            updateScrollButtons();
            return () => container.removeEventListener("scroll", updateScrollButtons);
        }
    }, [newArrivals]);
    return (
        <section className={"py-18 px-4 lg:px-0"}>
            <div className={"container mx-auto text-center mb-10 relative"}>
                <h2 className={"text-3xl font-bold mb-4"}>Explore New Arrivals</h2>
                <p className={"text-lg text-gray-600 mb-8"}>
                    A stylish jacket is more than just outerwear—it's a statement piece that elevates your look while
                    keeping you comfortable in any season. Whether you prefer a sleek leather biker jacket, a tailored
                    blazer-style design, or a cozy oversized fit, the right jacket can transform an outfit from ordinary
                    to extraordinary.
                </p>
                {/*Scroll Buttons*/}
                <div className={"absolute right-0 bottom-[-30px] flex space-x-2"}>
                    <button onClick={() => scroll("left")}
                            disabled={!canScrollLeft}
                            className={`p-2 rounded border ${
                                canScrollLeft
                                    ? "bg-white text-black"
                                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            }`}
                    >
                        <FiChevronLeft className={"text-2xl"}/>
                    </button>
                    <button onClick={() => scroll("right")}
                            disabled={!canScrollRight}
                            className={`p-2 rounded border ${
                                canScrollRight
                                    ? "bg-white text-black"
                                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            }`}
                    >
                        <FiChevronRight className={"text-2xl"}/>
                    </button>
                </div>
            </div>
            {/*{Scrollable Content}*/}
            <div ref={scrollRef}
                 className={`container mx-auto overflow-x-scroll flex space-x-6 relative ${
                     isDragging ? "cursor-grabbing" : "cursor-grab"
                 }`}
                 onMouseDown={handleMouseDown}
                 onMouseMove={handleMouseMove}
                 onMouseUp={handleMouseUpOrLeave}
                 onMouseLeave={handleMouseUpOrLeave}
            >
                {newArrivals.map((product) => (
                    <div key={product._id} className={"min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative"}>
                        {product.images?.[0]?.url ? (
                            <img
                                src={product.images[0].url}
                                alt={product.images[0].altText || product.name}
                                className={"w-full h-[500px] object-cover rounded-lg"}
                                draggable={"false"}
                            />
                        ) : (
                            <div className={"w-full h-[500px] bg-gray-200 rounded-lg flex items-center justify-center"}>
                                <span className={"text-gray-500"}>No image available</span>
                            </div>
                        )}
                        <div
                            className={"absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg"}>
                            <Link to={`/products/${product.id}`} className={"block"}>
                                <h4 className={"font-medium"}>{product.name}</h4>
                                <p className={"mt-1"}>${product.price}</p>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
export default NewArrivals;