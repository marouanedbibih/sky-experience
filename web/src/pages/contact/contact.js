import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import "../../App.css";
import API_BASE_URL from '../../config/api';

// Define validation schema with Zod
const contactSchema = z.object({
  details: z.string().min(10, { message: "Message must be at least 10 characters" }),
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  email: z.string().email({ message: "Please enter a valid email address" })
});

const handleContactClick = () => {
  window.location.href = "/contact";
};

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState({ success: false, message: "" });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      details: "",
      firstName: "",
      lastName: "",
      phone: "",
      email: ""
    }
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus({ success: false, message: "" });
    
    try {
      const response = await axios.post(`${API_BASE_URL}/api/contact`, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        message: data.details
      });
      
      setSubmitStatus({ success: true, message: "Message sent successfully!" });
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus({ 
        success: false, 
        message: error.response?.data?.message || "Failed to send message. Please try again." 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f0e7e0] to-[#ffe6d6] flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-3xl bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-6 md:p-10 mx-auto border border-[#f3e2d2]">
        <h1
          className="text-4xl md:text-5xl font-extrabold text-center mb-2 cursor-pointer text-[#a43518] drop-shadow-lg tracking-tight"
          onClick={handleContactClick}
        >
          Contact us
        </h1>
        <h2
          className="text-2xl font-semibold mb-6 cursor-pointer text-center text-[#ff7e47]"
          onClick={handleContactClick}
        >
          Get in Touch With Us
        </h2>
        <p className="mb-8 text-gray-700 text-lg text-center">
          Planning your balloon adventure or just have a quick question?<br />
          <span className="text-[#a43518] font-semibold">We'll get back to you faster than a balloon lifts off at sunrise.</span>
        </p>
        
        {/* Status Message */}
        {submitStatus.message && (
          <div className={`mb-6 p-4 rounded-2xl text-center ${submitStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {submitStatus.message}
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold mb-3 text-xl text-center text-[#a43518]">Send a message</h3>
          
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-[#a43518]">The details of your request</label>
            <textarea
              {...register("details")}
              placeholder="Write something..."
              className="w-full rounded-2xl border border-[#ffd6b3] p-3 bg-white/60 focus:outline-[#ff7e47] focus:ring-2 text-gray-800 shadow-sm"
              rows={4}
            />
            {errors.details && <p className="mt-1 text-red-600 text-sm">{errors.details.message}</p>}
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label className="block mb-1 font-semibold text-[#a43518]">First name</label>
              <input
                {...register("firstName")}
                placeholder="Juliette"
                className="w-full rounded-2xl border border-[#ffd6b3] p-2 bg-white/60 focus:outline-[#ff7e47] focus:ring-2 text-gray-800 shadow-sm"
              />
              {errors.firstName && <p className="mt-1 text-red-600 text-sm">{errors.firstName.message}</p>}
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-semibold text-[#a43518]">Last name</label>
              <input
                {...register("lastName")}
                placeholder="Madow"
                className="w-full rounded-2xl border border-[#ffd6b3] p-2 bg-white/60 focus:outline-[#ff7e47] focus:ring-2 text-gray-800 shadow-sm"
              />
              {errors.lastName && <p className="mt-1 text-red-600 text-sm">{errors.lastName.message}</p>}
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label className="block mb-1 font-semibold text-[#a43518]">Phone</label>
              <div className="flex items-center">
                <span className="inline-block mr-2">
                  🇲🇦                
                </span>
                <input
                  {...register("phone")}
                  placeholder="+212"
                  className="w-full rounded-2xl border border-[#ffd6b3] p-2 bg-white/60 focus:outline-[#ff7e47] focus:ring-2 text-gray-800 shadow-sm"
                />
              </div>
              {errors.phone && <p className="mt-1 text-red-600 text-sm">{errors.phone.message}</p>}
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-semibold text-[#a43518]">Email</label>
              <input
                {...register("email")}
                placeholder="JulietteMadow@gmail.com"
                className="w-full rounded-2xl border border-[#ffd6b3] p-2 bg-white/60 focus:outline-[#ff7e47] focus:ring-2 text-gray-800 shadow-sm"
                type="email"
              />
              {errors.email && <p className="mt-1 text-red-600 text-sm">{errors.email.message}</p>}
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#ff7e47] to-[#a43518] text-white font-bold py-3 rounded-2xl text-lg mt-2 shadow-lg hover:from-[#a43518] hover:to-[#ff7e47] transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </form>
        
        {/* Info Cards Section */}
        <div className="flex flex-col md:flex-row gap-6 justify-center mt-12 mb-8">
          {/* Address Card */}
          <div className="flex-1 bg-white/80 backdrop-blur-lg border-2 border-[#ff7e47] rounded-3xl p-5 md:p-7 flex flex-col items-center min-w-[220px] max-w-xs mx-auto shadow-lg hover:scale-105 transition-transform">
            <div className="mb-2 text-4xl">📍</div>
            <div className="font-bold mb-1 text-[#a43518]">Address</div>
            <div className="text-center text-gray-700 text-sm md:text-base">
              Sidi Boughaba Droua N°1<br />Km 13, Route de Fès<br />Marrakech 40000
            </div>
          </div>
          
          {/* Contact Card */}
          <div className="flex-1 bg-white/80 backdrop-blur-lg border-2 border-[#ff7e47] rounded-3xl p-5 md:p-7 flex flex-col items-center min-w-[220px] max-w-xs mx-auto shadow-lg hover:scale-105 transition-transform">
            <div className="mb-2 text-4xl">📞</div>
            <div className="font-bold mb-1 text-[#a43518]">Contact</div>
            <div className="text-center text-gray-700 text-sm md:text-base">
              +212 6 12 88 11 44<br />
              <span className="text-xs">contact@skyexperience-marrakech.com</span>
            </div>
          </div>
          
          {/* Office Hour Card */}
          <div className="flex-1 bg-white/80 backdrop-blur-lg border-2 border-[#ff7e47] rounded-3xl p-5 md:p-7 flex flex-col items-center min-w-[220px] max-w-xs mx-auto shadow-lg hover:scale-105 transition-transform">
            <div className="mb-2 text-4xl">⏰</div>
            <div className="font-bold mb-1 text-[#a43518]">Office Hour</div>
            <div className="text-center text-gray-700 text-sm md:text-base">
              Monday - Saturday:<br />6:00 - 19:00
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-8">
          <h3 className="font-bold text-2xl mb-4 text-[#a43518] text-center">Frequently Asked Questions</h3>
          <ul className="list-disc pl-6 text-gray-800 text-base space-y-2">
            <li>How long does a hot-air balloon ride in Marrakech last?</li>
            <li>What altitude can we expect to fly at during a hot-air balloon ride in Marrakech?</li>
            <li>What's the best time of year for a hot-air balloon flight in Marrakech?</li>
            <li>Are there age restrictions for hot-air balloon rides in Marrakech?</li>
            <li>What should I wear for a hot-air balloon flight in Marrakech?</li>
            <li>Are there any weight restrictions for hot-air balloon flights in Marrakech?</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Contact;