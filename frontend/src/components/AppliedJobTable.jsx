import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  useGetAppliedJobs();
  const { allAppliedJobs } = useSelector((store) => store.job);
  // console.log("🚀 ~ AppliedJobTable ~ allAppliedJobs:", allAppliedJobs);

  return (
    <div>
      <Table>
        <TableCaption>A List of your Applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs?.map((item) => (
            <TableRow key={item?._id}>
              <TableCell>{item?.createdAt}</TableCell>
              <TableCell>{item?.job?.title}</TableCell>
              <TableCell>{item?.job?.company?.name}</TableCell>
              <TableCell className="text-right">
                <Badge
                  className={`${
                    (item?.status == "rejected") 
                    ? ("bg-red-400")
                    : (
                        item?.status == "pending"
                        ? "bg-yellow-400"
                        : "bg-green-400"
                      )
                  }`}
                >
                  {item?.status?.toUpperCase()}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
