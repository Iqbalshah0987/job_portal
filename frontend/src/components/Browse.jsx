import { useDispatch, useSelector } from "react-redux";
import Job from "./Job";
import { useEffect } from "react";
import { setSearchQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Browse = () => {

    useGetAllJobs();
    const {allJobs, searchQuery} = useSelector(store => store.job);
    const dispatch = useDispatch();
    // console.log("🚀 ~ Browse ~ searchQuery:", searchQuery)

    useEffect(()=>{
        return ()=>{
            dispatch(setSearchQuery(""));
        }
    }, []);

  return (
    <div>
        <div className="max-w-7xl mx-auto my-10">
            <h1 className="font-bold text-xl my-10">Search Results ({allJobs.length})</h1>
            <div className="grid grid-cols-3 gap-4">

                {
                    allJobs.map((job, index)=>{
                        return (
                            <Job key={index} job={job} />
                        );
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default Browse