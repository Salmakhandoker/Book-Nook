import RoomsContainer from "@/components/rooms/RoomsContainer";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "StudyNook - Rooms",
  description: "Browse all available study rooms",
};

export default function RoomsPage() {
  return (
    <main className="min-h-screen bg-[#0f1412] text-white">
      
      <Navbar />

      <section className="pt-32 pb-20 px-6 md:px-16 max-w-7xl mx-auto">
        
        <div className="mb-14">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Explore Study Rooms
          </h1>

          <p className="text-gray-400 text-lg max-w-2xl">
            Discover peaceful, modern, and fully-equipped study
            environments designed for productivity and focus.
          </p>
        </div>

        <RoomsContainer />

      </section>

      <Footer />

    </main>
  );
}