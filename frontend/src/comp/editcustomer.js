import axios from "axios";
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux'
import { addcustomer } from '../data/customer'

const EditCustomer = (props) => {
  const [Name, setname] = useState(props.data.Name);
  const [saleman, setsaleman] = useState(props.data.saleman);
  const [ph, setph] = useState(props.data.ph);
  const [address, setaddress] = useState(props.data.address);
  const [note, setnote] = useState(props.data.note);
  const [loading, setloading] = useState(false);
  const [successMsg, setsuccessMsg] = useState(false);
  const [errorMsg, seterrorMsg] = useState(false);
  const dispatch = useDispatch()

  const handleForm = async (e) => {
    e.preventDefault();
    setloading(true);

    await axios
      .put(`http://localhost:5000/api/customer/${props.data._id}`, {
        Name,
        saleman,
        ph,
        address,
        note
      })
      .then(function (response) {
        console.log(response);
        console.log("sublited");
        setname("");
        setph("");
        setaddress("");
        setnote("");
        setsaleman("");
        setloading(false);
        setsuccessMsg(true);
        seterrorMsg(false);
        axios
        .get(`http://localhost:5000/api/customer`)
        .then((res) => {
          console.log(res.data);
          dispatch(addcustomer(res.data))
        })
        .catch((error) => {
          console.log(error);
        });
      })
      .catch(function (error) {
        console.log(error);
        setloading(false);

        seterrorMsg(true);
        setsuccessMsg(false);
        setTimeout(() => {
          seterrorMsg(false);
        }, 10000);
      });
  };

  return (
    <>
      {successMsg ? (
        <div className="success text-center">
          <h1 className="text-success">Customer Updated</h1>
          <button className="btn btn-primary" onClick={() => props.onHide()}>
            Close
          </button>
        </div>
      ) : (
        <>
          {errorMsg && (
            <div class="alert alert-danger">
              something is wrong please try again
            </div>
          )}
          <form className="form" onSubmit={(e) => handleForm(e)}>
            <div className="form-group">
              <label for="exampleInputEmail1">Customer Name</label>
              <input
                type="text"
                className="form-control shadow-none"
                value={Name}
                onChange={(e) => setname(e.target.value)}
                placeholder="Enter Customer Name"
                required
              />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Saleman Name</label>
              <input
                type="text"
                className="form-control shadow-none"
                value={saleman}
                onChange={(e) => setsaleman(e.target.value)}
                placeholder="Enter saleman Name"
              />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Customer Phone</label>
              <input
                type="text"
                className="form-control shadow-none"
                value={ph}
                onChange={(e) => setph(e.target.value)}
                placeholder="Enter Customer Phone"
              />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Customer Address</label>
              <input
                type="text"
                className="form-control shadow-none"
                value={address}
                onChange={(e) => setaddress(e.target.value)}
                placeholder="Enter Customer Address"
              />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Note</label>
              <textarea
                type="text"
                className="form-control shadow-none"
                value={note}
                onChange={(e) => setnote(e.target.value)}
                placeholder="about customer"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </form>
        </>
      )}
    </>
  );
};

export default EditCustomer;
