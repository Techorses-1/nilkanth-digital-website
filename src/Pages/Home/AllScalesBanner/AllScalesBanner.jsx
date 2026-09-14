import { motion } from "framer-motion";
import "./AllScalesBanner.scss";
import banner from "../../../assets/home/banner/scalebanner.png"

const AllScalesBanner = () => {
    return (
        <section className="all-scales-section">
            <motion.div
                className="all-scales-wrap"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
            >
                <div className="blue-card"></div>

                <motion.div
                    className="truck-image-wrap"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
                    whileHover={{ scale: 1.03 }}
                >
                    <img
                        src={banner}
                        alt="Truck on weighbridge scale"
                    />
                </motion.div>

                <motion.div
                    className="all-scales-text"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                >
                    <p>
                        <span className="highlight">All</span> Scales.
                    </p>
                    <p>
                        <span className="highlight">One</span> Destination.
                    </p>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default AllScalesBanner;