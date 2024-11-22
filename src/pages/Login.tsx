import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";
import { LoginFormSchema } from "@/schemas/userSchema";
import Modal from "@/components/Modal";

export default function Login() {
  const { userId, setUserId } = useAuthStore();
  const { fetchUser } = useUserStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      navigate("/");
    }
  }, [userId, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const validationResult = LoginFormSchema.safeParse({ email, password });
    if (!validationResult.success) {
      console.error("バリデーションエラー:", validationResult.error.errors);
      return;
    }

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw new Error(error.message);

        setIsModalOpen(true);
        return;
      }

      const { data: signInData, error } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });
      if (error) throw new Error(error.message);

      if (signInData?.user) {
        setUserId(signInData.user.id); // userId のみをローカルストレージに保存
        await fetchUser(); // ユーザー情報をフェッチしてキャッシュ
        navigate("/");
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "不明なエラーが発生しました";

      setErrorMessage(`エラー: ${errorMessage}`);
      console.error("認証エラー:", errorMessage);
    }
  };

  return (
    <div className="container mx-auto max-w-md p-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        {isSignUp ? "サインアップ" : "ログイン"}
      </h1>

      {errorMessage && <p className="text-red-400 mb-4">{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full p-2 mb-4 border focus:border-sky-500 focus:outline-none rounded"
          required
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full p-2 mb-4 border focus:border-sky-500 focus:outline-none rounded"
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-sky-500 text-white rounded"
        >
          {isSignUp ? "サインアップ" : "ログイン"}
        </button>
      </form>
      <p className="mt-4 text-center">
        {isSignUp
          ? "既にアカウントをお持ちですか？"
          : "アカウントをお持ちでないですか？"}{" "}
        <button
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-sky-500 hover:underline"
        >
          {isSignUp ? "ログイン" : "サインアップ"}
        </button>
      </p>

      <Modal
        title="アカウントを作成しました"
        body="認証メールを送信しました。メールを確認してください。"
        isOpen={isModalOpen}
        onConfirm={() => {
          setIsModalOpen(false);
        }}
        confirmLabel="OK"
      />
    </div>
  );
}
