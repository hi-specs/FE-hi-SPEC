import { zodResolver } from "@hookform/resolvers/zod";
import { CameraIcon, Loader2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import SkeletonEditProfile from "@/components/SkeletonEditProfile";
import { CustomFormField } from "@/components/CustomForm";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Alert from "@/components/AlertDialog";
import { Form } from "@/components/ui/form";
import Layout from "@/components/Layout";

import {
  Profile,
  getProfile,
  updateProfile,
  deleteProfile,
  UpdateProfileSchema,
  updateProfileSchema,
} from "@/utils/apis/users";
import { useToken } from "@/utils/contexts/token";

import DefaultAvatar from "/images/default-avatar.png";

const EditProfile = () => {
  const { changeToken, refetchProfile } = useToken();
  const [profile, setProfile] = useState<Profile>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<UpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: profile?.name ?? "",
      email: profile?.email ?? "",
      address: profile?.address ?? "",
      phone_number: profile?.phone_number ?? "",
      password: "",
      newpassword: "",
      avatar: profile?.avatar ?? "",
    },
    values: {
      name: profile?.name!,
      email: profile?.email!,
      address: profile?.address!,
      phone_number: profile?.phone_number!,
      password: "",
      newpassword: "",
      avatar: "",
    },
  });

  useEffect(() => {
    fetchData();
  }, [form.formState.isSubmitSuccessful]);

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset();
    }
  }, [form.formState]);

  async function fetchData() {
    setIsLoading(true);
    try {
      const result = await getProfile();
      setProfile(result.data.user);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const fileRef = form.register("avatar", { required: false });
  async function onSubmit(data: UpdateProfileSchema) {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("address", data.address);
      formData.append("phone_number", data.phone_number);
      formData.append("newpassword", data.newpassword);
      formData.append("password", data.password);
      formData.append("avatar", data.avatar[0]);

      const result = await updateProfile(
        profile?.user_id as number,
        formData as any
      );
      toast({ description: result.message });
      refetchProfile();
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  async function handleDeleteProfile() {
    try {
      const result = await deleteProfile(profile?.user_id as number);
      toast({ description: result.message });
      navigate("/login");
      changeToken();
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  return (
    <Layout>
      <div className="grow bg-white shadow-lg rounded-xl p-4 md:p-8 lg:p-24 font-poppins dark:bg-transparent overflow-auto">
        {isLoading ? (
          <SkeletonEditProfile />
        ) : (
          <>
            <div className="h-fit flex items-center justify-between mb-16">
              <h1 className="text-2xl md:text-4xl lg:text-4xl font-bold">
                Edit Profile
              </h1>
              <Button
                type="button"
                aria-label="Close Edit Profile"
                className="w-fit h-fit block md:hidden"
                onClick={() => navigate(-1)}
              >
                <X size={14} />
              </Button>
            </div>
            <Form {...form}>
              <form
                className=" flex flex-col gap-6 relative"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="flex flex-col md:flex-row justify-center md:justify-between items-start md:items-center mb-12">
                  <div className="flex items-center">
                    <div className="flex items-center relative md:mb-0">
                      <img
                        src={profile?.avatar || DefaultAvatar}
                        alt={profile?.name}
                        loading="lazy"
                        className="object-cover rounded-full w-14 lg:w-36 h-14 lg:h-36 relative"
                      />
                      <label
                        htmlFor="input-image"
                        className="absolute bottom-0 right-0 cursor-pointer hidden lg:block"
                      >
                        <CameraIcon className="w-6 lg:w-10 h-6 lg:h-10 p-1 rounded-full bg-white dark:bg-black" />
                      </label>
                    </div>
                    <p className="ml-4 md:ml-8 text-xl md:text-3xl font-bold truncate">
                      {profile?.name}
                    </p>
                  </div>
                  <Button
                    onClick={() => navigate(-1)}
                    aria-label="Close Edit Profile"
                    className="hidden md:block w-fit h-fit"
                  >
                    <X size={35} />
                  </Button>
                </div>

                <CustomFormField
                  control={form.control}
                  name="name"
                  label="Full Name"
                >
                  {(field) => (
                    <Input
                      {...field}
                      placeholder="John Doe"
                      type="text"
                      disabled={form.formState.isSubmitting}
                      aria-disabled={form.formState.isSubmitting}
                    />
                  )}
                </CustomFormField>
                <div className="block lg:hidden">
                  <CustomFormField
                    control={form.control}
                    name="avatar"
                    label="Profile picture"
                  >
                    {() => (
                      <Input
                        {...fileRef}
                        type="file"
                        id="input-image"
                        aria-label="Profile Picture"
                        accept="image/jpg, image/jpeg, image/png"
                        className="cursor-pointer"
                        disabled={form.formState.isSubmitting}
                        aria-disabled={form.formState.isSubmitting}
                      />
                    )}
                  </CustomFormField>
                </div>
                <CustomFormField
                  control={form.control}
                  name="email"
                  label="Email"
                >
                  {(field) => (
                    <Input
                      {...field}
                      placeholder="johndoe@mail.com"
                      type="email"
                      disabled={form.formState.isSubmitting}
                      aria-disabled={form.formState.isSubmitting}
                    />
                  )}
                </CustomFormField>
                <CustomFormField
                  control={form.control}
                  name="password"
                  label="Old Password"
                >
                  {(field) => (
                    <Input
                      {...field}
                      placeholder="Old password"
                      type="password"
                      disabled={form.formState.isSubmitting}
                      aria-disabled={form.formState.isSubmitting}
                    />
                  )}
                </CustomFormField>
                <CustomFormField
                  control={form.control}
                  name="newpassword"
                  label="New Password"
                >
                  {(field) => (
                    <Input
                      {...field}
                      placeholder="New password"
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
                      placeholder="0819362731919"
                      type="tel"
                      disabled={form.formState.isSubmitting}
                      aria-disabled={form.formState.isSubmitting}
                    />
                  )}
                </CustomFormField>
                <div className="flex flex-col md:flex-row md:justify-between gap-2 items-center w-full">
                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    className="text-base bg-[#1FBB5C] text-white shadow-md px-10 w-full md:w-fit"
                  >
                    {form.formState.isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                        wait
                      </>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                  <p className="block md:hidden">or</p>
                  <Alert
                    title="Are you absolutely sure?"
                    description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
                    onAction={handleDeleteProfile}
                    onActionTitle="Continue"
                    style="w-full md:w-fit"
                  >
                    <Button
                      type="button"
                      variant={"destructive"}
                      className="text-base hover:bg-red-700 shadow-md w-full"
                    >
                      <p className="w-full">Delete Account</p>
                    </Button>
                  </Alert>
                </div>
              </form>
            </Form>
          </>
        )}
      </div>
    </Layout>
  );
};

export default EditProfile;
