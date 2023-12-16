import * as z from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const statusSchema = z.object({
  category: z.string().min(1, { message: "Category is required" }),
});

export const addProductSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  image: z
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, and .png files are accepted."
    )
    .optional()
    .or(z.literal("")),
});

export const editProductSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  cpu: z.boolean(),
  ram: z.string(),
  display: z.string(),
  storage: z.string(),
  thickness: z.string(),
  weight: z.string(),
  bluetooth: z.string(),
  hdmi: z.string(),
  price: z.number(),
  category: z.string().min(1, { message: "Category is required" }),
  image: z
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, and .png files are accepted."
    )
    .optional()
    .or(z.literal("")),
});

export type StatusSchema = z.infer<typeof statusSchema>;
export type AddProductSchema = z.infer<typeof addProductSchema>;
export type EditProductSchema = z.infer<typeof editProductSchema>;

export type Transactions = {
  transactionID: number;
  product_id: number;
  totalPrice: number;
  status: string;
  timestamp: Date;
};