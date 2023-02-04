import axios from 'axios';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { nanoid } from 'nanoid';

/*******
 * User Slices states
 * **** */
interface User {
  email: string;
  locale: string;
  name: string;
  nickname: string;
  sub: string;
}
interface UserState {
  userId: string;
  user: User;
  login: (user: any) => void;
  logout: () => void;
}
const initialUser: User = {
  email: '',
  locale: 'en',
  name: '',
  nickname: '',
  sub: '',
};
export const useUserStore = create<UserState>()(
  devtools((set, get) => ({
    userId: '',
    user: initialUser,
    login: (user) => {
      set((state) => ({ ...state, user, userId: user.sub }));
    },
    logout: () => {
      set((state) => ({ ...state, user: initialUser, userId: '' }));
    },
  }))
);

/*******
 * Create event states
 * **** */
interface CreateEvent {
  title: string;
  startDate: Date;
  endDate: Date | '';
  country?: string;
  address?: string;
  location: string;
  announcements: any[];
  participants: any[];
  hoster: { userId: string };
  imageurl: string;
}
const initialNewEvent: CreateEvent = {
  title: '',
  startDate: new Date(),
  endDate: new Date(),
  country: '',
  address: '',
  location: '',
  announcements: [''],
  participants: [],
  hoster: { userId: '' },
  imageurl: '',
};

/*******
 * Events Slices states
 * **** */
interface EventsState {
  //event list
  events: any[];
  //Get my events
  getMyEvents: (accessToken: string) => void;
  /*
   * Create a new event
   */
  newEvent: CreateEvent;
  //Create event model open state
  createEventModalOpenState: boolean;
  //Event Modal toggle handler
  toggleCreateEvenModal: (toggle: boolean) => void;
  //Create event on data change handler
  onCreateMyEventChangeHandler: (lable: string, data: any) => void;
  //Create event on submit handler
  createMyEventSubmitionHandler: (accessToken: string) => void;
  /*
   * Edit a event
   */
}

export const useEventStore = create<EventsState>()(
  devtools((set, get) => ({
    events: [],
    newEvent: initialNewEvent,
    createEventModalOpenState: false,

    toggleCreateEvenModal: (toggle) => {
      set((state) => ({ ...state, createEventModalOpenState: toggle }));
    },
    getMyEvents: async (accessToken) => {
      const data = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_API}/event`,
        {
          headers: {
            Authorization: 'Bearer ' + `${accessToken}`,
          },
        }
      );
      set((state) => ({ ...state, events: data.data }));
    },
    createMyEventSubmitionHandler: async (accessToken) => {
      const newEvent = get().newEvent;
      const userId = useUserStore.getState().userId;
      const newId = nanoid();

      let newEventDto: CreateEvent = {
        ...newEvent,
        hoster: { userId },
        participants: newEvent.participants.map((participant) => {
          //TODO: Need to update later
          return { userId: participant, data: '' };
        }),
        announcements: newEvent.announcements.map((description) => {
          return { announcementId: newId, data: description };
        }),
      };
      delete newEventDto.address;
      delete newEventDto.country;
      let result;
      try {
        result = await axios.post(
          `${import.meta.env.VITE_APP_BACKEND_API}/event`,
          newEventDto,
          {
            headers: {
              Authorization: 'Bearer ' + `${accessToken}`,
            },
          }
        );
        const event = result.data;
        //TODO:Send Alert
        set((state) => {
          return {
            ...state,
            newEvent: initialNewEvent,
            createEventModalOpenState: false,
            //Update current list of events
            events: [...[event, ...state.events]],
          };
        });
      } catch {
        //TODO:Send Error Alert
      }
    },
    onCreateMyEventChangeHandler: (lable, data) => {
      set((state) => {
        const newEvent: CreateEvent = { ...state.newEvent };
        switch (lable) {
          case 'title':
            newEvent.title = data;
            break;
          case 'description':
            newEvent.announcements = [data];
            break;
          case 'date':
            newEvent.startDate = data.startDate;
            newEvent.endDate = data.endDate;
            break;
          case 'country':
            newEvent.country = data;
            newEvent.location = data + ' ' + newEvent.address;
            break;
          case 'address':
            newEvent.address = data;
            newEvent.location = newEvent.country + ' ' + data;
            break;
          case 'imageurl':
            newEvent.imageurl = data;
            break;
          case 'participants':
            newEvent.participants = data.map((d: any) => d.value);
        }
        return { ...state, newEvent };
      });
    },
  }))
);
