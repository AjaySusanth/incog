"use client";

import Link from "next/link";

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">
          How SafeReport Works
        </h1>
        
        <div className="space-y-12 max-w-2xl mx-auto">
          {/* Step 1 */}
          <div className="flex items-start">
            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 mr-4">
              <span className="text-xl font-bold">1</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">We Collect Your Complaint</h2>
              <p className="text-zinc-400">
                Submit your report through our secure platform. We collect all necessary details 
                while ensuring your privacy and anonymity if requested. All reports are encrypted 
                and stored securely.
              </p>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="flex items-start">
            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 mr-4">
              <span className="text-xl font-bold">2</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">We Notify Police</h2>
              <p className="text-zinc-400">
                Your report is immediately forwarded to the appropriate law enforcement agency
                based on jurisdiction and nature of the complaint. You will receive a confirmation
                and tracking number for your report.
              </p>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="flex items-start">
            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 mr-4">
              <span className="text-xl font-bold">3</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">48-Hour Action Window</h2>
              <p className="text-zinc-400">
                We monitor the status of your report. If no action is taken by local authorities 
                within 48 hours, our system automatically escalates your case to higher authorities
                to ensure your report receives the attention it deserves.
              </p>
            </div>
          </div>
          
          {/* Step 4 - New */}
          <div className="flex items-start">
            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 mr-4">
              <span className="text-xl font-bold">4</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Media Escalation</h2>
              <p className="text-zinc-400">
                If authorities don&apos;t follow up adequately to meet your needs, your case can be 
                conveyed to trusted media outlets to gain public attention. This additional 
                visibility often pushes authorities to take more immediate and decisive action 
                on your complaint.
              </p>
            </div>
          </div>
          
          {/* Step 5 - New */}
          <div className="flex items-start">
            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 mr-4">
              <span className="text-xl font-bold">5</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Judicial Transfer</h2>
              <p className="text-zinc-400">
                As a final measure, if no satisfactory action is taken despite all prior 
                escalations, your case is transferred to the appropriate judicial authority. 
                This ensures that your complaint enters the formal legal system where it can 
                receive proper legal proceedings and oversight.
              </p>
            </div>
          </div>
          
          {/* Additional information */}
          <div className="mt-16 pt-8 border-t border-white/10 text-center">
            <h3 className="text-xl font-semibold mb-4">Ready to Submit a Report?</h3>
            <Link 
              href="/submit-report" 
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Submit Your Report
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}