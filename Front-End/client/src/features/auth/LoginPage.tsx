import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../../api/client.ts";
import { useAuthStore } from "../../store/auth.ts";

interface LoginForm {
  username: string;
  password: string;
}

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginForm>();
  const setTokens = useAuthStore((state) => state.setTokens);
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();
  const location = useLocation();
  const from =
    (location.state as { from?: { pathname?: string } })?.from?.pathname ?? "/";

  const onSubmit = async (values: LoginForm) => {
    try {
      const { data } = await api.post("/api/auth/login/", values);
      setTokens({ access: data.access, refresh: data.refresh });

      const profileResponse = await api.get("/api/auth/me/");
      setUser(profileResponse.data);

      navigate(from, { replace: true });
    } catch (error: any) {
      const detail = error.response?.data?.detail ?? "Unable to sign in.";
      setError("root", { message: detail });
    }
  };

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Sign in</h2>
        <label>
          Username
          <input
            type="text"
            autoComplete="username"
            {...register("username", { required: "Username is required" })}
          />
        </label>
        {errors.username && (
          <p className="auth__error">{errors.username.message}</p>
        )}

        <label>
          Password
          <div className="auth__password">
            <input
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
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

        {errors.root && <p className="auth__error">{errors.root.message}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>

        <p className="auth__prompt">
          Need an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
