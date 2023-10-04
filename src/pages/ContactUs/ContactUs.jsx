import React from 'react'
import './ContactUs.css'

function ContactUs() {
  return (
    <div className="contact-container">
      {/* <div className="form-container"> */}
        <h1>Contact Us</h1>
        <form>
            <input type="text" placeholder="First Name" />
            
            <input type="text" placeholder="Last Name" />
            
            <textarea placeholder="Write your messae here" rows="4"></textarea>
            <button type="submit">Send</button>
        </form>
      {/* </div> */}

    </div>
  )
}

export default ContactUs