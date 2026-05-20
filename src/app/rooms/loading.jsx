export default function RoomsLoading() {
  return (
    <div className="min-h-screen bg-[#0f1412] p-10">
      <div className="grid md:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="bg-[#1c211e] rounded-2xl overflow-hidden animate-pulse"
          >
            <div className="h-64 bg-[#2b302d]"></div>

            <div className="p-6 space-y-4">
              <div className="h-6 bg-[#2b302d] rounded"></div>

              <div className="h-4 bg-[#2b302d] rounded"></div>

              <div className="h-10 bg-[#2b302d] rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}