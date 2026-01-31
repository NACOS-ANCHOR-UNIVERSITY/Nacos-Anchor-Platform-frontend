import React, { useState, useRef, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner"; // We are NOT using authService anymore
import InitialsAvatar from "../../../components/shared/InitialsAvatar";

export default function Signup() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    // --- STATE ---
    const [step, setStep] = useState(1);

    // Tiny Storage Init
    const [formData, setFormData] = useState(() => {
        const savedData = sessionStorage.getItem("signup_storage");
        return savedData ? JSON.parse(savedData) : {
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            department: "",
            level: "",
            matric_number: "",
            password: "Password123",
        };
    });

    const [profilePicture, setProfilePicture] = useState(null);

    // Auto-Save
    useEffect(() => {
        sessionStorage.setItem("signup_storage", JSON.stringify(formData));
    }, [formData]);

    // --- HELPERS ---
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onPickFile = () => fileInputRef.current?.click();

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            // Validate Type
            if (!['image/jpeg', 'image/png'].includes(file.type)) {
                toast.error("Only JPEG and PNG images are allowed");
                return;
            }

            // Validate Size (2MB)
            if (file.size > 2 * 1024 * 1024) {
                toast.error("File size must be less than 2MB");
                return;
            }

            setProfilePicture(file);
        }
    };

    const fileLabel = useMemo(() => {
        return profilePicture ? profilePicture.name : "Upload a picture (jpeg, png)";
    }, [profilePicture]);

    // --- HANDLE NEXT ---
    const handleNextStep = () => {
        if (!formData.first_name || !formData.last_name || !formData.email || !formData.phone) {
            toast.error("Please fill in all personal details first");
            return;
        }
        setStep(2);
    };

    // --- FINAL SUBMIT (FETCH VERSION) ---
    const handleFinalSubmit = async () => {
        if (!formData.department || !formData.level || !formData.matric_number) {
            toast.error("Please fill in your academic details");
            return;
        }

        console.log("Submitting via Fetch...");
        const toastId = toast.loading("Creating account...");

        try {
            const submissionData = new FormData();
            Object.keys(formData).forEach((key) => {
                submissionData.append(key, formData[key]);
            });
            if (profilePicture) {
                submissionData.append("profile_picture", profilePicture);
            }

            // DIRECT FETCH call
            const response = await fetch("https://nacos.nextgenerationones.org/api/auth/register", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                },
                body: submissionData,
            });

            // Parse JSON safely
            let result;
            const responseText = await response.text();

            try {
                result = JSON.parse(responseText);
            } catch (err) {
                console.error("Server Response (Non-JSON):", responseText);
                throw new Error("Server returned an error (500). Please check console for details.");
            }

            if (!response.ok) {
                // Determine error message from standard Laravel/API formats
                const msg = result.message || (result.errors ? Object.values(result.errors).flat().join(", ") : "Registration failed");
                throw new Error(msg);
            }

            toast.dismiss(toastId);
            toast.success("Registration Successful! Please check your email for further instructions.");
            sessionStorage.removeItem("signup_storage");
            
            // Delay navigation to give users time to read the message
            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (error) {
            console.error("Fetch Error:", error);
            toast.dismiss(toastId);
            toast.error(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex min-h-screen flex-col">
                <header className="bg-transparent border-b border-gray-200/60">
                    <div className="mx-auto grid max-w-6xl grid-cols-12 items-center gap-4 px-4 py-4">
                        <div className="col-span-12 flex items-center justify-between md:col-span-3 md:justify-start">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded bg-[#138601]/10" />
                            </div>
                        </div>
                        <div className="col-span-12 flex items-center justify-end gap-3 md:col-start-10 md:col-span-3">
                            <Link to="/login" className="rounded-md bg-[#138601] px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-95">
                                Login
                            </Link>
                        </div>
                    </div>
                </header>

                <main className="flex-1">
                    <div className="mx-auto max-w-6xl px-4 py-14">
                        <div className="mx-auto overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-gray-200">
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div className="bg-[radial-gradient(80%_60%_at_18%_10%,rgba(16,185,129,0.22)_0%,rgba(16,185,129,0.10)_35%,rgba(16,185,129,0)_70%),radial-gradient(85%_70%_at_22%_62%,rgba(16,185,129,0.18)_0%,rgba(16,185,129,0.08)_40%,rgba(16,185,129,0)_75%),linear-gradient(to_bottom,rgba(236,253,245,1)_0%,rgba(240,253,250,1)_45%,rgba(236,253,245,0.9)_100%)] p-8 lg:p-10">
                                    <div className="inline-flex items-center gap-3 text-lg font-semibold tracking-tight text-[#138601]">
                                        <span className="font-bold">Student Portal</span>
                                    </div>
                                    <h1 className="mt-6 max-w-sm text-3xl font-semibold tracking-tight text-gray-900">
                                        Unlock your academic potential
                                    </h1>
                                </div>

                                <div className="p-8 lg:p-10">
                                    <div>
                                        <p className="text-xs font-semibold text-[#138601]">Step {step} of 2</p>
                                        <h2 className="mt-1 text-2xl font-bold text-gray-900">
                                            {step === 1 ? "Personal Information" : "Academic Details"}
                                        </h2>
                                    </div>

                                    <div className="mt-4 h-2 w-full rounded-full bg-gray-100">
                                        <div className={`h-2 rounded-full bg-[#138601] transition-all duration-300 ${step === 1 ? 'w-1/2' : 'w-full'}`} />
                                    </div>

                                    <div className="mt-6 space-y-5">
                                        {/* STEP 1 */}
                                        {step === 1 && (
                                            <>
                                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                    <label className="block">
                                                        <span className="text-xs font-semibold text-gray-700">First Name</span>
                                                        <input name="first_name" required value={formData.first_name} onChange={handleInputChange} placeholder="e.g. Ade" className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#138601] focus:ring-1 focus:ring-[#138601]" />
                                                    </label>
                                                    <label className="block">
                                                        <span className="text-xs font-semibold text-gray-700">Last Name</span>
                                                        <input name="last_name" required value={formData.last_name} onChange={handleInputChange} placeholder="e.g. Oluwaseun" className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#138601] focus:ring-1 focus:ring-[#138601]" />
                                                    </label>
                                                </div>
                                                <label className="block">
                                                    <span className="text-xs font-semibold text-gray-700">Email</span>
                                                    <input name="email" type="email" required value={formData.email} onChange={handleInputChange} placeholder="student@anchoru.edu.ng" className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#138601] focus:ring-1 focus:ring-[#138601]" />
                                                </label>
                                                <label className="block">
                                                    <span className="text-xs font-semibold text-gray-700">Phone</span>
                                                    <input name="phone" required value={formData.phone} onChange={handleInputChange} placeholder="+234 800 000 0000" className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#138601] focus:ring-1 focus:ring-[#138601]" />
                                                </label>
                                            </>
                                        )}

                                        {/* STEP 2 */}
                                        {step === 2 && (
                                            <>
                                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                    <label className="block">
                                                        <span className="text-xs font-semibold text-gray-700">Department</span>
                                                        <input name="department" required value={formData.department} onChange={handleInputChange} placeholder="e.g. Computing" className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#138601] focus:ring-1 focus:ring-[#138601]" />
                                                    </label>
                                                    <label className="block">
                                                        <span className="text-xs font-semibold text-gray-700">Level</span>
                                                        <select name="level" required value={formData.level} onChange={handleInputChange} className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#138601] focus:ring-1 focus:ring-[#138601]">
                                                            <option value="">Select Level</option>
                                                            <option value="100">100</option>
                                                            <option value="200">200</option>
                                                            <option value="300">300</option>
                                                            <option value="400">400</option>
                                                        </select>
                                                    </label>
                                                </div>
                                                <label className="block">
                                                    <span className="text-xs font-semibold text-gray-700">Matric Number</span>
                                                    <input name="matric_number" required value={formData.matric_number} onChange={handleInputChange} placeholder="e.g. AUL/CMP/22/003" className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#138601] focus:ring-1 focus:ring-[#138601]" />
                                                </label>
                                                <div>
                                                    <p className="text-xs font-semibold text-gray-700">Upload profile picture</p>
                                                    <input ref={fileInputRef} type="file" accept="image/png,image/jpeg" className="hidden" onChange={handleFileChange} />
                                                    <button type="button" onClick={onPickFile} className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2 text-left text-sm text-gray-400">
                                                        {fileLabel}
                                                    </button>
                                                </div>
                                            </>
                                        )}

                                        <div className="flex items-center justify-between gap-3 pt-4">
                                            {step === 1 ? (
                                                <Link to="/" className="text-sm font-medium text-gray-600 hover:text-gray-900">Cancel</Link>
                                            ) : (
                                                <button type="button" onClick={() => setStep(1)} className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900">Back</button>
                                            )}

                                            {step === 1 ? (
                                                <button type="button" onClick={handleNextStep} className="rounded-md bg-[#138601] px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-95">Next Step</button>
                                            ) : (
                                                <button type="button" onClick={handleFinalSubmit} className="rounded-md bg-[#138601] px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-95">Submit</button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}