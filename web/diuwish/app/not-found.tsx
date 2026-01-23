import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center space-y-6 max-w-lg">
        <h1 className="text-9xl font-bold text-blue-600">404</h1>

        <h2 className="text-3xl font-bold text-gray-900">Page introuvable</h2>

        <p className="text-gray-600 text-lg">
          Oups ! La page que vous recherchez semble avoir disparu ou n'a jamais
          existé.
        </p>

        <div className="pt-6">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
