import { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import { getGithubUsername } from '../utils/github.js';

const schema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames || []), 'details', 'summary', 'kbd', 'sub', 'sup'],
  attributes: {
    ...(defaultSchema.attributes || {}),
    '*': [...((defaultSchema.attributes && defaultSchema.attributes['*']) || []), 'className', 'id', 'title', 'align'],
    a: [...((defaultSchema.attributes && defaultSchema.attributes.a) || []), 'href', 'title', 'target', 'rel'],
    img: [...((defaultSchema.attributes && defaultSchema.attributes.img) || []), 'src', 'alt', 'title', 'width', 'height', 'align'],
    input: [...((defaultSchema.attributes && defaultSchema.attributes.input) || []), 'type', 'checked', 'disabled']
  },
  protocols: { ...(defaultSchema.protocols || {}), href: ['http', 'https', 'mailto', 'tel'], src: ['http', 'https', 'data'] }
};

function normalizeReadme(markdown = '') {
  return String(markdown)
    .replace(/\r\n/g, '\n')
    .replace(/^(#{1,6}\s+.*?)\s+#+\s*$/gm, '$1')
    .replace(/<a[^>]*class=[\"'][^\"']*anchor[^\"']*[\"'][^>]*>.*?<\/a>/gims, '')
    .replace(/^>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*$/gim, (_, type) => `> **${type[0]}${type.slice(1).toLowerCase()}**`);
}

function encodePath(path = '') {
  return path.split('/').map((part) => encodeURIComponent(part)).join('/');
}

function isAbsoluteUrl(url = '') {
  return /^(https?:|mailto:|tel:|data:|blob:|#)/i.test(url);
}

function resolveReadmeUrl(url = '', project, type = 'link') {
  if (!url || isAbsoluteUrl(url)) return url;
  const username = project?.owner || getGithubUsername();
  const branch = project?.defaultBranch || 'main';
  const clean = url.replace(/^\.\//, '').replace(/^\//, '');
  const [path, hash] = clean.split('#');
  const suffix = hash ? `#${hash}` : '';
  if (type === 'image') return `https://raw.githubusercontent.com/${username}/${project.name}/${branch}/${encodePath(path)}${suffix}`;
  return `https://github.com/${username}/${project.name}/blob/${branch}/${encodePath(path)}${suffix}`;
}

function textFromChildren(children) {
  if (Array.isArray(children)) return children.map((child) => textFromChildren(child?.props?.children ?? child)).join('');
  if (children && typeof children === 'object') return textFromChildren(children.props?.children || '');
  return String(children || '');
}

function slugify(children) {
  return textFromChildren(children).toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
}

function Heading({ level = 2, children, ...props }) {
  const Tag = `h${level}`;
  const id = props.id || slugify(children);
  return <Tag id={id || undefined}>{children}</Tag>;
}

function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const area = document.createElement('textarea');
      area.value = code;
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      area.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="github-codeblock">
      <button className="github-codeblock__copy" type="button" onClick={copy} aria-label="Copy code">
        {copied ? 'Copied' : 'Copy'}
      </button>
      <pre><code className={language ? `readme-language-${language}` : undefined}>{code}</code></pre>
    </div>
  );
}

function ReadmeCode({ inline, className = '', children }) {
  const match = /language-([^\s]+)/.exec(className);
  const code = String(children).replace(/\n$/, '');
  if (!inline && (match || code.includes('\n'))) return <CodeBlock code={code} language={match?.[1] || 'text'} />;
  return <code className="markdown-inline-code">{children}</code>;
}

function ReadmeImage({ src, alt, project, ...props }) {
  const resolved = resolveReadmeUrl(src, project, 'image');
  const badge = `${resolved} ${alt}`.toLowerCase().includes('shields.io') || `${resolved} ${alt}`.toLowerCase().includes('badge');
  return <img src={resolved} alt={alt || ''} loading="lazy" className={`markdown-image ${badge ? 'markdown-image--badge' : 'markdown-image--large'}`} {...props} />;
}

function ReadmeLink({ href, children, project, ...props }) {
  const resolved = resolveReadmeUrl(href, project, 'link');
  const external = resolved && !resolved.startsWith('#');
  return <a href={resolved} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} {...props}>{children}</a>;
}

function ReadmeTable({ children }) {
  return <div className="markdown-table-wrap"><table>{children}</table></div>;
}

function ReadmeShell({ children }) {
  return (
    <section className="github-readme-preview" aria-label="GitHub README preview">
      <div className="github-readme-preview__header">
        <svg className="github-readme-preview__icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
          <path d="M0 1.75A.75.75 0 0 1 .75 1h4.253c1.227 0 2.317.59 2.997 1.501A3.743 3.743 0 0 1 10.997 1h4.253a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-4.507a2.25 2.25 0 0 0-1.591.659l-.622.621a.75.75 0 0 1-1.06 0l-.622-.621A2.25 2.25 0 0 0 5.257 13H.75a.75.75 0 0 1-.75-.75Zm7.25 1.387A2.247 2.247 0 0 0 5.003 2.5H1.5v9h3.757c.71 0 1.4.201 1.993.574Zm1.5 8.937a3.748 3.748 0 0 1 1.993-.574H14.5v-9h-3.503a2.247 2.247 0 0 0-2.247 2.247Z" />
        </svg>
        <strong>README.md</strong>
      </div>
      {children}
    </section>
  );
}

export default function ReadmeViewer({ markdown, loading, error, repoUrl, project }) {
  const normalized = useMemo(() => normalizeReadme(markdown), [markdown]);

  if (loading) {
    return (
      <ReadmeShell>
        <div className="readme-empty"><span className="readme-loader" /><strong>Loading README</strong></div>
      </ReadmeShell>
    );
  }

  if (error) {
    return (
      <ReadmeShell>
        <div className="readme-empty"><strong>README not found</strong><p>{error}</p>{repoUrl && <a href={repoUrl} target="_blank" rel="noreferrer">Open repository</a>}</div>
      </ReadmeShell>
    );
  }

  return (
    <ReadmeShell>
      <article className="readme-content markdown-body">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, [rehypeSanitize, schema]]}
          components={{
            h1: (props) => <Heading level={1} {...props} />,
            h2: (props) => <Heading level={2} {...props} />,
            h3: (props) => <Heading level={3} {...props} />,
            h4: (props) => <Heading level={4} {...props} />,
            a: (props) => <ReadmeLink project={project} {...props} />,
            img: (props) => <ReadmeImage project={project} {...props} />,
            table: ReadmeTable,
            pre: ({ children }) => <>{children}</>,
            code: ReadmeCode,
            input: (props) => <input {...props} readOnly />
          }}
        >
          {normalized}
        </ReactMarkdown>
      </article>
    </ReadmeShell>
  );
}
