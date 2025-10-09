"use client";

import Image from "next/image";

export default function BookTableSection() {
  return (
    <section
      id="reservation"
      className="py-24 bg-gradient-to-b from-background to-muted"
    >
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
