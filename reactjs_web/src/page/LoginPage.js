import React ,{useState}from 'react';
import { message, Button, Form, Input  } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons';

const LoginPage = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = () =>{
         alert("davit")
        }
    const onFinish = (fields) => {
        alert('davit')
        }
  return (
    <div>
      <Form
    style={{ maxWidth:"400px",margin:"auto", marginTop:"15%", border:"1px solid rgb(209,209,209)",borderRadius:"10px",padding:"10px"}}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    >
        <Form.Item>
            <h2 style={{ textAlign:"center" }}>Login Page</h2>
        </Form.Item>
        <Form.Item
            name="username"
            rules={[
            {
                required: true,
                message: 'Please input your Username!',
            },
            ]}
        >
            <Input 
                prefix={<UserOutlined/>}                    placeholder="Username" 
                onChange={(event)=>{
                    setUsername(event.target.value)
                 }}
                />
        </Form.Item>

        <Form.Item
            name="password"
            rules={[
            {
                required: true,
                message: 'Please input your Password!',
            },
            ]}
        >
            <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
            onChange={(event)=>{
                setPassword(event.target.value)
            }}
            />
      </Form.Item>

      <Form.Item>
        <Button 
            type="primary" 
            htmlType="submit"
            style={{ width:"100%" }}
            onClick={handleLogin}>

          LOG IN
        </Button>
      </Form.Item>
    </Form>
    </div>
  )
}

export default LoginPage;
