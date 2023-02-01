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

export function getInterview(state, interview) {
  // Return null if no interview is booked
  if (!interview) {
    return null;
  }

  // Return object with interviewer data
  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  };

}