import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = ()=>{
    dispatch(setSearchQuery(query));
    navigate("/browse");
  }

  return (
    <div className="text-center">
      <span className="px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium">
        No. 1 Job Hunt Website
      </span>
      <h1 className="text-5xl font-bold my-6">
        Search, Apply & <br /> Get Your{" "}
        <span className="text-[#6A38C2]">Dream Jobs</span>
      </h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus soluta
        mollitia autem, cum corporis modi necessitatibus sint deleniti ad, vero
        fugit? Rerum cum minima vero exercitationem? Ad eaque optio veritatis
        consequatur rem nemo mollitia doloribus esse est numquam fugit libero
        omnis id, temporibus sequi sed neque non nulla reprehenderit quod.
      </p>
      <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
        <input
          type="text"
          placeholder="Find Your Dream Jobs"
          className="outline-none border-none w-full"
          onChange={(e)=>setQuery(e.target.value)}
        />
        <Button className="rounded-r-full bg-[#6A38C2]" onClick={searchJobHandler}>
          <Search className="h-5" />
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
