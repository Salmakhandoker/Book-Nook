
export default function RoomDetailsLoading() {
  return (
    <div className="min-h-screen bg-[#0f1412] text-white p-10">
      <div className="animate-pulse space-y-6 max-w-6xl mx-auto">
        
        <div className="h-[400px] bg-[#1c211e] rounded-2xl"></div>

        <div className="h-10 w-1/2 bg-[#1c211e] rounded"></div>

        <div className="h-5 w-full bg-[#1c211e] rounded"></div>

        <div className="h-5 w-3/4 bg-[#1c211e] rounded"></div>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div className="h-40 bg-[#1c211e] rounded-xl"></div>
          <div className="h-40 bg-[#1c211e] rounded-xl"></div>
          <div className="h-40 bg-[#1c211e] rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}