import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaInstagram,
    FaFacebookF,
    FaYoutube,
} from "react-icons/fa";
import "./ContactSection.scss";

const socialLinks = [
    { id: "instagram", icon: <FaInstagram />, href: "https://instagram.com" },
    { id: "facebook", icon: <FaFacebookF />, href: "https://facebook.com" },
    { id: "youtube", icon: <FaYoutube />, href: "https://youtube.com" },
];

const validationSchema = Yup.object({
    name: Yup.string().trim().required("Name is required"),
    email: Yup.string().email("Enter a valid email").notRequired(),
    number: Yup.string()
        .trim()
        .matches(/^[0-9+\-\s]{7,15}$/, "Enter a valid phone number")
        .required("Phone number is required"),
    message: Yup.string().notRequired(),
});

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
    }),
};

const ContactSection = () => {
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            number: "",
            message: "",
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            // TODO: wire this up to your actual API / email service
            console.log("Contact form submitted:", values);
            toast.success("Your message has been sent successfully!");
            resetForm();
        },
    });

    return (
        <section className="contact-info-section">
            <ToastContainer position="top-right" autoClose={3000} />

            <div className="contact-info-section__container">
                <motion.div
                    className="contact-left"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeUp}
                    custom={0}
                >
                    <span className="contact-eyebrow">Get In Touch</span>
                    <h2 className="contact-heading">Let's Talk Business</h2>
                    <p className="contact-subheading">
                        Whether you need a quote, product details, or after-sales
                        support, our team is ready to help you find the right
                        weighing solution.
                    </p>

                    <ul className="contact-details-list">
                        <li>
                            <span className="contact-icon">
                                <FaPhoneAlt />
                            </span>
                            <span>+91 1234567890</span>
                        </li>
                        <li>
                            <span className="contact-icon">
                                <FaEnvelope />
                            </span>
                            <span>info@nilkanthdigitalscale.in</span>
                        </li>
                        <li>
                            <span className="contact-icon">
                                <FaMapMarkerAlt />
                            </span>
                            <span>
                                Dayal Bhuvan Lane, Opp Lalcourt, Rajmahel Road, Vadodara,
                                390001
                            </span>
                        </li>
                    </ul>

                    <div className="contact-social">
                        {socialLinks.map((s) => (
                            <a
                                key={s.id}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={s.id}
                                className="contact-social-link"
                            >
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    className="contact-right"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeUp}
                    custom={1}
                >
                    <form className="contact-form" onSubmit={formik.handleSubmit} noValidate>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Your full name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={
                                    formik.touched.name && formik.errors.name ? "input-error" : ""
                                }
                            />
                            {formik.touched.name && formik.errors.name && (
                                <span className="field-error">{formik.errors.name}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">
                                Email <span className="optional-tag">(Optional)</span>
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={
                                    formik.touched.email && formik.errors.email
                                        ? "input-error"
                                        : ""
                                }
                            />
                            {formik.touched.email && formik.errors.email && (
                                <span className="field-error">{formik.errors.email}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="number">Phone Number</label>
                            <input
                                id="number"
                                name="number"
                                type="tel"
                                placeholder="+91 1234567890"
                                value={formik.values.number}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={
                                    formik.touched.number && formik.errors.number
                                        ? "input-error"
                                        : ""
                                }
                            />
                            {formik.touched.number && formik.errors.number && (
                                <span className="field-error">{formik.errors.number}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">
                                Message <span className="optional-tag">(Optional)</span>
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                placeholder="Tell us what you're looking for..."
                                value={formik.values.message}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        <motion.button
                            type="submit"
                            className="contact-submit-btn"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            Submit
                        </motion.button>
                    </form>
                </motion.div>
            </div >
        </section >
    );
};

export default ContactSection;