import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="bg-rose-600 dark:bg-rose-700 text-white py-8 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold"
        >
          About DigiWallet
        </motion.h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          The smarter, safer way to manage your money online.
        </p>
      </section>

      {/* Service Story */}
      <section className="py-16 px-6 max-w-5xl mx-auto text-center md:text-left">
        <h2 className="text-3xl font-bold text-rose-600 dark:text-rose-400 mb-6">
          Our Story
        </h2>
        <p className="text-lg leading-relaxed text-muted-foreground">
          DigiWallet was founded with one mission: to make digital payments simple,
          secure, and accessible for everyone. In today’s fast-moving world, carrying
          cash or juggling multiple apps is inconvenient. That’s why we created
          DigiWallet — a seamless online wallet designed to help you send, receive,
          and manage money in just a few clicks.
        </p>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 bg-card text-card-foreground max-w-5xl mx-auto rounded-xl shadow-sm">
        <h2 className="text-3xl font-bold text-rose-600 dark:text-rose-400 mb-6 text-center md:text-left">
          Our Mission
        </h2>
        <p className="text-lg leading-relaxed text-muted-foreground text-center md:text-left">
          Our mission is simple: to empower people with a safe and reliable wallet
          service that adapts to their lifestyle. Whether you’re shopping online,
          splitting bills with friends, or paying securely in stores, DigiWallet is
          built to give you confidence and control.
        </p>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-rose-600 dark:text-rose-400 mb-12">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Team Member */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-card text-card-foreground rounded-xl shadow-lg p-6"
          >
            <img
              src="https://i.pravatar.cc/150?img=1"
              alt="Team Member"
              className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-rose-500"
            />
            <h3 className="text-xl font-semibold">Alice Johnson</h3>
            <p className="text-muted-foreground">Founder & CEO</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-card text-card-foreground rounded-xl shadow-lg p-6"
          >
            <img
              src="https://i.pravatar.cc/150?img=2"
              alt="Team Member"
              className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-rose-500"
            />
            <h3 className="text-xl font-semibold">Mark Thompson</h3>
            <p className="text-muted-foreground">CTO</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-card text-card-foreground rounded-xl shadow-lg p-6"
          >
            <img
              src="https://i.pravatar.cc/150?img=3"
              alt="Team Member"
              className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-rose-500"
            />
            <h3 className="text-xl font-semibold">Sophia Lee</h3>
            <p className="text-muted-foreground">Head of Design</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
