import React,{useState} from 'react'
import {Table, Select, Radio} from "antd"
import searchImg from "../../assets/search.svg"
import "./style.css"

const TransectionTable = ({transactions}) => {

    const[search, setSearch] = useState("");
    const[typeFilter, setTypeFilter] = useState("")
    const[sortKey, setSortKey] = useState("")

    const columns = [
        {
            title:"Name",
            dataIndex: "name",
            key: "name"
        },

        {
            title:"Amount",
            dataIndex: "amount",
            key: "amount"
        },
        {
            title:"Tag",
            dataIndex: "type",
            key: "type"
        },
        {
            title:"Type",
            dataIndex: "type",
            key: "type"
        },
        {
            title:"Date",
            dataIndex: "date",
            key: "date"
        }

    ];

    let filteredTransaction = transactions.filter((item)=>
       item.name.toLowerCase().includes(search.toLowerCase()) && item.type.includes(typeFilter)
    )

    let sortedTransactions = filteredTransaction.sort((a,b)=>{
        if(sortKey == "date"){
            return new Date(a.date)- new Date(b.date);

        }else if(sortKey == "amount"){
            return a.amount - b.amount;
        }else{
            return 0;
        }
    })

  return( 
  <>
     <div className='input-select-wrapper'>
        <div className='input-flex'>
            <img src={searchImg} width="16"/>
            <input 
              value = {search} 
              onChange = {(e)=>setSearch(e.target.value)}
              placeholder='search by name'
            />

        </div>

        <Select 
          className='select-input'
          onChange={(value)=>setTypeFilter(value)}
          value = {typeFilter}
          placeholder = "filter"
          allowClear
        >
          <Select.Option value= "">All</Select.Option>
          <Select.Option value= "income">Income</Select.Option>
          <Select.Option value= "expense">Expense</Select.Option>
                
        </Select>
      </div>  

      <div className='radio-table-wrapper'>
        
            <div className='radio-export-wrapper'>

                <h2>Transections.</h2>

                <Radio.Group
                  className='input-radio'
                  onChange={(e)=>setSortKey(e.target.value)}
                  value = {sortKey}
                >
                  <Radio.Button value= "">No Sort</Radio.Button>
                  <Radio.Button value= "date">Sort By Date</Radio.Button>
                  <Radio.Button value= "amount">Sort By Amount</Radio.Button>
                </Radio.Group>

                <div className='export-wrapper'>
                    <button className='btn'>Export To CSV</button>
                    
                    <div>
                      <label for="file-csv" className='btn btn-blue'>
                        Import from CSV
                      </label>
                      <input
                        id="file-csv"
                        type="file"
                        accept=".csv"
                        required
                        style={{display:"none"}}
                      />
                    </div>
                </div>
            </div>
          <Table dataSource = {sortedTransactions} columns = {columns}/>
      </div>    
  </>
  )
}

export default  TransectionTable