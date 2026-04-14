'use client'

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Vizier has completely transformed how I manage my development workflow. The multi-agent orchestration and memory system are game-changers.",
    author: "Sarah Chen",
    role: "Senior Developer",
    avatar: "SC",
  },
  {
    quote: "The Docker sandbox integration gives me peace of mind when running automated tasks. Plus, the WebUI is beautifully designed and intuitive.",
    author: "Marcus Johnson",
    role: "DevOps Engineer",
    avatar: "MJ",
  },
  {
    quote: "Finally, an AI agent framework that just works. The scheduler and MCP support have automated so many of our internal processes.",
    author: "Emily Rodriguez",
    role: "Tech Lead",
    avatar: "ER",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-24! px-4! sm:px-6 lg:px-8 p-10 flex justify-center items-center"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16!"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Loved by <span className="gradient-text">Developers</span>
          </h2>
          <p
            className="text-lg mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            See what people are saying about their experience with Vizier.
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              className="card"
            >
              {/* Quote icon */}
              <div
                className="w-10 h-10 rounded-lg mb-4! flex items-center justify-center"
                style={{
                  backgroundColor: 'var(--accent-light)',
                  color: 'var(--accent-primary)'
                }}
              >
                <Quote size={20} />
              </div>

              {/* Quote text */}
              <p
                className="text-base mb-6! leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                "{testimonial.quote}"
              </p>

              {/* Author info */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
                  style={{
                    background: 'var(--accent-gradient)',
                    color: 'white'
                  }}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm">{testimonial.author}</p>
                  <p
                    className="text-xs"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12!"
        >
          <p
            className="text-sm mb-2"
            style={{ color: 'var(--text-tertiary)' }}
          >
            Ready to transform your workflow?
          </p>
          <a
            href="https://github.com/vizier-lab/vizier"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-medium"
            style={{ color: 'var(--accent-primary)' }}
          >
            Get started with Vizier today
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
