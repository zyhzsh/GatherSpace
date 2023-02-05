import React from 'react';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from '@material-tailwind/react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

interface Event {
  eventId: string;
  title: string;
  startDate: Date;
  location: string;
  announcement: string;
  imageurl: string;
  isOwner: boolean;
}

const EventCard = ({
  eventId,
  title,
  location,
  startDate,
  announcement,
  imageurl,
  isOwner,
}: Event) => {
  return (
    <Card className="min-w-[160px] max-w-[360px]  min-h-[200px]  max-h-[300px]">
      <CardHeader className="relative max-h-40">
        {isOwner && (
          <PencilSquareIcon className="absolute right-1 top-1 rounded-lg w-6 text-blue-100 hover:text-blue-300" />
        )}
        <img src={imageurl} alt="img-blur-shadow" className="w-full h-full" />
      </CardHeader>
      <CardBody className="text-center h-40 overflow-hidden">
        <Typography variant="h5" className="mb-2">
          {title}
        </Typography>
        <Typography>{announcement}</Typography>
      </CardBody>
      <CardFooter divider className="flex items-center justify-between py-3">
        <Typography className="">{startDate.toDateString()}</Typography>
        <Typography color="gray" className="flex gap-1">
          <i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
          {location}
        </Typography>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
