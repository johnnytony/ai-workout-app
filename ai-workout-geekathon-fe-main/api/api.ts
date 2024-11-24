import { WorkoutData, WorkoutPlan } from "@/types/Workouts";
// ?muscle_group=upper_body&fitness_level=Intermediate
const mockUrl = 'http://18.236.231.80:8080/generate/workout';
export async function generateExercises(data: WorkoutData): Promise<WorkoutPlan[]> {
    // const keys = Object.keys(data) as Array<keyof WorkoutData>;

    // const queryParams = keys.map(key => {
    //     let d = data[key]
    //     if (Array.isArray(d)) {
    //         d = d.join(",");
    //     }
    //     return `${encodeURIComponent(key)}=${encodeURIComponent(d || "")}`
    // }).join('&');
    // const dataUrl = `${mockUrl}?${queryParams}`;

    console.log(JSON.stringify(data))

    const dataUrl = `${mockUrl}?fitness_level=${data.experienceLevel}&muscle_group=${data.muscleGroup}`

    try {
        const response = await fetch(dataUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}