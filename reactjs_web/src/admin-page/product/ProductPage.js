import {useState,useEffect} from 'react';
import {request} from "../../util/api";
import{formatDateForClient,Config} from '../../util/service'
import PageContainer from '../container/PageContainer'
import ModelForm from './ModelForm';

import {Button,Image,Popconfirm,Space,Table, message} from 'antd';
import {DeleteFilled, EditFilled, UserOutlined} from '@ant-design/icons';

const CategoryPage = () => {
  const [listproduct, setListProduct] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false)
  const [loading,setLoading] = useState(false)

  const [imgObj, setImgObj] = useState(null)
  const [imgFile, setImgFile] = useState(null)
  const [imgFile1, setImgFile1] = useState(null)
  const [imgObj1, setImgObj1] = useState(null)
  const [imgFile2, setImgFile2] = useState(null)
  const [imgObj2, setImgObj2] = useState(null)
  const [imgFile3, setImgFile3] = useState(null)
  const [imgObj3, setImgObj3] = useState(null)
  const [items, setItems] = useState(null)

  useEffect(()=>{
    getlistProdct()
  },[])

  const getlistProdct = () =>{
    setLoading(true)
      request('get','product/getList',{}).then(res=>{
        setLoading(false)
       if(res.status === 200){
          var data = res.data
          setListProduct(data.list_product)
       }
      })
  }

  const onFinish = (item) =>{
    setLoading(true)
    setVisibleModal(false)
    setImgFile(null)
    setImgObj(null)
    setImgFile1(null)
    setImgObj1(null)
    setImgFile2(null)
    setImgObj2(null)
    setImgFile3(null)
    setImgObj3(null)
    var form = new FormData()
    form.append("name",item.name)
    form.append("category_id",item.category_id)
    form.append("barcode",item.barcode)
    form.append("price",item.price)
    form.append("description",item.description)
    form.append("quantity",item.quantity)
    form.append("status",item.status)
    form.append("create_by",item.create_by)
    form.append("create_at",1)
    if(imgObj){
      form.append("image_1",imgObj,imgObj.filename)
    }
    if(imgObj1){
      form.append("image_2",imgObj1,imgObj1.filename)
    }
    if(imgObj2){
      form.append("image_3",imgObj2,imgObj2.filename)
    }
    if(imgObj3){
      form.append("image_4",imgObj3,imgObj3.filename)
    }
    var method = "post"
    var url = "product/create"
    if(items !=null){
      method='put'
      url='product/update'
      form.append("product_id",items.product_id)
    }
    request(method,url,form).then(res=>{
      setLoading(false)
      if(res.status === 200){
        message.success(res.data.message)
        setItems(null)
        getlistProdct()
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
    request('delete','product/remove/'+id,{}).then(res=>{
      setLoading(false)
      if(res.status === 200){
        message.success(res.data.message)
        getlistProdct()
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
    setImgFile1(null)
    setImgObj1(null)
    setImgFile2(null)
    setImgObj2(null)
    setImgFile3(null)
    setImgObj3(null)
  }

  const onChangeImage = (event) =>{
    setImgObj(event.target.files[0])
    setImgFile(URL.createObjectURL(event.target.files[0]))
  }
  const onChangeImage1 = (event) =>{
    setImgObj1(event.target.files[0])
    setImgFile1(URL.createObjectURL(event.target.files[0]))
  }
  const onChangeImage2 = (event) =>{
    setImgObj2(event.target.files[0])
    setImgFile2(URL.createObjectURL(event.target.files[0]))
  }
  const onChangeImage3 = (event) =>{
    setImgObj3(event.target.files[0])
    setImgFile3(URL.createObjectURL(event.target.files[0]))
  }
  return (
    <PageContainer
    loading={loading}
    pageTitle = "Product"
    btnRight = "New Product"
    onClickBtnAddNew={onClickBtnAddNew}
    search={{ 
      title:'Product Name',
      allowClear: true
     }}
    >
      <Table
      dataSource={listproduct}
      columns={[
        {
          title : "No",
          render : (item,items,index)=>index + 1,
          key: "No"
        },
        {
          title : "name",
          key: "name",
          dataIndex:"name"
        },
        {
          title : "category_id",
          key: "category_id",
          dataIndex:"category_id"
        },
        {
          title : "barcode",
          key: "barcode",
          dataIndex:"barcode"
        },
        {
          title : "price",
          key: "price",
          dataIndex:"price"
        },
        {
          title : "description",
          key: "description",
          dataIndex:"description"
        },
        {
          title : "quantity",
          key: "quantity",
          dataIndex:"quantity"
        },
        {
          title : "image_1",
          key: "image_1",
          dataIndex:"image_1",
          render: (item,items,index)=>{
            return (
              <div style={{textAlign:'center'}}>
                        {item != null ?
                            <Image size="large" src={Config.imagePath+item} /> 
                            :
                            <Image size="large" icon={<UserOutlined />} />
                        } 
                    </div>
            )
          }
        },
        {
          title : "image_2",
          key: "image_2",
          dataIndex:"image_2",
          render: (item,items,index)=>{
            return (
              <div style={{textAlign:'center'}}>
                        {item != null ?
                            <Image size="large" src={Config.imagePath+item} /> 
                            :
                            <Image size="large" icon={<UserOutlined />} />
                        } 
                    </div>
            )
          }
        },
        {
          title : "image_3",
          key: "image_3",
          dataIndex:"image_3",
          render: (item,items,index)=>{
            return (
              <div style={{textAlign:'center'}}>
                        {item != null ?
                            <Image size="large" src={Config.imagePath+item} /> 
                            :
                            <Image size="large" icon={<UserOutlined />} />
                        } 
                    </div>
            )
          }
        },
        {
          title : "image_4",
          key: "image_4",
          dataIndex:"image_4",
          render: (item,items,index)=>{
            return (
              <div style={{textAlign:'center'}}>
                        {item != null ?
                            <Image size="large" src={Config.imagePath+item} /> 
                            :
                            <Image size="large" icon={<UserOutlined />} />
                        } 
                    </div>
            )
          }
        },
        {
          title : "status",
          key: "status",
          dataIndex:"status",
        },
        {
          title : "create_by",
          key: "create_by",
          dataIndex:"create_by",
        },
        {
          title : "create_at",
          key: "create_at",
          dataIndex:"create_at",
          render: (item,items,index)=>formatDateForClient(item)
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
                  onConfirm={()=>onClickDelete(items.product_id)}
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
       title={items !=null ? "Update Category":"New Admin-User"}
       open = {visibleModal}
       onCancel={onCancelModalForm}
       onFinish={onFinish}
       onChangeImage={onChangeImage}
       imgFile={imgFile}
       onChangeImage1={onChangeImage1}
       imgFile1={imgFile1}
       onChangeImage2={onChangeImage2}
       imgFile2={imgFile2}
       onChangeImage3={onChangeImage3}
       imgFile3={imgFile3}
      />
    </PageContainer>
  )
}

export default CategoryPage;
