import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/client.ts";
import { useAuthStore } from "../../store/auth.ts";

interface RegisterForm {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  password_confirm: string;
}

const REGISTER_FIELDS: (keyof RegisterForm)[] = [
  "username",
  "email",
  "first_name",
  "last_name",
  "password",
  "password_confirm",
];

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterForm>();
  const setTokens = useAuthStore((state) => state.setTokens);
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const onSubmit = async (values: RegisterForm) => {
    try {
      const { data } = await api.post("/api/auth/register/", values);
      if (data.tokens) {
        setTokens({ access: data.tokens.access, refresh: data.tokens.refresh });
        setUser(data.user);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error: any) {
      const apiErrors = error.response?.data;
      if (apiErrors && typeof apiErrors === "object") {
        let handled = false;
        Object.entries(apiErrors).forEach(([key, value]) => {
          const message = Array.isArray(value)
            ? value.join(" ")
            : String(value);
          if (REGISTER_FIELDS.includes(key as keyof RegisterForm)) {
            setError(key as keyof RegisterForm, { message });
            handled = true;
          }
        });
        if (!handled) {
          const first = Object.values(apiErrors)[0];
          const fallback = Array.isArray(first)
            ? first.join(" ")
            : String(first ?? "Unable to register.");
          setError("root", { message: fallback });
        }
      } else {
        setError("root", { message: "Unable to register." });
      }
    }
  };

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Create account</h2>

        <label>
          Username
          <input
            type="text"
            {...register("username", { required: "Username is required" })}
          />
        </label>
        {errors.username && (
          <p className="auth__error">{errors.username.message}</p>
        )}

        <label>
          Email
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
          />
        </label>
        {errors.email && <p className="auth__error">{errors.email.message}</p>}

        <div className="auth__grid">
          <label>
            First name
            <input
              type="text"
              {...register("first_name", { required: "Required" })}
            />
          </label>
          <label>
            Last name
            <input
              type="text"
              {...register("last_name", { required: "Required" })}
            />
          </label>
        </div>
        {(errors.first_name || errors.last_name) && (
          <p className="auth__error">First and last name are required.</p>
        )}

        <label>
          Password
          <div className="auth__password">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: "Password is required" })}
            />
            <button
              type="button"
              className="auth__toggle"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path
                    d="M3.5 3.5 20.5 20.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M9.9 5.2c.7-.2 1.4-.3 2.1-.3 5.5 0 9.3 5.1 9.3 7.1 0 .7-.6 2-1.8 3.3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M6.2 7.3C4.3 8.7 3 10.6 2.7 12c.7 2.3 4.4 7.1 9.3 7.1 1.4 0 2.7-.4 3.8-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M9 9a4 4 0 0 0 6 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path
                    d="M12 5c-5.5 0-9.3 5.1-9.3 7.1S6.5 19.2 12 19.2s9.3-5.1 9.3-7.1S17.5 5 12 5Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              )}
            </button>
          </div>
        </label>
        {errors.password && (
          <p className="auth__error">{errors.password.message}</p>
        )}

        <label>
          Confirm password
          <div className="auth__password">
            <input
              type={showConfirm ? "text" : "password"}
              {...register("password_confirm", {
                required: "Confirm your password",
              })}
            />
            <button
              type="button"
              className="auth__toggle"
              aria-label={showConfirm ? "Hide password" : "Show password"}
              onClick={() => setShowConfirm((prev) => !prev)}
            >
              {showConfirm ? (
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path
                    d="M3.5 3.5 20.5 20.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M9.9 5.2c.7-.2 1.4-.3 2.1-.3 5.5 0 9.3 5.1 9.3 7.1 0 .7-.6 2-1.8 3.3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M6.2 7.3C4.3 8.7 3 10.6 2.7 12c.7 2.3 4.4 7.1 9.3 7.1 1.4 0 2.7-.4 3.8-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M9 9a4 4 0 0 0 6 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path
                    d="M12 5c-5.5 0-9.3 5.1-9.3 7.1S6.5 19.2 12 19.2s9.3-5.1 9.3-7.1S17.5 5 12 5Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              )}
            </button>
          </div>
        </label>
        {errors.password_confirm && (
          <p className="auth__error">{errors.password_confirm.message}</p>
        )}

        {errors.root && <p className="auth__error">{errors.root.message}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create account"}
        </button>

        <p className="auth__prompt">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
