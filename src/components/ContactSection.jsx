import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  ChevronDown,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Send,
  Sparkles,
  User,
} from "lucide-react";
import toast from "react-hot-toast";
import CustomDropdown from "./ui/CustomDropdown";
import contact from "../assets/video/contact2.mp4";

const useMouseParallax = (stiffness = 100) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = clientX / innerWidth - 0.5;
      const y = clientY / innerHeight - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return {
    x: useSpring(useTransform(mouseX, [-0.5, 0.5], ["-5%", "5%"]), {
      stiffness,
      damping: 20,
    }),
    y: useSpring(useTransform(mouseY, [-0.5, 0.5], ["-5%", "5%"]), {
      stiffness,
      damping: 20,
    }),
  };
};

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const { x: parallaxX, y: parallaxY } = useMouseParallax();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^(\+221|221)?\s?7[67850](\s?\d){7}$/;
    return re.test(phone);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    let error = "";
    switch (name) {
      case "email":
        if (value.trim() === "") {
          error = "Ce champ est requis.";
        } else if (!validateEmail(value)) {
          error = "Veuillez entrer une adresse e-mail valide.";
        }
        break;
      case "phone":
        if (value.trim() === "") {
          error = "Ce champ est requis.";
        } else if (!validatePhone(value)) {
          error = "Veuillez entrer un numéro de téléphone valide.";
        }
        break;
      case "name":
      case "message":
        if (value.trim() === "") {
          error = "Ce champ est requis.";
        }
        break;
      case "service":
        if (value === "") {
          error = "Veuillez sélectionner un service.";
        }
        break;
      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      name: formData.name.trim() === "" ? "Ce champ est requis." : "",
      email:
        formData.email.trim() === ""
          ? "Ce champ est requis."
          : !validateEmail(formData.email)
          ? "Veuillez entrer une adresse e-mail valide."
          : "",
      phone:
        formData.phone.trim() === ""
          ? "Ce champ est requis."
          : !validatePhone(formData.phone)
          ? "Veuillez entrer un numéro de téléphone valide."
          : "",
      service:
        formData.service === "" ? "Veuillez sélectionner un service." : "",
      message: formData.message.trim() === "" ? "Ce champ est requis." : "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    setIsSubmitting(true);

    const formDataToSend = new FormData(e.target);
    formDataToSend.append(
      "access_key",
      import.meta.env.VITE_WEB3_FORMS_API_KEY
    );

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Votre demande a été envoyée !");
        e.target.reset();
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
      } else {
        console.log("Error", data);
        toast.error(
          data.message ||
            "Une erreur s'est produite lors de l'envoi du formulaire."
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Une erreur s'est produite lors de l'envoi du formulaire.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Téléphone",
      value: "+221 77 815 65 69",
      subtitle: "Lun-Ven, 9h-18h",
      color: "bg-blue-500",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      value: "contact@sendevvision.com",
      subtitle: "Réponse sous 24h",
      color: "bg-blue-500",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Localisation",
      value: "Dakar, Sénégal",
      subtitle: "Disponible à distance",
      color: "bg-blue-500",
    },
  ];

  const services = [
    "Développement Web",
    "Applications Mobiles",
    "Solutions Sur Mesure",
    "Consulting IT",
    "Maintenance & Support",
    "Autre",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen overflow-hidden bg-slate-900"
      >
        {/* Background Image */}
        <motion.div
          className="absolute inset-0"
          style={{ scale: backgroundScale }}
        >
          <video
            autoPlay
            loop
            muted
            className="absolute inset-0 object-cover w-full h-full"
            src={contact}
          ></video>
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <motion.div style={{ x: parallaxX, y: parallaxY }}>
            <motion.div
              className="flex items-end justify-start h-full w-full"
              variants={itemVariants}
            >
              <motion.h2 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight">
                Démarrons{" "}
                <span className="bg-gradient-to-r from-primary via-secondary to-quaternary bg-clip-text text-transparent">
                  Votre Projet
                </span>
              </motion.h2>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Main Content Grid */}
      <section className="relative py-24 bg-gray-800 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Contact form */}
            <motion.div
              className="lg:col-span-7"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div
                className="relative p-8 rounded-3xl bg-slate-900/50 backdrop-blur-xl border border-slate-700/50"
                variants={itemVariants}
              >
                {/* Form header */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Décrivez votre projet
                  </h3>
                  <p className="text-slate-400">
                    Plus vous nous en dites, mieux nous pouvons vous aider
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email row */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        Nom complet
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl bg-slate-800/50 border ${
                          errors.name
                            ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20"
                            : "border-slate-600/50 focus:border-blue-500/50 focus:ring-blue-500/20"
                        } text-white placeholder-slate-400 focus:outline-none transition-all duration-300`}
                        placeholder="Votre nom"
                      />
                      {errors.name && (
                        <span className="text-red-500/50 text-sm">
                          {errors.name}
                        </span>
                      )}
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email
                      </label>
                      <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl bg-slate-800/50 border ${
                          errors.email
                            ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20"
                            : "border-slate-600/50 focus:border-blue-500/50 focus:ring-blue-500/20"
                        } text-white placeholder-slate-400 focus:outline-none transition-all duration-300`}
                        placeholder="votre@email.com"
                      />
                      {errors.email && (
                        <span className="text-red-500/50 text-sm">
                          {errors.email}
                        </span>
                      )}
                    </motion.div>
                  </div>

                  {/* Phone and Service row */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl bg-slate-800/50 border ${
                          errors.phone
                            ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20"
                            : "border-slate-600/50 focus:border-blue-500/50 focus:ring-blue-500/20"
                        } text-white placeholder-slate-400 focus:outline-none transition-all duration-300`}
                        placeholder="+221 77 123 45 67"
                      />
                      {errors.phone && (
                        <span className="text-red-500/50 text-sm">
                          {errors.phone}
                        </span>
                      )}
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">
                        <Sparkles className="w-4 h-4 inline mr-2" />
                        Service souhaité
                      </label>
                      <CustomDropdown
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        options={services}
                        placeholder="Sélectionnez un service"
                        error={errors.service}
                        icon={Sparkles}
                      />
                      {errors.service && (
                        <span className="text-red-500/50 text-sm">
                          {errors.service}
                        </span>
                      )}
                    </motion.div>
                  </div>

                  {/* Message */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      <MessageCircle className="w-4 h-4 inline mr-2" />
                      Décrivez votre projet
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className={`w-full px-4 py-3 rounded-xl bg-slate-800/50 border ${
                        errors.message
                          ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20"
                          : "border-slate-600/50 focus:border-blue-500/50 focus:ring-blue-500/20"
                      } text-white placeholder-slate-400 focus:outline-none transition-all duration-300`}
                      placeholder="Parlez-nous de votre vision, vos objectifs, vos contraintes..."
                    />
                    {errors.message && (
                      <span className="text-red-500/50 text-sm">
                        {errors.message}
                      </span>
                    )}
                  </motion.div>

                  {/* Submit button */}
                  <motion.div variants={itemVariants}>
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full px-8 py-4 bg-blue-600 rounded-xl text-white font-semibold text-lg overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.01, y: -1 }}
                      whileTap={{ scale: 0.99 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        {isSubmitting ? (
                          <>
                            <motion.div
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            />
                            Envoi en cours...
                          </>
                        ) : (
                          <>
                            Envoyer le message
                            <motion.div
                              whileHover={{ x: 4 }}
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 17,
                              }}
                            >
                              <Send className="ml-2 w-5 h-5" />
                            </motion.div>
                          </>
                        )}
                      </span>
                    </motion.button>
                  </motion.div>
                </form>
              </motion.div>
            </motion.div>

            {/* Contact info sidebar */}
            <motion.div
              className="lg:col-span-5 space-y-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Contact cards */}
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className="group relative p-6 rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 hover:border-blue-500/30 transition-all duration-500 hover:scale-[1.02]"
                  variants={itemVariants}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-r ${info.color} shadow-lg`}
                    >
                      <div className="text-white">{info.icon}</div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white mb-1">
                        {info.title}
                      </h4>
                      <p className="text-blue-400 font-medium mb-1">
                        {info.value}
                      </p>
                      <p className="text-sm text-slate-400">{info.subtitle}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </motion.div>
              ))}

              {/* Embedded Google Map */}
              <motion.div variants={itemVariants}>
                <div className="p-3 rounded-2xl bg-gradient-to-r bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 hover:border-blue-500/30 transition-all duration-500 hover:scale-[1.02]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d123498.57899790628!2d-17.612092494964585!3d14.693887291090016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec1728d9a13ec19%3A0x52c078b1c37b3b4e!2sGroupe%20ISM%20Dakar!5e0!3m2!1sfr!2ssn!4v1750734637235!5m2!1sfr!2ssn"
                    width="100%"
                    height="100%"
                    style={{ border: 0, borderRadius: "0.5rem" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Map of Groupe ISM Dakar"
                  ></iframe>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <div className="flex justify-center mt-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 backdrop-blur-sm">
                <div className="text-sm text-slate-300">
                  <span className="font-semibold text-white">
                    Besoin d'aide ?
                  </span>{" "}
                  Notre équipe est là pour vous accompagner
                </div>
                <div className="w-px h-6 bg-slate-600"></div>
                <div className="text-sm font-semibold text-blue-400">
                  contact@sendevvision.com
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactSection;
