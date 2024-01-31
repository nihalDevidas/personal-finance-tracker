import React from 'react'
import {Pie} from "@ant-design/charts"

const Phi = ({transactions}) => {


    let spendingData = transactions.filter((item)=>item.type === "expense")

    let datagroupByTag = spendingData.map((item)=>{
        return{tag: item.tag, amount : item.amount}
    })
    
    
    let finalSpending = datagroupByTag.reduce((acc, obj)=>{

        let key =obj.tag;
        if(!acc[key]){
            acc = {...acc, [key]: obj.amount}
        }
        else{
            acc[key] = acc[key] + obj.amount
        }
        return acc; 

    },{});

    let finalData = [];

    for(let key in finalSpending){
       finalData.push({tag: key , amount : finalSpending[key]});
    }
    

    const spendingConfig = {
        data :finalData,
        width:500,
        angleField:"amount",
        colorField : "tag"
    }


  let pieChart
  return (
      <Pie {...spendingConfig}
      onReady = {(chartInstance)=>(pieChart = chartInstance)}/>
  )
}

export default Phi