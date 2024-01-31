import React from 'react'
import { Column } from '@ant-design/plots';

const ColumnChart = ({transactions}) => {
    const data1 = transactions.filter((item)=>item.type === "income").map((item)=>{
        return{type:item.date, amount: item.amount}
      });

      const config = {
        data:data1,
        xField: 'type',
        yField: 'amount',
        label: {
          //label
          // 'top', 'bottom', 'middle',
          // 配置样式
          style: {
            fill: '#FFFFFF',
            opacity: 0.6,
          },
        },
        xAxis: {
          label: {
            autoHide: false,
            autoRotate: false,
          },
        },
        meta: {
          type: {
            alias: '类别',
          },
          sales: {
            alias: '销售额',
          },
        },
      };
      return <Column {...config} />;
       
}

export default ColumnChart

