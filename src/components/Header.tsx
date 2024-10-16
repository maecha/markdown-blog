import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white w-full">
      <div className="container mx-auto max-w-[620px] flex justify-between items-center py-5 px-1">
        <Link to="/" className="text-xl font-bold">
          MARKDOWN BLOG (beta)
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
  );
}
