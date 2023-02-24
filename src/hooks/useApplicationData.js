import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  // Functions
  const updateSpots = (appointments, appointmentId) => {
    // Find the day with the appointment id
    const day = state.days.find(d => d.appointments.includes(appointmentId));

    // Calculate the spots remaining
    const spots = day.appointments.filter(id => appointments[id].interview === null).length;

    // Return the updated spots
    return state.days.map(d => d.appointments.includes(appointmentId) ? { ...d, spots } : d);

  };

  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        setState((prev) => {
          return { ...prev, appointments, days: updateSpots(appointments, id) };
        });
      });
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
      .then((response) => {
        const appointment = {
          ...state.appointments[id],
          interview: null
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        setState((prev) => {

          return { ...prev, appointments, days: updateSpots(appointments, id) };
        });
      });
  }

  return { state, setDay, bookInterview, cancelInterview };
}