import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import "./Footer.scss";

const menuLinks = [
    { id: "home", label: "Home", href: "/" },
    { id: "product", label: "Product", href: "/product" },
    { id: "contact", label: "Contact", href: "/contact" },
];

const socialLinks = [
    { id: "instagram", icon: <FaInstagram />, href: "https://instagram.com" },
    { id: "facebook", icon: <FaFacebookF />, href: "https://facebook.com" },
    { id: "youtube", icon: <FaYoutube />, href: "https://youtube.com" },
];

const SocialIcons = ({ className = "" }) => (
    <div className={`footer-social ${className}`}>
        {socialLinks.map((s) => (
            <a
                key={s.id}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.id}
                className="footer-social-link"
            >
                {s.icon}
            </a>
        ))}
    </div>
);

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" },
    }),
};

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="footer__container">
                <div className="footer-top">
                    <motion.div
                        className="footer-col footer-col-brand"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeUp}
                        custom={0}
                    >
                        <h2 className="footer-logo">
                            NILKANTH
                            <span className="footer-logo-script">Digital</span>
                        </h2>

                        <div className="footer-tagline">
                            <span className="tagline-line" />
                            <p>
                                Enter the world of <strong>Precision.</strong>
                            </p>
                        </div>
                    </motion.div>

                    <SocialIcons className="footer-social--mobile" />

                    <motion.div
                        className="footer-col footer-col-menu"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeUp}
                        custom={1}
                    >
                        <h4 className="footer-col-title">Menu</h4>
                        <ul>
                            {menuLinks.map((link) => (
                                <li key={link.id}>
                                    <a href={link.href}>{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        className="footer-col footer-col-contact"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeUp}
                        custom={2}
                    >
                        <ul>
                            <li>
                                <span className="contact-icon">
                                    <FaPhoneAlt />
                                </span>
                                <span className="contact-text">
                                    <span className="contact-label">Call: </span>
                                    +91 1234567890
                                </span>
                            </li>
                            <li>
                                <span className="contact-icon">
                                    <FaEnvelope />
                                </span>
                                <span className="contact-text">
                                    <span className="contact-label">Mail: </span>
                                    info@nilkanthdigitalscale.in
                                </span>
                            </li>
                            <li>
                                <span className="contact-icon">
                                    <FaMapMarkerAlt />
                                </span>
                                <span className="contact-text address-text">
                                    <span className="contact-label">Address: </span>
                                    Dayal Bhuvan Lane, Opp Lalcourt, Rajmahel Road, Vadodara, 390001
                                </span>
                            </li>
                        </ul>
                    </motion.div>
                </div>

                <div className="footer-bottom">
                    <p className="footer-copy">
                        <span>Copyright © 2026 Nilkanth Digital, All Rights Reserved.</span>
                        <span>
                            Design and Developed by{" "}
                            <a
                                href="https://techorses.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-techorses-link"
                            >
                                TECHORSES
                            </a>
                        </span>
                    </p>

                    <SocialIcons className="footer-social--desktop" />
                </div>
            </div>
        </footer >
    );
};

export default Footer;