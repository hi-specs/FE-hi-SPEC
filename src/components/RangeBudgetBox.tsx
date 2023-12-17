import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { CustomFormField } from "@/components/CustomForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

interface Props {
  isOpen: boolean;
}

const RangeSchema = z.object({
  minPrice: z.string().min(1, { message: "Required" }),
  maxPrice: z.string().min(1, { message: "Required" }),
});

const RangeBudgetBox = (props: Props) => {
  const { isOpen } = props;

  const [price, setPrice] = useSearchParams();

  const form = useForm<z.infer<typeof RangeSchema>>({
    resolver: zodResolver(RangeSchema),
    defaultValues: {
      minPrice: "",
      maxPrice: "",
    },
  });

  async function onSubmit(data: z.infer<typeof RangeSchema>) {
    setPrice({ minPrice: data.minPrice, maxPrice: data.maxPrice });
  }

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset();
    }
  }, [form.formState]);

  return (
    <div
      className={
        isOpen
          ? `translate-x-0 w-fit flex flex-col gap-4 opacity-100 transition-all`
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
                className="rounded-md placeholder:text-sm outline-none dark:bg-black px-4 py-1 border shadow"
              />
            )}
          </CustomFormField>
          <p className="text-center">to</p>
          <CustomFormField control={form.control} name="maxPrice">
            {(field) => (
              <Input
                {...field}
                placeholder="Rp. Maximum"
                type="number"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
                className="rounded-md placeholder:text-sm outline-none dark:bg-black px-4 py-1 border shadow"
              />
            )}
          </CustomFormField>
          <Button type="submit" className=" h-fit w-full bg-[#48B774] mt-6">
            <p className="font-medium">Submit</p>
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RangeBudgetBox;