import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

interface EditorProps {
  setContent: (content: string) => void;
  editorId: string;
  content?: string;
}

export function Editor({ setContent, editorId, content = "" }: EditorProps) {
  const [isContentSet, setIsContentSet] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "内容を入力してください",
        emptyEditorClass:
          "relative first:before:absolute first:before:text-gray-400 first:before:content-[attr(data-placeholder)] first:before:pointer-events-none first:before:left-0 first:before:top-0",
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "block w-full border focus:border-sky-500 focus:outline-none p-4 rounded min-h-[200px]",
      },
    },
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content && !isContentSet) {
      editor.commands.setContent(content);
      setIsContentSet(true);
    }
  }, [editor, content, isContentSet]);

  const handleLabelClick = () => {
    if (editor) {
      editor.view.dom.focus();
    }
  };

  return (
    <>
      <label
        className="block text-lg font-medium mb-2"
        htmlFor={editorId}
        onClick={handleLabelClick}
      >
        コンテンツ
      </label>
      <EditorContent editor={editor} id={editorId} />
    </>
  );
}
