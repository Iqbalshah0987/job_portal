import useGetAllJobs from '@/hooks/useGetAllJobs'
import CategoryCarousel from './CategoryCarousel'
import HeroSection from './HeroSection'
import LatestJobs from './LatestJobs'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  useGetAllJobs();

  const {user} = useSelector(store => store.auth);
  const navigate = useNavigate();

  useEffect(()=>{
    if(user?.role==='recruiter'){
      navigate('/admin/companies');
    }
  }, []);

  return (
    <>
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
    </>
  )
}

export default Home