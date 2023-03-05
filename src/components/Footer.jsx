import React from 'react';
import styles from "../Footer.css";
import FooterLogo from '../images/footerLogo.png';
import Facebook from '../socials/facebookLogo.png'
import Twitter from '../socials/twitterLogo.png';
import Instagram from '../socials/instagramLogo.png';
import YouTube from '../socials/youtubeLogo.png';
import TikTok from '../socials/tiktokLogo.png';
import Reddit from '../socials/redditLogo.png';
import Medium from '../socials/mediumLogo.png';


function Footer() {
  return (
    <footer>
      <div className="footer-left">
        <img src={FooterLogo} alt="Logo" />
      </div>
      <div className="footer-middle">
        <ul className="social-links">
          <li>
            <a href="https://www.facebook.com/TheXdripOfficial/">
              <img src={Facebook} alt="Facebook" />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/XDRIP__">
              <img src={Twitter} alt="Twitter" />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/thexdripofficial/">
              <img src={Instagram} alt="Instagram" />
            </a>
          </li>
          <li>
            <a href="https://www.tiktok.com/@xdripofficial?lang=en">
              <img src={TikTok} alt="TikTok" />
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/channel/UCql_clMpK5GYxXUREIGfnRw">
              <img src={YouTube} alt="YouTube" />
            </a>
          </li>
          <li>
            <a href="https://www.reddit.com/r/XdRiP__/">
              <img src={Reddit} alt="Reddit" />
            </a>
          </li>
          <li>
            <a href="https://medium.com/@xdripofficial">
              <img src={Medium} alt="Medium" />
            </a>
          </li>
        </ul>
      </div>
      <div className="footer-right">
        <p className="email">contact@xdrip.io</p>
        <p className="motto">XdRiP Est. 2022 Livin, Lovin Life</p>
        
      </div>
    </footer>
  );
}

export default Footer;

