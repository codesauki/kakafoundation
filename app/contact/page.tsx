'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';


export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true); setError('');
    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

      const templateParams = {
        from_name: form.name,
        from_email: form.email,
        subject: form.subject,
        message: form.message,
      };

      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      if (result.status === 200) {
        setSent(true);
      } else {
        throw new Error('EmailJS error');
      }
    } catch (err) {
      console.error('EmailJS send error', err);
      setError('Failed to send your message. Please try again or email us directly.');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 bg-navy-gradient overflow-hidden">
          <div className="absolute inset-0 bg-noise opacity-30" />
          <div className="container-xl relative z-10 text-center">
            <div className="section-tag bg-white/10 text-gold-300 border-white/20 mb-5">Contact Us</div>
            <h1 className="font-display text-5xl sm:text-6xl text-white mb-4">Get In Touch</h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">We would love to hear from you. Whether you have a question, want to partner with us, or need help with your application — we are here.</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
        </section>

        <section className="section-pad bg-white">
          <div className="container-xl">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Info */}
              <div className="space-y-6">
                <div>
                  <div className="section-tag mb-4">Our Office</div>
                  <h2 className="font-display text-2xl text-navy-800 mb-4">How to Reach Us</h2>
                  <div className="divider-teal" />
                </div>
                {[
                  { icon: MapPin, label: 'Address', value: 'Abuja, Federal Capital Territory, Nigeria' },
                  { icon: Phone, label: 'Phone', value: '+234 800 KNF HELP', href: 'tel:+234800KNFHELP' },
                  { icon: Mail, label: 'Email', value: 'info@kowanamunejoundation.org', href: 'mailto:info@kowanamunejoundation.org' },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="card p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-navy-400 uppercase tracking-widest mb-1">{label}</div>
                      {href ? (
                        <a href={href} className="text-navy-700 font-medium hover:text-teal-600 transition-colors text-sm">{value}</a>
                      ) : (
                        <div className="text-navy-700 font-medium text-sm">{value}</div>
                      )}
                    </div>
                  </div>
                ))}

                <div className="card bg-navy-gradient p-5">
                  <div className="text-white font-semibold text-sm mb-2">Application Support</div>
                  <p className="text-navy-300 text-xs leading-relaxed mb-3">
                    For scholarship application enquiries, please have your Application Reference Number ready before contacting us.
                  </p>
                  <a href="/apply" className="btn-gold w-full justify-center text-sm">Apply for Scholarship</a>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-2">
                {sent ? (
                  <div className="card p-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-teal-gradient flex items-center justify-center mx-auto mb-5">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="font-display text-2xl text-navy-800 mb-2">Message Sent!</h2>
                    <p className="text-navy-500 mb-6">Thank you for contacting us. We will respond within 2 business days.</p>
                    <button onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }} className="btn-outline text-sm">
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <div className="card p-8">
                    <h2 className="font-display text-2xl text-navy-800 mb-6">Send a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="label">Your Name *</label>
                          <input required className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" />
                        </div>
                        <div>
                          <label className="label">Email Address *</label>
                          <input required type="email" className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" />
                        </div>
                      </div>
                      <div>
                        <label className="label">Subject *</label>
                        <select required className="select" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}>
                          <option value="">-- Select subject --</option>
                          <option>Scholarship Application Enquiry</option>
                          <option>Partnership & Collaboration</option>
                          <option>Donation & Funding</option>
                          <option>Volunteer Opportunities</option>
                          <option>Media & Press</option>
                          <option>General Enquiry</option>
                        </select>
                      </div>
                      <div>
                        <label className="label">Message *</label>
                        <textarea required className="textarea" rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Write your message here..." />
                      </div>
                      {error && <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>}
                      <button type="submit" disabled={sending} className="btn-primary w-full justify-center text-base py-3.5">
                        {sending ? 'Sending…' : <><Send className="w-4 h-4" /> Send Message</>}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
