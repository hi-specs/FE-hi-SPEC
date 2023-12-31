import { TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonUsersAdmin = () => {
  return (
    <>
      {"1234567890".split("").map((index) => (
        <TableRow key={index}>
          <TableCell className="text-center">
            <Skeleton className="w-4 h-4 rounded-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[40px] h-4 rounded-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-12 h-12 rounded-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[120px] h-4 rounded-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[150px] h-4 rounded-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[230px] h-4 rounded-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[120px] h-4 rounded-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[160px] h-4 rounded-full" />
          </TableCell>
          <TableCell>
            <div className="flex justify-center items-center gap-4">
              <Skeleton className="w-8 h-8 rounded-full" />
              <Skeleton className="w-8 h-8 rounded-full" />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default SkeletonUsersAdmin;
