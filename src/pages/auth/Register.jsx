import React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

import { useState } from "react";

const roleMeta = {
  student: "Student",
  counselor: "Mentor",
  parent: "Parent",
};

const Register = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "student";
  const roleLabel = roleMeta[role] || "Student";

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  navigate = useNavigate();

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Basic frontend validation
    if (formData.password !== formData.confirm_password) {
      setError({ confirm_password: "Passwords do not match" });
      return;
    }

    try {
      const payload = { ...formData, role }; // attach role from URL
      console.log(payload);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/register/",
        payload,
      );
      console.log("Registered:", response.data);
      // In your Register component after successful OTP send:
      navigate("/verify-otp", { state: { email: payload.email } });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    }
  };

  // const handleGoogleLogin = useGoogleLogin({
  //   onSuccess: async (tokenResponse) => {
  //     const res = await fetch("http://localhost:8000/api/auth/google/", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ token: tokenResponse.access_token }),
  //     });
  //     const data = await res.json();
  //     localStorage.setItem("access_token", data.access);
  //     // navigate('/dashboard')  ← add this if you use react-router
  //   },
  //   onError: () => console.log("Login Failed"),
  // });

  return (
    <div className="font-lexend bg-[#f8f7f5] text-slate-900 overflow-x-hidden">
      <div className="flex min-h-screen w-full flex-row">
        <div className="relative hidden w-[45%] flex-col justify-between bg-[#0A0F1E] p-12 lg:flex overflow-hidden">
          <div className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-teal-400/20 blur-[120px]"></div>
          <div className="absolute top-1/2 -right-20 h-80 w-80 rounded-full bg-amber-500/10 blur-[100px]"></div>
          <div className="dot-grid absolute inset-0 opacity-30"></div>

          <div className="relative z-10 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-[#0A0F1E]">
              <span className="material-symbols-outlined font-bold">route</span>
            </div>
            <h1 className="font-sora text-2xl font-extrabold tracking-tight text-white">
              PathWise
            </h1>
          </div>

          <div className="relative z-10 mt-12 space-y-10">
            <h2 className="font-sora text-5xl font-extrabold leading-[1.1] text-white">
              Start Your Career <br />
              <span className="wavy-underline">Journey Today</span>
            </h2>

            <div className="flex flex-col gap-4">
              <div className="glass-card flex items-center gap-4 rounded-2xl p-4 transition-transform hover:scale-[1.02]">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-400/20 text-teal-400">
                  <span className="material-symbols-outlined">target</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    AI Career Assessment
                  </h3>
                  <p className="text-sm text-slate-400">
                    Discover your true potential with data
                  </p>
                </div>
              </div>

              <div className="glass-card flex items-center gap-4 rounded-2xl p-4 transition-transform hover:scale-[1.02]">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/20 text-amber-500">
                  <span className="material-symbols-outlined">map</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Personalized Roadmap
                  </h3>
                  <p className="text-sm text-slate-400">
                    Tailored steps for your specific goals
                  </p>
                </div>
              </div>

              <div className="glass-card flex items-center gap-4 rounded-2xl p-4 transition-transform hover:scale-[1.02]">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400">
                  <span className="material-symbols-outlined">school</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    College Finder
                  </h3>
                  <p className="text-sm text-slate-400">
                    Access top-tier institutions globally
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-auto flex items-center gap-4">
            <div className="flex -space-x-4">
              <div
                className="h-12 w-12 rounded-full border-4 border-[#0A0F1E] bg-slate-400 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB55thUPY3dTnu-mr4p0q-Es2BNWBiJxEK_KO_Hap4Mqz_amEwZ0MTDCME0gtzN5QdF23Xfy7cQzvHPSJpKmNe4D4AUe-XM1wqPJxeJ8ifeHOYHlIB8BGAGRuwDcHZzjf-_zIUA1TnYmaarKS9LVcXZx95nMIyhmalKH8wfqk-OqVMvr7juUOLH0609n8nj-qlVGcGVweqJYDIB5F9Kqc99q8CKGGzG9sE7erqyY6jw5j0qGu9NHLwkLg8GO63ZEKVIhBZlvx95fw')",
                }}
              ></div>
              <div
                className="h-12 w-12 rounded-full border-4 border-[#0A0F1E] bg-slate-500 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAMtJDLPV0QFunOuYvPk_FiMhWl6s3LgOq_tYr72WYh-Z1_hmb3GsJ3UpnsN-IjC1npko-2_Y7kWffryTlp_VgtpkS59VMykUJcoGcNX95Rl-wvVaryOUuWM23tobpDTQh4tnMXGhgDozgS4xHUtqt9hqY5v7K6N5G8pQcanC34MCEDBtZlk3Z07nnpz5SUVfYCwnXppmpf1UQqPPqhPaDD0wJkDYzNeL5goHVezQHvXoc8zracTsgsYaobZv-txvZtwDt58aF0pQ')",
                }}
              ></div>
              <div
                className="h-12 w-12 rounded-full border-4 border-[#0A0F1E] bg-slate-600 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCNkOEeSQreETa7S_iAJfUEoiRafdOTm48wBGFQ1_-ulXq1cAoXqci39UfEMmIuZXqruz9Mmo_K1CLgDQoZThOVjP4Y3hJeuqswgxQ7c7PxXEDs3L9DffnOCa0Eli3x2NX-SUFA-Ov9ZtZf2-XOK8vHeO8vnyGeMu5c241KcVJkyYKcoeshly_Xk0866DyB2rYcTI179L3uyoFq-xoDQ2JlJ98gof64zRZa96oFmkbyalueZrl9kL8Hu3gZkSb6bppEit53AgBh0w')",
                }}
              ></div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-[#0A0F1E] bg-amber-500 text-xs font-bold text-[#0A0F1E]">
                +10k
              </div>
            </div>
            <p className="text-sm text-slate-400">
              Joined by 10,000+ Indian students this month
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col bg-white lg:w-[55%]">
          <div className="flex items-center justify-between p-6 lg:hidden">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-[#0A0F1E]">
                <span className="material-symbols-outlined text-sm font-bold">
                  route
                </span>
              </div>
              <h1 className="font-sora text-xl font-extrabold text-[#0A0F1E]">
                PathWise
              </h1>
            </div>
            <Link
              className="text-sm font-bold text-amber-500"
              to="/auth/landing"
            >
              Back
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-center p-8 lg:p-12">
            {success && (
              <p style={{ color: "green" }}>Registration successful!</p>
            )}
            {error && <p style={{ color: "red" }}>{JSON.stringify(error)}</p>}

            <div className="w-full max-w-[480px]">
              <div className="mb-8">
                <span className="inline-flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-bold text-teal-500 uppercase tracking-wider">
                  Registering as {roleLabel}
                </span>
                <h2 className="mt-4 font-sora text-3xl font-bold text-slate-900">
                  Create your account
                </h2>
                <p className="mt-2 text-slate-500">
                  Simplify your future with AI-guided paths
                </p>
              </div>

              <button
                className="flex w-full items-center justify-center gap-3 rounded-xl border-[1.5px] border-slate-200 bg-white py-4 text-sm font-bold shadow-sm transition-all hover:bg-slate-50 hover:shadow-md active:scale-[0.98]"
                type="button"
                // onClick={handleGoogleLogin}
              >
                <img
                  alt="Google Logo"
                  className="h-5 w-5"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWhYdoBMx0FuNomV5ECH4uFsy9hXbhV7lz_p7tv84DIcEQgFJWxGRKwPfvKNgo1R2nsCIzWxFoiiih4xLt2pcJj4yO3cCvODBBq9QagCnjkTeI5E9ns95OrdXqjhUeSPn14Y3kFCpVtiCGqmkOLQ0agnU31UbdxwY3_Aud0E7-McQsoHSPi1CMAq4yPlN7j6zEsVM9bjH9Pl__h-Pfav6dgLr8BIQb6WsfCq2vaHxyff9FaKBzabc6-J6hd6NCK2YW6iIRQZ0r_A"
                />
                Continue with Google
              </button>

              <div className="my-8 relative flex items-center">
                <div className="flex-grow border-t border-slate-100"></div>
                <span className="mx-4 flex-shrink text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                  or register with email
                </span>
                <div className="flex-grow border-t border-slate-100"></div>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    First Name
                  </label>
                  <input
                    className="w-full rounded-xl border-[1.5px] border-slate-200 bg-[#F8FAFC] px-4 py-3 text-sm transition-colors focus:border-amber-500 focus:ring-0"
                    placeholder="John Doe"
                    required
                    type="text"
                    name="first_name"
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Last Name
                  </label>
                  <input
                    className="w-full rounded-xl border-[1.5px] border-slate-200 bg-[#F8FAFC] px-4 py-3 text-sm transition-colors focus:border-amber-500 focus:ring-0"
                    placeholder="John Doe"
                    required
                    type="text"
                    name="last_name"
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Email Address
                  </label>
                  <input
                    className="w-full rounded-xl border-[1.5px] border-slate-200 bg-[#F8FAFC] px-4 py-3 text-sm transition-colors focus:border-amber-500 focus:ring-0"
                    placeholder="example@email.com"
                    required
                    type="email"
                    name="email"
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Password
                  </label>
                  <input
                    className="w-full rounded-xl border-[1.5px] border-slate-200 bg-[#F8FAFC] px-4 py-3 text-sm transition-colors focus:border-amber-500 focus:ring-0"
                    placeholder="••••••••"
                    required
                    type="password"
                    name="password"
                    onChange={handleChange}
                  />
                  <div className="flex gap-1 pt-1">
                    <div className="h-1.5 flex-1 rounded-full bg-amber-500"></div>
                    <div className="h-1.5 flex-1 rounded-full bg-amber-500"></div>
                    <div className="h-1.5 flex-1 rounded-full bg-slate-200"></div>
                    <div className="h-1.5 flex-1 rounded-full bg-slate-200"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Confirm Password
                  </label>
                  <input
                    className="w-full rounded-xl border-[1.5px] border-slate-200 bg-[#F8FAFC] px-4 py-3 text-sm transition-colors focus:border-amber-500 focus:ring-0"
                    placeholder="••••••••"
                    required
                    type="password"
                    name="confirm_password"
                    onChange={handleChange}
                  />
                  <div className="flex gap-1 pt-1">
                    <div className="h-1.5 flex-1 rounded-full bg-amber-500"></div>
                    <div className="h-1.5 flex-1 rounded-full bg-amber-500"></div>
                    <div className="h-1.5 flex-1 rounded-full bg-slate-200"></div>
                    <div className="h-1.5 flex-1 rounded-full bg-slate-200"></div>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <input
                    className="mt-1 h-4 w-4 cursor-pointer rounded border-slate-300 text-amber-500 focus:ring-amber-500/20"
                    id="terms"
                    required
                    type="checkbox"
                  />
                  <label
                    className="cursor-pointer text-xs leading-relaxed text-slate-500"
                    htmlFor="terms"
                  >
                    I agree to the{" "}
                    <a
                      className="font-semibold text-amber-500 hover:underline"
                      href="#"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      className="font-semibold text-amber-500 hover:underline"
                      href="#"
                    >
                      Privacy Policy
                    </a>
                    .
                  </label>
                </div>

                <button
                  className="mt-4 w-full rounded-xl bg-gradient-to-r from-amber-500 to-[#ef4444] py-4 font-bold text-[#0A0F1E] shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.01] active:scale-95"
                  type="submit"
                >
                  Create My Account →
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-sm font-medium text-slate-500">
                  Already have an account?{" "}
                  <a
                    className="font-bold text-amber-500 hover:underline"
                    href="#"
                  >
                    Sign in here
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
