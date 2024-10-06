import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-4 mt-12">
      <div className="container mx-auto text-center text-gray-600">
        <p>&copy; 2024 Fitness Tracker. All rights reserved.</p>
        <div className="mt-2">
          <Link href="/privacy-policy">
            <a className="hover:underline">Privacy Policy</a>
          </Link>
          <span className="mx-2">|</span>
          <Link href="/terms-of-service">
            <a className="hover:underline">Terms of Service</a>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;