import React from 'react'
import { Button,Modal, Form, Input, DatePicker, Select } from 'antd'


const AddIncomeModal = ({isIncomeModalVisible,handleIncomeCancel,onFinish}) => {

    const[form] = Form.useForm();

  return (
    <Modal 
     style={{fontWeight:"600"}}
     visible = {isIncomeModalVisible}
     title = {"Add Income"}
     onCancel={handleIncomeCancel}
     footer = {null}
    >
        <Form
         from = {form}
         layout='vertical'
         onFinish = {(values)=>{
           onFinish(values,"income");
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
                  message: "Please input the income amount!",
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
                  message: "Please input income date",
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
                <Select.Option value= "Salary">Salary</Select.Option>
                <Select.Option value= "Freelance">Freelance</Select.Option>
                <Select.Option value= "Investment">Investment</Select.Option>
                <Select.Option value= "Bitcoins">Bitcoins</Select.Option>
            </Select>

          </Form.Item>

          <Form.Item>
            <Button className='btn btn-blue' type = "primary" htmlType='submit'>
              Add Income
            </Button>
          </Form.Item>


       </Form>

    </Modal>
    
  )
}

export default AddIncomeModal