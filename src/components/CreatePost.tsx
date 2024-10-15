import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Editor } from "@/components/Editor";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createPost = async () => {
    const { error } = await supabase.from("posts").insert([{ title, content }]);

    if (error) console.error("Error creating post:", error);
    else {
      setTitle("");
      setContent("");
    }
  };

  return (
    <div>
      <h2>ブログを書いてみましょう！</h2>
      <input
        type="text"
        placeholder="タイトルを入力してください"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Editor setContent={setContent} editorId="content" />
      <button onClick={createPost}>送信</button>
    </div>
  );
}
