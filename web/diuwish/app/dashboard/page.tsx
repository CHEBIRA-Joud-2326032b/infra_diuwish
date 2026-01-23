import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import DashboardActions from "@/components/dashboard/DashboardActions";

async function Dashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("Authorization");
  const userId = cookieStore.get("user_id");

  if (!token || !userId) {
    redirect("/");
  }

  const res = await fetch(`http://localhost:8080/users/${userId.value}`, {
    method: "GET",
    headers: {
      Cookie: `Authorization=${token.value}`,
    },
    cache: "no-store", // Ensure fresh data on every request
  });

  if (!res.ok) {
    console.error("Failed to fetch user data", await res.text());
    // If unauthorized, redirect to login
    if (res.status === 401) {
      redirect("/");
    }
    return (
      <div className="p-8 text-center text-red-500">
        Erreur lors du chargement des données utilisateur.
      </div>
    );
  }

  const { data: user } = await res.json();

  async function handleLogout() {
    "use server";
    (await cookies()).delete("Authorization");
    (await cookies()).delete("user_id");
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-blue-600 p-8 text-white relative flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">Tableau de Bord</h1>
            <p className="text-blue-100 text-lg capitalize">
              Bonjour, {user.firstname} {user.lastname}
            </p>
          </div>
          <form action={handleLogout}>
            <button
              type="submit"
              className="bg-red-500/80 hover:bg-red-600 text-white px-4 py-2 rounded-lg backdrop-blur-sm transition-colors cursor-pointer text-sm font-semibold flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Déconnexion
            </button>
          </form>
        </div>

        <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* User Info Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 border-b border-gray-200 pb-3">
              <h2 className="text-2xl font-semibold text-gray-800">
                Mes Informations
              </h2>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 space-y-4 shadow-sm border border-gray-100">
              <div className="grid grid-cols-[120px_1fr] items-center">
                <span className="text-gray-500 font-medium">Email</span>
                <span className="text-gray-900 font-semibold truncate">
                  {user.email}
                </span>
              </div>
              <div className="grid grid-cols-[120px_1fr] items-center">
                <span className="text-gray-500 font-medium">Téléphone</span>
                <span className="text-gray-900 font-semibold">
                  {user.phone}
                </span>
              </div>
              <div className="grid grid-cols-[120px_1fr] items-center">
                <span className="text-gray-500 font-medium">Membre depuis</span>
                <span className="text-gray-900 font-semibold">
                  {new Date(user.created_at).toLocaleDateString("fr-FR")}
                </span>
              </div>
            </div>
          </div>

          {/* Accounts Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 border-b border-gray-200 pb-3">
              <h2 className="text-2xl font-semibold text-gray-800">
                Mes Comptes Bancaires
              </h2>
            </div>

            <div className="space-y-4">
              {user.accounts && user.accounts.length > 0 ? (
                user.accounts.map((account: any) => (
                  <div
                    key={account.id}
                    className="bg-linear-to-r from-blue-50 to-white p-6 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg text-blue-900">
                          {account.account_type || "Compte Courant"}
                        </h3>
                        <span className="text-sm text-gray-500">
                          ID: ****{account.id.toString().slice(-4)}
                        </span>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase ${account.account_status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                      >
                        {account.account_status || "Actif"}
                      </span>
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="text-sm text-gray-500 block mb-1">
                          Solde disponible
                        </span>
                        <p className="text-4xl font-bold text-gray-900 tracking-tight">
                          {new Intl.NumberFormat("fr-FR", {
                            style: "currency",
                            currency: account.currency || "EUR",
                          }).format(account.balance)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
                  <p className="text-yellow-700 font-medium">
                    Aucun compte bancaire trouvé.
                  </p>
                  <p className="text-yellow-600 text-sm mt-1">
                    Contactez le support pour ouvrir un compte.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div className="bg-gray-50 p-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Actions Rapides
          </h3>
          <DashboardActions accounts={user.accounts || []} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
