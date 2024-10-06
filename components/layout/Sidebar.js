import Link from "next/link";
import { useUser } from "@/lib/hooks/useUser";

const Sidebar = () => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return null;
  }

  return (
    <div className="w-64 md:w-1/4 bg-white shadow-lg rounded-lg p-4 md:px-8 md:py-8 fixed md:relative">
      <div className="flex flex-col">
        <Link href="/dashboard">
          <a className="text-xl font-bold mb-4 hover:text-gray-700">Dashboard</a>
        </Link>
        <Link href="/goals">
          <a className="text-lg font-medium mb-4 hover:text-gray-700">Goals</a>
        </Link>
        <Link href="/progress">
          <a className="text-lg font-medium mb-4 hover:text-gray-700">
            Progress
          </a>
        </Link>
        <Link href="/community">
          <a className="text-lg font-medium mb-4 hover:text-gray-700">
            Community
          </a>
        </Link>
        <Link href="/settings">
          <a className="text-lg font-medium mb-4 hover:text-gray-700">
            Settings
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;