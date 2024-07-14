type ThemeOptions = "light" | "dark" | "system";

type Workout = {
  _id: string;
  date: string;
  warmup: string;
  strength: string;
  type: 'time' | 'number' | 'setReps';
  workout: string;
};