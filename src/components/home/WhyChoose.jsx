import {
  FaBookOpen,
  FaClock,
  FaWifi,
  FaUsers,
} from "react-icons/fa";

const features = [
  {
    id: 1,
    title: "Quiet Study Environment",
    icon: <FaBookOpen size={40} />,
    description:
      "Find distraction-free study spaces designed for focus and productivity.",
  },
  {
    id: 2,
    title: "Instant Booking",
    icon: <FaClock size={40} />,
    description:
      "Reserve your preferred room within seconds using our smooth booking system.",
  },
  {
    id: 3,
    title: "Fast Wi-Fi & Facilities",
    icon: <FaWifi size={40} />,
    description:
      "Enjoy high-speed internet, projectors, whiteboards, and power outlets.",
  },
  {
    id: 4,
    title: "Perfect for Group Study",
    icon: <FaUsers size={40} />,
    description:
      "Book comfortable study rooms for solo sessions or collaborative learning.",
  },
];

const WhyChoose = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-5">
          Why Choose StudyNook
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Designed for students who want a calm, modern, and productive
          study experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-purple-500 duration-300"
          >
            <div className="text-purple-500 mb-6">{feature.icon}</div>
            <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
            <p className="text-gray-400 leading-7">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChoose;