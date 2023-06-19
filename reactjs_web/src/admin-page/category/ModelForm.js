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
                description: items.description,
                parent_id: items.parent_id,
                order_number: items.order_number,
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
                          label="name"
                          name={'name'}
                          rules={[{ required: true, message: 'please fill in name' }]}
                      >
                          <Input placeholder='name' />
                      </Form.Item>
                </Col>
                <Col span={12}>
                      <Form.Item
                          label="description"
                          name={'description'}
                      >
                          <Input placeholder='description' />
                      </Form.Item>
                </Col>
            </Row>
            <Row gutter={5}>
                <Col span={12}>
                      <Form.Item
                          label="parent_id"
                          name={'parent_id'}
                          rules={[{ required: true, message: 'please fill in parent_id' }]}
                      >
                          <Input placeholder='parent_id' />
                      </Form.Item>
                </Col>
                <Col span={12}>
                      <Form.Item
                          label="order_number"
                          name={'order_number'}
                      >
                          <Input placeholder='order_number' />
                      </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                      <Form.Item
                          label="Upload Image"
                          name={'image_category'}
                      >
                          <Input type='file' onChange={onChangeImage} placeholder='image_category' />
                          {imgFile !=null ? <Image src={imgFile} alt={imgFile} style={{ width:100 }}/>
                        :
                          <div>
                              {items && <Image src={Config.imagePath+items.image_category} alt={items.image_category} style={{ width:100 }} />}
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
