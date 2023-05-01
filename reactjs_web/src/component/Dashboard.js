import React, { useState } from 'react';
import {  DownOutlined,  
          InboxOutlined,
          LogoutOutlined,
          MenuUnfoldOutlined,
          TeamOutlined,
          UserOutlined,} from '@ant-design/icons';
import { Button, Dropdown, Layout, Menu} from 'antd';
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const {  Sider } = Layout;

const Dashboard = (props) => {
  
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleClickMenu = (item) => {
    navigate(item.key)
  }
  
  const menuSiderBar = [
    {
      key: '/adminUser',
      icon: <TeamOutlined />,
      label: 'AdminUser',
    },
    {
      key: '/aboutpage',
      icon: <InboxOutlined />,
      label: 'About',
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
        <a rel="" href="logout">
          logout
        </a>
      ),
      icon : <LogoutOutlined/>
    },
  ]
  
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logoLayoutOne">
            <div className={`${collapsed ? "profileContainAnimate" : "profileContain"}`}>
              <h3 style={{ display:"flex",justifyContent:"center" }} >FoodDaily Co.ltd</h3>
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
                davit
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