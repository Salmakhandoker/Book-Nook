
"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Ariana Rahman",
    university: "University of Dhaka",
    image:
      "https://i.ibb.co/3h0J6mD/girl1.jpg",
    review:
      "StudyNook helped me find quiet spaces during exam season. Booking rooms is incredibly fast and easy.",
  },

  {
    id: 2,
    name: "Fahim Ahmed",
    university: "BRAC University",
    image:
      "https://i.ibb.co/hm5Q9wM/boy1.jpg",
    review:
      "The interface feels modern and smooth. I especially love the real-time room availability system.",
  },

  {
    id: 3,
    name: "Nusrat Jahan",
    university: "Chittagong University",
    image:
      "https://i.ibb.co/Yb7j0hQ/girl2.jpg",
    review:
      "Booking study rooms with friends has never been easier. The platform is clean and mobile friendly.",
  },
];

const Testimonials = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">

      <div className="text-center mb-16">

        <h2 className="text-5xl font-bold mb-5">
          Student Testimonials
        </h2>

        <p className="text-gray-400 max-w-2xl mx-auto">
          Thousands of students use StudyNook to discover peaceful,
          productive, and affordable study spaces every day.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {
          testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-8"
            >

              <div className="flex items-center gap-4 mb-6">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-full object-cover"
                />

                <div>
                  <h3 className="text-xl font-bold">
                    {item.name}
                  </h3>

                  <p className="text-gray-400 text-sm">
                    {item.university}
                  </p>
                </div>
              </div>

              <p className="text-gray-300 leading-8">
                “{item.review}”
              </p>

            </motion.div>
          ))
        }

      </div>
    </section>
  );
};

export default Testimonials;