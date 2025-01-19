import React from 'react'
import FooterLinkSection from './FooterLinkSection'

export const Footer = () => {
    const sections = [
        { title: 'Quick navigation', links: ['About', 'Home', 'Contact'] },
        { title: 'Support', links: ['Terms of Use', 'Help Center','FAQ'] },
        { title: 'Customer Service', links: ['support@neptucom.com', 'WhatsApp number: 055-7050500', 'Customer service number: 03-5200001'] },

      ];
    
      return (
        <footer className="footsy">
          <div className="row">
            {sections.map((section, index) => (
              <FooterLinkSection key={index} title={section.title} links={section.links} />
            ))}
          </div>
        </footer>
      );
}
export default Footer