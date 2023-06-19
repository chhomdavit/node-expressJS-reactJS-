import {useState,useEffect} from 'react';
import {request} from "../../util/api";
import{formatDateForClient,Config} from '../../util/service'
import PageContainer from '../container/PageContainer'
import ModelForm from './ModelForm';

import {Avatar,Button,Popconfirm,Space,Table, message} from 'antd';
import {DeleteFilled, EditFilled, UserOutlined} from '@ant-design/icons';

const AdminUserPage = () => {
  const [listAdminUser, setListAdminUser] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false)
  const [loading,setLoading] = useState(false)

  const [imgObj, setImgObj] = useState(null)
  const [imgFile, setImgFile] = useState(null)
  const [items, setItems] = useState(null)

  useEffect(()=>{
    getlistAdminUser()
  },[])

  const getlistAdminUser = () =>{
    setLoading(true)
      request('get','user/getList',{}).then(res=>{
        setLoading(false)
       if(res.status === 200){
          var data = res.data
          setListAdminUser(data.data_admin_user)
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
    form.append("firstname",item.firstname)
    form.append("lastname",item.lastname)
    form.append("gender",item.gender)
    form.append("dob",item.dob)
    form.append("userEmail",item.userEmail)
    form.append("password",item.password)
    form.append("status",item.status)
    form.append("create_at",1)
    if(imgObj){
      form.append("adminUser_avarta",imgObj,imgObj.firstname)
    }
    var method = "post"
    var url = "user/create"
    if(items !=null){
      method='put'
      url='user/update'
      form.append("admin_user_id",items.admin_user_id)
    }
    request(method,url,form).then(res=>{
      setLoading(false)
      if(res.status === 200){
        message.success(res.data.message)
        setItems(null)
        getlistAdminUser()
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
    request('delete','user/remove/'+id,{}).then(res=>{
      setLoading(false)
      if(res.status === 200){
        message.success(res.data.message)
         getlistAdminUser()
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
    pageTitle = "Admin User"
    btnRight = "New Admin User"
    onClickBtnAddNew={onClickBtnAddNew}
    search={{ 
      title:'Admin User Name',
      allowClear: true
     }}
    >
      <Table
      dataSource={listAdminUser}
      columns={[
        {
          title : "No",
          render : (item,items,index)=>index + 1,
          key: "No"
        },
        {
          title : "Firstname",
          key: "Firstname",
          dataIndex:"firstname"
        },
        {
          title : "lastname",
          key: "lastname",
          dataIndex:"lastname"
        },
        {
          title : "gender",
          key: "gender",
          dataIndex:"gender",
          render: (item,items,index)=>
            item === 1 ? "Male" : "Female"
        },
        {
          title : "dob",
          key: "dob",
          dataIndex:"dob",
          render: (item,items,index)=>formatDateForClient(item)
        },
        {
          title : "userEmail",
          key: "userEmail",
          dataIndex:"userEmail"
        },
        {
          title : "adminUser_avarta",
          key: "adminUser_avarta",
          dataIndex:"adminUser_avarta",
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
          title : "status",
          key: "status",
          dataIndex:"status",
          render: (item,items,index)=>
            item === 0 ? 
            <p style={{ color:"green" }}>Admin</p> 
            : 
            <p style={{ color:"red" }}>None_Admin</p>
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
                  onConfirm={()=>onClickDelete(items.admin_user_id)}
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
       title={items !=null ? "Update Admin-User":"New Admin-User"}
       open = {visibleModal}
       onCancel={onCancelModalForm}
       onFinish={onFinish}
       onChangeImage={onChangeImage}
       imgFile={imgFile}
      />
    </PageContainer>
  )
}

export default AdminUserPage;
