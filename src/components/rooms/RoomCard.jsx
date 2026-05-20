<Link href={`/rooms/${room._id}`}>
  <div className="bg-surface-container overflow-hidden rounded-lg group">
    
    <div className="relative h-56 overflow-hidden">
      <img
        src={room.image}
        alt={room.roomName}
        className="w-full h-full object-cover"
      />

      <div className="absolute top-4 right-4 bg-primary-container px-3 py-1 rounded-sm">
        ${room.hourlyRate}/hr
      </div>
    </div>

    <div className="p-6">
      <h3>{room.roomName}</h3>

      <p>{room.description}</p>

      <div className="flex gap-2 mt-4">
        {room.amenities?.map((item, index) => (
          <span key={index}>{item}</span>
        ))}
      </div>
    </div>
  </div>
</Link>