// Constants for priority options, sorting options, status columns, and colors
const priorityOptions = ["Priority", "P0", "P1", "P2"];
const sortOption = [
  "Priority HIGH to LOW",
  "Priority lOW to HIGH",
  "Date added (ascending)",
  "Date added (descending)",
];
const StausColumns = [
  "Assign",
  "In Progress",
  "Completed",
  "Deployed",
  "Deferred",
];
const colors = {
  bg_pending: "#6b7280",
  bg_progress: "#fbbf24",
  bg_completed: "#84cc16",
  bg_deployed: "#1e3a8a",
  bg_deffered: "#ec4899",
};

// Function to generate a random ID
const generateRandomId = () => {
  const randomId = Math.random().toString(36).substring(7); // Generate random string
  const randomNumber = Math.floor(Math.random() * 1000); // Generate random number
  return `${randomId}-${randomNumber}`; // Combine random string and number
};

export { priorityOptions, sortOption, StausColumns, colors, generateRandomId };
