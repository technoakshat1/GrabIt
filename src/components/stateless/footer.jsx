import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTwitterSquare,faInstagramSquare,faFacebook} from "@fortawesome/free-brands-svg-icons"

export default function Footer() {
    return (
        <div className="footer">
           <h3>©GrabIt! 2020</h3>
           <p>Made with an intention to serve the community!</p>
           <div className="footer-icons">
           <FontAwesomeIcon icon={faTwitterSquare} />
           <FontAwesomeIcon icon={faInstagramSquare}/>
           <FontAwesomeIcon icon={faFacebook}/>
           </div>
        </div>
    )
}
