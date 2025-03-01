// components/ReportForm.tsx
"use client";
import { useState, FormEvent } from "react";
import supabase from "@/utils/supabaseClient";

interface ReportFormData {
  informerName: string;
  informerAddress: string;
  collegeName: string;
  collegeLocation: string;
  complaintDetails: string;
  complaintTitle: string;
}

interface ReportFormProps {
  user: any
}

export default function ReportForm({ user }: ReportFormProps) {
  const [formData, setFormData] = useState<ReportFormData>({
    informerName: "",
    informerAddress: "",
    collegeName: "",
    collegeLocation: "",
    complaintDetails: "",
    complaintTitle: "",
  });

  const [media, setMedia] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    try {
      const file = e.target.files?.[0];
      if (!file) return;
      setMedia(file);
    } catch (error) {
      console.error("Error uploading media", error);
      setError("Error selecting file.");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (
      !formData.informerName ||
      !formData.informerAddress ||
      !formData.complaintTitle ||
      !formData.complaintDetails ||
      !formData.collegeName ||
      !formData.collegeLocation
    ) {
      setError("Please fill out all required fields.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      if (!user) {
        throw new Error("You must be logged in to submit a complaint.");
      }

      // Media upload
      let url = null;
      if (media) {
        const fileExtension = media.name.split(".").pop();
        const fileName = `${user.email}_${user.id}.${fileExtension}`;

        const { error: uploadError } = await supabase.storage
          .from("evidences")
          .upload(fileName, media);

        if (uploadError) {
          console.error("File upload error", uploadError);
          setError("Error uploading evidence: " + uploadError.message);
          setIsSubmitting(false);
          return;
        }

        url = supabase.storage.from("evidences").getPublicUrl(fileName).data.publicUrl;
      }

      // Fetch college_id from the colleges table
      let collegeId = null;
      if (formData.collegeName) {
        const { data: collegeData, error: collegeError } = await supabase
          .from("colleges")
          .select("id")
          .eq("college_name", formData.collegeName)
          .single();

        if (collegeData) {
          collegeId = collegeData.id;
        }
      }

      // Insert the complaint
      const { error: insertError } = await supabase.from("complaints").insert([
        {
          user_id: user.id,
          college_id: collegeId ?? null,
          college_name: formData.collegeName,
          complaint_desc: formData.complaintDetails,
          authority: "Pending Analysis",
          status: "Pending",
          escalated: false,
          escalated_to: null,
          evidence_url: url,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          resolved_at: null,
        },
      ]);

      if (insertError) {
        throw insertError;
      }

      setSubmitSuccess(true);
      setFormData({
        informerName: "",
        informerAddress: "",
        collegeName: "",
        collegeLocation: "",
        complaintDetails: "",
        complaintTitle: "",
      });
      setMedia(null);
    } catch (error) {
      console.error("Error submitting complaint:", error);
      setError(error instanceof Error ? error.message : "Failed to submit complaint. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold text-white mb-6">Submit Complaint</h1>

      <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 space-y-4">
        <h2 className="text-lg font-medium text-white mb-2">Personal Information</h2>

        <label className="block text-sm font-medium text-zinc-400 mb-2">Full Name*</label>
        <input
          type="text"
          value={formData.informerName}
          onChange={(e) => setFormData((prev) => ({ ...prev, informerName: e.target.value }))}
          className="w-full rounded-xl bg-zinc-900/50 border border-zinc-800 px-4 py-3.5 text-white"
          required
        />

        <label className="block text-sm font-medium text-zinc-400 mb-2">Address*</label>
        <textarea
          value={formData.informerAddress}
          onChange={(e) => setFormData((prev) => ({ ...prev, informerAddress: e.target.value }))}
          rows={3}
          className="w-full rounded-xl bg-zinc-900/50 border border-zinc-800 px-4 py-3.5 text-white"
          required
        />
      </div>

      <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 space-y-4">
        <h2 className="text-lg font-medium text-white mb-2">College Information</h2>

        <label className="block text-sm font-medium text-zinc-400 mb-2">College Name*</label>
        <input
          type="text"
          value={formData.collegeName}
          onChange={(e) => setFormData((prev) => ({ ...prev, collegeName: e.target.value }))}
          className="w-full rounded-xl bg-zinc-900/50 border border-zinc-800 px-4 py-3.5 text-white"
          required
        />
      </div>

       {/* College Location */}
       <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">
            College Location*
          </label>
          <input
            type="text"
            value={formData.collegeLocation}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                collegeLocation: e.target.value,
              }))
            }
            className="w-full rounded-xl bg-zinc-900/50 border border-zinc-800 px-4 py-3.5 text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
            required
            placeholder="e.g., Campus name, Street, City"
          />
        </div>

      {/* Complaint Details Section */}
      <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 space-y-4">
        <h2 className="text-lg font-medium text-white mb-2">
          Complaint Details
        </h2>

        {/* Complaint Title */}
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">
            Complaint Title*
          </label>
          <input
            type="text"
            value={formData.complaintTitle}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                complaintTitle: e.target.value,
              }))
            }
            className="w-full rounded-xl bg-zinc-900/50 border border-zinc-800 px-4 py-3.5 text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
            required
          />
        </div>

        {/* Complaint Details */}
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">
            Complaint Description*
          </label>
          <textarea
            value={formData.complaintDetails}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                complaintDetails: e.target.value,
              }))
            }
            rows={5}
            className="w-full rounded-xl bg-zinc-900/50 border border-zinc-800 px-4 py-3.5 text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
            required
          />
        </div>
      </div>


      <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800">
        <h2 className="text-lg font-medium text-white mb-4">Evidence</h2>
        <input type="file" accept="image/*,video/*" className="text-white" id="media-upload" onChange={handleMediaUpload} />
      </div>

      <button type="submit" disabled={isSubmitting} className="w-full rounded-xl bg-sky-500 px-4 py-3.5 text-white">
        {isSubmitting ? "Submitting..." : "Submit Complaint"}
      </button>

      {error && <div className="text-red-500 text-sm text-center mt-4">{error}</div>}
      {submitSuccess && <div className="text-green-500 text-sm text-center mt-4">Complaint submitted successfully!</div>}
    </form>
  );
}
