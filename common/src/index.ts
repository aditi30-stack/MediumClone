import z from "zod";

export const signupInput = z.object({
    username: z.string().email(),
    password: z.string(),
    name: z.string(),
});

export type SignupType = z.infer<typeof signupInput>;

export const signinInput = z.object({
    username: z.string().email(),
    password: z.string(),
});

export type SigninType = z.infer<typeof signinInput>;

export const createPostInput = z.object({
    title: z.string(),
    content: z.string(),
});

export type CreatePostType = z.infer<typeof createPostInput>;

export const updatePostInput = z.object({
    title: z.string(),
    content: z.string(),
    published:z.boolean()
});

export type UpdatePostType = z.infer<typeof updatePostInput>;