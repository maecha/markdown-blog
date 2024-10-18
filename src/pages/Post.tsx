import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { Editor } from "@/components/Editor";
import { PostFormSchema } from "@/schemas/postSchema";
import { type Post } from "@/types/postTypes";
import LoadingErrorHandler from "@/components/LoadingErrorHandler";

export default function PostPage() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const fetchPost = async (): Promise<Post | null> => {
    if (!id) return null;

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    setTitle(data.title);
    setContent(data.content);

    return data as Post;
  };

  const savePost = async (
    newPost: { title: string; content: string },
    id?: string
  ) => {
    if (id) {
      const { error } = await supabase
        .from("posts")
        .update({ title: newPost.title, content: newPost.content })
        .eq("id", id);
      if (error) throw new Error(error.message);
      return { id };
    } else {
      const { data, error } = await supabase
        .from("posts")
        .insert([{ title: newPost.title, content: newPost.content }])
        .select();
      if (error) throw new Error(error.message);
      return { id: data?.[0].id };
    }
  };

  const { error, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: fetchPost,
    enabled: Boolean(id),
  });

  const savePostMutation = useMutation({
    mutationFn: async (newPost: { title: string; content: string }) => {
      return await savePost(newPost, id);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate(`/post/${data.id}`);
    },
  });

  const handleSubmit = async () => {
    const validationResult = PostFormSchema.safeParse({ title, content });
    if (!validationResult.success) {
      console.error("バリデーションエラー:", validationResult.error.errors);
      return;
    }

    savePostMutation.mutate({ title, content });
  };

  return (
    <LoadingErrorHandler isLoading={isLoading} error={error}>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">{id ? "編集" : "新規作成"}</h1>

        <label className="block text-lg font-medium mb-2" htmlFor="title">
          タイトル
        </label>
        <input
          id="title"
          type="text"
          placeholder="タイトルを入力してください"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full p-2 mb-4 border focus:border-sky-500 focus:outline-none rounded"
        />

        <Editor setContent={setContent} editorId="content" content={content} />

        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-sky-500 text-white rounded mt-4"
          disabled={isLoading}
        >
          {id ? "更新" : "作成"}
        </button>
      </div>
    </LoadingErrorHandler>
  );
}
