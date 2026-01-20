import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import { useMagneticHover } from "@/lib/useMagneticHover";

export default function ContactSection() {
  const linkedinRef = useMagneticHover({ strength: 0.4, tolerance: 100 });
  const emailRef = useMagneticHover({ strength: 0.4, tolerance: 100 });

  const contactInfo = [
    {
      icon: <Phone className="text-neon-green" size={24} />,
      title: "Phone",
      value: "+(63) 949 464 1158",
      link: "tel:+639494641158",
    },
    {
      icon: <Mail className="text-neon-green" size={24} />,
      title: "Email",
      value: "chard.bdc@gmail.com",
      link: "mailto:chard.bdc@gmail.com",
    },
    {
      icon: <MapPin className="text-neon-green" size={24} />,
      title: "Location",
      value: "Mandaluyong City, Philippines",
      link: null,
    },
  ];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-secondary">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-8">
            <span className="bg-gradient-to-r from-white via-neon-green to-white bg-clip-text text-transparent animate-gradient">
              Let's work together
            </span>
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
            Ready to create engaging learning experiences? Let's discuss your instructional design needs and how I can help your organization achieve its training goals.
          </p>
        </motion.div>

        {/* Contact Information Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactInfo.map((contact, index) => (
            <motion.div
              key={contact.title}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{
                y: -8,
                transition: { duration: 0.2 }
              }}
              viewport={{ once: true }}
              className="glass-card glass-card-hover p-6 rounded-lg text-center group"
            >
              <motion.div
                className="flex justify-center mb-4"
                whileHover={{
                  scale: 1.2,
                  rotate: [0, -10, 10, -10, 0],
                  transition: { duration: 0.5 }
                }}
              >
                {contact.icon}
              </motion.div>
              <h3 className="font-semibold mb-2 text-lg group-hover:text-neon-green transition-colors">
                {contact.title}
              </h3>
              {contact.link ? (
                <a
                  href={contact.link}
                  className="text-gray-400 hover:text-neon-green transition-colors text-sm"
                >
                  {contact.value}
                </a>
              ) : (
                <p className="text-gray-400 text-sm">{contact.value}</p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Professional Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="glass-card p-8 rounded-lg mb-12"
        >
          <motion.h3
            className="text-xl font-semibold mb-6 text-neon-green text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            Professional Information
          </motion.h3>
          <div className="grid md:grid-cols-2 gap-6 text-center md:text-left">
            {[
              { title: "Languages", value: "English (Fluent), Filipino (Fluent), Ilocano" },
              { title: "Status", value: "Available for hire • Open to opportunities" },
              { title: "Specialization", value: "Instructional Design, eLearning Development" },
              { title: "Industries", value: "Finance, BPO, Technology, Education" }
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + idx * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="font-semibold mb-2 text-neon-green/80">{item.title}</h4>
                <p className="text-gray-400 text-sm">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <motion.a
            ref={linkedinRef as any}
            href="https://linkedin.com/in/richard-de-la-cruz-7782bb92"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-neon-green text-neon-green px-8 py-3 rounded-lg font-medium hover:bg-neon-green hover:text-black transition-all flex items-center gap-2 glow-neon"
            style={{ transition: 'transform 0.2s ease-out, background-color 0.3s, box-shadow 0.3s' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaLinkedinIn />
            LinkedIn Profile
          </motion.a>

          <motion.a
            ref={emailRef as any}
            href="mailto:chard.bdc@gmail.com"
            className="border-2 border-gray-600 text-gray-300 px-8 py-3 rounded-lg font-medium hover:border-neon-green hover:text-neon-green transition-all flex items-center gap-2"
            style={{ transition: 'transform 0.2s ease-out, border-color 0.3s, color 0.3s' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaEnvelope />
            Send Email
          </motion.a>
        </motion.div>

        {/* Additional Contact Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 text-sm">
            Available for full-time positions, freelance projects, and consulting opportunities.
            <br />
            Response time: Usually within 24 hours
          </p>
        </motion.div>
      </div>
    </section>
  );
}
