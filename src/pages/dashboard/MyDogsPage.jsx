import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteDog, fetchDogs } from "../../services/DogService";

function MyDogsPage() {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingDogId, setDeletingDogId] = useState(null);

  useEffect(() => {
    const loadDogs = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await fetchDogs();
        setDogs(data);
      } catch (error) {
        const message =
          error?.message || "Unable to load dogs. Please try again.";
        setError(message);
        setDogs([]);
      } finally {
        setLoading(false);
      }
    };

    loadDogs();
  }, []);

  const handleDeleteDog = async (dogId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this dog profile?",
    );

    if (!isConfirmed) return;

    try {
      setError("");
      setDeletingDogId(dogId);
      await deleteDog(dogId);
      setDogs((prevDogs) => prevDogs.filter((dog) => dog.id !== dogId));
    } catch (deleteError) {
      setError(
        deleteError?.message || "Unable to delete dog. Please try again.",
      );
    } finally {
      setDeletingDogId(null);
    }
  };

  return (
    <section className="space-y-7">
      <header className="rounded-2xl border border-slate-200 bg-white/80 px-6 py-5 shadow-sm backdrop-blur-sm sm:flex sm:items-start sm:justify-between sm:px-7">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            My Dogs
          </h1>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Manage your registered dogs and their health profiles
          </p>
        </div>

        <Link
          className="mt-4 inline-flex items-center gap-2 self-start rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-md shadow-primary/30 transition-all hover:-translate-y-0.5 hover:bg-blue-600 sm:mt-0"
          to="/dashboard/dogs/add"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add Dog
        </Link>
      </header>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div
          className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
          aria-live="polite"
          aria-busy="true"
        >
          {Array.from({ length: 3 }).map((_, index) => (
            <article
              key={index}
              className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col items-center text-center">
                <div className="h-20 w-20 rounded-full bg-slate-200" />
                <div className="mt-3 h-8 w-32 rounded bg-slate-200" />
                <div className="mt-2 h-4 w-24 rounded bg-slate-200" />
                <div className="mt-3 flex items-center gap-2">
                  <div className="h-6 w-16 rounded bg-slate-200" />
                  <div className="h-6 w-16 rounded bg-slate-200" />
                </div>
              </div>
              <div className="mt-5 space-y-3 border-t border-slate-100 pt-4">
                <div className="h-10 w-full rounded-xl bg-slate-200" />
                <div className="mx-auto h-6 w-32 rounded bg-slate-200" />
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {dogs.map((dog) => {
            const imageUrl = dog.profileImageUrl;

            return (
              <article
                key={dog.id}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="relative">
                    {imageUrl ? (
                      <img
                        alt={dog.name}
                        className="h-20 w-20 rounded-full border-2 border-white object-cover shadow"
                        src={imageUrl}
                      />
                    ) : (
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-slate-400 shadow-inner">
                        <span className="material-symbols-outlined text-4xl">
                          pets
                        </span>
                      </div>
                    )}
                  </div>

                  <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-900">
                    {dog.name}
                  </h2>
                  <p className="text-sm font-medium text-slate-500">
                    {dog.breed}
                  </p>
                </div>

                <div className="mt-5 space-y-3 border-t border-slate-100 pt-4">
                  <Link
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-semibold text-primary transition-colors group-hover:bg-blue-100"
                    to={`/dashboard/dogs/${dog.id}`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      visibility
                    </span>
                    View Profile
                  </Link>

                  <div className="flex items-center justify-center gap-6 text-sm">
                    <Link
                      className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
                      to={`/dashboard/dogs/edit/${dog.id}`}
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        edit
                      </span>
                      Edit
                    </Link>
                    <button
                      className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-medium text-red-500 transition-colors hover:bg-red-50 hover:text-red-600"
                      disabled={deletingDogId === dog.id}
                      onClick={() => handleDeleteDog(dog.id)}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        delete
                      </span>
                      {deletingDogId === dog.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}

          <Link
            className="group flex min-h-[340px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 text-center transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-white hover:shadow-sm"
            to="/dashboard/dogs/add"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary shadow-sm transition-transform group-hover:scale-105">
              <span className="material-symbols-outlined">add</span>
            </span>
            <h3 className="mt-4 text-2xl font-bold text-slate-900">
              Add New Dog
            </h3>
            <p className="mt-1 max-w-[220px] text-sm text-slate-500">
              Register a new pet to start tracking their health.
            </p>
          </Link>
        </div>
      )}
    </section>
  );
}

export default MyDogsPage;
