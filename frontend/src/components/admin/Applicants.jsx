import { useEffect } from "react";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setApplicants } from "@/redux/applicationSlice";

const Applicants = () => {
//   const [input, setInput] = useState("");
//   const dispatch = useDispatch();
const params = useParams();
const jobId = params.id;
const dispatch = useDispatch();
const {applicants} = useSelector(store => store.application)

  useEffect(() => {
    const fetchAllApplicants = async ()=>{
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/${jobId}/applicants`, {withCredentials: true});
            // console.log(res);
            if(res.data.success){
                dispatch(setApplicants(res.data.job));
            }
        } catch (error) {
            console.log(error);
        }
    }
    fetchAllApplicants();
  }, []);

  return (
    <div>
      {/* <div className=" flex items-center justify-between my-5">
        <Input
          className="w-fit"
          placeholder="Filter by job title and company name"
          onChange={(e) => setInput(e.target.value)}
        />
      </div> */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-xl font-bold my-5">Applicants ({applicants.applications.length})</h1>
        <ApplicantsTable />
      </div>
    </div>
  );
};

export default Applicants;
