import React,{useState} from 'react'
import {Table, Select, Radio} from "antd"
import searchImg from "../../assets/search.svg"
import "./style.css"
import {parse, unparse } from 'papaparse'
import { toast } from 'react-toastify'

const TransectionTable = ({transactions, addTransaction, fetchAllTransections}) => {

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


    function exportCSV(){
      let csv = unparse({
        fields: ["name","tag", "date", "amount"],
        data : transactions,
      });
      var data = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
      var url = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = "transactions.csv"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
    }

    function importFromCSV(event){
      event.preventDefault();
      try{
        parse(event.target.files[0],{
          header : true,
          complete : async function (results){

            for(const transaction of results.data){
              const newTransaction = {
                ...transaction,
                amount: parseFloat(transaction.amount)
              };
              await addTransaction(newTransaction, true)
            }
          },
        })
        toast.success("All traansactions added")
        fetchAllTransections();

      }
      catch(e){
            toast.error("could not add transactions")
      }

    }


    
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

                <h2>Transactions.</h2>

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
                    <button className='btn1 btn' onClick = {exportCSV}>Export To CSV</button>
                    
                    <div>
                      <label for="file-csv" className='btn1 btn btn-blue'>
                        Import from CSV
                      </label>
                      <input
                        id="file-csv"
                        type="file"
                        accept=".csv"
                        required
                        style={{display:"none"}}
                        onChange = {importFromCSV}
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