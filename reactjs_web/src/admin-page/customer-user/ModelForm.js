import { Button, Col,  Divider, Form, Image, Input, Modal, Row, Space } from 'antd';
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
                name: items.name,
                tel: items.tel,
                password: items.password,
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
                <Col span={24}>
                      <Form.Item
                          label="name"
                          name={'name'}
                      >
                          <Input placeholder='name' />
                      </Form.Item>
                </Col>
            </Row>
            <Row gutter={5}>
                <Col span={12}>
                      <Form.Item
                          label="Password"
                          name={'password'}
                          rules={[{ required: true, message: 'please fill in password' }]}
                      >
                          <Input placeholder='password' disabled={items !=null ? true : false}/>
                      </Form.Item>
                </Col>
                <Col span={12}>
                      <Form.Item
                          label="Telephone"
                          name={'tel'}
                          rules={[{ required: true, message: 'please fill in tel' }]}
                      >
                          <Input placeholder='tel'/>
                      </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                      <Form.Item
                          label="Upload Image"
                          name={'image_customer_user'}
                      >
                          <Input type='file' onChange={onChangeImage} placeholder='image_customer_user' />
                          {imgFile !=null ? <Image src={imgFile} alt={imgFile} style={{ width:150,height:150 }}/>
                        :
                          <div>
                              {items && <Image src={Config.imagePath+items.image_customer_user} alt={items.image_customer_user} style={{ width:150,height:150 }} />}
                          </div>
                          }
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
