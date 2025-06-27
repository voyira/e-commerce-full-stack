import {
    HiArrowPathRoundedSquare,
    HiOutlineCreditCard,
    HiShoppingBag,
} from "react-icons/hi2";

const FeaturesSection = () => {
    return (
        <section className={"py-16 px-4 bg-white"}>
            <div className={"container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center"}>
                {/* Feature 1 */}
                <div className={"flex flex-col items-center"}>
                    <div className={"p-4 rounded-full mb-4 bg-gray-100"}>
                        <HiShoppingBag className={"text-xl text-gray-700"}/>
                    </div>
                    <h4 className={"tracking-tight mb-2"}>
                        FREE INTERNATIONAL SHIPPING
                    </h4>
                    <p className={"text-gray-600 text-sm tracking-tight"}>
                        On all orders above $100
                    </p>
                </div>
                {/* Feature 2 */}
                <div className={"flex flex-col items-center"}>
                    <div className={"p-4 rounded-full mb-4 bg-gray-100"}>
                        <HiArrowPathRoundedSquare className={"text-xl text-gray-700"}/>
                    </div>
                    <h4 className={"tracking-tight mb-2"}>
                        45 DAYS RETURN
                    </h4>
                    <p className={"text-gray-600 text-sm tracking-tight"}>
                        Guaranteed money back
                    </p>
                </div>
                {/* Feature 3 */}
                <div className={"flex flex-col items-center"}>
                    <div className={"p-4 rounded-full mb-4 bg-gray-100"}>
                        <HiOutlineCreditCard className={"text-xl text-gray-700"}/>
                    </div>
                    <h4 className={"tracking-tight mb-2"}>
                        SECURE CHECKOUT
                    </h4>
                    <p className={"text-gray-600 text-sm tracking-tight"}>
                        100% secured checkout process
                    </p>
                </div>
            </div>
        </section>
    );
};
export default FeaturesSection;