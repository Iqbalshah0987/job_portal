import { Contact, Mail, Pen } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import { useEffect, useState } from "react";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import { DOMAIN } from "@/utils/constant";
import { useNavigate } from "react-router-dom";

const isResume = true;

const Profile = () => {
  const [open, setOpen] = useState(false);
  const {user} = useSelector(store => store.auth);
  let skills = user?.profile?.skills;
  const navigate = useNavigate();

  useEffect(()=>{
    if(!user){
      navigate("/");
    }
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex items-center justify-between gap-4">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src={user?.profile?.profilePhoto?`${DOMAIN}/uploads/${user?.profile?.profilePhoto}`:"https://github.com/shadcn.png"}
              alt="Profile"
            />
          </Avatar>
          <div>
            <h1 className="font-medium text-xl">{user?.fullname}</h1>
            <p>
            {user?.profile?.bio || ''}
            </p>
          </div>
          <Button className="text-right" variant="outline" onClick={()=> setOpen(true)}>
            <Pen />
          </Button>
        </div>

        <div>
          <div className="flex items-center gap-3">
            <Mail />
            <span>{user?.email}</span>
          </div>

          <div className="flex items-center gap-3">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div className="my-5">
          <h1 className="font-medium text-xl">Skills</h1>
          <div className="flex items-center gap-1">
            {skills?.length != 0 ? (
              skills?.map((item, index) => <Badge key={index}>{item}</Badge>)
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {isResume ? (
            <a
              target="_blank"
              href={`${DOMAIN}/uploads/${user?.profile?.resume}`}
              className="text-blue-500 w-full hover:underline cursor-pointer"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>Not Available</span>
          )}
        </div>
      </div>
      <div className="max-w-7xl mx-auto bg-white rounded-2xl mb-5">
        <h1 className="font-medium text-2xl">Applied Jobs</h1>
        {/* Applied jobs */}
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
