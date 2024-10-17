import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Link } from "react-router-dom";
import { type Post } from "@/types/postTypes";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { user } = useAuth();

  const fetchPosts = async () => {
    const { data } = await supabase.from("posts").select("*");
    setPosts(data as Post[]);
  };

  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user]);

  return (
    <div className="container mx-auto max-w-full sm:max-w-[620px] sm:py-2 md:px-5">
      {user ? (
        <div>
          {posts.length > 0 ? (
            <div className="grid gap-6">
              {posts.map((post) => (
                <div key={post.id} className="bg-white rounded shadow p-6">
                  <Link
                    to={`/post/${post.id}`}
                    className="text-xl font-bold text-sky-600 hover:underline"
                  >
                    {post.title}
                  </Link>
                  <p className="text-gray-500 text-sm mt-2">
                    {new Date(post.created_at).toLocaleDateString()}
                  </p>
                  <p
                    className="mt-4 text-gray-700 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  ></p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center mt-20">
              <h2 className="text-2xl font-bold text-gray-700 mb-4">
                まだ投稿がありません！
              </h2>
              <p className="text-gray-500 mb-6">
                最初の投稿を作成してみましょう。
              </p>
              <Link
                to="/post"
                className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600"
              >
                投稿する
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center mt-20">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            MARKDOWN BLOG へようこそ！
          </h2>
          <p className="text-gray-500 mb-6">
            ここでは簡単に Markdown
            で記事を作成し、公開することができます。まずはログインして、あなたのブログを始めましょう。
          </p>
          <Link
            to="/login"
            className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600"
          >
            ログイン
          </Link>
        </div>
      )}
    </div>
  );
}
