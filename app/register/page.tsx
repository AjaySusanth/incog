"use client"

import React, { useState, FormEvent } from 'react';

interface SimpleCollegeFormData {
  collegeName: string;
  location: string;
  pincode: string;
  agreeToTerms: boolean;
}

const SimpleCollegeForm: React.FC = () => {
  const [formData, setFormData] = useState<SimpleCollegeFormData>({
    collegeName: "",
    location: "",
    pincode: "",
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
    
    // Clear error when field is changed
    if (errors[name as keyof SimpleCollegeFormData]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof SimpleCollegeFormData, string>> = {};
    
    // Required fields validation
    if (!formData.collegeName.trim()) newErrors.collegeName = 'College name is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    
    // Pincode validation - simple numeric check
    if (formData.pincode && !/^\d+$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must contain only numbers';
    }
    
    // Terms agreement
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Handle successful submission
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
        {/* College Name */}
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">
            College Name*
          </label>
          <input
            type="text"
            name="collegeName"
            value={formData.collegeName}
            onChange={handleChange}
            className="w-full rounded-xl bg-zinc-900/50 border border-zinc-800 px-4 py-3.5 text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
            required
          />
          {errors.collegeName && <p className="mt-1 text-sm text-red-500">{errors.collegeName}</p>}
        </div>
        
        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">
            Location*
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full rounded-xl bg-zinc-900/50 border border-zinc-800 px-4 py-3.5 text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
            placeholder="City, State"
            required
          />
          {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
        </div>
        
        {/* Pincode */}
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">
            Pincode*
          </label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="w-full rounded-xl bg-zinc-900/50 border border-zinc-800 px-4 py-3.5 text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
            placeholder="Enter pincode"
            required
          />
          {errors.pincode && <p className="mt-1 text-sm text-red-500">{errors.pincode}</p>}
        </div>
        
        {/* Terms and Conditions */}
        <div className="mt-4">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="h-4 w-4 text-sky-500 border-zinc-700 rounded focus:ring-sky-500"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="agreeToTerms" className={`font-medium ${errors.agreeToTerms ? 'text-red-500' : 'text-zinc-400'}`}>
                I agree to the Terms and Conditions*
              </label>
              {errors.agreeToTerms && <p className="mt-1 text-sm text-red-500">{errors.agreeToTerms}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 
                 px-4 py-3.5 text-sm font-medium text-white shadow-lg
                 transition-all duration-200 hover:from-sky-400 hover:to-blue-500
                 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="relative flex items-center justify-center gap-2">
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <span>Register College</span>
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </>
          )}
        </div>
      </button>
    </form>
  );
};

export default SimpleCollegeForm;