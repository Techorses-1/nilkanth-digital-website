import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import "./AboutUs.scss";

// ---- Single spinning digit (casino slot-reel style) ----
const SlotDigit = ({ digit, delay, isInView }) => {
    const index = useMotionValue(0);
    const y = useTransform(index, (v) => `${-v}em`);

    useEffect(() => {
        if (isInView) {
            const loops = 3; // full spins before landing on the final digit
            const controls = animate(index, loops * 10 + digit, {
                duration: 3.6,
                delay,
                ease: [0.22, 1, 0.36, 1],
            });
            return controls.stop;
        }
    }, [isInView, digit, delay, index]);

    const strip = Array.from({ length: 40 }, (_, i) => i % 10);

    return (
        <span className="slot-window">
            <motion.span className="slot-strip" style={{ y }}>
                {strip.map((d, i) => (
                    <span key={i} className="slot-cell">
                        {d}
                    </span>
                ))}
            </motion.span>
        </span>
    );
};

// ---- Drop-in replacement for the old plain Counter — same target/suffix props ----
const Counter = ({ target, suffix = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const chars = String(target).split("");

    return (
        <span ref={ref} className="slot-counter">
            {chars.map((c, i) =>
                /\d/.test(c) ? (
                    <SlotDigit key={i} digit={Number(c)} delay={i * 0.15} isInView={isInView} />
                ) : (
                    <span key={i} className="slot-static">
                        {c}
                    </span>
                )
            )}
            {suffix ? <span className="slot-static">{suffix}</span> : null}
        </span>
    );
};

const stats = [
    { id: "sold", value: 10000, suffix: "+", label: "Product Sold" },
    { id: "satisfaction", value: 98, suffix: "%", label: "Customer Satisfaction" },
    { id: "collab", value: 150, suffix: "+", label: "Brand Collab" },
];

const images = [
    {
        id: "platform",
        src: "https://images.unsplash.com/photo-1682655012904-0e67019e8a0e?w=1000&q=80&auto=format&fit=crop",
        alt: "Baby weighing scale in use",
        className: "about-img-left",
    },
    {
        id: "personal",
        src: "https://images.unsplash.com/photo-1522844990619-4951c40f7eda?w=1000&q=80&auto=format&fit=crop",
        alt: "Person standing on digital bathroom scale",
        className: "about-img-right",
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

const AboutUs = () => {
    return (
        <section className="about-us-section">
            <motion.h2
                className="about-us-heading"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={fadeUp}
            >
                About Us
            </motion.h2>

            <motion.p
                className="about-us-subtext"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={fadeUp}
                custom={1}
            >
                We are a trusted provider of precision weighing solutions designed to
                meet the needs of modern industries, laboratories, retail businesses,
                and commercial operations.
            </motion.p>

            <motion.div
                className="about-us-card"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                custom={2}
            >
                <div className="about-us-images">
                    {images.map((img, i) => (
                        <motion.div
                            key={img.id}
                            className={`about-img-wrap ${img.className}`}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <img src={img.src} alt={img.alt} />
                        </motion.div>
                    ))}
                </div>

                <div className="about-us-stats">
                    {stats.map((stat, i) => (
                        <motion.div
                            className="stat-box"
                            key={stat.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
                            whileHover={{ y: -4 }}
                        >
                            <h3 className="stat-value">
                                <Counter target={stat.value} suffix={stat.suffix} />
                            </h3>
                            <p className="stat-label">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default AboutUs;