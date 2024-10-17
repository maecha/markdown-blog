# Markdown Blog (beta)

これは **Supabase** と **Vercel** を活用して構築した、認証付き Markdown ブログです。ユーザーはログインしてブログを作成、編集、削除することができます。

このプロジェクトは Vercel でデプロイされています。デプロイされたサイトは [こちら](https://markdown-blog-roan.vercel.app) です。

## 主な機能

- 認証（サインアップ、ログイン、ログアウト）
- Markdown をサポートした記事の作成・編集
- 投稿の一覧表示・詳細表示・削除

## 技術スタック

- **React**: UI を構築
- **Tailwind CSS**: UI スタイリング
- **Zod**: スキーマバリデーション
- **Vite**: 開発・ビルドツール
- **Zustand**: 状態管理
- **TanStack Query**: データフェッチとキャッシング
- **tiptap**: リッチテキストエディタ
- **Supabase**: 認証、データベース管理
- **Vercel**: デプロイプラットフォーム

## 環境構築手順

### 必要な環境

- Node.js: 20.18.0
- npm: 10.8.2

### クローンとセットアップ

```bash
git clone https://github.com/your-username/markdown-blog.git
cd markdown-blog
npm install
```

### 環境変数

Supabase の認証やデータベース接続に必要な環境変数を .env ファイルに設定してください。

```.env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 開発サーバーの起動

```bash
npm run dev
```

## 今後やるとさらに良くなりそうなもの（リファクタリングや機能追加 etc）

- アーキテクチャ・ディレクトリ構成を検討する
- API 通信が冗長なのでよくしたい
- エラーハンドリングをちゃんとする
  - 今は型推論に頼っていて、catch したエラー内容をそのまま表示している
- 言語ファイルを作って固定文字列を管理したい
- プロフィールページを作ってユーザー情報を更新できるようにする
  - メールアドレスやパスワードの変更、アイコンを設定できたりなど
- 投稿検索機能
- 投稿一覧のページング機能
