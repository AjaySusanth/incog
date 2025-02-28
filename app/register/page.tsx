"use client";
import React, { useState, FormEvent } from 'react';

interface SimpleCollegeFormData {
  collegeName: string;
  location: string;
  pincode: string;
  email: string;
  agreeToTerms: boolean;
}

const SimpleCollegeForm: React.FC = () => {
  const [formData, setFormData] = useState<SimpleCollegeFormData>({
    collegeName: "",
    location: "",
    pincode: "",
    email: "",
    agreeToTerms: false
  });

  const [errors, setErrors] = useState<Partial<Record<keyof SimpleCollegeFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    if (errors[name as keyof SimpleCollegeFormData]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof SimpleCollegeFormData, string>> = {};
    
    if (!formData.collegeName.trim()) newErrors.collegeName = 'College name is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (formData.email && !/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (formData.pincode && !/^\d+$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must contain only numbers';
    }
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="max-w-md mx-auto p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800">
        <h2 className="text-xl font-bold text-white mb-4">Registration Successful!</h2>
        <p className="text-zinc-400 mb-4">Thank you for registering your college with our platform.</p>
        <button 
          className="px-4 py-2 bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-xl hover:from-sky-400 hover:to-blue-500"
          onClick={() => setSubmitSuccess(false)}
        >
          Register Another College
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-white mb-6">College Registration</h1>
      
      <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">College Name*</label>
          <input
            type="text"
            name="collegeName"
            value={formData.collegeName}
            onChange={handleChange}
            className="w-full rounded-xl bg-zinc-900/50 border border-zinc-800 px-4 py-3.5 text-white focus:ring-2 focus:ring-sky-500/40"
            required
          />
          {errors.collegeName && <p className="mt-1 text-sm text-red-500">{errors.collegeName}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">Location*</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full rounded-xl bg-zinc-900/50 border border-zinc-800 px-4 py-3.5 text-white focus:ring-2 focus:ring-sky-500/40"
            required
          />
          {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">Email*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-xl bg-zinc-900/50 border border-zinc-800 px-4 py-3.5 text-white focus:ring-2 focus:ring-sky-500/40"
            required
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-br from-sky-500 to-blue-600 text-white px-4 py-3.5 rounded-xl hover:from-sky-400 hover:to-blue-500 disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Register College'}
      </button>
    </form>
  );
};

export default SimpleCollegeForm;
