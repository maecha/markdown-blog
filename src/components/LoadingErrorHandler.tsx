import { ReactNode } from "react";

type Props = {
  isLoading: boolean;
  error: Error | null;
  children: ReactNode;
};

export default function LoadingErrorHandler({
  isLoading,
  error,
  children,
}: Props) {
  if (isLoading) {
    return <p>読み込み中...</p>;
  }

  if (error) {
    return (
      <p className="text-red-400">
        エラーが発生しました: {error.message as string}
      </p>
    );
  }

  return <>{children}</>;
}
