import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Building2, User, Mail, Phone, MessageSquare, Briefcase } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    role: '',
    email: '',
    phone: '',
    areaOfInterest: 'Engineering Collaboration',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.organization.trim()) errs.organization = 'Organization / Institution is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errs.email = 'Valid corporate or research email required';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please provide details on your area of interest or technical inquiry';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <section id="contact-collaboration" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm text-[10px] font-mono font-medium uppercase tracking-[0.25em] bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30 mb-4">
          R&D & Engineering Inquiry
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-light text-[#F8FAFC] tracking-tight uppercase">
          Discuss The Technology
        </h2>
        <p className="mt-3 text-sm sm:text-base font-serif italic text-[#38BDF8]">
          Connect with the engineering and medical device development team.
        </p>
        <p className="mt-2 text-xs sm:text-sm text-[#F8FAFC]/70 max-w-2xl mx-auto font-light leading-relaxed">
          Inquire regarding prototype evaluations, technical architecture reviews, collaborative verification programs,
          and device integration pathways.
        </p>
      </div>

      <div className="max-w-3xl mx-auto bg-[#0E1726] rounded-sm border border-[#F8FAFC]/10 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {submitted ? (
          <div className="text-center py-12 space-y-4 animate-in fade-in duration-300">
            <div className="w-16 h-16 bg-[#38BDF8]/15 text-[#38BDF8] rounded-full flex items-center justify-center mx-auto border border-[#38BDF8]/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-medium text-[#F8FAFC]">Inquiry Successfully Registered</h3>
            <p className="text-sm text-[#F8FAFC]/70 max-w-md mx-auto font-light">
              Thank you, <strong className="text-[#F8FAFC]">{formData.name}</strong>. Your technical inquiry regarding{' '}
              <strong className="text-[#38BDF8]">{formData.areaOfInterest}</strong> has been logged for engineering review.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: '',
                    organization: '',
                    role: '',
                    email: '',
                    phone: '',
                    areaOfInterest: 'Engineering Collaboration',
                    message: '',
                  });
                }}
                className="px-6 py-2.5 rounded-sm bg-[#1A2B42] hover:bg-[#202020] text-[#F8FAFC] font-mono text-xs font-medium uppercase tracking-wider border border-[#F8FAFC]/10 transition-colors"
              >
                Submit Additional Inquiry
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-[10px] font-mono uppercase text-[#F8FAFC]/60 font-medium tracking-wider mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#F8FAFC]/40 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Dr. Tarun Rathore"
                    className="w-full bg-[#142032] border border-[#F8FAFC]/10 rounded-sm py-2.5 pl-10 pr-3 text-sm text-[#F8FAFC] placeholder:text-[#F8FAFC]/30 focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8]"
                  />
                </div>
                {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name}</p>}
              </div>

              {/* Organization */}
              <div>
                <label className="block text-[10px] font-mono uppercase text-[#F8FAFC]/60 font-medium tracking-wider mb-2">
                  Organization / Hospital *
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-[#F8FAFC]/40 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="Medical Technology Center"
                    className="w-full bg-[#142032] border border-[#F8FAFC]/10 rounded-sm py-2.5 pl-10 pr-3 text-sm text-[#F8FAFC] placeholder:text-[#F8FAFC]/30 focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8]"
                  />
                </div>
                {errors.organization && <p className="text-xs text-rose-400 mt-1">{errors.organization}</p>}
              </div>

              {/* Role */}
              <div>
                <label className="block text-[10px] font-mono uppercase text-[#F8FAFC]/60 font-medium tracking-wider mb-2">
                  Professional Role
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-[#F8FAFC]/40 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="Lead Surgical Engineer / R&D Director"
                    className="w-full bg-[#142032] border border-[#F8FAFC]/10 rounded-sm py-2.5 pl-10 pr-3 text-sm text-[#F8FAFC] placeholder:text-[#F8FAFC]/30 focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8]"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[10px] font-mono uppercase text-[#F8FAFC]/60 font-medium tracking-wider mb-2">
                  Professional Email *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#F8FAFC]/40 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="tarun422rathore@gmail.com"
                    className="w-full bg-[#142032] border border-[#F8FAFC]/10 rounded-sm py-2.5 pl-10 pr-3 text-sm text-[#F8FAFC] placeholder:text-[#F8FAFC]/30 focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8]"
                  />
                </div>
                {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[10px] font-mono uppercase text-[#F8FAFC]/60 font-medium tracking-wider mb-2">
                  Contact Phone
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#F8FAFC]/40 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 019-2834"
                    className="w-full bg-[#142032] border border-[#F8FAFC]/10 rounded-sm py-2.5 pl-10 pr-3 text-sm text-[#F8FAFC] placeholder:text-[#F8FAFC]/30 focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8]"
                  />
                </div>
              </div>

              {/* Area of Interest */}
              <div>
                <label className="block text-[10px] font-mono uppercase text-[#F8FAFC]/60 font-medium tracking-wider mb-2">
                  Area of Interest *
                </label>
                <select
                  value={formData.areaOfInterest}
                  onChange={(e) => setFormData({ ...formData, areaOfInterest: e.target.value })}
                  className="w-full bg-[#142032] border border-[#F8FAFC]/10 rounded-sm py-2.5 px-3 text-sm text-[#F8FAFC] focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8]"
                >
                  <option value="Product Information">Product Information</option>
                  <option value="Engineering Collaboration">Engineering Collaboration</option>
                  <option value="R&D">R&D Verification & Testing</option>
                  <option value="Technical Discussion">Technical Architecture Discussion</option>
                  <option value="Partnership">Development Partnership</option>
                  <option value="Other">Other Inquiry</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-[10px] font-mono uppercase text-[#F8FAFC]/60 font-medium tracking-wider mb-2">
                Inquiry Message / Discussion Context *
              </label>
              <div className="relative">
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Please describe your interest in the programmable blower/mister system architecture, verification requirements, or technical collaboration scope..."
                  className="w-full bg-[#142032] border border-[#F8FAFC]/10 rounded-sm p-3 text-sm text-[#F8FAFC] placeholder:text-[#F8FAFC]/30 focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8]"
                />
              </div>
              {errors.message && <p className="text-xs text-rose-400 mt-1">{errors.message}</p>}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#F8FAFC]/10">
              <span className="text-[10px] font-mono text-[#F8FAFC]/40 uppercase tracking-wider">
                Secure Engineering Inquiry • Data held in strict confidentiality
              </span>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3 rounded-sm bg-[#38BDF8] hover:bg-[#D4B57E] text-[#0A111A] font-medium text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#38BDF8]/20"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Transmitting...' : 'Transmit Technical Inquiry'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
