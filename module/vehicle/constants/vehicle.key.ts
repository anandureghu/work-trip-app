export const vehicleKeys = {
  all: ["vehicles"] as const,
  list: () => [...vehicleKeys.all, "list-vechicles"] as const,
};
