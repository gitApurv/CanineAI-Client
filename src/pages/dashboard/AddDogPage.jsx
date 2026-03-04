import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createDog } from "../../services/DogService";
import { handleImageUpload } from "../../utils/imageUpload";

function AddDogPage() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: "",
    breed: "",
    ageYears: "",
    weightKg: "",
    gender: "",
    vaccinated: false,
    profileImageUrl: null,
  });
  const [imageUploading, setImageUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const onFieldChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const setImageValue = (key, value) => {
    if (key !== "image") return;

    setFormValues((prev) => ({
      ...prev,
      profileImageUrl: value,
    }));
  };

  const showAlert = (message, type) => {
    if (type === "error") {
      setError(message);
    }
  };

  const onImageChange = async (event) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setError("");

    await handleImageUpload(selectedFile, {
      setLoading: setImageUploading,
      setValue: setImageValue,
      showAlert,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const {
      name,
      breed,
      ageYears,
      weightKg,
      gender,
      vaccinated,
      profileImageUrl,
    } = formValues;

    if (!name.trim()) {
      setError("Dog name is required.");
      return;
    }

    if (!breed.trim()) {
      setError("Breed is required.");
      return;
    }

    if (!ageYears) {
      setError("Age is required.");
      return;
    }

    if (!weightKg) {
      setError("Weight is required.");
      return;
    }

    if (!gender) {
      setError("Please select a gender.");
      return;
    }

    const parsedAgeYears = Number(ageYears);
    const parsedWeightKg = Number(weightKg);

    if (
      Number.isNaN(parsedAgeYears) ||
      parsedAgeYears <= 0 ||
      !Number.isInteger(parsedAgeYears)
    ) {
      setError("Age must be a whole number greater than 0.");
      return;
    }

    if (
      Number.isNaN(parsedWeightKg) ||
      parsedWeightKg <= 0 ||
      !Number.isInteger(parsedWeightKg)
    ) {
      setError("Weight must be a whole number greater than 0.");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        name: name.trim(),
        breed: breed.trim(),
        ageYears: parsedAgeYears,
        weightKg: parsedWeightKg,
        gender,
        vaccinated,
        profileImageUrl,
      };

      await createDog(payload);
      navigate("/dashboard/dogs");
    } catch (submitError) {
      setError(submitError?.message || "Unable to save dog. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="space-y-7">
      <header className="rounded-2xl border border-slate-200 bg-white/80 px-6 py-5 shadow-sm backdrop-blur-sm sm:px-7">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Add New Dog
        </h1>
        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          Enter your dog&apos;s basic information to create a health profile.
        </p>
      </header>

      <article className="mx-auto w-full max-w-[900px] rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70 sm:p-8">
        <h2 className="text-3xl font-bold text-slate-900">Dog Details</h2>
        <p className="mt-1 text-sm text-slate-500">
          Please provide accurate information for better health predictions.
        </p>

        <form className="mt-6 space-y-5" onSubmit={onSubmit}>
          <div>
            <label
              className="text-sm font-medium text-slate-700"
              htmlFor="dog-name"
            >
              Dog Name
            </label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/15"
              id="dog-name"
              name="name"
              onChange={onFieldChange}
              placeholder="e.g. Max"
              type="text"
              value={formValues.name}
            />
          </div>

          <div>
            <label
              className="text-sm font-medium text-slate-700"
              htmlFor="dog-breed"
            >
              Breed
            </label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/15"
              id="dog-breed"
              name="breed"
              onChange={onFieldChange}
              placeholder="e.g. Indian Spitz"
              type="text"
              value={formValues.breed}
            />
          </div>

          <div>
            <label
              className="text-sm font-medium text-slate-700"
              htmlFor="dog-image"
            >
              Profile Image (Optional)
            </label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 outline-none transition-all file:mr-4 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-slate-700 hover:file:bg-slate-200 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/15"
              accept="image/jpeg,image/png,image/jpg"
              id="dog-image"
              onChange={onImageChange}
              type="file"
            />
            {imageUploading && (
              <p className="mt-2 text-xs font-medium text-slate-500">
                Uploading image...
              </p>
            )}
            {formValues.profileImageUrl && (
              <div className="mt-3 inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-2 pr-3">
                <img
                  alt="Dog preview"
                  className="h-14 w-14 rounded-lg object-cover"
                  src={formValues.profileImageUrl}
                />
                <p className="text-xs font-medium text-slate-600">
                  Image uploaded
                </p>
              </div>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                className="text-sm font-medium text-slate-700"
                htmlFor="dog-age"
              >
                Age
              </label>
              <div className="mt-2 flex items-center rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 transition-all focus-within:border-primary focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/15">
                <input
                  className="w-full border-0 p-0 text-slate-900 outline-none"
                  id="dog-age"
                  min="1"
                  name="ageYears"
                  onChange={onFieldChange}
                  placeholder="0"
                  step="1"
                  type="number"
                  value={formValues.ageYears}
                />
                <span className="text-sm text-slate-400">Years</span>
              </div>
            </div>
            <div>
              <label
                className="text-sm font-medium text-slate-700"
                htmlFor="dog-weight"
              >
                Weight
              </label>
              <div className="mt-2 flex items-center rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 transition-all focus-within:border-primary focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/15">
                <input
                  className="w-full border-0 p-0 text-slate-900 outline-none"
                  id="dog-weight"
                  min="1"
                  name="weightKg"
                  onChange={onFieldChange}
                  placeholder="0"
                  step="1"
                  type="number"
                  value={formValues.weightKg}
                />
                <span className="text-sm text-slate-400">kg</span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-700">Gender</p>
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              <button
                className={`rounded-xl border px-4 py-3 text-sm font-medium transition-all hover:-translate-y-0.5 ${
                  formValues.gender === "MALE"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-slate-200 bg-white text-slate-700 hover:border-primary/40 hover:bg-primary/5"
                }`}
                onClick={() =>
                  setFormValues((prev) => ({ ...prev, gender: "MALE" }))
                }
                type="button"
              >
                Male
              </button>
              <button
                className={`rounded-xl border px-4 py-3 text-sm font-medium transition-all hover:-translate-y-0.5 ${
                  formValues.gender === "FEMALE"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-slate-200 bg-white text-slate-700 hover:border-primary/40 hover:bg-primary/5"
                }`}
                onClick={() =>
                  setFormValues((prev) => ({ ...prev, gender: "FEMALE" }))
                }
                type="button"
              >
                Female
              </button>
            </div>
          </div>

          <label className="inline-flex items-center gap-2 rounded-lg px-1 text-sm text-slate-700">
            <input
              className="rounded border-slate-300 text-primary focus:ring-primary"
              checked={formValues.vaccinated}
              name="vaccinated"
              onChange={onFieldChange}
              type="checkbox"
            />
            Vaccinations up to date
          </label>

          <div className="space-y-4 border-t border-slate-100 pt-5">
            <div
              className={`overflow-hidden transition-all duration-300 ease-out ${
                error
                  ? "max-h-24 translate-y-0 opacity-100"
                  : "max-h-0 -translate-y-1 opacity-0"
              }`}
            >
              <div className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            </div>
            <div className="flex items-center justify-end gap-3">
              <Link
                className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-100"
                to="/dashboard/dogs"
              >
                Cancel
              </Link>
              <button
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/30 transition-all hover:-translate-y-0.5 hover:bg-blue-600"
                disabled={submitting}
                type="submit"
              >
                <span className="material-symbols-outlined text-[16px]">
                  save
                </span>
                {submitting ? "Saving..." : "Save Dog"}
              </button>
            </div>
          </div>
        </form>
      </article>
    </section>
  );
}

export default AddDogPage;
