import { siteConfig } from '../config/site.config.js';
import Icon from './icons/Icon.jsx';

const primaryLinks = siteConfig.links.slice(0, 4);

export default function ProfileSidebar() {
  const { profile } = siteConfig;
  return (
    <aside className="sidebar">
      <div className="sidebar-card">
        <div className="sidebar-avatar">
          {siteConfig.ui.showProfilePhoto ? (
            <img src={profile.avatar || profile.localAvatar} alt={profile.name} onError={(event) => { event.currentTarget.src = profile.localAvatar; }} />
          ) : (
            <Icon name="code" size={24} />
          )}
        </div>
        <div className="sidebar-name">{profile.name}</div>
        <div className="sidebar-role">{profile.role}</div>
        <div className="sidebar-loc"><Icon name="globe" size={12} /> {profile.city}</div>
        <hr className="sidebar-divider" />
        <div className="sidebar-links">
          {primaryLinks.map((link) => (
            <a className="sidebar-link" data-social={link.icon} key={link.label} href={link.url} target="_blank" rel="noreferrer">
              <Icon name={link.icon} size={15} />
              <span>{link.label}</span>
            </a>
          ))}
        </div>
        <hr className="sidebar-divider" />
        <div className="skill-label">Skills</div>
        {profile.skills.map((skill) => (
          <div className="skill-item" key={skill.label}>
            <div className="skill-name"><span>{skill.label}</span><span>{skill.value}%</span></div>
            <div className="skill-bar"><div className="skill-fill" style={{ width: `${skill.value}%` }} /></div>
          </div>
        ))}
      </div>
    </aside>
  );
}
