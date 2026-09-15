import { useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { HiOutlineArrowLongLeft, HiOutlineArrowLongRight } from "react-icons/hi2";
import categoriesData from "../../../data/categories";
import "swiper/css";
import "swiper/css/navigation";
import "./ShopByCategory.scss";

const getRandomCategories = (arr, count) => {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
};

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
    const navigate = useNavigate();

    // pick 6 random categories once per mount (won't reshuffle on re-render)
    const randomCategories = useMemo(() => getRandomCategories(categoriesData, 6), []);

    const handleCategoryClick = (categoryId) => {
        navigate(`/product?category=${categoryId}`);
    };

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
                    {randomCategories.map((cat) => (
                        <SwiperSlide key={cat.id}>
                            <div
                                className="category-card"
                                onClick={() => handleCategoryClick(cat.id)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleCategoryClick(cat.id);
                                }}
                            >
                                <div className="category-img-box">
                                    <img src={cat.image} alt={cat.name} loading="lazy" />
                                </div>
                                <h3 className="category-title">{cat.name}</h3>
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

            <motion.div
                className="shop-category-view-all-wrap"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={fadeUp}
                custom={3}
            >
                <Link to="/categories" className="view-all-btn">
                    View All Categories
                </Link>
            </motion.div>
        </section>
    );
};

export default ShopByCategory;