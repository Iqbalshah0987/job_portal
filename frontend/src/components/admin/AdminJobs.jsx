import { Input } from '../ui/input'
import { Button } from '../ui/button'
import AdminJobsTable from './AdminJobsTable'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchJobByText } from '@/redux/jobSlice'

const AdminJobs = () => {

    const navigate = useNavigate();
    const [input, setInput] = useState('');
    const dispatch = useDispatch();

    useEffect(()=>{
      dispatch(setSearchJobByText(input));
    }, [input]);

  return (
    <div className='max-w-6xl mx-auto my-10'>
        <div className=' flex items-center justify-between my-5'>
            <Input className="w-fit" placeholder="Filter by job title and company name" onChange={(e)=> setInput(e.target.value)} />
            <Button onClick={()=> navigate("/admin/jobs/create")}>Post New Jobs</Button>
        </div>
        <AdminJobsTable />

    </div>
  )
}

export default AdminJobs