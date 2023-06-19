import {useState,useEffect} from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button, Card, Image,Input} from 'antd';


import {request} from "../../util/api";
import{Config} from '../../util/service'

const { Search } = Input;
const onSearch = () =>{
  alert("OnSearch")
}

const ProductPage = () => {
    const [listproduct, setListProduct] = useState([]);

    useEffect(()=>{
        getlistProdct()
      },[])
    
      const getlistProdct = () =>{
          request('get','product/getList',{}).then(res=>{
           if(res.status === 200){
              var data = res.data
              setListProduct(data.list_product)
           }
          })
      }
  return (
    <>
    <div style={{ textAlign:"center" }}>
      <Search
        placeholder="search By Name"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
        style={{ width:'50%'}}
      />
    </div>
    <Row>
      {listproduct.map(item =>{
        return(
          <Col xs={12} sm={12} md={6} lg={4} className="g-4" key={item}>
            <Card 
             hoverable
             style={{ width: "100%",height:430 }}
             cover={<Image alt="example" src={Config.imagePath + item.image_1} style={{ height: 250,padding:30,backgroundColor:"#f5f5f5" }} />}
            >
              <h3>{item.name}</h3>
              <span>{item.price} $</span>
              <p>{item.description}</p>
              <Button>View More</Button>&nbsp;&nbsp;
              <Button>Show Now</Button>
            </Card>
          </Col>
        )
      })}
    </Row>
    </>
  )
}

export default ProductPage;
