import { Link } from "react-router-dom";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="bg-neutral-700 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            まーくだうんぶろぐ
          </Link>
          <nav>
            <Link to="/" className="mr-4 hover:underline">
              ホーム
            </Link>
            <Link to="/post" className="hover:underline">
              投稿
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow container mx-auto p-4">{children}</main>

      {/* Footer */}
      <footer className="bg-neutral-200 text-slate-700 p-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 まーくだうんぶろぐ</p>
        </div>
      </footer>
    </div>
  );
}
