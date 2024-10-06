import Link from "next/link";
import { useUser } from "@/lib/hooks/useUser";

const Header = () => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return null;
  }

  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <a className="text-xl font-bold hover:text-gray-700">
            Fitness Tracker
          </a>
        </Link>
        <nav className="flex space-x-4">
          {user ? (
            <>
              <Link href="/dashboard">
                <a className="hover:text-gray-700">Dashboard</a>
              </Link>
              <Link href="/goals">
                <a className="hover:text-gray-700">Goals</a>
              </Link>
              <Link href="/progress">
                <a className="hover:text-gray-700">Progress</a>
              </Link>
              <Link href="/community">
                <a className="hover:text-gray-700">Community</a>
              </Link>
              <Link href="/settings">
                <a className="hover:text-gray-700">Settings</a>
              </Link>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <a className="hover:text-gray-700">Login</a>
              </Link>
              <Link href="/auth/signup">
                <a className="hover:text-gray-700">Signup</a>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;