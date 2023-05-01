import { useState, useEffect } from "react";
import {request} from "../util/api";
import { Button, Space, Table, Modal, Divider, 
         Input, Select, ConfigProvider, DatePicker, 
         Radio, message, Avatar, Upload} from "antd";
import {formatDateForClient} from "../util/service"
import { DeleteFilled,EditFilled, UploadOutlined, UserOutlined } from '@ant-design/icons'
import dayjs from "dayjs";
import "dayjs/locale/en";
import locale from "antd/locale/en_US";
import { Config } from "../util/service";
const  {Option} = Select;


const AdminUser = () => {
    const [AdminUser, setAdminUser] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [gender, setGender] = useState("1")
    const [dob, setDob] = useState(dayjs())
    const [userEmail, setUserEmail] = useState("")
    const [password, setPassword] = useState("")
    const [image_avarta, setImage_avarta] = useState(null)
    const [status, setStatus] = useState(1)
    const [user_id, setUser_id] = useState(null)

     useEffect(()=>{
        getAdminUser()
     },[])
    
    const getAdminUser = () =>{
        request("get","user/getList",{}).then(res=>{
            if(res.status === 200){
                var data = res.data
                setAdminUser(data.data_user)
            }
        })
    }

    const onClickCancel = (id) =>{
        request("delete","user/remove/" + id).then((res)=>{
           if(res.status === 200){
            getAdminUser();
            message.success(res.data.message)
           }
        })
    }

    const onClickSave = () =>{
        if(user_id == null){
            var form = new FormData()
            form.append("firstname",firstname)
            form.append("lastname",lastname)
            form.append("gender",gender)
            form.append("dob",dayjs(dob).format("YYYY-MM-DD"))
            form.append("userEmail",userEmail)
            form.append("password",password)
            form.append("image_avarta",image_avarta,image_avarta.name)
            form.append("status",status)
            request("post","user/create",form).then(res=>{
                getAdminUser();
                setIsModalOpen(false);
                clearForm();
                message.success(res.data.message)
            });
        }else{
            request("put","user/update",{
                user_id: user_id,
                firstname: firstname,
                lastname: lastname,
                gender: gender,
                dob: dayjs(dob).format("YYYY-MM-DD"),
                userEmail: userEmail,
                password: password,
                image_avarta: image_avarta,
                status: status,
            }).then((res)=>{
                getAdminUser();
                setIsModalOpen(false);
                clearForm();
                message.success(res.data.message)
            })
        }
    }

    const onClickEdit = (item,index) =>{
        setIsModalOpen(true)

        setFirstname(item.firstname);
        setLastname(item.lastname);
        setGender(item.gender + "");
        setDob(dayjs(item.dob).format("YYYY-MM-DD"));
        setUserEmail(item.userEmail);
        setPassword(item.password);
        setImage_avarta(item.image_avarta);
        setStatus(item.status);
        setUser_id(item.user_id)
    }

    const clearForm = () =>[
        setFirstname(""),
        setLastname(""),
        setGender("1"),
        setDob(dayjs()),
        setUserEmail(""),
        setPassword(""),
        setImage_avarta(null),
        setStatus(1),
        setUser_id(null)
      ]

    const onClickOpenModal = () =>{
        setIsModalOpen(true)
    }

    const onClickCloseModal = () =>{
        setIsModalOpen(false)
        clearForm();
    }

    const onChangeImageAvarta = (event) =>{
        setImage_avarta(event.target.files[0])
    }

  return (
    <div>
        <div>
           <Button onClick={onClickOpenModal} type="primary">Add NEW</Button>
        </div>
    <Divider/>
     <Table
     dataSource={AdminUser}
     size="small"
     columns={[
        {
            title: "No",
            key: "No",
            render: (item,items,index) =>index + 1
        },
        {
            title: "Firstname",
            key: "firstname",
            dataIndex: "firstname"
        },
        {
            title: "lastname",
            key: "lastname",
            dataIndex: "lastname"
        },
        {
            title: "Gender",
            key: "Gender",
            dataIndex: "gender",
            render: (item,items,index)=>
            item === 1 ? "Male" : "Female"
        },
        {
            title: "dob",
            key: "dob",
            dataIndex: "dob",
            // render: (value) => (dayjs(value).format('DD/MM/YYYY'))
            render: (item)=>formatDateForClient(item)
        },
        {
            title: "userEmail",
            key: "userEmail",
            dataIndex: "userEmail"
        },
        {
            title: "image_avarta",
            key: "image_avarta",
            dataIndex: "image_avarta",
            render : (item) => {
                return(
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
            title: "status",
            key: "status",
            dataIndex: "status",
            render: (item,items,index)=>
            item === 0 ? <p style={{ color:"green" }}>Admin</p> : <p style={{ color:"red" }}>None_Admin</p>
        },
        {
            title: "create_at",
            key: "create_at",
            dataIndex: "create_at",
            render: (item,items,index)=>
            formatDateForClient(item)
        },
        {
            title: "Action",
            key: "Action",
            render: (item,items,index)=>{
                return(
                    <Space>
                        <Button onClick={()=>onClickCancel(item.user_id)} danger size="small"><DeleteFilled/></Button>
                        <Button onClick={()=>onClickEdit(item,index)} size="small"><EditFilled/></Button>
                    </Space>
                )
            }
        },
     ]}
     />
     
     {/* modal */}
     <Modal 
        open={isModalOpen}
        title={user_id == null ? "New AdminUser" : "Updata AdminUser"}
        onCancel={onClickCloseModal}
        footer={null}
     >
        <Space direction="vertical" style={{ width:"100%" }}>

            <Input 
                value={firstname}
                placeholder="Firstname"
                onChange={(event)=>{
                setFirstname(event.target.value);
            }}
            />

            <Input 
                value={lastname}
                placeholder="Lastname"
                onChange={(event)=>{
                setLastname(event.target.value);
            }}
            />

            <Select
                 value={gender}
                 defaultValue={"1"}
                 style={{ width: "100%" }}
                 onChange={(value)=>{
                    setGender(value);
                }}
            >
                <Option value={'1'} >Male</Option>
                <Option value={'0'} >Female</Option>
            </Select>

            <ConfigProvider locale={locale}>
                <DatePicker
                    style={{ width: "100%" }}
                    placement="bottomLeft"
                    placeholder="Date of birth"
                    format={"DD/MM/YYYY"}
                    value={dayjs(dob,"YYYY-MM-DD")}
                    onChange={(date_js, dateString)=>{
                        setDob(date_js);
                    }}
                />
            </ConfigProvider>

            <Input 
                value={userEmail}
                placeholder="UserEmail"
                onChange={(event)=>{
                setUserEmail(event.target.value);
            }}
            />

            <Input 
                value={password}
                placeholder="Password"
                onChange={(event)=>{
                setPassword(event.target.value);
            }}
            />

            {/* <input
                type={"file"}
                onChange={onChangeImageAvarta}
            /> */}
            <Button>
               <input
                type={"file"}
                onChange={onChangeImageAvarta}
                /> 
               {<UploadOutlined />}
            </Button>
            
            <Radio.Group
                value={status}
                onChange={(event)=>{
                 setStatus(event.target.value);
                }}
            >
                <Radio value={0}>Admin</Radio>
                <Radio value={1}>Non_Admin</Radio>
            </Radio.Group>
            
            <Space style={{ display:"flex", justifyContent: "flex-end"}}>
                <Button onClick={onClickCloseModal}>Cancel</Button>
                <Button onClick={onClickSave}>{user_id == null ? "Save" : "Update"}</Button>
            </Space>

        </Space>
      
     </Modal>

    </div>
  )
}

export default AdminUser
