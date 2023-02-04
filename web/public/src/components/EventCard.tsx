import React from 'react';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from '@material-tailwind/react';

interface Event {
  eventId: string;
  title: string;
  startDate: Date;
  location: string;
  announcement: string;
  imageurl: string;
}

const EventCard = ({
  eventId,
  title,
  location,
  startDate,
  announcement,
  imageurl,
}: Event) => {
  return (
    <Card className="min-w-[160px] max-w-[360px] max-h-72 min-h-[288px]">
      <CardHeader className="relative h-40">
        <img src={imageurl} alt="img-blur-shadow" className="h-full w-full" />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h5" className="mb-2">
          {title}
        </Typography>
        <Typography>{announcement}</Typography>
      </CardBody>
      <CardFooter divider className="flex items-center justify-between py-3">
        <Typography variant="small">{startDate.toDateString()}</Typography>
        <Typography variant="small" color="gray" className="flex gap-1">
          <i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
          {location}
        </Typography>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
