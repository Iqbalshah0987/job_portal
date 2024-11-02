import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Eye, MoreHorizontal } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'

const AdminJobsTable = () => {

    useGetAllAdminJobs()
    const {allAdminJobs, searchJobByText} = useSelector(store => store.job);
    const navigate = useNavigate();
    
    const [filterJob, setFilterJob] = useState(allAdminJobs);

    useEffect(()=>{
        const filteredJob = allAdminJobs.length>0 && allAdminJobs.filter((job)=>{
            if(!searchJobByText){
                return true;
            }
            return (
                job?.title?.toLowerCase().includes(searchJobByText.toLowerCase())
                || job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
            );
        });
        setFilterJob(filteredJob);
    }, [allAdminJobs, searchJobByText]);

  return (
    <div>
        <Table>
            <TableCaption>A list of your posted Jobs</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Company Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    filterJob?.map((job)=>{
                        // console.log(job);
                        return (
                            <TableRow key={job?._id}>
                                <TableCell>{job?.title}</TableCell>
                                <TableCell>{job?.company?.name}</TableCell>
                                <TableCell>{job?.jobType}</TableCell>
                                <TableCell>{job?.createdAt}</TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            {/* <div className='flex items-center gap-2 w-fit cursor-pointer' onClick={()=> navigate(`/admin/jobs/${job?._id}`)}>
                                                <Edit2 className='w-4'/>
                                                <span>Edit</span>
                                            </div> */}
                                            <div className='flex items-center gap-2 w-fit cursor-pointer' onClick={()=> navigate(`/admin/jobs/${job?._id}/applicants`)}>
                                                <Eye className='w-4'/>
                                                <span>Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        );
                    })
                }
            </TableBody>
        </Table>
    </div>
  )
}

export default AdminJobsTable