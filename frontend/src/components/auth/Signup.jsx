import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {

  const [input, setInput] = useState({
    fullname:"",
    email:"",
    phoneNumber:"",
    password:"",
    role:"",
    file:"",
  });
  const navigate = useNavigate();
  const {loading, user} =  useSelector(store => store.auth)
  const dispatch = useDispatch();

  const changeEventHandler = (e)=>{
    // console.log(e.target.name, e.target.value);
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  const changeFileHandler = (e)=>{
    // console.log(e.target.name, e.target.files);
    setInput({
      ...input, 
      file: e.target.files?.[0],
    });
  }

  const submitHandler = async (e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if(input.file){
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${USER_API_END_POINT}/register`, 
        formData,{
          headers:{
            "Content-Type":"multipart/form-data"
          },
          withCredentials: true
      });
      console.log("🚀 ~ submitHandler ~ res:", res);
      if(res.data.success){
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally{
      dispatch(setLoading(false));
    }
  }

  useEffect(()=>{
    if(user){
      navigate("/");
    }
  }, []);

  return (
    <div className="flex items-center justify-center max-w-7xl mx-auto">
      <form
        onSubmit={submitHandler}
        className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
      >
        <div className="text-center border-b-2 border-gray-200 mb-6">
          <h1 className="font-bold text-3xl pb-1">Sign Up</h1>
          <div className="pb-2 text-sm">Already Have an Account <Link to="/login" className="text-blue-500">Login</Link></div>
        </div>

        <div className="grid w-full items-center gap-1.5 my-4">
          <Label htmlFor="fullname">Full Name</Label>
          <Input type="text" id="fullname" name="fullname" placeholder="Full Name" className="focus-visible:border-0 focus-visible:ring-0" value={input.fullname} onChange={changeEventHandler} />
        </div>

        <div className="grid w-full items-center gap-1.5 my-4">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" name="email" placeholder="Email" className="focus-visible:border-0 focus-visible:ring-0" value={input.email} onChange={changeEventHandler} />
        </div>

        <div className="grid w-full items-center gap-1.5 my-4">
          <Label htmlFor="phoneNumber">PhoneNumber</Label>
          <Input type="text" id="phoneNumber" name="phoneNumber" placeholder="Phone Number" className="focus-visible:border-0 focus-visible:ring-0" value={input.phoneNumber} onChange={changeEventHandler} />
        </div>

        <div className="grid w-full items-center gap-1.5 my-4">
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" name="password" placeholder="Password" className="focus-visible:border-0 focus-visible:ring-0" value={input.password} onChange={changeEventHandler} />
        </div>

        <div className="flex items-center justify-between my-4">
          <RadioGroup className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="student"
                className="cursor-pointer"
                id="r1"
                checked={input.role==='student'}
                onChange={changeEventHandler}
              />
              <Label htmlFor="r1">Student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="recruiter"
                className="cursor-pointer"
                id="r2"
                checked={input.role==='recruiter'}
                onChange={changeEventHandler}
              />
              <Label htmlFor="r2">Recruiter</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="grid w-full items-center gap-1.5 my-4">
          <Label htmlFor="profile">Profile</Label>
          <Input id="profile" type="file" name="file" accept="image/*" className="cursor-pointer" onChange={changeFileHandler} />
        </div>

        {
          loading ? (
            <Button className="w-full my-4"> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> <span>Please Wait</span></Button>
          ):(
            <Button type="submit" className="w-full my-4">Sign Up</Button>
          )
        }

      </form>
    </div>
  );
};

export default Signup;
