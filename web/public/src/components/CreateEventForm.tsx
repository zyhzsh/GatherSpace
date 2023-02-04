import {
  Button,
  Input,
  Select,
  Textarea,
  Typography,
  Option,
  IconButton,
} from '@material-tailwind/react';
import { useEventStore } from '../store';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import CreatableSelect from 'react-select/creatable';
import { useEffect, useState } from 'react';
import { CountryList } from '../data/countryList';
import {
  ArrowPathRoundedSquareIcon,
  PhotoIcon,
} from '@heroicons/react/24/solid';
import axios from 'axios';
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import { useAuth0 } from '@auth0/auth0-react';

const randomImageUrl = 'https://source.unsplash.com/600x300/?nature,stree';

const CreateEventForm = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });
  const [datePickMode, setDatePickMode] = useState<'horizontal' | 'vertical'>(
    'horizontal'
  );
  const [coverImageUrl, setCoverImageUrl] = useState(randomImageUrl);
  const [selfCoverImageUploadState, setSelfCoverImageUploadState] = useState(
    () => false
  );

  const toggle = useEventStore((state) => state.toggleCreateEvenModal);
  const onCreateMyEventChangeHandler = useEventStore(
    (state) => state.onCreateMyEventChangeHandler
  );
  const submit = useEventStore((state) => state.createMyEventSubmitionHandler);

  const getRandomImageUrl = async () => {
    const result = await axios.get(randomImageUrl);
    const imageurl = result.request.responseURL;
    onCreateMyEventChangeHandler('imageurl', imageurl);
    setCoverImageUrl(imageurl);
  };

  useEffect(() => {
    window.addEventListener('resize', () => {
      window.innerWidth >= 960 && setDatePickMode('horizontal');
      window.innerWidth <= 660 && setDatePickMode('vertical');
    });
    getRandomImageUrl();
  }, []);

  return (
    <div>
      <div>
        <div className="mt-2">
          <Typography className=" text-3xl font-bold text-gray-900 mb-2">
            Create your event
          </Typography>
          {/* Cover image */}
          <div className="w-full mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
            {!selfCoverImageUploadState && (
              <img
                className="rounded-lg"
                src={coverImageUrl}
                alt="cover image"
              />
            )}
            {selfCoverImageUploadState && (
              <div className="space-y-1 text-center">
                <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a cover image</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={(e) => {
                        console.log('Uploading', e.target);
                      }}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            )}
          </div>
          <IconButton
            className="w-6 h-6 hover:bg-gray-200 text-black"
            variant="text"
            color="gray"
            onClick={getRandomImageUrl}
          >
            <ArrowPathRoundedSquareIcon className="w-6" />
          </IconButton>
          <IconButton
            className="ml-2 w-6 h-6 hover:bg-gray-200 text-black"
            variant="text"
            color="gray"
            onClick={() => {
              setSelfCoverImageUploadState((prev) => !prev);
            }}
          >
            <ArrowsRightLeftIcon className="w-6" />
          </IconButton>
          {/* Title */}
          <Typography className="text-lg font-bold text-gray-900 my-2">
            Title
          </Typography>
          <div className="w-full my-2">
            <Input
              label="Title"
              name="title"
              required
              onChange={(e) =>
                onCreateMyEventChangeHandler(e.target.name, e.target.value)
              }
            />
          </div>
          {/* Announcement text*/}
          <Typography className="text-lg font-bold text-gray-900 my-2">
            Announcement
          </Typography>
          <div className="w-full my-2">
            <Textarea
              label="Description"
              name="description"
              onChange={(e) =>
                onCreateMyEventChangeHandler(e.target.name, e.target.value)
              }
            />
          </div>
          {/* Location */}
          <Typography className="text-lg font-bold text-gray-900 my-2">
            Location
          </Typography>
          <div className="grid md:grid-cols-2 gap-2">
            <Select
              size="md"
              className="w-full"
              label="Select Country"
              onChange={(value) => {
                onCreateMyEventChangeHandler('country', value);
              }}
            >
              {CountryList.map((country, _) => (
                <Option key={_} value={country}>
                  {country}
                </Option>
              ))}
            </Select>
            <div className="flex-1">
              <Input
                label="Address"
                name="address"
                onChange={(e) => {
                  onCreateMyEventChangeHandler(e.target.name, e.target.value);
                }}
              />
            </div>
          </div>
          {/* Date  */}
          <Typography className="text-lg font-bold text-gray-900 my-2">
            Start Date & End Date
          </Typography>
          <div className="flex justify-center">
            <DateRange
              direction={datePickMode}
              ranges={[selectionRange]}
              editableDateInputs={true}
              moveRangeOnFirstSelection={false}
              months={2}
              onChange={(item: any) => {
                const start = item.selection?.startDate;
                const end = item.selection?.endDate;
                const duration = { startDate: start, endDate: end };
                onCreateMyEventChangeHandler('date', duration);
                setSelectionRange((prev) => {
                  return { ...prev, ...duration };
                });
              }}
            />
          </div>
          {/* Participants  */}
          <Typography className="text-lg font-bold text-gray-900 my-2">
            Add Your Participants
          </Typography>
          <CreatableSelect
            placeholder="Add Participants"
            isMulti
            onChange={(value) => {
              onCreateMyEventChangeHandler('participants', value);
            }}
          />
        </div>
      </div>
      <div className="mt-5  grid grid-cols-2 gap-3 ">
        <Button
          variant="outlined"
          onClick={() => {
            toggle(false);
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={async () => {
            const token = await getAccessTokenSilently();
            submit(token);
          }}
        >
          Create
        </Button>
      </div>
    </div>
  );
};

export default CreateEventForm;
