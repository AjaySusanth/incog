"use client";
import React, { useState, FormEvent} from 'react';
import supabase from '@/utils/supabaseClient';


interface SimpleCollegeFormData {
  collegeName: string;
  location: string;
  email: string;
  password: string;
}

const SimpleCollegeForm: React.FC = () => {
  const [formData, setFormData] = useState<SimpleCollegeFormData>({
    collegeName: "",
    location: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState<Partial<Record<keyof SimpleCollegeFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
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
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (formData.email && !/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
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
      // Step 1: Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

  
      if (authError) {console.log(authError)};
  
      // Step 2: Insert college details into the `colleges` table
      const {error: collegeError } = await supabase
        .from('colleges')
        .insert([
          {
            user_id: authData.user?.id, // Link to the auth user
            college_name: formData.collegeName,
            location: formData.location,
          },
        ])
        .select();
  
      if (collegeError) throw collegeError;
  
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {submitSuccess ? (
        <div className="max-w-md mx-auto p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800 mt-5">
          <h2 className="text-xl font-bold text-white mb-4">Registration Successful!</h2>
          <p className="text-zinc-400 mb-4">Thank you for registering your college with our platform.</p>
        </div>
      ) : (
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
            
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Password*</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-xl bg-zinc-900/50 border border-zinc-800 px-4 py-3.5 text-white focus:ring-2 focus:ring-sky-500/40"
                required
              />
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
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
      )}
    </>
  );
};
export default SimpleCollegeForm;