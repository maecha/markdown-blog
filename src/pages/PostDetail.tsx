import { useEffect, useRef, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import Modal from "@/components/Modal";

type Post = {
  id: number;
  title: string;
  content: string;
  created_at: Date;
};

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsPopoverOpen(false); // 外側をクリックするとPopoverを閉じる
      }
    };

    if (isPopoverOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopoverOpen]);

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
    navigate("/");
  };

  return (
    <div className="container mx-auto p-4">
      {post ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          {/* タイトル部分 */}
          <h1 className="text-4xl font-bold mb-4 text-center">{post.title}</h1>

          {/* ユーザー名と投稿日、Popoverボタンを横並びに配置 */}
          <div className="flex justify-between items-center mb-6">
            {/* 左側: ユーザー名と投稿日 */}
            <div className="text-gray-500 text-sm">
              <span className="font-medium">{"user_name"}</span>
              {" ・ "}
              <span>{new Date(post.created_at).toLocaleDateString()}</span>
            </div>

            {/* 右側: Popoverボタン */}
            <div className="relative" ref={popoverRef}>
              <button
                onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                className="px-4 py-2 text-black rounded flex items-center space-x-1"
              >
                {/* アクションボタンとして横並びの大きな点を使用 */}
                <span className="block w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
                <span className="block w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
                <span className="block w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
              </button>

              {isPopoverOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-10">
                  <ul>
                    <li>
                      <Link
                        to={`/post/edit/${post.id}`}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-t-lg"
                      >
                        編集
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setIsPopoverOpen(false);
                          setIsModalOpen(true);
                        }}
                        className="block w-full text-left px-4 py-2 text-red-400 hover:bg-gray-100 rounded-b-lg"
                      >
                        削除
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* コンテンツ部分（HTMLをレンダリング） */}
          <div
            className="prose max-w-none mb-6"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* 削除確認モーダル */}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={() => {
              handleDelete();
              setIsModalOpen(false);
            }}
          />
        </div>
      ) : (
        <p>読み込み中...</p>
      )}
    </div>
  );
}
