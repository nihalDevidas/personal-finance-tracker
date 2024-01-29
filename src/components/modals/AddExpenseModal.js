import React from 'react'
import { Button,Modal, Form, Input, DatePicker, Select } from 'antd'


const AddExpenseModal = ({isExpenseModalVisible, handleExpenseCancel, onFinish}) => {

    const[form] = Form.useForm();

  return (
    <Modal 
     style={{fontWeight:"600"}}
     visible = {isExpenseModalVisible}
     title = {"Add Expense"}
     onCancel={handleExpenseCancel}
     footer = {null}
    >
       <Form
         from = {form}
         layout='vertical'
         onFinish = {(values)=>{
           onFinish(values,"expense");
           form.resetFields()
         }}
       >
         <Form.Item
            style={{fontWeight:"600"}}
            label = "Name"
            name = "name"
            rules = {[
                {
                  required:true,
                  message: "Please input the name of transection",
                },
            ]}
         >
           <Input type="text" className='custom-input' />  
         </Form.Item>


          <Form.Item
            style={{fontWeight:"600"}}
            label = "Amount"
            name = "amount"
            rules = {[
                {
                  required:true,
                  message: "Please input the expense amount!",
                },
            ]}
         >
           <Input type="number" className='custom-input' />  
         </Form.Item> 

          <Form.Item
            style={{fontWeight:"600"}}
            label = "Date"
            name = "date"
            rules = {[
                {
                  required:true,
                  message: "Please input transection date",
                },
            ]}
          >
           <DatePicker className='custom-input' format={"YYYY-MM-DD"}/>
         </Form.Item> 

         <Form.Item
            style={{fontWeight:"600"}}
            label = "Tag"
            name = "tag"
            rules = {[
                {
                  required:true,
                  message: "Please select a tag",
                },
            ]}
          >
            <Select className='select-input-2'>
                <Select.Option value= "Food">Food</Select.Option>
                <Select.Option value= "Shoping">Shoping</Select.Option>
                <Select.Option value= "Office">Office</Select.Option>
                
            </Select>

          </Form.Item> 

         <Form.Item>
            <Button className='btn btn-blue' type = "primary" htmlType='submit'>
              Add Expense
            </Button>
          </Form.Item>     

       </Form>
    </Modal>
  )
}

export default AddExpenseModal