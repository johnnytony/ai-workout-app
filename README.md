# ai-workout-app

## AI Workout Performance

Our app provides customized **workout training plans** generated based on user preferences and goals.

## Problems

- Users might not have the knowledge to create their own training plans.
- Considering personal trainer might be expensive for the user.
- Lack of availability to spend on searching for the best training plans that fit the user goals.

## Solution
 - Use AI to create personalized workout plans based on user preferences and goals.
 - Incorporate a variety of workout types targeting different muscle groups
 - Allow user to specify metrics, such as, muscle categories and exercises difficulty.

## Next Steps
- Allow continuous monitoring with feedback and updates based on the data collected.
- Integration with wereable devices to improve user experience (smart bands, smart watches).
- Partnership with device manufactures.
- Adjust the platform to other areas of personal health (nutrition, mental well-being)

## Architecture
The architure contains three main components:
- Backend API
- Frontend
- Vector Database

![image](https://github.com/user-attachments/assets/37d3719b-6b5f-47da-a567-1a2d23a7b343)

### Backend API
Our backend API consumes two AWS AI models:
 - `amazon.titan-embed-image-v1`
 - `anthropic.claude-3-sonnet-20240229-v1:0`

The first one is responsible of embedding text exercises data into a vector database.
<br/>
The second prompts the generation of workout plans based on the exercises available on the vector database.
<br/>

We use the vector database to filter user preferences and goals, aswell as a knowledge base to the AI model for prompting new workout plans.

### Frontend App
Frontend app enables the user to create new workout plans based on its preferences and goals.

The app enables both mobile and web experience since it is a react-native application.

You can try and test generating workout plans with this [url](http://35.166.146.235:8081/).
