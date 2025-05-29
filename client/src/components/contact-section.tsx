import { motion } from "framer-motion";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";
import { FaLinkedinIn, FaEnvelope } from "react-icons/fa";

export default function ContactSection() {
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
          <h2 className="text-4xl font-bold mb-8">Let's work together</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
            Ready to create engaging learning experiences? Let's discuss your instructional design needs and how I can help your organization achieve its training goals.
          </p>
        </motion.div>

        {/* Contact Information Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactInfo.map((contact, index) => (
            <motion.div
              key={contact.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-dark-primary p-6 rounded-lg border border-gray-700 hover:border-neon-green/50 transition-all duration-300 group text-center"
            >
              <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                {contact.icon}
              </div>
              <h3 className="font-semibold mb-2 text-lg">{contact.title}</h3>
              {contact.link ? (
                <a
                  href={contact.link}
                  className="text-gray-400 hover:text-neon-green transition-colors"
                >
                  {contact.value}
                </a>
              ) : (
                <p className="text-gray-400">{contact.value}</p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Professional Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-dark-primary p-6 rounded-lg border border-gray-700 mb-12"
        >
          <h3 className="text-xl font-semibold mb-6 text-neon-green text-center">Professional Information</h3>
          <div className="grid md:grid-cols-2 gap-6 text-center md:text-left">
            <div>
              <h4 className="font-semibold mb-2">Languages</h4>
              <p className="text-gray-400 text-sm">English (Fluent), Filipino (Fluent), Ilocano</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Status</h4>
              <p className="text-gray-400 text-sm">Available for hire • Open to opportunities</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Specialization</h4>
              <p className="text-gray-400 text-sm">Instructional Design, eLearning Development</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Industries</h4>
              <p className="text-gray-400 text-sm">Finance, BPO, Technology, Education</p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >

          
          <a
            href="https://linkedin.com/in/richard-de-la-cruz-7782bb92"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-neon-green text-neon-green px-8 py-3 rounded-lg font-medium hover:bg-neon-green hover:text-black transition-colors flex items-center gap-2"
          >
            <FaLinkedinIn />
            LinkedIn Profile
          </a>
          
          <a
            href="mailto:chard.bdc@gmail.com"
            className="border border-gray-600 text-gray-300 px-8 py-3 rounded-lg font-medium hover:border-neon-green hover:text-neon-green transition-colors flex items-center gap-2"
          >
            <FaEnvelope />
            Send Email
          </a>
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
