import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

import { CustomFormField } from "@/components/CustomForm";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";

import {
  RegisterSchema,
  registerSchema,
  registerAccount,
} from "@/utils/apis/auth";

const RegisterForm = () => {
  const { toast } = useToast();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      repassword: "",
      address: "",
      phone_number: "",
    },
  });

  async function onSubmitRegister(data: RegisterSchema) {
    try {
      const result = await registerAccount(data);

      toast({ description: result.message });
    } catch (error: any) {
      toast({
        title: "Oops, something went wrong!",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  return (
    <div className="font-poppins">
      <h1>Register your account now to get full access</h1>
      <Form {...form}>
        <form
          className="flex flex-col w-full mx-auto gap-4 mt-10 text-start"
          onSubmit={form.handleSubmit(onSubmitRegister)}
        >
          <CustomFormField control={form.control} name="name" label="Full Name">
            {(field) => (
              <Input
                {...field}
                placeholder="Jhon Doe"
                type="text"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
              />
            )}
          </CustomFormField>

          <CustomFormField control={form.control} name="email" label="Email">
            {(field) => (
              <Input
                {...field}
                placeholder="jhondoe@gmail.com"
                type="email"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
              />
            )}
          </CustomFormField>

          <CustomFormField
            control={form.control}
            name="password"
            label="Password"
          >
            {(field) => (
              <Input
                {...field}
                placeholder="Minimum 8 characters"
                type="password"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
              />
            )}
          </CustomFormField>

          <CustomFormField
            control={form.control}
            name="repassword"
            label="Confirm Password"
          >
            {(field) => (
              <Input
                {...field}
                placeholder="Confirm Password"
                type="password"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
              />
            )}
          </CustomFormField>

          <CustomFormField
            control={form.control}
            name="address"
            label="Address"
          >
            {(field) => (
              <Input
                {...field}
                placeholder="e.g: Jl. Veteran, Kec. Lowokwaru, Kota Malang, Jawa Timur"
                type="text"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
              />
            )}
          </CustomFormField>

          <CustomFormField
            control={form.control}
            name="phone_number"
            label="Phone Number"
          >
            {(field) => (
              <Input
                {...field}
                placeholder="e.g: +6281936273191"
                type="text"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
              />
            )}
          </CustomFormField>
          <Button
            type="submit"
            className="hover:bg-[#1265AE] mt-4"
            disabled={form.formState.isSubmitting}
            aria-disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <p>Please wait</p>
              </>
            ) : (
              <div className="flex cursor-pointer">
                <p className="font-medium tracking-wide text-white">Register</p>
              </div>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
