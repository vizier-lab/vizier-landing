'use client'

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Brain, Wrench, Calendar, Users, Monitor, ShieldCheck, type LucideIcon } from 'lucide-react';

const features: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Brain,
    title: 'Memory System',
    description: 'Session-based short-term memory with configurable recall depth, plus vector-based long-term memory for persistent knowledge retention.',
  },
  {
    icon: Wrench,
    title: 'Extensible Tools',
    description: 'Built-in tools for CLI access, web search, Docker sandboxing, workspace document management, and scheduler integration.',
  },
  {
    icon: Calendar,
    title: 'Task Scheduler',
    description: 'Built-in cron and one-time task scheduling. Automate agent execution with flexible scheduling options.',
  },
  {
    icon: Users,
    title: 'Multi-Agent Support',
    description: 'Orchestrate multiple agents with inter-agent communication. Each agent can have its own configuration and capabilities.',
  },
  {
    icon: Monitor,
    title: 'Modern Interfaces',
    description: 'Beautiful React-based WebUI for management and interaction, plus a lightweight TUI for terminal enthusiasts.',
  },
  {
    icon: ShieldCheck,
    title: 'Docker Sandbox',
    description: 'Execute code safely in isolated Docker containers. Protect your system while enabling powerful automation.',
  },
];

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-24! px-4! sm:px-6 lg:px-8 flex justify-center items-center"
      style={{ backgroundColor: 'var(--color-bg-secondary)' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8!"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Everything You <span className="gradient-text">Need</span>
          </h2>
          <p
            className="text-lg mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            A complete AI agent framework with memory, tools, scheduling, and multi-channel support.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              className="card"
            >
              <div
                className="w-12 h-12 rounded-xl mb-4! flex items-center justify-center"
                style={{
                  backgroundColor: 'var(--accent-light)',
                  color: 'var(--accent-primary)'
                }}
              >
                <feature.icon size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2!">{feature.title}</h3>
              <p
                className="text-sm"
                style={{ color: 'var(--text-secondary)' }}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


