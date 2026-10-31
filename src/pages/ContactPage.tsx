import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { AdPlacement } from '../components/AdPlacement';
import { SITE_CONFIG } from '../config/site';
import { Mail, Send, CheckCircle2, AlertCircle, Copy, Check, MessageSquare, HelpCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Feedback & Suggestions');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = () => {
    const errs: { name?: string; email?: string; message?: string } = {};

    if (!name.trim()) {
      errs.name = 'Please provide your name.';
    } else if (name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters.';
    }

    if (!email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!message.trim()) {
      errs.message = 'Please enter your message.';
    } else if (message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Build mailto URL to launch client's email application with prefilled message
    const mailtoUrl = `mailto:${SITE_CONFIG.contactEmail}?subject=${encodeURIComponent(
      `[${subject}] From ${name}`
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nSent from ${SITE_CONFIG.productionUrl}`
    )}`;

    // Open user's mail client
    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SITE_CONFIG.contactEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <div className="w-full flex flex-col items-center py-8 px-4 sm:px-6">
      <SEO
        title="Contact Us"
        description="Get in touch with the ONLY 1% CAN WIN team for feedback, bug reports, questions, or business inquiries."
        path="/contact"
      />

      <div className="w-full max-w-3xl space-y-8 text-left">
        {/* Breadcrumb & Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <Link to="/" className="hover:text-neon-purple transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-300">Contact Us</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-pink-400 to-neon-orange">Support & Inquiries</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Have feedback, found an odd bug in a challenge, or have an idea for a new speed micro-puzzle? We'd love to hear from you.
          </p>
        </div>

        {/* Direct Email Card */}
        <div className="p-6 rounded-3xl bg-dark-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-neon-purple/20 border border-neon-purple/40 flex items-center justify-center text-neon-purple flex-shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Official Support Address
              </div>
              <a
                href={`mailto:${SITE_CONFIG.contactEmail}`}
                className="text-base sm:text-lg font-bold text-white hover:text-neon-purple transition-colors break-all"
              >
                {SITE_CONFIG.contactEmail}
              </a>
            </div>
          </div>

          <button
            onClick={handleCopyEmail}
            className="px-4 py-2 rounded-xl bg-dark-800 hover:bg-dark-700 border border-slate-700 text-xs font-bold text-slate-200 flex items-center gap-1.5 transition-all cursor-pointer flex-shrink-0"
          >
            {copiedEmail ? (
              <>
                <Check className="w-3.5 h-3.5 text-neon-green" />
                <span className="text-neon-green">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Email</span>
              </>
            )}
          </button>
        </div>

        {/* Top Ad Placement Container */}
        <AdPlacement format="leaderboard" />

        {/* Contact Form Container */}
        <div className="p-6 sm:p-8 rounded-3xl bg-dark-900/90 border border-slate-800 shadow-2xl space-y-6">
          <div className="flex items-center gap-2 text-neon-blue">
            <MessageSquare className="w-5 h-5" />
            <h2 className="text-xl font-black text-white">Send Us a Direct Message</h2>
          </div>

          {/* Transparent Notice about client-side delivery */}
          <div className="p-3.5 rounded-2xl bg-dark-850 border border-slate-800 text-xs text-slate-400 leading-relaxed flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-neon-blue flex-shrink-0 mt-0.5" />
            <span>
              <strong>Note:</strong> To protect player privacy, this web game operates strictly on the client side without centralized server tracking. Submitting this form will prepare and launch an email draft in your default email application addressed to{' '}
              <strong className="text-slate-300 font-mono">{SITE_CONFIG.contactEmail}</strong>.
            </span>
          </div>

          {submitted && (
            <div className="p-4 rounded-2xl bg-green-950/60 border border-neon-green/40 text-xs sm:text-sm text-green-300 flex items-center gap-2.5 animate-pop">
              <CheckCircle2 className="w-5 h-5 text-neon-green flex-shrink-0" />
              <span>
                Your email client has been opened with your pre-filled message! If it did not open, you can send your message directly to{' '}
                <strong className="font-mono text-white">{SITE_CONFIG.contactEmail}</strong>.
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-1.5">
                <label htmlFor="name" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                  Your Name <span className="text-neon-orange">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                  }}
                  placeholder="e.g. Alex Rivera"
                  className={`w-full px-4 py-3 rounded-2xl bg-dark-850 border text-sm text-white placeholder-slate-600 focus:outline-none transition-all ${
                    errors.name ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-neon-purple'
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                  Your Email <span className="text-neon-orange">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                  }}
                  placeholder="name@example.com"
                  className={`w-full px-4 py-3 rounded-2xl bg-dark-850 border text-sm text-white placeholder-slate-600 focus:outline-none transition-all ${
                    errors.email ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-neon-purple'
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-1.5">
              <label htmlFor="subject" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Inquiry Topic
              </label>
              <select
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-dark-850 border border-slate-800 text-sm text-white focus:outline-none focus:border-neon-purple transition-all cursor-pointer"
              >
                <option value="Feedback & Suggestions">General Feedback & Suggestions</option>
                <option value="Bug Report">Challenge Bug or Scoring Glitch</option>
                <option value="New Challenge Idea">Propose a New Brain Challenge</option>
                <option value="Partnership & Advertising">Partnership or Sponsorship</option>
                <option value="Other">Other Inquiries</option>
              </select>
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label htmlFor="message" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Message <span className="text-neon-orange">*</span>
              </label>
              <textarea
                id="message"
                rows={5}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (errors.message) setErrors(prev => ({ ...prev, message: undefined }));
                }}
                placeholder="Describe your suggestion, bug details (device, browser, screen resolution), or message..."
                className={`w-full px-4 py-3 rounded-2xl bg-dark-850 border text-sm text-white placeholder-slate-600 focus:outline-none transition-all resize-y ${
                  errors.message ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-neon-purple'
                }`}
              />
              {errors.message && (
                <p className="text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.message}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-neon-purple via-indigo-600 to-neon-blue hover:from-purple-500 hover:to-blue-500 text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-neon-purple active:scale-95 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Compose Email Message</span>
            </button>
          </form>
        </div>

        {/* Section: Frequently Asked Questions */}
        <section className="space-y-4 pt-4">
          <div className="flex items-center gap-2 text-neon-orange">
            <HelpCircle className="w-5 h-5" />
            <h2 className="text-xl font-black text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-dark-900 border border-slate-800 space-y-1">
              <h3 className="text-sm font-bold text-white">Where are my high scores stored?</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                All records, high scores, streaks, and personal stats are saved securely in your browser's Local Storage. We never upload your scores to a remote database. If you clear your browser cache, your local score will reset.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-dark-900 border border-slate-800 space-y-1">
              <h3 className="text-sm font-bold text-white">Can I play ONLY 1% CAN WIN on mobile devices?</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Yes! The entire interface is specifically engineered for touchscreens with oversized tactile touch targets, mobile viewport lock, and haptic feedback on supported mobile devices.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-dark-900 border border-slate-800 space-y-1">
              <h3 className="text-sm font-bold text-white">How can I submit a challenge idea?</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Select "Propose a New Brain Challenge" in the contact form above, or send your puzzle rules directly to {SITE_CONFIG.contactEmail}. We review all community proposals for future updates!
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
