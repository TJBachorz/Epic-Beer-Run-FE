import React from 'react'

export default function Footer() {
    return (
        <footer>
            <nav className="footer-links">
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/TJBachorz">GitHub</a>
                <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/tjbachorz/">LinkedIn</a>
                <a href="mailto:tjbachorz@gmail.com">Email</a>
            </nav>
            <p className="footer-credit">
                TJ Bachorz &middot; Built with React, Ruby on Rails &amp;{' '}
                <a target="_blank" rel="noopener noreferrer" href="https://www.openbrewerydb.org">OpenBreweryDB</a>
            </p>
        </footer>
    )
}
