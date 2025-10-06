"use client";

import Image from "next/image";
import { useState } from "react";

// Define the type for our form values
type FormData = {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  specialRequests: string;
};

export default function BookTableSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    specialRequests: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    // Clear success message when user starts typing
    if (successMessage) {
      setSuccessMessage(null);
    }
  };

  // Simple validation
  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (formData.phone.trim().length < 10) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
    }

    if (!formData.time) {
      newErrors.time = "Time is required";
    }

    if (!formData.guests) {
      newErrors.guests = "Number of guests is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      // Simulate form submission
      setTimeout(() => {
        console.log("Booking details:", formData);
        setIsSubmitting(false);
        setSuccessMessage(
          `Your table for ${formData.guests} on ${formData.date} at ${formData.time} has been reserved.`,
        );
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          date: "",
          time: "",
          guests: "",
          specialRequests: "",
        });
      }, 1500);
    }
  }

  // Generate time options (every 30 minutes from 11:00 to 22:30)
  const timeOptions = [];
  for (let hour = 11; hour <= 22; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      if (hour === 22 && minute > 30) continue; // Stop at 22:30
      const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
      timeOptions.push(timeString);
    }
  }

  return (
    <section id="reservation" className="py-24 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 text-balance">
            Book a Table
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Reserve your spot for an unforgettable dining experience.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid  gap-12">
            {/* QR Code Section */}
            <div className="flex flex-col items-center justify-center p-8 rounded-xl ">
              <Image
                alt="QR Code"
                className="mx-auto  overflow-hidden  object-cover object-center mb-2"
                height="300"
                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://table-tide.vercel.app/r/spicy-town?table=1&booking=true"
                width="300"
              />
              <a
                className="mt-9"
                href="https://table-tide.vercel.app/r/spicy-town?table=1&booking=true"
              >
                <button className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                  Book Table via QR
                </button>
              </a>
            </div>

            {/* Form Section */}
          </div>
        </div>
      </div>
    </section>
  );
}
