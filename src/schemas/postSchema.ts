import { z } from "zod";

export const PostFormSchema = z.object({
  title: z.string().min(1, "タイトルは必須です"),
  content: z.string().min(1, "コンテンツは必須です"),
});

export type PostFormInput = z.infer<typeof PostFormSchema>;
