import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Link } from "react-router-dom";

type Post = {
  id: number;
  title: string;
  content: string;
  created_at: Date;
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const session = supabase.auth.getSession();
    setIsLoggedIn(!!session);

    const fetchPosts = async () => {
      const { data } = await supabase.from("posts").select("*");
      setPosts(data as Post[]);
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto">
      {isLoggedIn ? (
        <div className="grid gap-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="bg-white rounded p-6">
                <Link
                  to={`/post/${post.id}`}
                  className="text-xl font-bold text-sky-600 hover:underline"
                >
                  {post.title}
                </Link>
                <p className="text-gray-500 text-sm mt-2">
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
                <p className="mt-4 text-gray-700 line-clamp-2">
                  {post.content}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">投稿がありません。</p>
          )}
        </div>
      ) : (
        <p className="text-center text-red-500">ログインしてください。</p>
      )}
    </div>
  );
}
