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
    onChangeImage1,
    imgFile1,
    onChangeImage2,
    imgFile2,
    onChangeImage3,
    imgFile3,
    footer=null
}) => {
    const [form] =Form.useForm()
    React.useEffect(()=>{
        if(items !=null){
            form.setFieldsValue({
                name: items.name,
                category_id: items.category_id,
                barcode: items.barcode,
                price: items.price,
                description: items.description,
                quantity: items.quantity,
                status: items.status,
                create_by: items.create_by,
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
     width={'70%'}
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
             }}
        >
            <Row gutter={5}>
                <Col span={12}>
                      <Form.Item
                          label="name"
                          name={'name'}
                      >
                          <Input placeholder='name' />
                      </Form.Item>
                </Col>
                <Col span={12}>
                      <Form.Item
                          label="category_id"
                          name={'category_id'}
                      >
                          <Input placeholder='category_id' />
                      </Form.Item>
                </Col>
            </Row>

            <Row gutter={5}>
                <Col span={8}>
                      <Form.Item
                          label="barcode"
                          name={'barcode'}
                      >
                          <Input placeholder='barcode' />
                      </Form.Item>
                </Col>
                <Col span={8}>
                      <Form.Item
                          label="price"
                          name={'price'}
                      >
                          <Input placeholder='price' />
                      </Form.Item>
                </Col>
                <Col span={8}>
                      <Form.Item
                          label="quantity"
                          name={'quantity'}
                      >
                          <Input placeholder='quantity' />
                      </Form.Item>
                </Col>
            </Row>

            <Row gutter={5}>
                <Col span={8}>
                      <Form.Item
                          label="create_by"
                          name={'create_by'}
                      >
                          <Input placeholder='create_by' />
                      </Form.Item>
                </Col>
                <Col span={8}>
                      <Form.Item
                          label="create_at"
                          name={'create_at'}
                      >
                          <Input placeholder='create_at' />
                      </Form.Item>
                </Col>
                <Col span={8}>
                      <Form.Item
                          label="status"
                          name={'status'}
                      >
                          <Input placeholder='status' />
                      </Form.Item>
                </Col>
            </Row>

            <Row>
                <Col span={24}>
                      <Form.Item
                          label="description"
                          name={'description'}
                      >
                          <Input.TextArea placeholder='description' />
                      </Form.Item>
                </Col>
            </Row>

            <Row gutter={5}>
                <Col span={6}>
                      <Form.Item
                          label="Upload Image 1"
                          name={'image_1'}
                      >
                          <Input type='file' onChange={onChangeImage} placeholder='image_1' />
                          {imgFile !=null ? <Image src={imgFile} alt={imgFile} style={{ width:100 }}/>
                        :
                          <div>
                              {items && <Image src={Config.imagePath+items.image_1} alt={items.image_1} style={{ width:100 }} />}
                          </div>
                          }
                      </Form.Item>
                </Col>
                <Col span={6}>
                      <Form.Item
                          label="Upload Image 2"
                          name={'image_2'}
                      >
                          <Input type='file' onChange={onChangeImage1} placeholder='image_2' />
                          {imgFile1 !=null ? <Image src={imgFile1} alt={imgFile1} style={{ width:100 }}/>
                        :
                          <div>
                              {items && <Image src={Config.imagePath+items.image_2} alt={items.image_2} style={{ width:100 }} />}
                          </div>
                          }
                      </Form.Item>
                </Col>
                <Col span={6}>
                      <Form.Item
                          label="Upload Image 3"
                          name={'image_3'}
                      >
                          <Input type='file' onChange={onChangeImage2} placeholder='image_3' />
                          {imgFile2 !=null ? <Image src={imgFile2} alt={imgFile2} style={{ width:100 }}/>
                        :
                          <div>
                              {items && <Image src={Config.imagePath+items.image_3} alt={items.image_3} style={{ width:100 }} />}
                          </div>
                          }
                      </Form.Item>
                </Col>
                <Col span={6}>
                      <Form.Item
                          label="Upload Image 4"
                          name={'image_4'}
                      >
                          <Input type='file' onChange={onChangeImage3} placeholder='image_4' />
                          {imgFile3 !=null ? <Image src={imgFile3} alt={imgFile3} style={{ width:100 }}/>
                        :
                          <div>
                              {items && <Image src={Config.imagePath+items.image_4} alt={items.image_4} style={{ width:100 }} />}
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
