import { useEffect } from 'react';
import { IconButton, Input } from '@material-tailwind/react';
import {
  PlusIcon,
  TableCellsIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/solid';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from '@material-tailwind/react';
import ListOfEventCards from '../components/ListOfEventCards';
import { useEventStore } from '../store';
import { useAuth0 } from '@auth0/auth0-react';

const Events = () => {
  const { getAccessTokenSilently } = useAuth0();
  const GetMyEvents = useEventStore((state) => state.getMyEvents);
  const OpenCreateEventModal = useEventStore(
    (state) => state.toggleCreateEvenModal
  );

  useEffect(() => {
    const getMyEvents = async () => {
      const token = await getAccessTokenSilently();
      GetMyEvents(token);
    };
    getMyEvents();
  }, []);

  const data = [
    {
      label: <Squares2X2Icon className="w-6" />,
      value: 'card-view',
      desc: <ListOfEventCards />,
    },
    {
      label: <TableCellsIcon className="w-6" />,
      value: 'table-view',
      desc: <h1>Table view</h1>,
    },
  ];

  return (
    <div>
      {/* Search bar */}
      <div className="my-2 w-full flex justify-center rounded-xl ">
        <div className="w-5/6 shadow-md backdrop-blur-200 mx-auto max-w-screen-xl bg-white p-4 rounded-xl">
          <Input label="Search..." />
        </div>
      </div>
      {/* Sub menu */}
      <div className="w-full flex justify-center">
        <div className="w-5/6 mx-auto max-w-screen-xl flex justify-between">
          {/* create button */}
          <IconButton onClick={() => OpenCreateEventModal(true)}>
            <PlusIcon className="w-6" />
          </IconButton>
        </div>
      </div>
      <div className="w-full flex justify-center pt-2 ">
        <div className="w-5/6 max-w-screen-xl">
          <Tabs id="custom-animation" value="card-view">
            <TabsHeader>
              {data.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  {label}
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody
              animate={{
                mount: { y: 0 },
                unmount: { x: 100 },
              }}
            >
              {data.map(({ value, desc }) => (
                <TabPanel key={value} value={value}>
                  {desc}
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
        </div>
      </div>
      {/* EventCardlist */}
      {/* EventTable */}
    </div>
  );
};

export default Events;
