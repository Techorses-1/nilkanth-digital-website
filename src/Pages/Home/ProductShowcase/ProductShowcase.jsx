import { motion } from "framer-motion";
import "./ProductShowcase.scss";
import img1 from "../../../assets/home/img1.png"
import img2 from "../../../assets/home/img2.png"
import img3 from "../../../assets/home/img3.png"
import img4 from "../../../assets/home/img4.png"

import mob_img1 from "../../../assets/home/mob_img1.png"
import mob_img2 from "../../../assets/home/mob_img2.png"
import mob_img3 from "../../../assets/home/mob_img3.png"
import mob_img4 from "../../../assets/home/mob_img4.png"

const products = [
    {
        id: "platform",
        title: "PLATFORM WEIGHING SCALE",
        subtitle: "300 kg",
        image: img1,
        mobileImage: mob_img1,
        className: "card-left",
    },
    {
        id: "jewellery",
        title: "JEWELLERY WEIGHING SCALE",
        subtitle: "5 kg",
        image: img2,
        mobileImage: mob_img2,
        className: "card-mid-top",
    },
    {
        id: "truck",
        title: "TRUCK WEIGHBRIDGE",
        subtitle: "1 Ton ",
        image: img3,
        mobileImage: mob_img3,
        className: "card-mid-bottom",
    },
    {
        id: "crane",
        title: "CRANE WEIGHING SCALE",
        subtitle: "5 Ton",
        image: img4,
        mobileImage: mob_img4,
        className: "card-right",
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" },
    }),
};

const ProductShowcase = () => {
    return (
        <section className="product-showcase-section">
            <div className="product-showcase-grid">
                {products.map((product, i) => (
                    <motion.div
                        className={`showcase-card ${product.className}`}
                        key={product.id}
                        custom={i}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        whileHover="hover"
                    >
                        <motion.img
                            src={product.image}
                            alt={product.title}
                            className="showcase-img showcase-img-desktop"
                            variants={{ hover: { scale: 1.08 } }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                        <motion.img
                            src={product.mobileImage}
                            alt={product.title}
                            className="showcase-img showcase-img-mobile"
                            variants={{ hover: { scale: 1.08 } }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                        <motion.div
                            className="showcase-card-overlay"
                            variants={{ hover: { backgroundColor: "rgba(0,74,173,0.25)" } }}
                        >
                            <h3>{product.title}</h3>
                            {product.subtitle && <p>{product.subtitle}</p>}
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default ProductShowcase;