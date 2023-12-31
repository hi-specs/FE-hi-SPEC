import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CustomFormField } from "@/components/CustomForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";

const RangeSchema = z.object({
  minPrice: z
    .string()
    .min(1, { message: "Min 1 digit" })
    .max(9, { message: "Maxs 9 digit" })
    .refine((data) => /^[1-9]\d*$/.test(data), {
      message: "Angka pertama tidak boleh 0",
    }),
  maxPrice: z
    .string()
    .min(1, { message: "Min 1 digit" })
    .max(9, { message: "Maxs 9 digit" })
    .refine((data) => /^[1-9]\d*$/.test(data), {
      message: "Angka pertama tidak boleh 0",
    }),
});

interface Props {
  isOpen: string;
}

const RangeBudgetBox = (props: Props) => {
  const { isOpen } = props;

  const [searchParams, setSearchParams] = useSearchParams();

  const form = useForm<z.infer<typeof RangeSchema>>({
    resolver: zodResolver(RangeSchema),
    defaultValues: {
      minPrice: "",
      maxPrice: "",
    },
  });

  async function onSubmit(data: z.infer<typeof RangeSchema>) {
    if (data.maxPrice !== "" && data.minPrice !== "") {
      searchParams.set("minprice", data.minPrice);
      searchParams.set("maxprice", data.maxPrice);
      searchParams.delete("page");
    } else {
      searchParams.delete("minprice");
      searchParams.delete("maxprice");
    }
    setSearchParams(searchParams);
  }

  return (
    <div
      className={
        isOpen === "true"
          ? `translate-x-0 w-fit flex flex-col opacity-100 transition-all`
          : `-translate-x-28 w-0 opacity-50 transition-all hidden`
      }
    >
      <h1 className="font-medium">Range on budget :</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
          <CustomFormField control={form.control} name="minPrice">
            {(field) => (
              <Input
                {...field}
                placeholder="Rp. Minimum"
                type="number"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
                className="border rounded-md outline-none shadow placeholder:text-sm dark:bg-black"
              />
            )}
          </CustomFormField>
          <p className="text-center leading-none">to</p>
          <CustomFormField control={form.control} name="maxPrice">
            {(field) => (
              <Input
                {...field}
                placeholder="Rp. Maximum"
                type="number"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
                className="border rounded-md outline-none shadow placeholder:text-sm dark:bg-black"
              />
            )}
          </CustomFormField>
          <Button
            type="submit"
            className="h-fit bg-[#48B774] w-full text-white mt-2"
          >
            <p className="font-semibold ">Submit</p>
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RangeBudgetBox;
