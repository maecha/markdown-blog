interface ModalProps {
  title: string;
  body: string;
  isOpen: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  closeLabel?: string;
  confirmLabel?: string;
}

export default function Modal({
  title,
  body,
  isOpen,
  onClose,
  onConfirm,
  closeLabel = "キャンセル",
  confirmLabel = "OK",
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-xl mb-4">{title}</h2>
        <p>{body}</p>
        <div className="flex justify-end mt-8">
          {onClose && (
            <button
              onClick={onClose}
              className="px-4 py-2 mr-4 bg-stone-200 text-black rounded"
            >
              {closeLabel}
            </button>
          )}
          {onConfirm && (
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-400 text-white rounded"
            >
              {confirmLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
