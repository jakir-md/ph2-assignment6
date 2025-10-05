import { Link } from "react-router-dom";

export default function UnAuthorized() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100 text-center">
      <h1 className="text-9xl font-extrabold text-gray-800">404</h1>
      <p className="mt-4 text-2xl font-semibold text-gray-700">
        Oops! UnAuthorized
      </p>
      <p className="mt-2 text-gray-500">
        Your Are unauthorized to view the content.
      </p>

      <Link
        to="/"
        className="mt-6 rounded-2xl bg-rose-500 px-6 py-3 text-white shadow-lg transition hover:bg-rose-700"
      >
        Go Back Home
      </Link>
    </div>
  );
}
