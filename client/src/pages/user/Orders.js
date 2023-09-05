import React,{useEffect,useState} from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import axios from 'axios'
import { useAuth } from '../../context/auth'

const Orders = () => {
  const [orders,setOrders]=useState([])
  const getOrders = async()=>{
    try{
      const {data} = await axios.get('/api/v1/auth/orders')
      setOrders(data)
    }catch(error){
      console.log(error)
    }
  }
useEffect(()=>{
  if(auth?.token) getOrders()
})

  return (
    <Layout title={'Your Order'}>
      <div className="container-fluid m-8 p-3">
        <div className="row">
            <div className="col-md-3">
                <UserMenu/>
            </div>
            <div className="col-md-9">
                <h1>All orders</h1>
            </div>
        </div>
      </div>
    </Layout>
  )
}

export default Orders
