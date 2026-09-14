import { useRef } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { HiOutlineArrowLongLeft, HiOutlineArrowLongRight } from "react-icons/hi2";
import "swiper/css";
import "swiper/css/navigation";
import "./HomeProducts.scss";

const products = [
    {
        id: "jewellery",
        title: "Jewellery Weighing Scales",
        image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=600&q=80&auto=format&fit=crop",
    },
    {
        id: "tabletop",
        title: "Table Top Weighing Scales",
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80&auto=format&fit=crop",
    },
    {
        id: "kisan",
        title: "Kisan-Transport Scale",
        image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80&auto=format&fit=crop",
    },
    {
        id: "analytical",
        title: "Analytical-Precision Lab Scales",
        image: "https://images.unsplash.com/photo-1751054554594-85de2fe63e6b?w=600&q=80&auto=format&fit=crop",
    },
    {
        id: "platform",
        title: "Platform Weighing Scale",
        image: "https://images.unsplash.com/photo-1682655012904-0e67019e8a0e?w=600&q=80&auto=format&fit=crop",
    },
    {
        id: "crane",
        title: "Crane Weighing Scale",
        image: "https://images.unsplash.com/photo-1522844990619-4951c40f7eda?w=600&q=80&auto=format&fit=crop",
    },
    {
        id: "truck",
        title: "Truck Weighbridge",
        image: "https://images.unsplash.com/photo-1581092918484-8313ce2a9b8e?w=600&q=80&auto=format&fit=crop",
    },
    {
        id: "personal",
        title: "Personal Bathroom Scale",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80&auto=format&fit=crop",
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
    }),
};

const HomeProducts = () => {
    const swiperRef = useRef(null);

    return (
        <section className="home-products-section">
            <motion.h2
                className="home-products-heading"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={fadeUp}
            >
                Products
            </motion.h2>

            <motion.div
                className="home-products-slider-wrap"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                custom={1}
            >
                <button
                    className="prod-nav prod-nav-prev"
                    onClick={() => swiperRef.current?.slidePrev()}
                    aria-label="Previous"
                >
                    <HiOutlineArrowLongLeft />
                </button>

                <Swiper
                    modules={[Navigation]}
                    onSwiper={(s) => (swiperRef.current = s)}
                    loop={true}
                    speed={700}
                    grabCursor={true}
                    watchOverflow={true}
                    slidesPerView={2}
                    spaceBetween={16}
                    breakpoints={{
                        768: { slidesPerView: 3, spaceBetween: 20 },
                        992: { slidesPerView: 4, spaceBetween: 24 },
                    }}
                    className="home-products-swiper"
                >
                    {products.map((product) => (
                        <SwiperSlide key={product.id}>
                            <div className="product-card">
                                <div className="product-img-box">
                                    <img src={product.image} alt={product.title} />
                                </div>
                                <h3 className="product-title">{product.title}</h3>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <button
                    className="prod-nav prod-nav-next"
                    onClick={() => swiperRef.current?.slideNext()}
                    aria-label="Next"
                >
                    <HiOutlineArrowLongRight />
                </button>
            </motion.div>
        </section>
    );
};

export default HomeProducts;