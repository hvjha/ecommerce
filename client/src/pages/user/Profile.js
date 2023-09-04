import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { toast } from "react-hot-toast";
const Profile = () => {
  // context
  const [auth, setAuth] = useAuth();
  // STATE
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // get user data
  useEffect(()=>{
    const {email,name,phone,address} = auth.user
    setEmail(email)
    setName(name)
    setAddress(address)
    setPhone(phone)
  },[auth?.user])

  // FORM FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, password, phone, address);
    toast.success("Register Successfully");
    try {
      const {data} = await axios.put(" /api/v1/auth/profile", {
        name,
        email,
        password,
        phone,
        address,
      });
      if(data?.error){
        toast.error(data?.error)
      }else{
        setAuth({...auth,user:data?.updatedUser})
        let ls = localStorage.getItem("auth")
        ls=JSON.parse(ls)
        ls.user = data.updatedUser
        localStorage.setItem('auth',JSON.stringify(ls));
        toast.success('profile updated successfully');
      }
      // if (res.data.success) {
      //   toast.success(res.data && res.data.message);
      // } else {
      //   toast.error(res.data.message);
      // }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 mt-2">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="form-container-profile">
              <form onSubmit={handleSubmit}>
                <h4 className="title">USER PROFILE</h4>
                <div className="mb-2">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    id="exampleInputName"
                    placeholder="Enter your Name"
                  
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail"
                    placeholder="Enter Your Email"
                  
                    disabled
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter Your Password"
                    
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    id="exampleInputPhone"
                    placeholder="Enter Your Phone"
                    
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    id="exampleInputAddress"
                    placeholder="Enter Your Address"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
