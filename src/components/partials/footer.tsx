import Link from "next/link";
import React from "react";
import social from "src/content/social";

const Newstler: React.FC = () => {
  return (
    <form>
      <label htmlFor="newsletter__email">Subscribe to newsletter</label>
      <div className="newsletter__field">
        <input type="email" name="email" id="newsletter__email" placeholder="your@email.address" />
        <button type="submit" className="submit" name="submit" value="1">Subscribe</button>
      </div>
    </form>
  );
};

const Social: React.FC = () => {
  return (
    <div className="social">
      {Object.entries(social.links).map(([key, link]) => (
        <Link key={key} href={link.href}>
          <a title={link.title}>
            {link.icon ? (
              <svg className="icon">
                <use xlinkHref={link.icon.src}/>
              </svg>
            ) : (
              key
            )}
          </a>
        </Link>
      ))}
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <>
      <div className="footer">
        <div className="footer-logo dark-bg">Löwenware</div>
        <div className="upper">
          <Social />
        </div>
        <div className="lower dark-bg">
          <div className="wrapper">
            <div className="copyright">&copy; 2017 - 2021 by Löwenware s.r.o.</div>
            <div className="legal">
              <a href="/privacy-statement/">Privacy statement</a><span> | </span>
              <a href="/terms-of-use/">Terms of use</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
