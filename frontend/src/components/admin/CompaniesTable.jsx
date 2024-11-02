import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { DOMAIN } from '@/utils/constant'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

const CompaniesTable = () => {

    useGetAllCompanies()
    const {companies, searchCompanyByText} = useSelector(store => store.company);
    const navigate = useNavigate();
    
    const [filterCompany, setFilterCompany] = useState(companies);

    useEffect(()=>{
        const filteredCompany = companies.length>0 && companies.filter((company)=>{
            if(!searchCompanyByText){
                return true;
            }
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

  return (
    <div>
        <Table>
            <TableCaption>A list of your registered Companies</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Logo</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    filterCompany?.map((company, index)=>{
                        // console.log(company);
                        return (
                            <TableRow key={company?._id}>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={company.logo ? `${DOMAIN}/uploads/${company.logo}`: 'https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg'} alt="@shadcn" />
                                    </Avatar>
                                </TableCell>
                                <TableCell>{company?.name}</TableCell>
                                <TableCell>{company?.createdAt}</TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div className='flex items-center gap-2 w-fit cursor-pointer' onClick={()=> navigate(`/admin/companies/${company?._id}`)}>
                                                <Edit2 className='w-4'/>
                                                <span>Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        );
                    })
                }
            </TableBody>
        </Table>
    </div>
  )
}

export default CompaniesTable