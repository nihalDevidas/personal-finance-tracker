import React,{useState, useEffect} from 'react'
import Header from '../components/header/Header'
import Cards from "../components/cards/index"
import AddExpenseModal from "../components/modals/AddExpenseModal"
import AddIncomeModal from "../components/modals/AddIncomeModal"
import TransectionTable from "../components/transactionTable/index"
import {addDoc, collection, getDocs,query} from "firebase/firestore"
import {auth, db } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import {toast} from "react-toastify"
import moment from "moment"
import ColumnChart from "../components/charts/index"
import Pie from "../components/charts/Pie"

const Dashboard = () => {

   const[isExpenseModalVisible,setIsExpenseModalVisible ] = useState(false)
   const[isIncomeModalVisible,setIsIncomeModalVisible ] = useState(false)
   const[transections, setTransections] = useState([])
   const[loading, setLoading] = useState(false)
   const[user] = useAuthState(auth)

   const[income, setIncome] = useState(0);
   const[expense, setExpense] = useState(0);
   const[totalBalance, setTotalBalance] = useState(0);  


   function showExpenseModal(){
    setIsExpenseModalVisible(true)
   }

   function showIncomeModal(){
    setIsIncomeModalVisible(true)
   }

   function handleExpenseCancel(){
    setIsExpenseModalVisible(false)
   }

   function handleIncomeCancel(){
    setIsIncomeModalVisible(false)
   }


   function onFinish(values, type){
         const newtransection = {
          type:type,
          date: values.date.format("YYYY-MM-DD"),
          amount:parseFloat(values.amount),
          tag:values.tag,
          name: values.name,
         }

        addTransection(newtransection) 
   }


   async function addTransection(transection,many){
        try{
          const docRef = await addDoc(
            collection(db, `users/${user.uid}/transactions`),
            transection
          );
          fetchAllTransections();  // to get latest transaction data
          if(!many) toast.success("Transection Added!")
        }
        catch(e){
          if(!many) toast.error("could not add transection")
        }
   }


   useEffect(()=>{
       fetchAllTransections()
   },[user])

   
   async function fetchAllTransections(){
     setLoading(true)
      if(user){
        const q = query(collection(db, `users/${user.uid}/transactions`));
        const querySnapshot =  await getDocs(q);

        let transectionArray = [];
        querySnapshot.forEach((doc)=>{
          transectionArray.push(doc.data())
        })
        setTransections(transectionArray)
        console.log(transectionArray)
        toast.success("Transactions Fetched")
      }
     setLoading(false)
   }

   
   useEffect(()=>{
    calculateTransection()

   },[transections])


  function calculateTransection(){
      let incomeTotal = 0;
      let expenseTotal = 0;

      transections.forEach((transaction)=>{
        if(transaction.type === "income"){
          incomeTotal += transaction.amount;
        } else{
          expenseTotal += transaction.amount;
        }
      });

      setIncome(incomeTotal)
      setExpense(expenseTotal)
      setTotalBalance(incomeTotal-expenseTotal)
  }

   

  return (
    <div>
      <Header/>
      {loading ? <p>Loading...</p>:
        <>
          <Cards
            income = {income}
            expense = {expense}
            totalBalance = {totalBalance}
            showExpenseModal={showExpenseModal}
            showIncomeModal = {showIncomeModal}
          />


          <div style={{display:"flex",width:"95%",marginInline:"auto", marginTop:"1rem"}}>
             <h2 style={{flex:"1",textAlign:"center"}}>Income</h2>
             <h2 style={{flex:"1",textAlign:"center"}}>Expense</h2>
          </div>

          <div style={{width :"95%",height:"330px", display:"flex",marginBottom:"25px", marginInline:"auto", boxShadow:"var(--shadow)",borderRadius:"8px"}}>

              <div style={{flex:"1",height:"inherit", borderRight:"0.5px solid lightgray"}}>
                  {transections?<ColumnChart transactions={transections}/>:<h1>No transactions</h1>}
              </div>

              <div style={{flex:"1",height:"inherit",display:"flex",justifyContent:"center",alignItems:"center"}}>
                  {transections?<Pie transactions={transections}/>:<h1>No transactions</h1>}
              </div>
          </div>
            


           <AddExpenseModal
              isExpenseModalVisible={isExpenseModalVisible}
              handleExpenseCancel={handleExpenseCancel}
              onFinish = {onFinish}
           />

            <AddIncomeModal
              isIncomeModalVisible={isIncomeModalVisible}
              handleIncomeCancel={handleIncomeCancel}
              onFinish = {onFinish}
           />

           <TransectionTable 
           transactions={transections} 
           addTransaction={addTransection}
           fetchAllTransections = {fetchAllTransections}
           />
           
        </>
      }
       
    </div>
  )
}

export default Dashboard