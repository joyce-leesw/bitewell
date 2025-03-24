from fastapi import FastAPI, HTTPException
from bitewell import generate_recipes
from mangum import Mangum
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
handler = Mangum(app)
MAX_INPUT_LENGTH = 50

app.add_middleware(
	CORSMiddleware,
	allow_origins=["*"],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

@app.get("/generate_recipes")
def generate_recipes_api(user_input: str):
	validate_input_length(user_input)
	recipes = generate_recipes(user_input)
	return {"recipes": recipes}

def validate_input_length(user_input: str):
	if len(user_input) >= MAX_INPUT_LENGTH:
		raise HTTPException(status_code=400, detail=f"Input length is too long, must be under {MAX_INPUT_LENGTH} characters")