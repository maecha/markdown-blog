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
    <div className="container mx-auto p-4">
      {/* <h1 className="text-3xl font-bold mb-4">Home</h1> */}
      {isLoggedIn ? (
        <div>
          <ul>
            {posts.map((post) => (
              <li key={post.id} className="mb-2">
                <Link to={`/post/${post.id}`} className="text-sky-600">
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>ログインしてください。</p>
      )}
    </div>
  );
}
