import React, { useEffect, useState } from "react";
import {  DownOutlined,  
          InboxOutlined,
          LogoutOutlined,
          MenuUnfoldOutlined,
          TeamOutlined,
          UserOutlined,} from '@ant-design/icons';
import {  Button, Dropdown, Layout, Menu} from 'antd';
import { useNavigate,} from "react-router-dom";
import "./Dashboard.css";

const {  Sider } = Layout;

const Dashboard = (props) => {
  
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const isLogin = localStorage.getItem("is_login") === "1"

  useEffect(()=>{
    if(!isLogin){
      navigate("/login")
    }
  },[])


  const handleClickMenu = (item) => {
    navigate(item.key)
  }

  const handleLogout = () => {
    localStorage.setItem("is_login","0")
    window.location.href = "/login"
  }
 
  const menuSiderBar = [
    {
      key: '/dashboard/admin-user',
      icon: <TeamOutlined />,
      label: 'Admin-user'
    },
    {
      key: '/dashboard/category',
      icon: <InboxOutlined />,
      label: 'Category',
    },
    {
      key: '/dashboard/product',
      icon: <InboxOutlined />,
      label: 'Product',
    },
    {
      key: '/dashboard/carouselSwiper',
      icon: <InboxOutlined />,
      label: 'CarouselSwiper',
    },
    {
      key: '/dashboard/customerUser',
      icon: <InboxOutlined />,
      label: 'CustomerUser',
    }
  ]
  
  const menuUser = [
    {
      key: '1',
      label: (
        <a  rel="" href="#1">
          profile
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a rel="" href="#2">
          change password
        </a>
      ),
    },{
      key: '3',
      label: (
        <a rel="" href="/">
          logout
        </a>
      ),
      icon : <LogoutOutlined/>,
      onClick : handleLogout
    },
  ]
  const profile = JSON.parse(localStorage.getItem("profile"))
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logoLayoutOne">
            <div className={`${collapsed ? "profileContainAnimate" : "profileContain"}`}>
              <h6 style={{ display:"flex",justifyContent:"center",marginTop:'30px'}} >FoodDaily Co.ltd</h6>
            </div>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={menuSiderBar}
          onClick={handleClickMenu}
        />
      </Sider>

      <Layout className="site-layout">
        <div className="headerLayoutOne">
          <MenuUnfoldOutlined
            style={{ fontSize: 26, paddingLeft: 20 }}
            onClick={() => setCollapsed(!collapsed)}/>
          <div>
            <Dropdown
              style={{ width: 150 }}
              menu={{ items: menuUser }}
              placement="bottomLeft">
              <Button type="link" className={"iconProfile"}>
                <UserOutlined />
                {profile.firstname} {profile.lastname}
                <DownOutlined />
              </Button>
            </Dropdown>
          </div>
        </div>

        <div className="mainBody">
          {props.children}
        </div>
      </Layout>
    </Layout>
  );
};

export default Dashboard;