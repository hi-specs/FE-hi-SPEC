import { Skeleton } from "@/components/ui/skeleton";

const SkeletonEditProfile = () => {
  return (
    <>
      <h1 className=" mb-16 text-3xl lg:text-4xl font-bold">Edit Profile</h1>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
        <div className="flex items-center mb-10 md:mb-0">
          <Skeleton className="rounded-full w-14 lg:w-36 h-14 lg:h-36 shadow-md" />
          <Skeleton className="w-[240px] h-8 ml-4 md:ml-8 rounded-full" />
        </div>
        <Skeleton className="w-[50px] h-12" />
      </div>
      <div>
        <p className=" font-semibold mb-4 text-xl">Full Name</p>
        <div className="border rounded-md p-4 mb-4">
          <Skeleton className="w-[130px] h-4 rounded-full" />
        </div>
        <p className=" font-semibold mb-4">Email</p>
        <div className="border p-4 mb-4 rounded-md">
          <Skeleton className="w-[330px] h-4 rounded-full" />
        </div>
        <p className="font-semibold mb-4">Old Password</p>
        <div className=" border p-4 mb-4 rounded-md">
          <Skeleton className="w-[230px] h-4 rounded-full" />
        </div>
        <p className="font-semibold mb-4">New Password</p>
        <div className=" border p-4 mb-4 rounded-md">
          <Skeleton className="w-[230px] h-4 rounded-full" />
        </div>
        <p className=" font-semibold mb-4">Address</p>
        <div className=" border p-4 mb-4 rounded-md">
          <Skeleton className="w-[330px] h-4 rounded-full" />
        </div>
        <p className="font-semibold mb-4">Phone Number</p>
        <div className=" border p-4 mb-4 rounded-md">
          <Skeleton className="w-[180px] h-4 rounded-full" />
        </div>
      </div>
      <div className="flex justify-between">
        <Skeleton className="w-[120px] h-12" />
        <Skeleton className="w-[160px] h-12" />
      </div>
    </>
  );
};

export default SkeletonEditProfile;
