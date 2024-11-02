import { ArrowLeft, Loader2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { useState } from 'react'
import { Input } from '../ui/input'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { toast } from 'sonner'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import useGetSingleCompany from '@/hooks/useGetSinglCompany'

const CompanySetup = () => {

    const params = useParams();
    useGetSingleCompany(params.id)

    const {singleCompany} = useSelector(store => store.company);
    const [input, setInput] = useState({
        name: singleCompany.name || '',
        description: singleCompany.description || '',
        website: singleCompany.website || '',
        location: singleCompany.location || '',
        company_logo: null
    });
    const {loading} =  useSelector(store => store.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeInputHandler = (e)=>{
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }

    const changeFileHandler = (e)=>{
        setInput({
            ...input,
            company_logo: e.target.files?.[0]
        });
    }

    const submitHandler = async (e) =>{
        e.preventDefault();
        dispatch(setLoading(true));

        const formData = new FormData();
        for (let [key, value] of Object.entries(input)) {
            formData.append(key, value||'');
        }
        // console.log(Object.entries(Object.fromEntries(formData.entries())));
        // console.log(Array.from(formData.entries()));
        // console.log(params.id);
        try {
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`,
                formData,{
                    headers:{
                        'Content-Type': 'multipart/form-data'
                    },
                    withCredentials: true
                }
            );
            console.log(res);
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }finally{
            dispatch(setLoading(false));
        }
    }

  return (
    <div className='max-w-xl mx-auto my-10'>
        <form onSubmit={submitHandler}>
            <div className='flex items-center gap-5 p-8'>
                <Button variant="outline" className='flex items-center gap-2 text-gray-500 font-semibold' onClick={()=>navigate('/admin/companies')}>
                    <ArrowLeft />
                    <span>Back</span>
                </Button>
                <h1 className='font-bold text-xl'>Company Setup</h1>
            </div>

            <div className='grid grid-cols-2 gap-4'>
                <div>
                    <Label>Company Name</Label>
                    <Input type="text" name="name" placeholder="Company Name" value={input.name} onChange={changeInputHandler} />
                </div>
                <div>
                    <Label>Description</Label>
                    <Input type="text" name="description" placeholder="Description" value={input.description} onChange={changeInputHandler} />
                </div>
                <div>
                    <Label>Website</Label>
                    <Input type="text" name="website" placeholder="Website" value={input.website} onChange={changeInputHandler} />
                </div>
                <div>
                    <Label>Location</Label>
                    <Input type="text" name="location" placeholder="Location" value={input.location} onChange={changeInputHandler} />
                </div>
                <div>
                    <Label>Company Logo</Label>
                    <Input type="file" name="company_logo" accept="image/*" onChange={changeFileHandler} />
                </div>
            </div>
            {
                loading ? (
                    <Button className="w-full mt-8"> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> <span>Please Wait</span></Button>
                ):(
                    <Button type="submit" className='w-full mt-8'>Update</Button>
                )
            }

        </form>

    </div>
  )
}

export default CompanySetup