import { siteConfig } from '../config/site.config.js';
import Icon from '../components/icons/Icon.jsx';
import SectionHeader from '../components/SectionHeader.jsx';

export default function Contact() {
  return (
    <>
      <div className="main main--contact">
        <SectionHeader title="Contact" count="links" />
        <section className="contact-card">
            <div>
              <h2 className="contact-title">Let's build something.</h2>
              <p className="contact-sub">Open for app ideas, UI fixes, GitHub workflows, automation, and clean web builds.</p>
            </div>
            <div className="contact-btns">
              {siteConfig.links.map((link) => (
                <a className="contact-btn" data-social={link.icon} href={link.url} target="_blank" rel="noreferrer" key={link.label}>
                  <Icon name={link.icon} size={17} />
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
        </section>
      </div>
      <footer>
        <span className="footer-txt">{siteConfig.profile.name} · {siteConfig.profile.location}</span>
        <span className="footer-txt">Built with React + Vite · Deployed on GitHub Pages</span>
      </footer>
    </>
  );
}
