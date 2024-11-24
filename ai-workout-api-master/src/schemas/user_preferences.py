from typing import Literal
from pydantic import BaseModel

class UserPreferences(BaseModel):
    muscle_group: Literal['upper_body', 'lower_body', 'full_body']
    fitness_level: Literal['Beginner', 'Intermediate', 'Advanced']
    
    class Config:
        anystr_strip_whitespace = True  # Strips leading/trailing whitespaces for string fields
