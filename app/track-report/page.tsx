"use client";

import { useState, useEffect, KeyboardEvent, FormEvent, ChangeEvent } from "react";

// Define types for our data structures
interface EscalationEntry {
  to: string;
  reason: string;
  date: string;
  status: string;
}

interface CaseData {
  status: string;
  progress: number;
  lastUpdated: string;
  assignedTo: string;
  priority: string;
  category: string;
  estimatedCompletion: string;
  notes: string;
  escalationCount: number;
  escalations: EscalationEntry[];
  authorizedUsers: string[]; // Added authorized users array
}

interface MockDataType {
  [key: string]: CaseData;
}

interface EscalationDataType {
  to: string;
  reason: string;
}

export default function TrackReport() {
  const [caseId, setCaseId] = useState<string>("");
  const [status, setStatus] = useState<CaseData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [recentCases, setRecentCases] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const [showEscalate, setShowEscalate] = useState<boolean>(false);
  const [escalationData, setEscalationData] = useState<EscalationDataType>({
    to: "",
    reason: ""
  });
  const [escalationSubmitted, setEscalationSubmitted] = useState<boolean>(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(true);
  
  // Current user - in a real app, this would come from authentication
  const currentUser = "user123"; // Simulated current user ID
  
  // Track escalation history for each case
  const [escalationHistory, setEscalationHistory] = useState<Record<string, EscalationEntry[]>>({});

  // Simulated case tracking data (Replace with API call)
  const [mockData, setMockData] = useState<MockDataType>({
    "CMP-12345": { 
      status: "In Progress", 
      progress: 55, 
      lastUpdated: "2025-02-27",
      assignedTo: "Officer Johnson",
      priority: "High",
      category: "Harassment",
      estimatedCompletion: "2025-03-10",
      notes: "Evidence collection in progress",
      escalationCount: 0,
      escalations: [],
      authorizedUsers: ["user123"] // Current user is authorized
    },
    "CMP-67890": { 
      status: "Resolved", 
      progress: 100,
      lastUpdated: "2025-02-28",
      assignedTo: "Officer Williams",
      priority: "Medium",
      category: "Theft",
      estimatedCompletion: "2025-02-28",
      notes: "Suspect apprehended, case closed successfully",
      escalationCount: 0,
      escalations: [],
      authorizedUsers: ["admin456", "manager789"] // Current user is NOT authorized
    },
    "CMP-54321": { 
      status: "Under Review", 
      progress: 75,
      lastUpdated: "2025-03-01",
      assignedTo: "Detective Martinez",
      priority: "Medium",
      category: "Vandalism",
      estimatedCompletion: "2025-03-05",
      notes: "Witness statements being verified",
      escalationCount: 0,
      escalations: [],
      authorizedUsers: ["user123", "admin456"] // Current user is authorized
    },
    "CMP-98765": { 
      status: "New", 
      progress: 15,
      lastUpdated: "2025-02-26",
      assignedTo: "Officer Chen",
      priority: "Low",
      category: "Noise Complaint",
      estimatedCompletion: "2025-03-15",
      notes: "Initial assessment completed",
      escalationCount: 0,
      escalations: [],
      authorizedUsers: ["manager789"] // Current user is NOT authorized
    },
    "CMP-13579": { 
      status: "On Hold", 
      progress: 30,
      lastUpdated: "2025-02-20",
      assignedTo: "Officer Thompson",
      priority: "Medium",
      category: "Dispute",
      estimatedCompletion: "TBD",
      notes: "Awaiting additional documentation from complainant",
      escalationCount: 0,
      escalations: [],
      authorizedUsers: ["user123", "supervisor234"] // Current user is authorized
    }
  });

  // List of authorities for the escalation dropdown
  const authorities: string[] = [
    "Station Captain",
    "District Supervisor",
    "Internal Affairs",
    "Chief of Police",
    "City Council Representative",
    "Department of Justice"
  ];

  const getStatusColor = (status: string): string => {
    const colors: Record<string, string> = {
      "New": "#6366f1", // Indigo
      "In Progress": "#0ea5e9", // Sky blue
      "Under Review": "#f59e0b", // Amber
      "On Hold": "#9333ea", // Purple
      "Resolved": "#10b981", // Emerald
      "Not Found": "#ef4444", // Red
      "Not Authorized": "#ef4444" // Red
    };
    return colors[status] || "#6b7280"; // Gray default
  };

  const checkAuthorization = (caseId: string): boolean => {
    // Check if the case exists and the current user is in the authorized users list
    if (!mockData[caseId]) return false;
    return mockData[caseId].authorizedUsers.includes(currentUser);
  };

  const handleTrack = (): void => {
    if (!caseId.trim()) {
      setError("Please enter a case ID");
      return;
    }
    
    setError("");
    setLoading(true);
    setEscalationSubmitted(false);
    
    // Simulate API call delay
    setTimeout(() => {
      // Check if case exists in our mock data
      if (mockData[caseId]) {
        // Check if user is authorized to view this case
        const authorized = checkAuthorization(caseId);
        setIsAuthorized(authorized);
        
        if (authorized) {
          // If authorized, set the status normally
          setStatus(mockData[caseId]);
          
          // Add to recent cases if not already there
          if (!recentCases.includes(caseId)) {
            setRecentCases(prev => [caseId, ...prev].slice(0, 3));
          }
        } else {
          // If not authorized, set status with not authorized message
          setStatus({ 
            status: "Not Authorized", 
            progress: 0,
            lastUpdated: "",
            assignedTo: "",
            priority: "",
            category: "",
            estimatedCompletion: "",
            notes: "",
            escalationCount: 0,
            escalations: [],
            authorizedUsers: []
          });
        }
      } else {
        // Case not found
        setStatus({ 
          status: "Not Found", 
          progress: 0,
          lastUpdated: "",
          assignedTo: "",
          priority: "",
          category: "",
          estimatedCompletion: "",
          notes: "",
          escalationCount: 0,
          escalations: [],
          authorizedUsers: []
        });
      }
      
      setLoading(false);
    }, 800);
  };

  const handleEscalate = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    if (!escalationData.to) {
      setError("Please select an authority to escalate to");
      return;
    }
    
    if (!escalationData.reason.trim()) {
      setError("Please provide a reason for escalation");
      return;
    }
    
    setError("");
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Update the case data with increased progress and escalation count
      const updatedMockData = { ...mockData };
      if (updatedMockData[caseId]) {
        // Update escalation count
        const currentCount = updatedMockData[caseId].escalationCount || 0;
        const newCount = currentCount + 1;
        
        // Create escalation entry
        const escalationEntry: EscalationEntry = {
          to: escalationData.to,
          reason: escalationData.reason,
          date: new Date().toISOString().split('T')[0],
          status: "Pending Review"
        };
        
        // Update escalations array
        const updatedEscalations = [
          ...(updatedMockData[caseId].escalations || []),
          escalationEntry
        ];
        
        // Increase progress by 30%
        let newProgress = updatedMockData[caseId].progress + 30;
        if (newProgress > 99) newProgress = 99; // Cap at 99% (not 100% since it's not resolved yet)
        
        // Update the case
        updatedMockData[caseId] = {
          ...updatedMockData[caseId],
          progress: newProgress,
          escalationCount: newCount,
          lastUpdated: new Date().toISOString().split('T')[0], // Today's date
          notes: `${updatedMockData[caseId].notes}. Escalated to ${escalationData.to} (Escalation #${newCount})`,
          escalations: updatedEscalations
        };
        
        // Update status
        if (updatedMockData[caseId].status === "New") {
          updatedMockData[caseId].status = "In Progress";
        } else if (updatedMockData[caseId].status === "On Hold") {
          updatedMockData[caseId].status = "In Progress";
        }
        
        setMockData(updatedMockData);
        setStatus(updatedMockData[caseId]);
      }
      
      setEscalationSubmitted(true);
      setShowEscalate(false);
      setLoading(false);
    }, 1000);
  };

  const handleMarkAsSolved = (): void => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Update the case data to mark as resolved
      const updatedMockData = { ...mockData };
      if (updatedMockData[caseId]) {
        updatedMockData[caseId] = {
          ...updatedMockData[caseId],
          status: "Resolved",
          progress: 100,
          lastUpdated: new Date().toISOString().split('T')[0], // Today's date
          notes: `${updatedMockData[caseId].notes}. Case marked as resolved by user.`,
          estimatedCompletion: new Date().toISOString().split('T')[0], // Today as completion date
        };
        
        setMockData(updatedMockData);
        setStatus(updatedMockData[caseId]);
      }
      
      setLoading(false);
    }, 800);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleTrack();
    }
  };

  const resetEscalation = (): void => {
    setEscalationData({
      to: "",
      reason: ""
    });
    setShowEscalate(true);
    setEscalationSubmitted(false);
  };

  return (
    <div className="bg-black-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
          <h2 className="text-2xl font-bold text-white text-center">Case Tracking System</h2>
          <p className="mt-1 text-blue-100 text-center">Enter your case ID to check status</p>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Case ID (e.g., CMP-12345)"
              value={caseId}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setCaseId(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={handleTrack} 
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-70"
            >
              {loading ? "Searching..." : "Track Case"}
            </button>
          </div>
          
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
          
          {recentCases.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-500">Recent searches:</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {recentCases.map(caseNum => (
                  <button
                    key={caseNum}
                    onClick={() => {
                      setCaseId(caseNum);
                      handleTrack();
                    }}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200"
                  >
                    {caseNum}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {status && status.status !== "Not Found" && status.status !== "Not Authorized" && isAuthorized && (
            <div className="mt-6 border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Case {caseId}</h3>
                <span 
                  className="px-2.5 py-0.5 rounded-full text-sm font-medium"
                  style={{ 
                    backgroundColor: `${getStatusColor(status.status)}15`,
                    color: getStatusColor(status.status)
                  }}
                >
                  {status.status}
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-sm text-gray-500">Assigned To</p>
                  <p className="font-medium">{status.assignedTo}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-medium">{status.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Priority</p>
                  <p className="font-medium">{status.priority}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p className="font-medium">{status.lastUpdated}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-sm text-gray-500">Estimated Completion</p>
                  <p className="font-medium">{status.estimatedCompletion}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-sm text-gray-500">Notes</p>
                  <p className="italic">{status.notes}</p>
                </div>
                {status.escalationCount > 0 && (
                  <div className="sm:col-span-2">
                    <p className="text-sm text-gray-500">Escalation Count</p>
                    <p className="font-medium">
                      {status.escalationCount}/2
                      {status.escalationCount >= 2 && (
                        <span className="ml-2 text-xs text-red-500">Maximum escalations reached</span>
                      )}
                    </p>
                  </div>
                )}
              </div>
              
              {/* Escalation History */}
              {status.escalations && status.escalations.length > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-gray-800 mb-3">Escalation History</h4>
                  <div className="space-y-3">
                    {status.escalations.map((escalation, index) => (
                      <div key={index} className="bg-blue-50 border border-blue-100 rounded-md p-3">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-blue-800">
                            Escalation #{index + 1}: {escalation.to}
                          </span>
                          <span className="text-xs text-blue-600">{escalation.date}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          <span className="font-medium">Reason:</span> {escalation.reason}
                        </p>
                        <div className="mt-2 flex justify-between items-center">
                          <span 
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800"
                          >
                            {escalation.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Action Buttons - Mark as Solved and Escalation */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                {/* Mark as Solved Button */}
                {status.status !== "Resolved" && (
                  <button
                    onClick={handleMarkAsSolved}
                    disabled={loading}
                    className="w-full mb-3 py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-70"
                  >
                    {loading ? "Updating..." : "Mark Case as Solved"}
                  </button>
                )}
                
                {/* Escalation Section */}
                {!escalationSubmitted ? (
                  !showEscalate ? (
                    status.status !== "Resolved" && status.escalationCount < 2 && (
                      <button
                        onClick={() => setShowEscalate(true)}
                        className="w-full py-2 px-4 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                      >
                        Request Escalation
                      </button>
                    )
                  ) : (
                    <div>
                      <h4 className="font-medium text-gray-800 mb-3">Escalate Case</h4>
                      <form onSubmit={handleEscalate}>
                        <div className="mb-4">
                          <label htmlFor="escalate-to" className="block text-sm font-medium text-gray-700 mb-1">
                            Escalate To
                          </label>
                          <select
                            id="escalate-to"
                            value={escalationData.to}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => setEscalationData({...escalationData, to: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select Authority</option>
                            {authorities.map(authority => (
                              <option key={authority} value={authority}>{authority}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div className="mb-4">
                          <label htmlFor="escalate-reason" className="block text-sm font-medium text-gray-700 mb-1">
                            Reason for Escalation
                          </label>
                          <textarea
                            id="escalate-reason"
                            value={escalationData.reason}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setEscalationData({...escalationData, reason: e.target.value})}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Please provide details about why this case needs escalation..."
                          />
                        </div>
                        
                        <div className="flex gap-2">
                          <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-70"
                          >
                            {loading ? "Submitting..." : "Submit Escalation"}
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowEscalate(false)}
                            className="py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  )
                ) : (
                  <div className="bg-green-50 border border-green-200 rounded-md p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">Escalation Submitted</h3>
                        <div className="mt-2 text-sm text-green-700">
                          <p>Your escalation request to {escalationData.to} has been submitted successfully. You will be contacted within 48 hours.</p>
                        </div>
                        <div className="mt-4">
                          <button
                            type="button"
                            onClick={resetEscalation}
                            className="text-sm font-medium text-green-600 hover:text-green-500"
                          >
                            Submit another escalation
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {status && status.status === "Not Found" && (
            <div className="mt-6 text-center p-6 border border-gray-200 rounded-lg">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Case Not Found</h3>
              <p className="mt-2 text-sm text-gray-500">
                We couldn't find any case with ID "{caseId}". Please check the ID and try again.
              </p>
              <p className="mt-4 text-xs text-gray-400">
                Try one of these sample IDs: CMP-12345, CMP-67890, CMP-54321, CMP-98765, CMP-13579
              </p>
            </div>
          )}
          
          {/* Not Authorized Message */}
          {status && status.status === "Not Authorized" && (
            <div className="mt-6 text-center p-6 border border-red-200 rounded-lg bg-red-50">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-3a3 3 0 100-6 3 3 0 000 6z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M19 12h.01M12 19h.01M12 5h.01M4.929 4.929l.01-.01M19.071 4.929l-.01-.01M4.929 19.071l.01-.01M19.071 19.071l-.01-.01"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-red-900">Not Authorized</h3>
              <p className="mt-2 text-sm text-red-600">
                You are not authorized to view case "{caseId}". This case may belong to another user or department.
              </p>
              <p className="mt-4 text-xs text-red-500">
                If you believe this is an error, please contact your system administrator.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}