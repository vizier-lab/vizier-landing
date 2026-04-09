import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

// LLM Provider logos/names (using text for now, can be replaced with actual logos)
const llmProviders = [
  { name: 'OpenAI', color: '#10A37F' },
  { name: 'Anthropic', color: '#D4A574' },
  { name: 'Google Gemini', color: '#4285F4' },
  { name: 'DeepSeek', color: '#4F46E5' },
  { name: 'OpenRouter', color: '#F59E0B' },
  { name: 'Ollama', color: '#FF6B6B' },
];

// Channel icons using Lucide names
const channels = [
  { name: 'Discord', icon: 'MessageCircle' },
  { name: 'Telegram', icon: 'Send' },
  { name: 'HTTP API', icon: 'Globe' },
  { name: 'WebSocket', icon: 'Radio' },
  { name: 'WebUI', icon: 'Layout' },
  { name: 'TUI', icon: 'Terminal' },
];

export default function Integrations() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-24! px-4! sm:px-6 lg:px-8 flex justify-center items-center"
    >
      <div className="mx-auto w-full p-10!">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8!"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Works with Your <span className="gradient-text">Favorite Tools</span>
          </h2>
          <p
            className="text-lg mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Connect to multiple LLM providers and communication channels out of the box.
            Plus, extend with Model Context Protocol (MCP) servers.
          </p>
        </motion.div>

        {/* LLM Providers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8!"
        >
          <h3
            className="text-center text-sm font-semibold uppercase tracking-wider mb-4!"
            style={{ color: 'var(--text-tertiary)' }}
          >
            Supported LLM Providers
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {llmProviders.map((provider, index) => (
              <motion.div
                key={provider.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                className="card flex flex-col items-center justify-center p-6 text-center"
              >
                <div
                  className="w-12 h-12 rounded-xl mb-3 flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: provider.color }}
                >
                  {provider.name.charAt(0)}
                </div>
                <span className="text-sm font-medium">{provider.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* MCP Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8!"
        >
          <div
            className="card p-8 text-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)',
              borderColor: 'rgba(16, 185, 129, 0.3)'
            }}
          >
            <div className="relative z-10">
              <div
                className="inline-flex items-center gap-2 px-4! py-2! rounded-full text-sm font-medium mb-4!"
                style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.2)',
                  color: 'var(--accent-primary)'
                }}
              >
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent-primary)' }} />
                Model Context Protocol
              </div>
              <h3 className="text-2xl font-bold mb-3">
                Extend with MCP Servers
              </h3>
              <p
                className="mx-auto mb-6! flex justify-center items-center"
                style={{ color: 'var(--text-secondary)' }}
              >
                <div className='max-w-2xl'>
                  Vizier supports the Model Context Protocol (MCP), allowing you to connect
                  to external tools, databases, and services seamlessly. Integrate with
                  local MCP servers or connect to HTTP-based MCP endpoints.

                </div>
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {['Local MCP', 'HTTP MCP', 'Custom Tools', 'External APIs'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3! py-1 rounded-full text-sm"
                    style={{
                      backgroundColor: 'var(--surface)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Channels */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3
            className="text-center text-sm font-semibold uppercase tracking-wider mb-4!"
            style={{ color: 'var(--text-tertiary)' }}
          >
            Communication Channels
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {channels.map((channel, index) => (
              <motion.div
                key={channel.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                className="card flex flex-col items-center justify-center p-6 text-center"
              >
                <div
                  className="w-12 h-12 rounded-xl mb-3 flex items-center justify-center"
                  style={{
                    backgroundColor: 'var(--accent-light)',
                    color: 'var(--accent-primary)'
                  }}
                >
                  <ChannelIcon name={channel.icon} />
                </div>
                <span className="text-sm font-medium">{channel.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Helper component to render channel icons
function ChannelIcon({ name }: { name: string }) {
  const iconClass = "w-6 h-6";

  switch (name) {
    case 'MessageCircle':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      );
    case 'Send':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      );
    case 'Globe':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      );
    case 'Radio':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />
        </svg>
      );
    case 'Layout':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      );
    case 'Terminal':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    default:
      return null;
  }
}
