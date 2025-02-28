import { useState } from "react";

interface ComplaintFormProps {
  onComplete: (data: any) => void;
}

export default function ComplaintForm({ onComplete }: ComplaintFormProps) {
  const [formData, setFormData] = useState({
    informerName: "",
    gender: "",
    place: "",
    address: "",
    collegeName: "",
    collegeLocation: "",
    complaintDetails: "",
    complaintTitle: "",
  });

  const [media, setMedia] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);

    try {
      const base64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
      
      // Set media preview
      setMedia(base64 as string);
    } catch (error) {
      console.log("Error in processing uploaded media");
    } finally {
      setIsAnalyzing(false);
    }
  };

  
  
  return (
    <form className="space-y-6" >
      <h1 className="text-2xl font-bold text-white mb-6">Submit Complaint</h1>
      
      {/* Personal Information Section */}
      <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 space-y-4">
        <h2 className="text-lg font-medium text-white mb-2">Personal Information</h2>
        
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">
            Full Name*
          </label>
          <input
            type="text"
            value={formData.informerName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, informerName: e.target.value }))
            }
            className="w-full rounded-xl bg-zinc-900/50 border border-zinc-800 px-4 py-3.5 text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
            required
          />
        </div>
        
        {/* Gender */}
        
        
      
        
        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">
            Address*
          </label>
          <textarea
            value={formData.address}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, address: e.target.value }))
            }
            rows={3}
            className="w-full rounded-xl bg-zinc-900/50 border border-zinc-800 px-4 py-3.5 text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
            required
          />
        </div>
      </div>
      
      {/* College Information Section */}
      <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 space-y-4">
        <h2 className="text-lg font-medium text-white mb-2">College Information</h2>
        
        {/* College Name */}
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">
            College Name*
          </label>
          <input
            type="text"
            value={formData.collegeName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, collegeName: e.target.value }))
            }
            className="w-full rounded-xl bg-zinc-900/50 border border-zinc-800 px-4 py-3.5 text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
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
              setFormData((prev) => ({ ...prev, collegeLocation: e.target.value }))
            }
            className="w-full rounded-xl bg-zinc-900/50 border border-zinc-800 px-4 py-3.5 text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
            required
            placeholder="e.g., Campus name, Street, City"
          />
        </div>
      </div>
      
      {/* Complaint Details Section */}
      <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 space-y-4">
        <h2 className="text-lg font-medium text-white mb-2">Complaint Details</h2>
        
        {/* Complaint Title */}
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">
            Complaint Title*
          </label>
          <input
            type="text"
            value={formData.complaintTitle}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, complaintTitle: e.target.value }))
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
              setFormData((prev) => ({ ...prev, complaintDetails: e.target.value }))
            }
            rows={5}
            className="w-full rounded-xl bg-zinc-900/50 border border-zinc-800 px-4 py-3.5 text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
            required
          />
        </div>
      </div>
      
      {/* Evidence Upload */}
      <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800">
        <h2 className="text-lg font-medium text-white mb-4">Evidence</h2>
        
        <div className="relative group">
          <input
            type="file"
            accept="image/*,video/*"
            className="hidden"
            id="media-upload"
            onChange={handleMediaUpload}
          />
          <label
            htmlFor="media-upload"
            className="block w-full p-8 border-2 border-dashed border-zinc-700 rounded-2xl 
                     hover:border-sky-500/50 hover:bg-sky-500/5 transition-all duration-200
                     cursor-pointer text-center"
          >
            {media ? (
              <div className="space-y-4">
                <div className="w-full h-48 relative rounded-lg overflow-hidden">
                  {media.startsWith("data:video") ? (
                    <video 
                      src={media} 
                      className="w-full h-full object-cover" 
                      controls
                    />
                  ) : (
                    <img
                      src={media}
                      alt="Evidence Preview"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <p className="text-sm text-zinc-400">Click to change media</p>
              </div>
            ) : (
              <div className="space-y-4">
                <svg
                  className="mx-auto h-12 w-12 text-zinc-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-sm text-zinc-400">
                  Upload photos or videos as evidence (optional)
                </p>
                <p className="text-xs text-zinc-500">
                  Supported formats: JPG, PNG, MP4, MOV
                </p>
              </div>
            )}
          </label>
          {isAnalyzing && (
            <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
              <div className="flex items-center space-x-3">
                <svg
                  className="animate-spin h-5 w-5 text-sky-500"
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
                <span className="text-sky-500 font-medium">Processing media...</span>
              </div>
            </div>
          )}
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
              <span>Submit Complaint</span>
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
}