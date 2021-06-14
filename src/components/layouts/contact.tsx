import React from "react";

import IContactMetadata from "src/interfaces/page/metadata/contact";

interface IProps {
  metadata: IContactMetadata,
}

const ContactLayout: React.FC<IProps> = ({ metadata, children }) => {
  const {
    title,
    _map,
    _subtitle,
    _company,
    _address,
    _phone,
  } = metadata;

  return (
    <div className="contact-content">
      <div className="wrapper">
        <div className="content">
          <h1>{title}</h1>

          {children}

          <div className="studio">
            <h2>{_subtitle}</h2>
            <p className="org">{_company.name}</p>
            <div className="label">Address:</div>
            <p className="adr">
              <span className="street-address">{_address.street}</span><br />
              <span className="postal-code">{_address.postalCode} </span>
              <span className="locality">{_address.locality}</span><br />
              <span className="country-name">{_address.country}</span>
            </p>
            <p>
              <span className="label">Phone: </span>
              <a href={`tel:${_phone}`} className="contacts__phone tel">{_phone}</a>
            </p>
            <p className="org-id"><span className="label">Company ID: </span> <span className="value">{_company.orgID}</span></p>
            <p className="org-iban"><span className="label">IBAN: </span> <span className="value">{_company.iban}</span></p>
          </div>
        </div>
        <div className="map">
          <iframe width="100%" height="100%" id="gmap_canvas" src={_map} frameBorder={0} scrolling="no" marginHeight={0} marginWidth={0}></iframe>
        </div>
        <div className="arrow"></div>
      </div>
      <div className="feedback">
        <form method="post" id="feedback__form">
          <div className="contacts__msg">
            <label htmlFor="feedback__msg">Your Message</label>
            <textarea id="feedback__msg" className="float-label"></textarea>
          </div>
          <div className="contacts__email">
            <label htmlFor="feedback__email">Your E-Mail</label>
            <input type="email" id="feedback__email" defaultValue="" className="float-label" />
          </div>
          <div className="terms">
            By submitting this form you agree with <a
              href="/privacy-statement/">Privacy Statement
              </a> and accept <a href="/terms-of-use/">Terms of Use</a>.
          </div>
          <div className="form-row">
            <button type="submit" className="button">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactLayout;
