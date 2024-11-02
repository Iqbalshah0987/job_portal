import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { setLoading } from "@/redux/authSlice";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useNavigate } from "react-router-dom";


const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });
  const { companies } = useSelector((store) => store.company);
  const {loading} = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputChangeHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const selectChangeHandler = (value) => {
    setInput({
      ...input,
      companyId: value,
    });
  };

  const submitHandler = async (e)=>{
    e.preventDefault();
    // console.log(input);
    try {
        dispatch(setLoading(true));
        const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });
        // console.log(res);
        if(res.data.success){
            toast.success(res.data.message);
            navigate("/admin/jobs");
        }
        
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
    }finally{
        dispatch(setLoading(false));
    }
  }

  return (
    <div className="flex items-center justify-center w-screen my-5">
      <form onSubmit={submitHandler} className="p-8 max-w-4xl border-gray-200 shadow-lg rounded-md">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              value={input.title}
              onChange={inputChangeHandler}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              value={input.description}
              onChange={inputChangeHandler}
            />
          </div>
          <div>
            <Label>Requirements</Label>
            <Input
              type="text"
              name="requirements"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              value={input.requirements}
              onChange={inputChangeHandler}
            />
          </div>
          <div>
            <Label>Salary</Label>
            <Input
              type="text"
              name="salary"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              value={input.salary}
              onChange={inputChangeHandler}
            />
          </div>
          <div>
            <Label>Location</Label>
            <Input
              type="text"
              name="location"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              value={input.location}
              onChange={inputChangeHandler}
            />
          </div>
          <div>
            <Label>Job Type</Label>
            <Input
              type="text"
              name="jobType"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              value={input.jobType}
              onChange={inputChangeHandler}
            />
          </div>
          <div>
            <Label>Experience</Label>
            <Input
              type="text"
              name="experience"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              value={input.experience}
              onChange={inputChangeHandler}
            />
          </div>
          <div>
            <Label>No. of Position</Label>
            <Input
              type="number"
              name="position"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              value={input.position}
              onChange={inputChangeHandler}
            />
          </div>
          <div>
            <Label>Choose Company</Label>
            <Select onValueChange={selectChangeHandler}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Company" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                {
                        companies?.map((company)=>{
                            return (
                                <SelectItem key={company?._id} value={company?._id}>{company?.name}</SelectItem>
                            )
                        })
                    }
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        {
            loading ? (
                <Button className="w-full mt-4"> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> <span>Please Wait</span></Button>
            ):(
                <Button type="submit" className="w-full mt-4">Post New Job</Button>
            )
        }
        {companies.length === 0 && (
          <p className="text-xs text-red-600 font-bold text-center my-3">
            Please Register a company first, before posting
          </p>
        )}
      </form>
    </div>
  );
};

export default PostJob;
