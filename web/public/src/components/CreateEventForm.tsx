import {
  Button,
  Input,
  Select,
  Textarea,
  Typography,
  Option,
} from '@material-tailwind/react';
import { useEventStore } from '../store';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import CreatableSelect from 'react-select/creatable';
import { useEffect, useState } from 'react';
import { CountryList } from '../data/countryList';

const CreateEventForm = () => {
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });
  const [datePickMode, setDatePickMode] = useState<'horizontal' | 'vertical'>(
    'horizontal'
  );

  useEffect(() => {
    window.addEventListener('resize', () => {
      window.innerWidth >= 960 && setDatePickMode('horizontal');
      window.innerWidth <= 300 && setDatePickMode('vertical');
    });
  }, []);

  const toggle = useEventStore((state) => state.toggleCreateEvenModal);
  return (
    <div>
      <div>
        <div className="mt-2">
          <Typography className="text-3xl font-bold text-gray-900 ">
            Create your event
          </Typography>
          <Typography className="text-lg font-bold text-gray-900 my-2">
            Cover Image
          </Typography>
          {/* Cover image */}
          <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
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
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
          {/* Title */}
          <Typography className="text-lg font-bold text-gray-900 my-2">
            Title
          </Typography>
          <div className="w-full my-2">
            <Input label="Title" />
          </div>
          {/* Announcement text*/}
          <Typography className="text-lg font-bold text-gray-900 my-2">
            Announcement
          </Typography>
          <div className="w-full my-2">
            <Textarea label="Description" />
          </div>
          {/* Location */}
          <Typography className="text-lg font-bold text-gray-900 my-2">
            Location
          </Typography>
          <div className="grid md:grid-cols-2 gap-2">
            <Select size="md" className="w-full" label="Select Country">
              {CountryList.map((country, _) => (
                <Option key={_}>{country}</Option>
              ))}
            </Select>
            <div className="flex-1">
              <Input label="City" />
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
                setSelectionRange((prev) => {
                  return { ...prev, startDate: start, endDate: end };
                });
              }}
            />
          </div>
          <Typography className="text-lg font-bold text-gray-900 my-2">
            Add Your Participants
          </Typography>
          <CreatableSelect
            placeholder="Add Participants"
            isMulti
            options={[]}
          />
        </div>
      </div>
      <div className="mt-5  grid grid-cols-2 gap-3">
        <Button variant="outlined" onClick={() => toggle(false)}>
          Cancel
        </Button>
        <Button onClick={() => toggle(false)}>Create</Button>
      </div>
    </div>
  );
};

export default CreateEventForm;
