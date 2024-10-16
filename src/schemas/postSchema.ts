import { z } from "zod";

// 完全な Post スキーマ
export const PostSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  title: z.string().min(1, "タイトルは必須です"),
  content: z.string().min(1, "コンテンツは必須です"),
});

// Zod スキーマから生成した Post 型
export type Post = z.infer<typeof PostSchema>;

// フォームバリデーション用のスキーマ
export const PostFormSchema = PostSchema.pick({
  title: true,
  content: true,
});
