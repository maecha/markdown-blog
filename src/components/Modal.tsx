interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function Modal({ isOpen, onClose, onConfirm }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-xl mb-4">削除してもよろしいですか？</h2>
        <p>本当に、本当に、本当にいいんですか！？</p>
        <div className="flex justify-end mt-8">
          <button
            onClick={onClose}
            className="px-4 py-2 mr-4 bg-stone-200 text-black rounded"
          >
            キャンセル
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-400 text-white rounded"
          >
            削除
          </button>
        </div>
      </div>
    </div>
  );
}
