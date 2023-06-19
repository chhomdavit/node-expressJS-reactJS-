import { Button, Col,  Divider, Form, Image, Input, Modal, Row, Space } from 'antd';
import{Config} from '../../util/service'
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
                tittle: items.tittle,
                desc: items.desc
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
                          label="tittle"
                          name={'tittle'}
                          rules={[{ required: true, message: 'please fill in tittle' }]}
                      >
                          <Input placeholder='tittle' />
                      </Form.Item>
                </Col>
                <Col span={12}>
                      <Form.Item
                          label="desc"
                          name={'desc'}
                      >
                          <Input placeholder='desc' />
                      </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                      <Form.Item
                          label="Image_Carousel"
                          name={'image_carousel'}
                      >
                          <Input type='file' onChange={onChangeImage} placeholder='image_carousel' />
                          {imgFile !=null ? <Image src={imgFile} alt={imgFile} style={{ width:100 }}/>
                        :
                          <div>
                              {items && <Image src={Config.imagePath+items.image_carousel} alt={items.image_carousel} style={{ width:100 }} />}
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
