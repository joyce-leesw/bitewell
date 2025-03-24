type Props = {
	onSubmit: () => void;
	prompt: string;
	setPrompt: (value: string) => void;
	isPending: boolean;
	characterLimit: number;
}

const Form: React.FC<Props> = ({ onSubmit, prompt, setPrompt, isPending, characterLimit }) => {
	const isPromptValid = prompt.length < characterLimit;
	const updatePromptValue = (text: string) => {
		if (text.length <= characterLimit) {
			setPrompt(text);
		}
	}

	let statusColor = "text-slate-400";
	let statusText = null;
	if (!isPromptValid) {
		statusColor="text-red-400";
		statusText=`Input must be less than ${characterLimit} characters.`
	}

	return (
		<>
			<div className="mb-6 text-slate-500">
				<p>What ingredients do you have?</p>
			</div>
			
			<input className="p-2 w-full bg-white rounded-md focus:outline-teal-400 focus:outline text-slate-600" placeholder="avocados, potatoes..." value={prompt} onChange={(e) => updatePromptValue(e.currentTarget.value)}></input>
			<div className={statusColor + " flex justify-between my-2 text-sm mb-6"}>
				<div>{statusText}</div>
				<div>{prompt.length}/{characterLimit}</div>
			</div>
			<button className="text-white bg-gradient-to-r from-teal-400 to-green-700 w-full disabled:opacity-50 p-2 rounded-md text-lg" onClick={onSubmit} disabled={isPending || !isPromptValid}>Submit</button>
		</>
	);
};

export default Form;