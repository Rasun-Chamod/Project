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
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
          />
        </label>
        {errors.password && (
          <p className="auth__error">{errors.password.message}</p>
        )}

        <label>
          Confirm password
          <input
            type="password"
            {...register("password_confirm", {
              required: "Confirm your password",
            })}
          />
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
