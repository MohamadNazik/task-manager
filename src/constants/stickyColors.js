// Color options for sticky notes
export const STICKY_COLORS = [
  "bg-yellow-200",
  "bg-pink-200",
  "bg-blue-200",
  "bg-green-200",
  "bg-purple-200",
  "bg-orange-200",
];

// Function to get random color
export const getRandomColor = () => {
  return STICKY_COLORS[Math.floor(Math.random() * STICKY_COLORS.length)];
};
