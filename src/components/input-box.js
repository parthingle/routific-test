import React from "react"
import '../stylesheets/input-box.css'

export default (props) =>
(
    
    <input 
            type={props.type} name={props.name} placeholder={props.placeholder} onChange={props.onChange} id={props.id} className={props.className} />

)