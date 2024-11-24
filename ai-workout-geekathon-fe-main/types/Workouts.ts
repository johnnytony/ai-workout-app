export type WorkoutData = {
    age: string;
    weight: string;
    experienceLevel: string;
    workoutPreference: string;
    fitnessGoal: string;
    daysAvailable: string[];
    availableWorkoutTime: string;
    muscleGroup: string,
    injuries?: string;
};

export type Exercise = {
    name: string;
    sets: number;
    reps: number;
    muscle_group: string[];
    difficulty: string;
};

export type WorkoutPlan = {
    day: number;
    exercises: Exercise[];
};