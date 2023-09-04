// import React, { useEffect, useState } from "react";
// import Layout from "../components/Layout/Layout";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const ProductDetails = () => {
//   const params = useParams();
//   const [products, setProducts] = useState({});
//   const [relatedProducts, setRelatedProducts] = useState([]);

//   // Fetch product details
//   useEffect(() => {
//     const getProduct = async (slug) => {
//       try {
//         const { data } = await axios.get(
//           `/api/v1/product/get-product/${params.slug}`
//         );
//         setProducts(data?.product);
//         getSimilarProduct(data?.product._id, data?.product.category._id);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     if (params?.slug) {
//       getProduct();
//     }
//   }, [params?.slug]);
//   console.log(products._id);
//   // similar product
//   const getSimilarProduct = async (Pid, cid) => {
//     console.log("pid ", Pid, " cid ", cid);
//     try {
//       const { data } = await axios.get(
//         `/api/v1/product/related-product/${Pid}/${cid}`
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <Layout>
//       {/* <div className="row container mt-2">
//         <div className="col-md-6">
//           {products._id && ( // Check if _id is available before rendering
//             <img
//               src={`/api/v1/product/product-photo/${products._id}`}
//               className="card-img-top"
//               alt={products.name}
//             />
//           )}
//         </div>
//         <div className="col-md-6">
       
//           {Object.keys(products).length > 0 && (
//             <div>
//               <h6>Name:{products.name}</h6>
//               <p>Description:{products.description}</p>
//               <p>Price: Price:{products.price}</p>
             
//             </div>
//           )}
//         </div>
//       </div> */}
//       <div className="row container product-details">
//         <div className="col-md-3 mt-2">
//           <img
//             src={`/api/v1/product/product-photo/${products._id}`}
//             className="card-img-top"
//             alt={products.name}
//             style={{ width: "250px" }}
//           />
//         </div>
//         <div className="col-md-6 product-details-info">
//           <h1 className="text-center">Product Details</h1>
//           <hr />
//           <h6>Name : {products.name}</h6>
//           <h6>Description : {products.description}</h6>
//           <h6>
//             Price :
//             {products?.price?.toLocaleString("en-US", {
//               style: "currency",
//               currency: "USD",
//             })}
//           </h6>
//           <h6>Category : {products?.category?.name}</h6>
//           <button class="btn btn-secondary ms-1">ADD TO CART</button>
//         </div>
//       </div>
//       <hr />

//       <div className="row">
//         <h1>Similar Product</h1>
//         <div className="d-flex flex-wrap">
//             {relatedProducts?.map((p) => (
//               <div className="card m-2" style={{ width: "20rem" }}>
//                 <img
//                   src={`/api/v1/product/product-photo/${p._id}`}
//                   className="card-img-top"
//                   alt={p.name}
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">{p.name}</h5>
//                   <p className="card-text">
//                     {p.description.substring(0, 30)}...
//                   </p>
//                   <p className="card-text"> $ {p.price}</p>
//                   <button className="btn btn-secondary ms-1">
//                     ADD TO CART
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//       </div>
//     </Layout>
//   );
// };

// export default ProductDetails;

import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams} from "react-router-dom";
// , useNavigate 
// import "../styles/ProductDetailsStyles.css";

const ProductDetails = () => {
  const params = useParams();
  // const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row container product-details">
        <div className="col-md-3 m-2">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            style={{width:"250px"}}
          />
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Product Details</h1>
          <hr />
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>
            Price :$
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </h6>
          <h6>Category : {product?.category?.name}</h6>
          <button class="btn btn-secondary ms-1">ADD TO CART</button>
        </div>
      </div>
      <hr />
      <div className="row container similar-products">
        <h4>Similar Products ➡️</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" key={p._id}>
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
                style={{width:"250px"}}

              />
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-title card-price">
                    ${p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </h5>
                </div>
                <p className="card-text ">
                  {p.description.substring(0, 60)}...
                </p>
                <div className="card-name-price">
                  {/* <button
                    className="btn btn-info ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button> */}
                  {/* <button
                  className="btn btn-dark ms-1"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, p])
                    );
                    toast.success("Item Added to cart");
                  }}
                >
                  ADD TO CART
                </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
