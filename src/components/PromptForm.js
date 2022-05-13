import React, {useState, useEffect} from 'react'
import Cookies from 'universal-cookie'
import './prompt-form.css'

export default function PromptForm(props) {
    const cookies = new Cookies()
    const [useInputPreset, setUseInputPreset] = useState(false);
    const [textInput, setTextInput] = useState(cookies.get('prompt'));
    const [displayErrorMessage, setDisplayErrorMessage] = useState(false)
    const [availableEngines, setAvailableEngines] = useState(["text-curie-001"])
    const [currentEngine, setCurrentEngine] = useState("text-curie-001")
    const [currentPrompt, setCurrentPrompt] = useState("")

    useEffect(() => {
            const apiKey = "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"
           
            fetch("https://api.openai.com/v1/engines", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            })
            .then((res) => res.json())
            .then((data) => {
                if (data){
                    const validEngines = data.data.filter(engine=> engine.ready)
                    setAvailableEngines(validEngines.map((engine) => engine.id))
                }
            })
    }, [])

    const {handleInput} = props
    
        return (
        <div className="form-container">
            <div className='select-engine-container'>
                <h3>Select Engine</h3>
                <select
                    onChange={handleEngineChange}
                >
                    {
                        availableEngines.map((engine) => {
                            return (
                                <option
                                    key={engine}
                                    value={engine}
                                >
                                    {engine}
                                </option>
                            )
                        })
                    }
                </select>
            </div>
            <div className="select-type-container">
                <button 
                    className={`type-button ${useInputPreset ? "" : "active" }`}
                    onClick={disableUsePreset}
                >
                    Enter Prompt
                </button>
                <h3>Or</h3>
                <button 
                    className={`type-button ${!useInputPreset ? "" : "active" }`}
                    onClick={enableUsePreset}
                    >
                    Select From Preset
                </button>
            </div>
            
            {
                useInputPreset 
                ?
                <div className="preset-container">
                    <select 
                        default="" 
                        className="option-select"
                        onChange={setPrompt}
                    >
                        {
                            options.map((option) => {
                                return (
                                    <option value={option.prompt}>
                                        {option.value}
                                    </option>
                                )
                            })
                        }
                    </select>
                    <input 
                        type="text"
                        className="prompt-input"
                        onChange={handleTextChange}
                        onKeyPress={handleKeyPress}
                        value={textInput}
                    >
                    </input>
                </ div>
                
                :
                <input 
                    type="text"
                    className="prompt-input"
                    onChange={handleTextChange}
                    onKeyPress={handleKeyPress}
                    value={textInput}
                >
                </input>
            }
            <div className="submit-btn-container">
                <div>
                    {
                        displayErrorMessage 
                        &&
                        <h3>
                            Prompt cannot be empty!
                        </h3>
                    }
                </div>
                <button 
                    className="submit-btn"
                    onClick={handleSubmit}    
                >
                    Go
                </button>
            </div>
            
        </div>
    )

    function handleTextChange(event){
        const currText = event.target.value;
        setTextInput(currText)
        cookies.set('prompt', currText, { path: '/' });
    }

    function handleKeyPress(event){
        if (event.key === "Enter"){
            handleSubmit()
        }
    }

    function setPrompt(event){
        setTextInput(event.target.value);
        setCurrentPrompt(event.target.value)
    }

    async function handleSubmit(){
        const prompt = textInput

        if (prompt.length === 0){
            setDisplayErrorMessage(true)
            setTimeout(() => {
                setDisplayErrorMessage(false)
            }, 1500)
        }
        else {
            handleInput(prompt, currentEngine);
            setTextInput("")
            cookies.set('prompt', "", { path: '/' });
            if (useInputPreset){
                setTextInput(currentPrompt)
            }
        }

        
    }

    function disableUsePreset(){
        setUseInputPreset(false)
        setTextInput("")
    }

    function enableUsePreset(){
        setUseInputPreset(true)
        setTextInput("")
    }

    function handleEngineChange(event){
        setCurrentEngine(event.target.value);
    }
}


const options =[
    {value: "", prompt: "" },
    {value: "Fact", prompt: "Give me a fact about " },
    {value: "Story", prompt: "Tell me a story about " },
    {value: "Poem", prompt: "Write me a poem about " },
    {value: "Question", prompt: "Why do " }
]