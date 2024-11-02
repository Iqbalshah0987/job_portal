import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {

    const navigate = useNavigate();

    const daysAgo = (mongodbTime)=>{
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDiff = currentTime - createdAt;

        const day = Math.floor(timeDiff/ (24*60*60*1000));
        let ago_text = '';
        if(day===0){
            ago_text = "Today";
        }else if(day==1){
            ago_text = "1 day ago"
        }else{
            ago_text = `${day} days ago`;
        }

        return ago_text;
    }

  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-200'>
        <div className='flex items-center justify-between'>
            <p className='text-sm text-gray-500'>{daysAgo(job?.createdAt)}</p>
            <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>
        </div>

        <div className='flex items-center gap-2 my-2'>
            <Button className="p-6" variant="outline" size="icon">
                <Avatar>
                    <AvatarImage src={(job.company.logo)? (job?.company?.logo):'https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg'} />
                </Avatar>
            </Button>
            <div>
                <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-500'>India</p>
            </div>
        </div>

        <div>
            <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
            <p className='text-sm text-gray-600'>{job?.discription}</p>
        </div>

        <div className="flex items-center flex-wrap gap-2 mt-4">
            <Badge className="text-blue-700 font-bold" variant="ghost">{job?.position} Positions</Badge>
            <Badge className="text-[#F83002] font-bold" variant="ghost">{job?.jobType}</Badge>
            <Badge className="text-[#7209b7] font-bold" variant="ghost">{job?.salary} LPA</Badge>
        </div>
        <div className='flex items-center flex-wrap gap-4 mt-4'>
            <Button variant="outline" onClick={()=>navigate(`/description/${job?._id}`)}>Details</Button>
            <Button className="bg-[#7209b7]">Save for Later</Button>
        </div>
    </div>
  )
}

export default Job