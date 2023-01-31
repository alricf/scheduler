export function getAppointmentsForDay(state, day) {

  // Find object in days data that matches provided day
  const found = state.days.find(index => day === index.name);

  // Validate if days data is empty or when day is not found
  if (state.days.length === 0 || found === undefined) {
    return [];
  }

  // Return array of objects containing appointments based on provided day
  return found.appointments.map(key => state.appointments[key]);
}