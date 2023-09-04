import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import useCategory from '../hooks/useCategory'
import Layout from '../components/Layout/Layout'

const Categories = () => {
    const categories = useCategory()
  return (
    <Layout title={"All Categories"}>
      <div className="container">
        <div className="row">
        {categories.map(c=>(

            <div className="col-md-6 key={c._id}">
               <Link to={`/category/${c.slug}`} className='btn btn-primary m-2'>{c.name}</Link>
            </div>
        ))}
        </div>
      </div>
    </Layout>
  )
}

export default Categories
