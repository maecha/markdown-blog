import { useEffect, useRef, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "@/stores/userStore";
import { supabase } from "@/lib/supabaseClient";
import { type Post } from "@/types/postTypes";
import Modal from "@/components/Modal";
import LoadingErrorHandler from "@/components/LoadingErrorHandler";

export default function PostDetail() {
  const { id } = useParams();
  const { user } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const fetchPost = async (): Promise<Post | null> => {
    if (!id) return null;

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", Number(id))
      .single();

    if (error) {
      console.error("投稿取得エラー:", error.message);
      return null;
    }

    return data as Post;
  };

  const {
    data: post,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: fetchPost,
    enabled: !!user,
  });

  const deletePost = async (id: number) => {
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) {
      throw new Error(error.message);
    }
  };

  const deletePostMutation = useMutation({
    mutationFn: async () => {
      if (id) {
        return await deletePost(Number(id));
      }
    },
    onSuccess: () => {
      if (id) {
        queryClient.invalidateQueries({ queryKey: ["post", id] });
      }

      queryClient.invalidateQueries({ queryKey: ["posts"] });

      navigate("/");
    },
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsPopoverOpen(false);
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

  return (
    <LoadingErrorHandler isLoading={isLoading} error={error}>
      <div>
        {post && user ? (
          <div className="break-words">
            <h1 className="text-3xl font-bold mt-2 mb-8">{post.title}</h1>

            <div className="flex justify-between items-center mb-8">
              <div className="text-gray-500 text-sm">
                <span className="font-medium">{user.email}</span>
                {" ・ "}
                <span>{new Date(post.created_at).toLocaleDateString()}</span>
              </div>

              <div className="relative" ref={popoverRef}>
                <button
                  onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                  className="py-2 text-black rounded flex items-center space-x-1"
                >
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

            <div
              className="prose max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <Modal
              title="削除してもよろしいですか？"
              body="本当に、本当に、本当にいいんですか！？"
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onConfirm={() => {
                deletePostMutation.mutate();
                setIsModalOpen(false);
              }}
              closeLabel="キャンセル"
              confirmLabel="削除"
            />
          </div>
        ) : (
          <p>読み込み中...</p>
        )}
      </div>
    </LoadingErrorHandler>
  );
}
