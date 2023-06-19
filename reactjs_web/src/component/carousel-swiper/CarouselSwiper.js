import {useState,useEffect} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import {request} from "../../util/api";
import{Config} from '../../util/service'
import { Col, Image, Row } from 'antd';


const CarouselSwiper = () => {
    const [listCarouselSwiper, setListCarouselSwiper] = useState([]);
    useEffect(()=>{
        getListCarouselSwiper()
      },[])
      const getListCarouselSwiper = () =>{
          request('get','carouselSwiper/getList',{}).then(res=>{
           if(res.status === 200){
              var data = res.data
              setListCarouselSwiper(data.list_carouselSwiper)
           }
          })
      }
  return (
      <Row gutter={10}>
          <Col sx={24} sm={24} md={16} lg={16}>
              <Carousel style={{ height: '400px' }}>
                  {listCarouselSwiper.map(item => {
                      return (
                          <Carousel.Item interval={5000}>
                              <img
                                  className="d-block"
                                  style={{ width: '100%', height: '400px' }}
                                  src={Config.imagePath + item.image_carousel}
                                  alt="First slide"
                              />
                              <Carousel.Caption style={{ right: '50%' }}>
                                  <h3 className='animate__animated animate__zoomInDown'>{item.tittle}</h3>
                                  <p>{item.desc}</p>
                              </Carousel.Caption>
                          </Carousel.Item>
                      )
                  })}
              </Carousel>
          </Col>
          <Col sx={24} sm={24} md={8} lg={8}>
            <div style={{ textAlign:'center' }}>
            <Image  width={300} src='https://media.tenor.com/yCFHzEvKa9MAAAAj/hello.gif' alt=''/>
            </div>
          </Col>
      </Row>
  )
}

export default CarouselSwiper;
