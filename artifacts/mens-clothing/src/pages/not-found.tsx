import { Link } from "wouter";
import { Layout } from "../components/layout/Layout";

export default function NotFound() {
  return (
    <Layout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-9xl font-bold text-gray-100 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Page not found</h2>
        <p className="text-lg text-gray-500 mb-8 max-w-md">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link href="/">
          <button className="px-8 py-4 bg-black text-white rounded-xl font-medium shadow-xl hover:-translate-y-1 transition-all">
            Back to Home
          </button>
        </Link>
      </div>
    </Layout>
  );
}
