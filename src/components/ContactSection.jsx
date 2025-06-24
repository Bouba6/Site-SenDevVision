import { motion } from "framer-motion";
import {
  ArrowRight,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
  User,
  Calendar,
  Clock,
} from "lucide-react";
import { useState } from "react";
import FloatingParticles from "./FloatingParticles";
import toast from "react-hot-toast";
import CustomDropdown from "./ui/CustomDropdown";

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
    email: formData.email.trim() === "" ? "Ce champ est requis." : !validateEmail(formData.email) ? "Veuillez entrer une adresse e-mail valide." : "",
    phone: formData.phone.trim() === "" ? "Ce champ est requis." : !validatePhone(formData.phone) ? "Veuillez entrer un numéro de téléphone valide." : "",
    service: formData.service === "" ? "Veuillez sélectionner un service." : "",
    message: formData.message.trim() === "" ? "Ce champ est requis." : "",
  };

  setErrors(newErrors);

  if (Object.values(newErrors).some((error) => error !== "")) {
    return;
  }

  setIsSubmitting(true);

  const formDataToSend = new FormData(e.target);
  formDataToSend.append("access_key", import.meta.env.VITE_WEB3_FORMS_API_KEY);

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
    <section className="relative py-24 bg-black overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-gradient-to-r from-green-500/3 to-cyan-500/3 rounded-full blur-3xl"></div>
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10"></div>
      </div>

      <FloatingParticles />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-6"
            variants={itemVariants}
          >
            <MessageCircle className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold text-blue-400">
              PARLONS ENSEMBLE
            </span>
          </motion.div>

          <motion.h2
            className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight"
            variants={itemVariants}
          >
            Démarrons
            <span className="block bg-gradient-to-r from-primary via-secondary to-quaternary bg-clip-text text-transparent">
              Votre Projet
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Prêt à transformer vos idées en{" "}
            <span className="font-semibold text-blue-400">
              réalité digitale
            </span>
            ? Contactez-nous et discutons de votre vision.
          </motion.p>
        </motion.div>

        {/* Main content grid */}
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
                      className={`w-full px-4 py-3 rounded-xl bg-slate-800/50 border ${errors.phone ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20' : 'border-slate-600/50 focus:border-blue-500/50 focus:ring-blue-500/20'} text-white placeholder-slate-400  focus:outline-none transition-all duration-300`}
                      placeholder="Votre nom"
                    />
                    {errors.name && <span className="text-red-500/50 text-sm">{errors.name}</span>}
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
                      className={`w-full px-4 py-3 rounded-xl bg-slate-800/50 border ${errors.phone ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20' : 'border-slate-600/50 focus:border-blue-500/50 focus:ring-blue-500/20'} text-white placeholder-slate-400  focus:outline-none transition-all duration-300`}
                      placeholder="votre@email.com"
                    />
                    {errors.email && <span className="text-red-500/50 text-sm">{errors.email}</span>}
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
                      className={`w-full px-4 py-3 rounded-xl bg-slate-800/50 border ${errors.phone ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20' : 'border-slate-600/50 focus:border-blue-500/50 focus:ring-blue-500/20'} text-white placeholder-slate-400  focus:outline-none transition-all duration-300`}
                      placeholder="+221 77 123 45 67"
                    />
                    {errors.phone && <span className="text-red-500/50 text-sm">{errors.phone}</span>}
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
                    {errors.service && <span className="text-red-500/50 text-sm">{errors.service}</span>}
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
                    className={`w-full px-4 py-3 rounded-xl bg-slate-800/50 border ${errors.phone ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20' : 'border-slate-600/50 focus:border-blue-500/50 focus:ring-blue-500/20'} text-white placeholder-slate-400  focus:outline-none transition-all duration-300`}
                    placeholder="Parlez-nous de votre vision, vos objectifs, vos contraintes..."
                  />
                  {errors.message && <span className="text-red-500/50 text-sm">{errors.message}</span>}
                </motion.div>

                {/* Submit button */}
                <motion.div variants={itemVariants}>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full px-8 py-4 bg-blue-600 rounded-xl text-white font-semibold text-lg overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.01, y: -1 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
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

            {/* Availability card */}
            <motion.div
              className="p-6 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20"
              variants={itemVariants}
            >
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <Calendar className="w-5 h-5 text-green-400" />
                </div>
                <div className="ml-3">
                  <h4 className="text-lg font-semibold text-white">
                    Disponibilité
                  </h4>
                  <div className="flex items-center text-sm text-green-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    Ouvert aux nouveaux projets
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-sm text-slate-300">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-slate-400" />
                  Lun-Ven: 9h00 - 18h00 (GMT)
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-slate-400" />
                  Sam: 10h00 - 14h00 (GMT)
                </div>
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
  );
}

export default ContactSection;
