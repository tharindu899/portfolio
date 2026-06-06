import Icon from './icons/Icon.jsx';
import { usePwaInstallPrompt } from '../pwa/usePwaInstallPrompt.js';

export default function PwaInstallButton() {
  const { canInstall, install } = usePwaInstallPrompt();

  if (!canInstall) return null;

  return (
    <button className="pwa-install-btn" type="button" onClick={install} aria-label="Install app">
      <Icon name="install" size={13} />
      <span>Install</span>
    </button>
  );
}
