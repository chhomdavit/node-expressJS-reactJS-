import { Button, Col,  DatePicker, Divider, Form, Image, Input, Modal, Radio, Row, Space } from 'antd';
import{Config} from '../../util/service'
import 'dayjs/locale/en'
import React from 'react';


const ModelForm = ({
    title=null,
    open=false,
    onCancel,
    onFinish,
    onOk,
    items,
    onChangeImage,
    imgFile,
    footer=null
}) => {
    const [form] =Form.useForm()
    React.useEffect(()=>{
        if(items !=null){
            form.setFieldsValue({
                firstname: items.firstname,
                lastname: items.lastname,
                gender: items.gender,
                dob: items.dob,
                userEmail: items.userEmail,
                password : items.password,
                status : items.status,
                create_at: items.create_at,
            })
        }
    },[items])
  return (
    <Modal
     title={title}
     open ={open}
     onOk={onOk}
     onCancel={()=>{
        onCancel()
        form.resetFields()
     }}
     footer={footer}
     width={'60%'}
    >
        <Divider/>
        <Form 
            form={form} 
            layout='vertical' 
            onFinish={(item=>{
                form.resetFields() 
                onFinish(item)})}
            initialValues={{ 
                status:0,
                gender:0,
             }}
        >
            <Row gutter={5}>
                <Col span={12}>
                      <Form.Item
                          label="Firstname"
                          name={'firstname'}
                          rules={[{ required: true, message: 'please fill in Firstname' }]}
                      >
                          <Input placeholder='Firstname' />
                      </Form.Item>
                </Col>
                <Col span={12}>
                      <Form.Item
                          label="Lastname"
                          name={'lastname'}
                          rules={[{ required: true, message: 'please fill in Lastname' }]}
                      >
                          <Input placeholder='Lastname' />
                      </Form.Item>
                </Col>
            </Row>
            <Row gutter={5}>
                <Col span={12}>
                      <Form.Item
                          label="gender"
                          name={'gender'}
                          rules={[{ required: true, message: 'please fill in gender' }]}
                      >
                          <Radio.Group>
                            <Radio value={1}>Male</Radio>
                            <Radio value={0}>Female</Radio>
                          </Radio.Group>
                      </Form.Item>
                </Col>
                <Col span={12}>
                      <Form.Item
                          label="dob"
                          name={'dob'}
                      >
                        <Input placeholder='Dob' />
                      </Form.Item>
                </Col>
            </Row>
            <Row gutter={5}>
                <Col span={12}>
                      <Form.Item
                          label="userEmail"
                          name={'userEmail'}
                          rules={[{ required: true, message: 'please fill in userEmail' }]}
                      >
                          <Input placeholder='userEmail' />
                      </Form.Item>
                </Col>
                <Col span={12}>
                      <Form.Item
                          label="password"
                          name={'password'}
                          rules={[{ required: true, message: 'please fill in password' }]}
                      >
                          <Input.Password placeholder='password' disabled={items !=null ? true : false}/>
                      </Form.Item>
                </Col>
            </Row>
            <Row gutter={5}>
                <Col span={12}>
                      <Form.Item
                          label="Upload Image"
                          name={'adminUser_avarta'}
                      >
                          <Input type='file' onChange={onChangeImage} placeholder='adminUser_avarta' />
                          {imgFile !=null ? <Image src={imgFile} alt={imgFile} style={{ width:100 }}/>
                        :
                          <div>
                              {items && <Image src={Config.imagePath+items.adminUser_avarta} alt={items.adminUser_avarta} style={{ width:100 }} />}
                          </div>
                          }
                      </Form.Item>
                </Col>
                <Col span={12}>
                      <Form.Item
                          label="status"
                          name={'status'}
                      >
                          <Radio.Group>
                            <Radio value={0}>Admin</Radio>
                            <Radio value={1}>Non-Admin</Radio>
                          </Radio.Group>
                      </Form.Item>
                </Col>
            </Row>
    
            <Form.Item style={{ textAlign:'right' }}>
            <Space>
                <Button 
                    danger
                    onClick={()=>{
                        onCancel() 
                        form.resetFields()}}
                >
                    Cancel
                </Button>
                <Button htmlType='submit'>{items !=null ? "Update" : "Save"}</Button>
            </Space>
            </Form.Item>
            
        </Form>
    </Modal>
  )
}

export default ModelForm;
