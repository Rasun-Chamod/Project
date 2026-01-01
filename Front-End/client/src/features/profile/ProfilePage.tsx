import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import api from "../../api/client";

interface ProfileForm {
  bio?: string;
  preferences?: string;
  favourite_genre?: number | "";
  favourite_platform?: number | "";
  avatar?: FileList;
}

const ProfilePage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await api.get("/api/auth/profile/");
      return response.data;
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ProfileForm>({
    defaultValues: {
      bio: "",
      preferences: "",
      favourite_genre: "",
      favourite_platform: "",
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        bio: data.bio ?? "",
        preferences: data.preferences ?? "",
        favourite_genre: data.favourite_genre ?? "",
        favourite_platform: data.favourite_platform ?? "",
      });
    }
  }, [data, reset]);

  const mutation = useMutation({
    mutationFn: async (values: ProfileForm) => {
      const formData = new FormData();
      formData.append("bio", values.bio ?? "");
      formData.append("preferences", values.preferences ?? "");
      formData.append("favourite_genre", String(values.favourite_genre ?? ""));
      formData.append(
        "favourite_platform",
        String(values.favourite_platform ?? "")
      );
      if (values.avatar && values.avatar[0]) {
        formData.append("avatar", values.avatar[0]);
      }
      await api.put("/api/auth/profile/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: () => {
      reset({}, { keepValues: true });
    },
  });

  const onSubmit = (values: ProfileForm) => {
    mutation.mutate(values);
  };

  if (isLoading) return <p>Loading profile...</p>;

  return (
    <div className="profile">
      <h2>Your profile</h2>
      <form className="profile__form" onSubmit={handleSubmit(onSubmit)}>
        <label>
          Bio
          <textarea rows={4} {...register("bio")} />
        </label>

        <label>
          Preferences (JSON)
          <textarea
            rows={4}
            {...register("preferences")}
            placeholder='{"genres": ["Action"]}'
          />
        </label>

        <label>
          Favourite genre ID
          <input type="number" {...register("favourite_genre")} />
        </label>

        <label>
          Favourite platform ID
          <input type="number" {...register("favourite_platform")} />
        </label>

        <label>
          Avatar
          <input type="file" accept="image/*" {...register("avatar")} />
        </label>

        <button type="submit" disabled={mutation.isPending || isSubmitting}>
          {mutation.isPending ? "Saving..." : "Save changes"}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
