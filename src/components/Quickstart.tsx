import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Copy, Check, Terminal, BookOpen, Download } from "lucide-react";

const installCommand = "curl -fsSL https://get.vizier.rs | sh";
const windowsInstallerUrl = "#"; // TODO: replace with actual release page URL

type OsTab = "linux-mac" | "windows";

function detectOs(): OsTab {
  if (typeof navigator === "undefined") return "linux-mac";
  return navigator.userAgent.toLowerCase().includes("win")
    ? "windows"
    : "linux-mac";
}

const quickstartSteps = [
  {
    number: "01",
    title: "Install Vizier",
    description:
      "Run the install script to download and install Vizier on your system.",
  },
  {
    number: "02",
    title: "Initialize Workspace",
    description:
      "Generate configuration and create your first agent workspace.",
    command: "vizier onboard",
  },
  {
    number: "03",
    title: "Run Your Agent",
    description:
      "Start the agent and begin interacting through your preferred channel.",
    command: "vizier run",
  },
];

const alternativeInstalls = [
  { label: "Cargo Install", command: "cargo install vizier" },
  { label: "Cargo Binstall", command: "cargo binstall vizier" },
];

export default function Quickstart() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<OsTab>("linux-mac");

  const os = detectOs();
  useEffect(() => {
    setActiveTab(os);
  }, [os]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="quickstart"
      ref={ref}
      className="py-24 px-4 sm:px-6 lg:px-8 flex justify-center items-center p-10! min-h-screen"
      style={{ backgroundColor: "var(--color-bg-secondary)" }}
    >
      <div className="mx-auto max-w-4xl flex-1 justify-center items-center p-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center! max-w-4xl mb-16 flex-1! justify-center! items-center!"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Get Started in <span className="gradient-text">Seconds</span>
          </h2>
          <p
            className="text-lg mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            One command to install, three steps to launch your personal AI
            steward.
          </p>
        </motion.div>

        {/* Main install command */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <div className="mx-auto">
            {/* OS Tabs */}
            <div
              className="flex items-center gap-1 mb-3! p-1 rounded-lg w-fit"
              style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              {(
                [
                  { id: "linux-mac", label: "Linux / macOS" },
                  { id: "windows", label: "Windows" },
                ] as { id: OsTab; label: string }[]
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="px-4! py-1.5 rounded-md text-sm font-medium transition-all"
                  style={
                    activeTab === tab.id
                      ? {
                        backgroundColor: "var(--accent-primary)",
                        color: "#fff",
                      }
                      : { color: "var(--text-secondary)" }
                  }
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Linux / macOS */}
            {activeTab === "linux-mac" && (
              <>
                <div className="flex items-center justify-between mb-3!">
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Quick Install
                  </span>
                  <button
                    onClick={() => copyToClipboard(installCommand)}
                    className="flex items-center gap-1 text-sm transition-colors"
                    style={{ color: "var(--accent-primary)" }}
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <div className="code-block flex items-center gap-3">
                  <Terminal
                    size={16}
                    style={{ color: "var(--accent-primary)" }}
                  />
                  <code className="flex-1">{installCommand}</code>
                </div>
              </>
            )}

            {/* Windows */}
            {activeTab === "windows" && (
              <div className="flex flex-col items-start gap-3 mb-3!">
                <p
                  className="text-sm font-medium"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Download the installer from the releases page and run it to
                  install Vizier.
                </p>
                <a
                  href={windowsInstallerUrl}
                  className="btn btn-primary flex items-center gap-3"
                >
                  <Download size={16} />
                  Windows Installer
                </a>
              </div>
            )}
          </div>
        </motion.div>

        {/* Steps grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8! mt-8!">
          {quickstartSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="card"
            >
              <div
                className="text-4xl font-bold mb-4! gradient-text"
                style={{ opacity: 0.3 }}
              >
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-2!">{step.title}</h3>
              <p
                className="text-sm mb-4!"
                style={{ color: "var(--text-secondary)" }}
              >
                {step.description}
              </p>
              {step.command && (
                <div className="code-block text-xs">
                  <code>{step.command}</code>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Alternative installs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mb-12!"
        >
          <p
            className="text-sm mb-4!"
            style={{ color: "var(--text-tertiary)" }}
          >
            Alternative installation methods
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {alternativeInstalls.map((alt) => (
              <div
                key={alt.label}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm"
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                  color: "var(--text-secondary)",
                }}
              >
                <code>{alt.command}</code>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Documentation link */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <a
            href="https://book.vizier.rs"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            <BookOpen size={18} />
            Read the Documentation
          </a>
        </motion.div>
      </div>
    </section>
  );
}
