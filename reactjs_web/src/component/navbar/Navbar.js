import { NavLink, useNavigate } from "react-router-dom";
import {Affix, Button, Drawer,Avatar,Badge,Dropdown, Modal, Form, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
import './Navbar.css'
import {request} from "../../util/api";
import{Config} from '../../util/service'

import {
  FacebookFilled,
  TwitterSquareFilled,
  MenuOutlined,
  ShoppingCartOutlined,
  LoginOutlined,
  UserOutlined,
  LockOutlined,
} from '@ant-design/icons';


const Navbar = () => {

  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  const isLogin = localStorage.getItem('is_loginCustomer')  === "1"

  useEffect(()=>{
    if(!isLogin){
      navigate('/')
    }
  },[])
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () =>{
    setIsModalOpen(false);
  }
  const handleCustomerLogout = () =>{
    localStorage.setItem('is_loginCustomer','0')
    window.location.href = '/'
  }

  const customeUser = [
    {
      key: '1',
      label: (
        <NavLink  rel="" href="/">
          Loing
        </NavLink>
      ),
      icon : <UserOutlined/>,
      onClick: showModal
    },
    {
      key: '2',
      label: (
        <NavLink  rel="" href="/">
          Logout
        </NavLink>
      ),
      icon : <LoginOutlined/>,
      onClick : handleCustomerLogout
    }
  ];
  

  const onFinish = (fields) =>{
    var params = {
      tel : fields.tel,
      password : fields.password
    }
    request('post','customerUser/login',params).then((res)=>{
      if(res.data && res.data.is_loginCustomer){
        localStorage.setItem('is_loginCustomer','1');
        localStorage.setItem('profileCustomer',JSON.stringify(res.data.profileCustomer));
        window.location.href = '/'
      } else {
        message.warning(res.data.message)
      }
    })
  }
  
  const hadleOnClickCart = ()=>{
    alert('card')
  }

  const profileCustomer = JSON.parse(localStorage.getItem('profileCustomer'))
  return (
    <div className="container">
      <div className='topBar'>
        <div className='contactInfo'>
        
        </div>
        <div className='otherInfo'>
          <ul className='socialMedia'>
            <li style={{ color:'white' }}>
              <Dropdown menu={{ items: customeUser }} style={{ width: 250 }}>
                <Avatar  
                  src={ !isLogin?(<div style={{ backgroundColor:'yellowgreen' }}><UserOutlined/></div>):(Config.imagePath + profileCustomer.image_customer_user)} />
              </Dropdown> Hi! {!isLogin ? (<div></div>) : (profileCustomer.name) }
            </li>
            <li><NavLink style={{ fontSize:'20px',color:'red' }} href='#'><FacebookFilled /></NavLink></li>
            <li><NavLink style={{ fontSize:'20px',color:'#0000ff' }} href='#'><TwitterSquareFilled /></NavLink></li>
          </ul>
        </div>
      </div>
      <Affix offsetTop={0} onChange={(affixed) => console.log(affixed)}>
      <div className="header separator">
        <div className="logo">
        <NavLink to="/">
          <img
           src="https://cdn.pixabay.com/photo/2016/11/07/13/04/yoga-1805784_1280.png"
           alt=""
           width='100px'
           height='10px'
          />
        </NavLink>
        </div>
        <div className="mobileVisible">
          <Button style={{ border:'none',fontSize:'30px' }} onClick={showDrawer}>
          <MenuOutlined />
          </Button>
          <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={open}>
          <nav>
            <ul>
            <li><NavLink onClick={onClose} to="/">HOME</NavLink></li>
            <li><NavLink onClick={onClose} to="/product">PRODUCT</NavLink></li>  
            <li><NavLink onClick={onClose} to="/about">ABOUT</NavLink></li>
            <li><NavLink onClick={onClose} to="/contact">CONTACT</NavLink></li>
            <li>
              <Badge count={1}>
                <Avatar icon={<ShoppingCartOutlined />} onClick={hadleOnClickCart} />
              </Badge>
            </li>
            </ul>
        </nav>
          </Drawer>
        </div>
        <nav className="mobileHidden">
          <ul>
            <li><NavLink to="/">HOME</NavLink></li>
            <li><NavLink to="/product">PRODUCT</NavLink></li>
            <li><NavLink to="/about">ABOUT</NavLink></li>
            <li><NavLink to="/contact">CONTACT</NavLink></li>
            <li>
              <Badge count={1}>
                <Avatar icon={<ShoppingCartOutlined />} onClick={showModal}/>
              </Badge>
            </li>
          </ul>
        </nav>
      </div>
      </Affix>

      <Modal title="Login" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Form
          name="loginPage"
          initialValues={{ 
            remember: false,
           }}
           onFinish={onFinish}
        >
            <Form.Item
              name="tel"
              rules={[{
                required: true,
                message:'Please input your Telephone'
              }]}
            >
              <Input prefix={<UserOutlined/>} placeholder="Telephone" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{
                required: true,
                message:'Please input your Password'
              }]}
            >
              <Input type="password" prefix={<LockOutlined/>} placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Button
              type="primary"
              htmlType="submit"
              >
                Login
              </Button>
            </Form.Item>

        </Form>
      </Modal>
  </div>
  )
}

export default Navbar;
