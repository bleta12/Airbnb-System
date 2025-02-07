import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ContactUs.css";
import Dashboard from "../Dashboard/Dashboard";
import  Navbar  from "../NavbarFooter/Navbar";



const ContactUs = () => {
    const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    /*prova per git*/

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateEmail = (email) => {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("");

        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            setStatus("⚠️ Please fill in all fields.");
            return;
        }

        if (!validateEmail(formData.email)) {
            setStatus("⚠️ Please enter a valid email address.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("http://localhost:8080/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                setStatus("✅ Thank you for contacting us! We'll get back to you soon.");
                setFormData({ name: "", email: "", subject: "", message: "" });
            } else {
                setStatus(`❌ ${result.message || "Failed to send the message. Please try again later."}`);
            }
        } catch (error) {
            console.error("Error:", error);
            setStatus("❌ Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <Navbar/>
        <div className="contact-container d-flex align-items-center justify-content-center" style={{marginTop:"100px"}}>
            <div className="contact-box shadow-lg d-flex">
                <div className="contact-form p-4">
                    <h2 className="mb-4">Send us a message</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="text" className="form-control mb-3" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
                        <input type="email" className="form-control mb-3" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                        <input type="text" className="form-control mb-3" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} />
                        <textarea className="form-control mb-3" name="message" rows="4" placeholder="Message" value={formData.message} onChange={handleChange}></textarea>
                        <button type="submit" className="btn btn-custom w-100">Send Message</button>
                    </form>
                    {status && <p className="mt-3 text-center text-danger">{status}</p>}
                </div>
                <div className="contact-info p-4 text-dark bg-custom">
                    <h4>Contact us</h4>
                    <p>We're open for any suggestion or just to have a chat</p>
                    <p><strong>Address:</strong> Pejton, Prishtinë</p>
                    <p><strong>Phone:</strong> +38345123133</p>
                    <p><strong>Email:</strong> airbnb@gmail.com.com</p>
                    <p><strong>Website:</strong> airbnb.com</p>
                    <p><strong>Facebook:</strong> Airbnb</p>
                </div>
            </div>
        </div>
        </>
    );
};

export default ContactUs;