import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

// export interface Event {
//   eventId: string;
//   title: string;
//   startDate: Date;
//   location: string;
//   announcement: string;
// }

interface EventsState {
  events: any[];
  createEventModalOpenState: boolean;
  toggleCreateEvenModal: (toggle: boolean) => void;
  getMyEvents: (accessToken: string) => void;
  createMyEvent: (accessToken: string) => void;
}

export const useEventStore = create<EventsState>()(
  devtools((set) => ({
    events: [],
    createEventModalOpenState: false,
    toggleCreateEvenModal: (toggle) => {
      set((state) => ({ ...state, createEventModalOpenState: toggle }));
    },
    getMyEvents: async (accessToken) => {
      const data = await axios.get('http://localhost:3000/api/event', {
        headers: {
          Authorization: 'Bearer ' + `${accessToken}`,
        },
      });
      set((state) => ({ ...state, events: data.data }));
    },
    createMyEvent: async (accessToken) => {},
  }))
);
