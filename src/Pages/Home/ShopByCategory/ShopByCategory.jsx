import { useRef } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { HiOutlineArrowLongLeft, HiOutlineArrowLongRight } from "react-icons/hi2";
import "swiper/css";
import "swiper/css/navigation";
import "./ShopByCategory.scss";

const categories = [
    {
        id: "jewellery",
        title: "Jewellery Weighing Scales",
        count: "250 Products",
        image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=600&q=80&auto=format&fit=crop",
    },
    {
        id: "tabletop",
        title: "Table Top Weighing Scales",
        count: "250 Products",
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80&auto=format&fit=crop",
    },
    {
        id: "kisan",
        title: "Kisan-Transport Scale",
        count: "250 Products",
        image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80&auto=format&fit=crop",
    },
    {
        id: "analytical",
        title: "Analytical-Precision Lab Scales",
        count: "250 Products",
        image: "https://images.unsplash.com/photo-1751054554594-85de2fe63e6b?w=600&q=80&auto=format&fit=crop",
    },
    {
        id: "platform",
        title: "Platform Weighing Scale",
        count: "250 Products",
        image: "https://images.unsplash.com/photo-1682655012904-0e67019e8a0e?w=600&q=80&auto=format&fit=crop",
    },
    {
        id: "crane",
        title: "Crane Weighing Scale",
        count: "250 Products",
        image: "https://images.unsplash.com/photo-1522844990619-4951c40f7eda?w=600&q=80&auto=format&fit=crop",
    },
    {
        id: "truck",
        title: "Truck Weighbridge",
        count: "250 Products",
        image: "https://images.unsplash.com/photo-1581092918484-8313ce2a9b8e?w=600&q=80&auto=format&fit=crop",
    },
    {
        id: "personal",
        title: "Personal Bathroom Scale",
        count: "250 Products",
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

const ShopByCategory = () => {
    const swiperRef = useRef(null);

    return (
        <section className="shop-category-section">
            <motion.h2
                className="shop-category-heading"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={fadeUp}
            >
                Shop By Category
            </motion.h2>

            <motion.p
                className="shop-category-subtext"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={fadeUp}
                custom={1}
            >
                With a strong focus on accuracy, durability, and performance, we offer
                a wide range of weighing scales built to deliver reliable results
                every time.
            </motion.p>

            <motion.div
                className="shop-category-slider-wrap"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                custom={2}
            >
                <button
                    className="cat-nav cat-nav-prev"
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
                    className="shop-category-swiper"
                >
                    {categories.map((cat) => (
                        <SwiperSlide key={cat.id}>
                            <div className="category-card">
                                <div className="category-img-box">
                                    <img src={cat.image} alt={cat.title} />
                                </div>
                                <h3 className="category-title">{cat.title}</h3>
                                <p className="category-count">{cat.count}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <button
                    className="cat-nav cat-nav-next"
                    onClick={() => swiperRef.current?.slideNext()}
                    aria-label="Next"
                >
                    <HiOutlineArrowLongRight />
                </button>
            </motion.div>
        </section>
    );
};

export default ShopByCategory;