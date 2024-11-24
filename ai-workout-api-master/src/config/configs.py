import os
from dotenv import load_dotenv

load_dotenv()

AWS_DEFAULT_REGION = os.getenv('AWS_DEFAULT_REGION')
AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
AWS_SESSION_TOKEN = os.getenv('AWS_SESSION_TOKEN')

muscle_groups = {'Calves', 'Rear Deltoids', 'Shoulders', 'Hamstrings', 'Triceps', 'Full Core', 
                 'Lower Chest', 'Full Body', 'Glutes', 'Lower Back', 'Hip Flexors', 'Chest', 
                 'Obliques', 'Forearms', 'Hips', 'Upper Chest', 'Lower Abs', 'Back', 'Biceps', 
                 'Quadriceps', 'Legs', 'Core', 'Upper Back'}

# Define categories
upper_body = {'Shoulders','Lower Chest', 'Triceps', 'Rear Deltoids', 'Chest', 'Upper Chest', 'Upper Back', 
              'Back', 'Biceps', 'Forearms', 'Obliques', 'Core', 'Full Core', 'Full Body', 'Hips'}
lower_body = {'Calves', 'Hamstrings', 'Glutes', 'Lower Back', 'Hip Flexors', 'Lower Abs', 
              'Quadriceps', 'Legs', 'Full Core', 'Full Body', 'Hips'}



full_body = upper_body | lower_body


# Output categorized muscle groups
print("All Body:", len(muscle_groups))
print("Upper Body:", len(upper_body))
print("Lower Body:", len(lower_body))

