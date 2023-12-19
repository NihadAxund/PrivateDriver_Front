import React from 'react'
import "../componentsCss/Notfound.css"
export default function NotFound() {
    return (
        <div className='NotFoundSection'>
            <h1>NOT FOUND</h1>
            <section class="error-container">
                <span class="four"><span class="screen-reader-text">4</span></span>
                <span class="zero"><span class="screen-reader-text">0</span></span>
                <span class="four"><span class="screen-reader-text">4</span></span>
            </section>
            <div class="link-container">
                <a href="/" class="more-link">Back Home Page </a>
            </div>
        </div>
    )
}
