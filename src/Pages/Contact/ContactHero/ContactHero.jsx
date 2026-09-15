import { motion } from "framer-motion";
import "./ContactHero.scss";

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: i * 0.15, ease: "easeOut" },
    }),
};

const ContactHero = () => {
    return (
        <section className="contact-hero-section">
            <div className="contact-hero-wrap">
                <img
                    src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600&q=80&auto=format&fit=crop"
                    alt="Contact us"
                    className="contact-hero-img"
                />

                <div className="contact-hero-overlay">
                    <motion.h1
                        className="contact-hero-title"
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        custom={0}
                    >
                        Get In Touch
                    </motion.h1>

                    <motion.p
                        className="contact-hero-subtitle"
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        custom={1}
                    >
                        Have a question about our weighing scales? We're here to help
                        you find the right solution.
                    </motion.p>
                </div>
            </div>
        </section>
    );
};

export default ContactHero;