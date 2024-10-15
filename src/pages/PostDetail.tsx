import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

type Post = {
  id: number;
  title: string;
  content: string;
  created_at: Date;
};

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const navigation = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();
      setPost(data as Post);
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    await supabase.from("posts").delete().eq("id", id);
    navigation("/");
  };

  return (
    <div className="container mx-auto p-4">
      {post ? (
        <>
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <p>{post.content}</p>
          <div className="mt-4">
            <Link
              to={`/post/${post.id}`}
              className="px-4 py-2 bg-yellow-500 text-white rounded"
            >
              編集
            </Link>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded ml-4"
            >
              削除
            </button>
          </div>
        </>
      ) : (
        <p>読み込み中...</p>
      )}
    </div>
  );
}
