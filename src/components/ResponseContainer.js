import React from 'react'
import './response-container.css'
import ResponseDisplay from './ResponseDisplay';

export default function ResponseContainer(props) {
    const {responses} = props;
    return (
    <div className="response-container">
        {
            responses.length
            ?
            <div>
                <h2>Responses</h2>
                <div className="response-list">
                {
                    responses.map((res, index) => {
                        return (
                            <ResponseDisplay 
                                prompt={res.prompt}
                                response={res.response}
                                key={Math.floor(360*(responses.length - index)/responses.length)}
                                hue={Math.floor(360*(responses.length - index)/responses.length)}
                            />
                        )
                    })
                }
                </div>
            </div>
            :
            <h2>
                Enter in a prompt to start!
            </h2>
        }
    </div>
  )
}
