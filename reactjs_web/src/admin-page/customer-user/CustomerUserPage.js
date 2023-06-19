import {useState,useEffect} from 'react';
import {request} from "../../util/api";
import{Config} from '../../util/service'
import PageContainer from '../container/PageContainer'
import ModelForm from './ModelForm';

import {Avatar,Button,Popconfirm,Space,Table, message} from 'antd';
import {DeleteFilled, EditFilled, UserOutlined} from '@ant-design/icons';

const CustomerUserPage = () => {
  const [listCustomerUser, setListCustomerUser] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false)
  const [loading,setLoading] = useState(false)

  const [imgObj, setImgObj] = useState(null)
  const [imgFile, setImgFile] = useState(null)
  const [items, setItems] = useState(null)

  useEffect(()=>{
    getlistCustomerUser()
  },[])

  const getlistCustomerUser = () =>{
    setLoading(true)
      request('get','customerUser/getList',{}).then(res=>{
        setLoading(false)
       if(res.status === 200){
          var data = res.data
          setListCustomerUser(data.list_customerUser)
       }
      })
  }

  const onFinish = (item) =>{
    setLoading(true)
    setVisibleModal(false)
    setImgFile(null)
    setImgObj(null)
    var form = new FormData()
    form.append("name",item.name)
    form.append("tel",item.tel)
    form.append("password",item.password)
    if(imgObj){
      form.append("image_customer_user",imgObj,imgObj.filename)
    }
    var method = "post"
    var url = "customerUser/create"
    if(items !=null){
      method='put'
      url='customerUser/update'
      form.append("customer_user_id",items.customer_user_id )
    }
    request(method,url,form).then(res=>{
      setLoading(false)
      if(res.status === 200){
        message.success(res.data.message)
        setItems(null)
        getlistCustomerUser()
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
    request('delete','customerUser/remove/'+id,{}).then(res=>{
      setLoading(false)
      if(res.status === 200){
        message.success(res.data.message)
        getlistCustomerUser()
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
    pageTitle = "Customer User"
    btnRight = "New Customer User"
    onClickBtnAddNew={onClickBtnAddNew}
    search={{ 
      title:'Customer User Name',
      allowClear: true
     }}
    >
      <Table
      dataSource={listCustomerUser}
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
          title : "tel",
          key: "tel",
          dataIndex:"tel"
        },
        {
          title : "image_customer_user",
          key: "image_customer_user",
          dataIndex:"image_customer_user",
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
          title : "Action",
          key: "Action",
          render: (item,items,index)=>{
            return(
              <Space>
                <Popconfirm
                  placement="topLeft"
                  title={"Delete"}
                  description={"Are sure to romove!"}
                  onConfirm={()=>onClickDelete(items.customer_user_id)}
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
       title={items !=null ? "Update Customer User":"New Customer User"}
       open = {visibleModal}
       onCancel={onCancelModalForm}
       onFinish={onFinish}
       onChangeImage={onChangeImage}
       imgFile={imgFile}
      />
    </PageContainer>
  )
}

export default CustomerUserPage;
