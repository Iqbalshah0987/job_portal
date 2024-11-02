import { setSearchQuery } from "@/redux/jobSlice";
import { Button } from "./ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "Full Stack Developer",
]


const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query)=>{
    dispatch(setSearchQuery(query));
    navigate("/browse");
  }

  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {
            category.map((cat, index)=>{
              // console.log(cat);
              return <CarouselItem key={index} className="md:basis-1/2 lg-basis-1/3">
                <Button variant="outline" className="w-full" onClick={()=>searchJobHandler(cat)}>{cat}</Button>
              </CarouselItem>
            })
          }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default CategoryCarousel