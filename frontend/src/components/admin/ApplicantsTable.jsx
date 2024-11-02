import { MoreHorizontal } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { useDispatch, useSelector } from 'react-redux';
import { APPLICATION_API_END_POINT, DOMAIN } from '@/utils/constant';
import { toast } from 'sonner';
import axios from 'axios';
import { setApplicants } from '@/redux/applicationSlice';

const shortListingStatus = ['Accepted', 'Rejected'];

const ApplicantsTable = () => {

    const {applicants} = useSelector(store => store.application);
    const dispatch = useDispatch();

    const statusHandler = async (status, id) =>{
        // console.log(status, id);
        try {
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`,{status}, {withCredentials: true});
            // console.log(res);
            if(res.data.success){
                toast.success(res.data.message);
                const newApp = {...applicants,  applications:applicants.applications.map((app)=>{
                    if(app._id==id){
                        return {...app, status:status.toLowerCase()};
                    }
                    return {...app};
                })  }
                // console.log(newApp);
                dispatch(setApplicants(newApp));
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }
    }

  return (
    <div>
        <Table>
            <TableCaption>A list of your applied users</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Resume</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    applicants?.applications?.map((app)=>{
                        return (
                            <TableRow key={app?._id}>
                                <TableCell>{app?.applicant?.fullname}</TableCell>
                                <TableCell>{app?.applicant?.email}</TableCell>
                                <TableCell>{app?.applicant?.phoneNubmer}</TableCell>
                                <TableCell><a className='text-blue-600 cursor-pointer' href={`${DOMAIN}/uploads/${app?.applicant?.profile?.resume}`} target='_blank'>{app?.applicant?.profile?.resumeOriginalName}</a></TableCell>
                                <TableCell>{app?.status}</TableCell>
                                <TableCell>{app?.createdAt}</TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            {
                                                shortListingStatus.map((status, index)=>{
                                                    return (
                                                        <div key={index} className='flex w-fit items-center mb-2 cursor-pointer' onClick={()=>statusHandler(status, app?._id)}>
                                                            <span>{status}</span>
                                                        </div>
                                                    )
                                                })
                                            }
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

export default ApplicantsTable