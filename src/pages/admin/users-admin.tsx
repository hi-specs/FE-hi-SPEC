import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import debounce from "lodash.debounce";
import { format } from "date-fns";

import { useToast } from "@/components/ui/use-toast";
import Pagination from "@/components/Pagination";
import Layout from "@/components/Layout";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { AllUser, getUser } from "@/utils/apis/users";
import { Meta } from "@/utils/types/api";

const UsersAdmin = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<AllUser[]>();
  const [meta, setMeta] = useState<Meta>();
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  async function fetchData() {
    setIsLoading(true);
    try {
      const query = Object.fromEntries([...searchParams]);
      const result = await getUser({ ...query });

      setUsers(result.data);
      setMeta(result.pagination);
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

  function handleSearch(value: string) {
    if (value !== "") {
      searchParams.set("name", value);
      searchParams.delete("page");
    } else {
      searchParams.delete("name");
    }
    setSearchParams(searchParams);
  }

  const debounceRequest = debounce(
    (search: string) => handleSearch(search),
    500
  );

  function handlePrevNextPage(page: string | number) {
    searchParams.set("page", String(page));
    setSearchParams(searchParams);
  }

  return (
    <Layout>
      <div className="px-3 md:px-10 py-8 bg-white dark:bg-[#1265ae24] rounded-xl flex flex-col grow shadow-products-card font-poppins overflow-auto">
        <h1 className="text-2xl font-medium text-center mb-6 md:mb-0">
          Database Users
        </h1>
        <div className="flex mb-6 md:mb-10">
          <input
            type="search"
            onChange={(e) => debounceRequest(e.target.value)}
            placeholder="Search by name user"
            className="w-fit placeholder:italic placeholder:text-sm outline-none py-2 px-4 rounded-lg dark:bg-transparent shadow dark:shadow-white"
          />
        </div>
        <div className="flex justify-center grow overflow-auto">
          {isLoading ? (
            <div className="flex items-center h-full">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <p>Loading</p>
            </div>
          ) : (
            <Table>
              <TableCaption>A list of your recent Users.</TableCaption>
              <TableHeader className="sticky top-0 bg-white dark:bg-[#05152D]">
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Phone Number</TableHead>
                  <TableHead>Create at</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users?.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <img
                        src={
                          user.avatar ||
                          "https://mlsn40jruh7z.i.optimole.com/w:auto/h:auto/q:mauto/f:best/https://jeffjbutler.com//wp-content/uploads/2018/01/default-user.png"
                        }
                        alt={user.name}
                        className="object-cover bg-center rounded-full w-10 h-10 lg:w-14 lg:h-14"
                      />
                    </TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.address}</TableCell>
                    <TableCell>{user.phone_number}</TableCell>
                    <TableCell>
                      {format(new Date(user.time), "iiii, dd MMMM Y")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
        <div className="mt-4">
          <Pagination
            meta={meta}
            onClickPage={(page) => handlePrevNextPage(page)}
            onClickNext={() => handlePrevNextPage(meta?.page! + 1)}
            onClickPrevious={() => handlePrevNextPage(meta?.page! - 1)}
          />
        </div>
      </div>
    </Layout>
  );
};

export default UsersAdmin;