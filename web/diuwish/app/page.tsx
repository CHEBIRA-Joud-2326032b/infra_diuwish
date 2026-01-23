import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function Page() {
  const cookieStore = await cookies();
  if (cookieStore.has("Authorization")) {
    redirect("/dashboard");
  }

  async function handleLogin(formData: FormData) {
    "use server";

    const data = Object.fromEntries(formData.entries());

    const res = await fetch("http://localhost:8080/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Erreur API Go:", errorData.message);
      return;
    }

    const result = await res.json();

    const setCookieHeader = res.headers.get("set-cookie");
    if (setCookieHeader) {
      const parts = setCookieHeader.split(";")[0].split("=");
      const token = parts.slice(1).join("=");
      (await cookies()).set("Authorization", token, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 15,
      });

      if (result.data && result.data.id) {
        (await cookies()).set("user_id", result.data.id.toString(), {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 15,
        });
      }
    }

    console.log("Succès:", result);
    redirect("/dashboard");
  }
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-blue-900 via-blue-800 to-indigo-900 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 p-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Bienvenue</h1>
          <p className="text-blue-100">
            Connectez-vous à votre espace bancaire
          </p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form action={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Adresse Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 sm:text-sm"
                  placeholder="nom@exemple.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  id="password"
                  type="password"
                  name="password"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 cursor-pointer"
            >
              Se connecter
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Pas encore de compte ?
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <a
                href="/register"
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
              >
                Créer un compte gratuitement
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
