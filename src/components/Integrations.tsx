import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaDiscord, FaTelegram, FaGlobe, FaPlug, FaDesktop, FaTerminal, FaRoute } from 'react-icons/fa';
import { SiOpenai, SiAnthropic, SiGooglegemini, SiOllama } from 'react-icons/si';
import { GiSpermWhale } from 'react-icons/gi';
import type { IconType } from 'react-icons';

const llmProviders: { name: string; color: string; icon: IconType }[] = [
  { name: 'OpenAI', color: '#10A37F', icon: SiOpenai },
  { name: 'Anthropic', color: '#D4A574', icon: SiAnthropic },
  { name: 'Google Gemini', color: '#4285F4', icon: SiGooglegemini },
  { name: 'DeepSeek', color: '#4F46E5', icon: GiSpermWhale },
  { name: 'OpenRouter', color: '#F59E0B', icon: FaRoute },
  { name: 'Ollama', color: '#FF6B6B', icon: SiOllama },
];

const channels: { name: string; icon: IconType }[] = [
  { name: 'Discord', icon: FaDiscord },
  { name: 'Telegram', icon: FaTelegram },
  { name: 'HTTP API', icon: FaGlobe },
  { name: 'WebSocket', icon: FaPlug },
  { name: 'WebUI', icon: FaDesktop },
  { name: 'TUI', icon: FaTerminal },
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
                  className="w-12 h-12 rounded-xl mb-3! flex items-center justify-center text-white"
                  style={{ backgroundColor: provider.color }}
                >
                  <provider.icon size={24} />
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
                  className="w-12 h-12 rounded-xl mb-3! flex items-center justify-center"
                  style={{
                    backgroundColor: 'var(--accent-light)',
                    color: 'var(--accent-primary)'
                  }}
                >
                  <channel.icon size={24} />
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

