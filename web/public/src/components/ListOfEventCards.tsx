import { useEventStore } from '../store';

import EventCard from './EventCard';

const ListOfEventCards = () => {
  const events = useEventStore((state) => state.events);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-8 xl:grid-cols-4 gap-x-2 pt-5">
      {events.map((event, _) => (
        <EventCard
          key={_}
          eventId={event.eventId}
          title={event.title}
          location={event.location}
          imageurl={event.imageurl}
          startDate={new Date(event.startDate)}
          announcement={event.announcements[0].data}
        />
      ))}
    </div>
  );
};

export default ListOfEventCards;
