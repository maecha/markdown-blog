import { supabase } from "@/lib/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";

export default function Header() {
  const { clearAuth } = useAuthStore();
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("ログアウトエラー:", error.message);
      return;
    }

    clearAuth();
    setUser(null);

    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="bg-white w-full">
      <div className="container mx-auto max-w-full sm:max-w-[620px] flex justify-between items-center py-5 px-5">
        <Link to="/" className="text-xl font-bold flex items-center">
          <span className="block sm:hidden">MB</span>
          <span className="hidden sm:block">MARKDOWN BLOG</span>
          <span className="ml-2 px-2 py-1 bg-yellow-400 text-xs text-gray-900 rounded-full font-semibold leading-none">
            beta
          </span>
        </Link>

        <nav className="flex items-center">
          {user && (
            <div className="relative ml-4">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="focus:outline-none"
              >
                <span className="text-gray-700">{user.email}</span>
              </button>

              {isMenuOpen && (
                <div
                  ref={menuRef}
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg"
                >
                  <ul>
                    <li>
                      <Link
                        to="/"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-lg"
                      >
                        ホーム
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/post"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-lg"
                      >
                        投稿
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-b-lg"
                      >
                        ログアウト
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
