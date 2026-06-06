const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'currentColor',
  xmlns: 'http://www.w3.org/2000/svg',
  'aria-hidden': true
};

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
};

function Solid({ size, children, viewBox = '0 0 24 24' }) {
  return <svg {...base} width={size} height={size} viewBox={viewBox}>{children}</svg>;
}

function Line({ size, children, viewBox = '0 0 24 24' }) {
  return <svg {...base} {...stroke} width={size} height={size} viewBox={viewBox}>{children}</svg>;
}

export default function Icon({ name = 'code', size = 20 }) {
  switch (name) {
    case 'search': return <Line size={size}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.35-4.35" /></Line>;
    case 'menu': return <Line size={size}><path d="M4 7h16M4 12h16M4 17h16" /></Line>;
    case 'back': return <Line size={size}><path d="M15 18 9 12l6-6" /></Line>;
    case 'close': return <Line size={size}><path d="M6 6l12 12M18 6 6 18" /></Line>;
    case 'external': return <Line size={size}><path d="M14 4h6v6" /><path d="m10 14 10-10" /><path d="M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5" /></Line>;
    case 'home': return <Solid size={size}><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></Solid>;
    case 'grid': return <Solid size={size}><path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" /></Solid>;
    case 'code': return <Solid size={size}><path d="M8.7 17.9 2.8 12l5.9-5.9 1.55 1.55L5.9 12l4.35 4.35-1.55 1.55Zm6.6 0-1.55-1.55L18.1 12l-4.35-4.35 1.55-1.55 5.9 5.9-5.9 5.9Z" /></Solid>;
    case 'github': return <Solid size={size}><path d="M12 .7a11.3 11.3 0 0 0-3.58 22c.56.1.77-.24.77-.54v-2.02c-3.14.68-3.8-1.34-3.8-1.34-.52-1.3-1.26-1.65-1.26-1.65-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.66 1.23 3.31.94.1-.74.4-1.23.72-1.52-2.5-.29-5.13-1.25-5.13-5.6 0-1.23.44-2.25 1.16-3.04-.12-.29-.5-1.45.12-3 0 0 .95-.3 3.12 1.16a10.8 10.8 0 0 1 5.68 0c2.16-1.46 3.1-1.16 3.1-1.16.63 1.55.24 2.71.12 3 .73.8 1.16 1.8 1.16 3.04 0 4.36-2.63 5.31-5.14 5.59.4.35.77 1.06.77 2.13v3.16c0 .3.2.65.78.54A11.3 11.3 0 0 0 12 .7Z" /></Solid>;
    case 'mail': return <Solid size={size}><path d="M4.2 5h15.6A2.2 2.2 0 0 1 22 7.2v9.6a2.2 2.2 0 0 1-2.2 2.2H4.2A2.2 2.2 0 0 1 2 16.8V7.2A2.2 2.2 0 0 1 4.2 5Zm.55 2 6.66 5.25a1 1 0 0 0 1.18 0L19.25 7H4.75Z" /></Solid>;
    case 'globe': return <Solid size={size}><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm6.93 9h-3.1a15 15 0 0 0-1.1-5.02A8.04 8.04 0 0 1 18.93 11ZM12 4.05c.75 1.08 1.54 3.3 1.75 6.95h-3.5c.21-3.65 1-5.87 1.75-6.95ZM4.07 13h3.1c.1 1.95.48 3.66 1.1 5.02A8.04 8.04 0 0 1 4.07 13Zm3.1-2h-3.1a8.04 8.04 0 0 1 4.2-5.02A15 15 0 0 0 7.17 11ZM12 19.95c-.75-1.08-1.54-3.3-1.75-6.95h3.5c-.21 3.65-1 5.87-1.75 6.95Zm3.73-1.93c.62-1.36 1-3.07 1.1-5.02h3.1a8.04 8.04 0 0 1-4.2 5.02Z" /></Solid>;
    case 'android': return <Solid size={size}><path d="M7.7 8.4 5.8 5.1l1.2-.7 2 3.5a8.8 8.8 0 0 1 6 0l2-3.5 1.2.7-1.9 3.3A7.2 7.2 0 0 1 20 14v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6a7.2 7.2 0 0 1 3.7-5.6ZM8 13.2a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" /></Solid>;
    case 'react': return <Line size={size}><circle cx="12" cy="12" r="1.8" /><ellipse cx="12" cy="12" rx="9" ry="3.6" /><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)" /></Line>;
    case 'bolt': return <Solid size={size}><path d="M13.4 2 4 13.2h6.6L9.6 22 20 9.7h-6.8L13.4 2Z" /></Solid>;
    case 'film': return <Solid size={size}><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm2 2H4v3h2V6Zm0 5H4v2h2v-2Zm0 4H4v3h2v-3Zm12-9v3h2V6h-2Zm0 5v2h2v-2h-2Zm0 4v3h2v-3h-2ZM8 7v10h8V7H8Z" /></Solid>;
    case 'wallet': return <Solid size={size}><path d="M3 6.5A2.5 2.5 0 0 1 5.5 4H18a2 2 0 0 1 2 2v1H5.5a1 1 0 0 0 0 2H21v8.5a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5v-11ZM17 13.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" /></Solid>;
    case 'terminal': return <Solid size={size}><path d="M3.8 5h16.4A1.8 1.8 0 0 1 22 6.8v10.4a1.8 1.8 0 0 1-1.8 1.8H3.8A1.8 1.8 0 0 1 2 17.2V6.8A1.8 1.8 0 0 1 3.8 5Zm3.1 9.7 4-3.2-4-3.2-1.2 1.5 2.1 1.7-2.1 1.7 1.2 1.5Zm5.2.3h6v-2h-6v2Z" /></Solid>;
    case 'piggy': return <Solid size={size}><path d="M7.5 7.2A7.5 7.5 0 0 1 21 11.8h1v4h-2.2c-.5 1-1.3 1.9-2.3 2.5V22h-3v-2H9.7v2h-3v-3.2A7.5 7.5 0 0 1 4 15H2v-3h2.1c.2-.9.6-1.8 1.2-2.5L4.4 7.2h3.1ZM16.8 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" /></Solid>;
    case 'pen': return <Solid size={size}><path d="m15.7 3.3 5 5L9 20H4v-5L15.7 3.3Zm1.4-1.4a2 2 0 0 1 2.8 0l2.2 2.2a2 2 0 0 1 0 2.8l-1 1-5-5 1-1Z" /></Solid>;
    case 'book': return <Solid size={size}><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5A2.5 2.5 0 0 0 4 22V4.5ZM6.5 5A.5.5 0 0 0 6 5.5v12.6c.2-.06.4-.1.5-.1H18V5H6.5Z" /></Solid>;
    case 'money': return <Solid size={size}><path d="M3 6h18v12H3V6Zm3 3a3 3 0 0 1-3 3v0a3 3 0 0 1 3 3h12a3 3 0 0 1 3-3 3 3 0 0 1-3-3H6Zm6 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" /></Solid>;
    case 'chart': return <Solid size={size}><path d="M4 19h17v2H2V3h2v16Zm3-2V9h3v8H7Zm5 0V5h3v12h-3Zm5 0v-6h3v6h-3Z" /></Solid>;
    case 'star': return <Solid size={size}><path d="m12 2.4 2.88 5.84 6.45.94-4.66 4.54 1.1 6.42L12 17.1l-5.77 3.04 1.1-6.42-4.66-4.54 6.45-.94L12 2.4Z" /></Solid>;
    case 'fork': return <Line size={size}><circle cx="6" cy="5" r="2" /><circle cx="18" cy="5" r="2" /><circle cx="12" cy="19" r="2" /><path d="M6 7v3a4 4 0 0 0 4 4h2m6-7v3a4 4 0 0 1-4 4h-2v3" /></Line>;
    case 'sun': return <Solid size={size}><path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0-5 1.3 3h-2.6L12 2Zm0 17 1.3 3h-2.6l1.3-3ZM2 12l3-1.3v2.6L2 12Zm17 0 3-1.3v2.6L19 12ZM4.2 4.2l3.04 1.2-1.84 1.84-1.2-3.04Zm12.56 12.56 3.04 1.2-1.84 1.84-1.2-3.04Zm3.04-12.56-1.2 3.04-1.84-1.84 3.04-1.2ZM7.24 16.76 6.04 19.8 4.2 17.96l3.04-1.2Z" /></Solid>;
    case 'moon': return <Solid size={size}><path d="M21.4 14.5A8.8 8.8 0 0 1 9.5 2.6a.75.75 0 0 0-.78-1.18 10.5 10.5 0 1 0 13.86 13.86.75.75 0 0 0-1.18-.78Z" /></Solid>;
    case 'install': return <Line size={size}><path d="M12 3v10" /><path d="m8 9 4 4 4-4" /><path d="M5 17v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2" /></Line>;
    case 'telegram': return <Solid size={size}><path d="M21.5 3.7 2.9 10.9c-1 .4-1 1.8.1 2.1l4.8 1.5 1.85 5.8c.34 1 1.6 1.2 2.18.35l2.6-3.8 5.08 3.75c.9.66 2.17.14 2.37-.96L24 4.94c.2-1.02-.82-1.62-2.5-1.24ZM9.25 13.84l9.38-5.76-7.62 7.25-.3 3.02-1.46-4.51Z" /></Solid>;
    case 'whatsapp': return <Solid size={size}><path d="M12.04 2.2a9.72 9.72 0 0 0-8.4 14.6L2.3 21.7l5.02-1.31a9.72 9.72 0 1 0 4.72-18.19Zm5.72 13.75c-.24.68-1.4 1.3-1.96 1.36-.5.05-1.13.07-1.83-.11-.42-.1-.96-.31-1.66-.6-2.9-1.25-4.8-4.16-4.94-4.36-.15-.19-1.18-1.56-1.18-2.98s.75-2.12 1.02-2.41c.27-.3.6-.37.79-.37h.57c.18.01.43-.07.67.5.25.6.85 2.08.92 2.23.07.14.12.32.03.51-.08.2-.12.32-.27.5-.14.17-.3.38-.43.51-.14.15-.29.3-.12.6.17.28.76 1.25 1.63 2.02 1.12 1 2.06 1.3 2.36 1.45.29.14.46.12.63-.08.17-.2.72-.84.92-1.13.2-.3.39-.25.66-.15.27.1 1.73.82 2.03.96.3.15.5.22.57.34.07.12.07.71-.17 1.39Z" /></Solid>;
    case 'linkedin': return <Solid size={size}><path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5ZM3.2 10h3.6v11H3.2V10Zm6 0h3.45v1.5h.05c.48-.9 1.65-1.85 3.4-1.85 3.64 0 4.3 2.4 4.3 5.5V21h-3.6v-5.2c0-1.24-.02-2.83-1.72-2.83-1.73 0-1.99 1.35-1.99 2.74V21H9.2V10Z" /></Solid>;
    case 'instagram': return <Solid size={size}><path d="M7.4 2h9.2A5.4 5.4 0 0 1 22 7.4v9.2a5.4 5.4 0 0 1-5.4 5.4H7.4A5.4 5.4 0 0 1 2 16.6V7.4A5.4 5.4 0 0 1 7.4 2Zm0 2A3.4 3.4 0 0 0 4 7.4v9.2A3.4 3.4 0 0 0 7.4 20h9.2a3.4 3.4 0 0 0 3.4-3.4V7.4A3.4 3.4 0 0 0 16.6 4H7.4ZM12 7.25A4.75 4.75 0 1 1 12 16.75 4.75 4.75 0 0 1 12 7.25Zm0 2A2.75 2.75 0 1 0 12 14.75 2.75 2.75 0 0 0 12 9.25Zm5.05-2.65a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z" /></Solid>;
    case 'youtube': return <Solid size={size}><path d="M21.7 7.2a2.7 2.7 0 0 0-1.9-1.9C18.1 4.9 12 4.9 12 4.9s-6.1 0-7.8.4a2.7 2.7 0 0 0-1.9 1.9A28.3 28.3 0 0 0 1.9 12c0 1.7.13 3.4.4 4.8a2.7 2.7 0 0 0 1.9 1.9c1.7.4 7.8.4 7.8.4s6.1 0 7.8-.4a2.7 2.7 0 0 0 1.9-1.9c.27-1.4.4-3.1.4-4.8s-.13-3.4-.4-4.8ZM10 15.1V8.9l5.35 3.1L10 15.1Z" /></Solid>;
    default: return <Solid size={size}><path d="M12 2 9.65 8.9 3 12l6.65 3.1L12 22l2.35-6.9L21 12l-6.65-3.1L12 2Z" /></Solid>;
  }
}
