import { motion } from "framer-motion";
import "./ProductShowcase.scss";

const products = [
    {
        id: "platform",
        title: "PLATFORM WEIGHING SCALE",
        subtitle: "300 kg",
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80&auto=format&fit=crop",
        className: "card-left",
    },
    {
        id: "jewellery",
        title: "JEWELLERY WEIGHING SCALE",
        subtitle: "5 kg",
        image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800&q=80&auto=format&fit=crop",
        className: "card-mid-top",
    },
    {
        id: "truck",
        title: "TRUCK WEIGHBRIDGE",
        subtitle: "1 Ton ",
        image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80&auto=format&fit=crop",
        className: "card-mid-bottom",
    },
    {
        id: "crane",
        title: "CRANE WEIGHING SCALE",
        subtitle: "5 Ton",
        image: "https://images.unsplash.com/photo-1751054554594-85de2fe63e6b?w=800&q=80&auto=format&fit=crop",
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