import { useSelector } from 'react-redux';
import FilterCard from './FilterCard'
import Job from './Job';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';


// const jobsArray = [1,2,3,4,5,6,7,8];

export const Jobs = () => {

    const {allJobs, searchQuery} = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(()=>{
        if(searchQuery){
            const filteredJobs = allJobs.filter((job)=>{
                return (
                    job.title.toLowerCase().includes(searchQuery.toLowerCase())
                    || job.description.toLowerCase().includes(searchQuery.toLowerCase())
                    || job.location.toLowerCase().includes(searchQuery.toLowerCase())
                )
            }) ;
            setFilterJobs(filteredJobs);
        }else{
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchQuery]);

  return (
    <div className='max-w-7xl mx-auto mt-5'>
        <div className='flex gap-5'>
            {/* filters */}
            <div className='w-20%'>
                <FilterCard />
            </div>

            {/* job cards */}
            <div className='flex-1 pb-5'>
            {
                filterJobs.length<=0 ? <span>Job not Found</span>:(
                    <div className='grid grid-cols-3 gap-4'>
                        {
                            filterJobs.map((job) => {
                                return (<motion.div 
                                        initial={{opacity:0, x:100}}
                                        animate={{opacity: 1, x:0}}
                                        exit={{opacity:0, x: 100}}
                                        transition={{duration: 0.3}}
                                        key={job._id}
                                    >
                                    <Job job={job} />
                                </motion.div>);
                            })
                        }
                    </div>
                )
            }
            </div>

        </div>
    </div>
  )
}
