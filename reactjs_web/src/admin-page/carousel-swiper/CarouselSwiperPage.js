import {useState,useEffect} from 'react';
import {request} from "../../util/api";
import{Config} from '../../util/service'
import PageContainer from '../container/PageContainer'
import ModelForm from './ModelForm';

import {Avatar,Button,Popconfirm,Space,Table, message} from 'antd';
import {DeleteFilled, EditFilled, UserOutlined} from '@ant-design/icons';

const CarouselSwiperPage = () => {
  const [listCarouselSwiper, setListCarouselSwiper] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false)
  const [loading,setLoading] = useState(false)

  const [imgObj, setImgObj] = useState(null)
  const [imgFile, setImgFile] = useState(null)
  const [items, setItems] = useState(null)

  useEffect(()=>{
    getListCarouselSwiper()
  },[])

  const getListCarouselSwiper = () =>{
    setLoading(true)
      request('get','carouselSwiper/getList',{}).then(res=>{
        setLoading(false)
       if(res.status === 200){
          var data = res.data
          setListCarouselSwiper(data.list_carouselSwiper)
       }
      })
  }

  const onFinish = (item) =>{
    // console.log(item)
    // return false
    setLoading(true)
    setVisibleModal(false)
    setImgFile(null)
    setImgObj(null)
    var form = new FormData()
    form.append("tittle",item.tittle)
    form.append("desc",item.desc)
    if(imgObj){
      form.append("image_carousel",imgObj,imgObj.filename)
    }
    var method = "post"
    var url = "carouselSwiper/create"
    if(items !=null){
      method='put'
      url='carouselSwiper/update'
      form.append("carousel_swiper_id",items.carousel_swiper_id)
    }
    request(method,url,form).then(res=>{
      setLoading(false)
      if(res.status === 200){
        message.success(res.data.message)
        setItems(null)
        getListCarouselSwiper()
      }
    })  
  }

  const  onClickEdit = (param)=>{
    setItems(param)
    setVisibleModal(true)
  }

  const onClickDelete = (id) =>{
    setVisibleModal(false)
    setLoading(true)
    request('delete','carouselSwiper/remove/'+id,{}).then(res=>{
      setLoading(false)
      if(res.status === 200){
        message.success(res.data.message)
        getListCarouselSwiper()
      }
     })
  }

  const onClickBtnAddNew = () =>{
    setVisibleModal(true)
  }
  const onCancelModalForm = () =>{
    setVisibleModal(false)
    setItems(null)
    setImgFile(null)
    setImgObj(null)
  }
  const onChangeImage = (event) =>{
    setImgObj(event.target.files[0])
    setImgFile(URL.createObjectURL(event.target.files[0]))
  }
  return (
    <PageContainer
    loading={loading}
    pageTitle = "Carousel Swiper"
    btnRight = "New CarouselSwiper"
    onClickBtnAddNew={onClickBtnAddNew}
    search={{ 
      title:'CarouselSwiper Name',
      allowClear: true
     }}
    >
      <Table
      dataSource={listCarouselSwiper}
      columns={[
        {
          title : "No",
          render : (item,items,index)=>index + 1,
          key: "No"
        },
        {
          title : "image_carousel",
          key: "image_carousel",
          dataIndex:"image_carousel",
          render: (item,items,index)=>{
            return (
              <div style={{textAlign:'center'}}>
                        {item != null ?
                            <Avatar size="large" src={Config.imagePath+item} /> 
                            :
                            <Avatar size="large" icon={<UserOutlined />} />
                        } 
                    </div>
            )
          }
        },
        {
          title : "tittle",
          key: "tittle",
          dataIndex:"tittle",
        },
        {
          title : "desc",
          key: "desc",
          dataIndex:"desc",
        },
        {
          title : "Action",
          key: "Action",
          render: (item,items,index)=>{
            return(
              <Space>
                <Popconfirm
                  placement="topLeft"
                  title={"Delete"}
                  description={"Are sure to romove!"}
                  onConfirm={()=>onClickDelete(items.carousel_swiper_id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger size="small"><DeleteFilled/></Button>
                </Popconfirm>
                  <Button size="small" onClick={()=>onClickEdit(items)}><EditFilled/></Button>
              </Space>
            )
          }
        },
      ]}
      />
      <ModelForm
       items ={items}
       title={items !=null ? "Update CarouselSwiper":"New CarouselSwiper"}
       open = {visibleModal}
       onCancel={onCancelModalForm}
       onFinish={onFinish}
       onChangeImage={onChangeImage}
       imgFile={imgFile}
      />
    </PageContainer>
  )
}

export default CarouselSwiperPage;
