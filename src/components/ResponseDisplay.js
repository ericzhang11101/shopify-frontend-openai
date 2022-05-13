import React from 'react'
import "./response-display.css"

export default function ResponseDisplay(props) {
    const {prompt, response, hue} = props;
  return (
    <div className="response-card" 
        style={{
            "backgroundColor": `hsl(${props.hue}, 90%, 75%)`,
            "borderColor": `hsl(${props.hue}, 40%, 50%)`
        }}
    >
        <div className="response-row">
            <h3>
                Prompt:
            </h3>
            <p>
                {prompt}
            </p>
        </div>
        <div className="response-row">
            <h3>
                Response:
            </h3>
            <p>
                {response}
            </p>
        </div>
    </div>
  )
}
