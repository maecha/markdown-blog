import { supabase } from "@/lib/supabaseClient";
import { Link } from "react-router-dom";
import { type Post } from "@/types/postTypes";
import { useUserStore } from "@/stores/userStore";
import { useQuery } from "@tanstack/react-query";
import LoadingErrorHandler from "@/components/LoadingErrorHandler";

export default function Home() {
  const { user } = useUserStore();

  const fetchPosts = async (): Promise<Post[]> => {
    if (!user) return [];

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.error("投稿取得エラー:", error.message);
      return [];
    }

    return data as Post[];
  };

  const {
    data: posts,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    enabled: !!user,
  });

  return (
    <LoadingErrorHandler isLoading={isLoading} error={error}>
      <div className="container mx-auto max-w-full sm:max-w-[620px] sm:py-2 md:px-5">
        {user ? (
          <div>
            {posts && posts.length > 0 ? (
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
    </LoadingErrorHandler>
  );
}
