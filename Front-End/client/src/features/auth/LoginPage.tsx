import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../../api/client.ts";
import { useAuthStore } from "../../store/auth.ts";

interface LoginForm {
  username: string;
  password: string;
}

const LoginPage = () => {
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
          <input
            type="password"
            autoComplete="current-password"
            {...register("password", { required: "Password is required" })}
          />
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
