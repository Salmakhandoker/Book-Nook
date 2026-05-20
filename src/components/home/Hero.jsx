import Link from "next/link";

const Hero = () => {

  return (
    <section className="pt-40 pb-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>

            <p className="text-gold mb-6">
              ✦ Quiet rooms on demand
            </p>

            <h1 className="text-6xl lg:text-7xl leading-tight font-bold mb-8">

              Find Your Perfect
              {" "}

              <span className="text-gold">
                Study Room
              </span>

            </h1>

            <p className="text-gray-400 text-lg leading-9 mb-10 max-w-xl">

              Browse and book quiet private study rooms
              in your library by the hour. List your own
              room and earn.

            </p>

            <div className="flex items-center gap-6">

              <Link
                href="/rooms"
                className="btn-primary px-8 py-4 rounded-xl"
              >
                Explore Rooms
              </Link>

              <button className="border border-white/10 px-8 py-4 rounded-xl">
                Get Started
              </button>

            </div>

            <div className="flex gap-16 mt-16">

              <div>
                <h3 className="text-4xl font-bold">
                  120+
                </h3>

                <p className="text-gray-400 mt-2">
                  Study Rooms
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-bold">
                  8K
                </h3>

                <p className="text-gray-400 mt-2">
                  Students
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-bold">
                  4.9★
                </h3>

                <p className="text-gray-400 mt-2">
                  Rating
                </p>
              </div>

            </div>

          </div>

          <div>

            <img
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66"
              className="rounded-[40px] h-[700px] w-full object-cover"
            />

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;