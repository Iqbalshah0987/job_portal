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
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {

  const [input, setInput] = useState({
    email:"",
    password:"",
    role:"",
  });
  const navigate = useNavigate();
  const {loading, user} =  useSelector(store => store.auth)
  const dispatch = useDispatch();

  const changeEventHandler = (e)=>{
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  }

  const submitHandler = async (e)=>{
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${USER_API_END_POINT}/login`, 
        input,
        {
          headers:{
            "Content-Type":"application/json"
          },
          withCredentials: true
      });
      // console.log("🚀 ~ submitHandler ~ res:", res);
      if(res.data.success){
        dispatch(setUser(res.data.user));
        navigate("/");
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
          <h1 className="font-bold text-3xl pb-1">Login</h1>
          <div className="pb-2 text-sm">Don`t have an account <Link to="/signup" className="text-blue-500">Sign Up</Link></div>
        </div>

        <div className="grid w-full items-center gap-1.5 my-4">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" name="email" placeholder="Email" className="focus-visible:border-0 focus-visible:ring-0" value={input.email} onChange={changeEventHandler} />
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
                id="r2"checked={input.role==='recruiter'}
                onChange={changeEventHandler}

              />
              <Label htmlFor="r2">Recruiter</Label>
            </div>
          </RadioGroup>
        </div>

        {
          loading ? (
            <Button className="w-full my-4"> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait </Button>
          ):(
            <Button type="submit" className="w-full my-4">Login</Button>
          )
        }

      </form>
    </div>
  );
};

export default Login;
