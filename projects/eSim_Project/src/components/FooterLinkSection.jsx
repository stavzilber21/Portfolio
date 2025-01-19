import React from 'react'

export const FooterLinkSection = ({ title, links }) => {
    
  return (
    <div className="col-4 mobile">
    <h1>{title}</h1>
    <ul>
      {links.map((link, index) => (
        <li key={index}>{link}</li>
      ))}
    </ul>
  </div>
  )
}
export default FooterLinkSection