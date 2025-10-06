"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { MapPin, Clock, Phone, Mail, Instagram } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { translations } from "@/lib/translations"

export function InfoSection() {
  const { language } = useLanguage()
  const t = translations[language].info
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t.title}</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border-2 border-orange-200"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.location}</h3>
            <p className="text-gray-700 mb-2">{t.address}</p>
            <p className="text-gray-700 font-semibold">{t.city}</p>
          </motion.div>

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border-2 border-orange-200"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.hours}</h3>
            <p className="text-gray-700 mb-2">{t.weekdays}</p>
            <p className="text-gray-700 font-semibold">{t.weekend}</p>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border-2 border-orange-200"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center mb-4">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.contact}</h3>
            <div className="space-y-3">
              <a
                href={`tel:${t.phone}`}
                className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors"
              >
                <Phone className="w-4 h-4" />
                {t.phone}
              </a>
              <a
                href={`mailto:${t.email}`}
                className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors"
              >
                <Mail className="w-4 h-4" />
                {t.email}
              </a>
              <a
                href={`https://instagram.com/${t.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors"
              >
                <Instagram className="w-4 h-4" />
                {t.instagram}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
