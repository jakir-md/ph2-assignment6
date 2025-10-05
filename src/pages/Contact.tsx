import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
  User,
  Building2,
  Shield,
  AlertCircle,
  Headphones,
  Globe,
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    userType: "user",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          userType: "user",
        });
      }, 3000);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Support",
      details: "support@digiwallet.com",
      subtitle: "24/7 Customer Support",
      color: "bg-rose-500",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone Support",
      details: "+880-123-456-789",
      subtitle: "Mon-Fri: 9AM - 6PM",
      color: "bg-rose-600",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Head Office",
      details: "Dhaka, Bangladesh",
      subtitle: "Savar, Dhaka Division",
      color: "bg-rose-700",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Response Time",
      details: "Within 2 hours",
      subtitle: "Average response time",
      color: "bg-rose-800",
    },
  ];

  const supportCategories = [
    {
      icon: <User className="w-5 h-5" />,
      title: "User Support",
      description: "Account issues, transactions, deposits & withdrawals",
    },
    {
      icon: <Building2 className="w-5 h-5" />,
      title: "Agent Support",
      description: "Agent registration, commission, cash-in/out issues",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Security Issues",
      description: "Account security, suspicious activity, fraud reports",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 via-transparent to-rose-100/50 dark:from-rose-950/20 dark:via-transparent dark:to-rose-900/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center mb-12 sm:mb-16">
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="p-3 sm:p-4 bg-rose-500 rounded-2xl shadow-lg">
                <MessageSquare className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </div>
            </div>
            <h1 className="page-header text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 sm:mb-6">
              Get in Touch
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto px-2">
              Have questions about DigiWallet? We're here to help! Reach out to
              our support team for assistance with your account, transactions,
              or any other inquiries.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 text-sm text-muted-foreground">
              <div className="flex items-center justify-center gap-2">
                <Headphones className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
                <span>24/7 Support Available</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
                <span>Multiple Languages</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-16 sm:mb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="group p-6 bg-card rounded-xl border shadow-sm hover:shadow-md transition-all duration-300 hover:transform hover:scale-105"
            >
              <div
                className={`inline-flex p-3 rounded-xl ${info.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                {info.icon}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {info.title}
              </h3>
              <p className="text-base font-medium text-foreground/90 mb-1">
                {info.details}
              </p>
              <p className="text-sm text-muted-foreground">{info.subtitle}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div className="bg-card rounded-2xl sm:rounded-3xl border shadow-lg p-6 sm:p-8">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">
                Send us a Message
              </h2>
              <p className="text-muted-foreground">
                Fill out the form below and we'll get back to you as soon as
                possible.
              </p>
            </div>

            {isSubmitted ? (
              <div className="text-center py-8 sm:py-12">
                <div className="inline-flex p-4 bg-green-500 rounded-full mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
                  Message Sent Successfully!
                </h3>
                <p className="text-muted-foreground">
                  Thank you for contacting us. We'll respond within 2 hours.
                </p>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                {/* User Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    I am a
                  </label>
                  <select
                    name="userType"
                    value={formData.userType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-background border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="user">User</option>
                    <option value="agent">Agent</option>
                    <option value="potential-user">Potential User</option>
                    <option value="business">Business Partner</option>
                  </select>
                </div>

                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 bg-background border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 bg-background border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* Subject Field */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Brief description of your inquiry"
                    className="w-full px-4 py-3 bg-background border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder="Please provide detailed information about your inquiry..."
                    className="w-full px-4 py-3 bg-background border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-rose-500 hover:bg-rose-600 disabled:bg-rose-300 text-white px-6 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 transform shadow-lg disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Support Information */}
          <div className="space-y-6 sm:space-y-8">
            {/* Support Categories */}
            <div className="bg-card rounded-2xl border shadow-lg p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">
                What can we help you with?
              </h3>
              <div className="space-y-4">
                {supportCategories.map((category, index) => (
                  <div
                    key={index}
                    className="flex gap-4 p-4 bg-muted/50 rounded-xl hover:bg-muted/70 transition-colors duration-200"
                  >
                    <div className="flex-shrink-0 p-2 bg-rose-500 rounded-lg text-white">
                      {category.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">
                        {category.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-gradient-to-r from-rose-500 to-rose-600 rounded-2xl p-6 sm:p-8 text-white">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-2 bg-white/20 rounded-lg">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Emergency Support</h3>
                  <p className="text-rose-50 mb-4">
                    For urgent security issues or suspicious account activity,
                    contact us immediately.
                  </p>
                  <div className="space-y-2">
                    <p className="font-semibold">
                     Emergency Hotline: +880-1111111
                    </p>
                    <p className="text-sm text-rose-100">
                      Available 24/7 for critical issues
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-card rounded-2xl border shadow-lg p-6 sm:p-8">
              <h3 className="text-xl font-bold text-foreground mb-4">
                Our Response Commitment
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-muted">
                  <span className="text-muted-foreground">
                    General Inquiries
                  </span>
                  <span className="font-semibold text-foreground">
                    Within 2 hours
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-muted">
                  <span className="text-muted-foreground">
                    Technical Issues
                  </span>
                  <span className="font-semibold text-foreground">
                    Within 1 hour
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">
                    Security Concerns
                  </span>
                  <span className="font-semibold text-rose-600">Immediate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
