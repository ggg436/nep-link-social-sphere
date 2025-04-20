
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="text-center max-w-md">
        <img src="/neplink-logo.svg" alt="NepLink" className="h-16 w-16 mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-4 text-neplink-blue">Page Not Found</h1>
        <p className="text-xl text-gray-600 mb-6">
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="bg-neplink-blue text-white px-6 py-3 rounded-lg font-bold hover:bg-neplink-dark transition duration-200"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
