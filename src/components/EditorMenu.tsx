import { BubbleMenu, type Editor } from "@tiptap/react";

interface MenuProps {
  editor: Editor | null;
}

export default function EditorMenu({ editor }: MenuProps) {
  if (!editor) {
    return null;
  }

  return (
    <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
      <div className="menu bg-white shadow-lg rounded-lg p-2 flex space-x-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 rounded-lg ${
            editor.isActive("bold")
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-200"
          }`}
        >
          <b className="font-bold">B</b>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 rounded-lg ${
            editor.isActive("italic")
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-200"
          }`}
        >
          <i className="italic">I</i>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-2 py-1 rounded-lg ${
            editor.isActive("strike")
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-200"
          }`}
        >
          <s className="line-through">S</s>
        </button>
      </div>
    </BubbleMenu>
  );
}
