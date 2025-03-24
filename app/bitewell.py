from dotenv import load_dotenv
import os
from openai import OpenAI
import argparse
import re

MAX_INPUT_LENGTH = 50

def main():
	parser = argparse.ArgumentParser()
	parser.add_argument("--input", "-i", type=str, required=True)
	args = parser.parse_args()
	user_input = args.input

	print(f"User input: {user_input}")
	if validate_length(user_input):
		generate_recipes(user_input)
	else:
		raise ValueError(f"Input length is too long. Must be under {MAX_INPUT_LENGTH}")

def validate_length(user_input: str) -> bool:
	return len(user_input) <= MAX_INPUT_LENGTH

def generate_recipes(ingredients: str) -> str:
	load_dotenv()

	client = OpenAI(
	  api_key=os.environ.get("OPENAI_API_KEY"),
	)
	prompt = f"I have {ingredients} in my fridge, generate healthy recipes using those ingredients. Return the results in an array of objects with properties such as, name, total time, and steps"

	response = client.responses.create(
		model="gpt-3.5-turbo",
		input=prompt,
	)

	recipes = response.output_text
	print(recipes)
	return recipes

if __name__ == "__main__":
	main()