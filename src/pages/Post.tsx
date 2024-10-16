import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { Editor } from "@/components/Editor";

export default function Post() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigation = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        const { data } = await supabase
          .from("posts")
          .select("*")
          .eq("id", id)
          .single();
        if (data) {
          setTitle(data.title);
          setContent(data.content);
        }
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async () => {
    if (id) {
      await supabase.from("posts").update({ title, content }).eq("id", id);
    } else {
      await supabase.from("posts").insert([{ title, content }]);
    }
    navigation("/");
  };

  return (
    <div className="container mx-auto p-4">
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
      >
        {id ? "更新" : "作成"}
      </button>
    </div>
  );
}
