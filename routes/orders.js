const router = require("express").Router();
let Orders = require("../models/orders");
let Customers = require("../models/customers");
let Inventories = require("../models/inventory");




//////////////////////////////////////
///////////Get All Orders////////////////
router.route("/").get((req, res) => {
  Orders.find()
    .then((Orders) => res.json(Orders))
    .catch((err) => res.status(400).json("Error: " + err));
});
//////////////////////////////////////
///////////Get customer Orders////////////////
router.route("/customer/:customer_id").get((req, res) => {
  const customer_id = req.params.customer_id
  Orders.find({customer_id: customer_id})
    .then((Orders) => res.json(Orders))
    .catch((err) => res.status(400).json("Error: " + err));
});

///////////Get All Orders By Date////////////////
router.route("/date/:date").get((req, res) => {
  const date = req.params.date
  Orders.find({date: date})
    .then((Orders) => res.json(Orders))
    .catch((err) => res.status(400).json("Error: " + err));
});

//////////////////////////////////////
///////////Get All Orders////////////////
router.route("/count").get((req, res) => {
  Orders.count()
    .then((Orders) => res.json(Orders))
    .catch((err) => res.status(400).json("Error: " + err));
});

//////////////////////////////////////
///////////post Orders////////////////
router.route("/").post(async (req, res) => {
  const data = req.body;
  console.log(data);
  const addnewOrders = new Orders(data);
  await addnewOrders.save()
  for (let index = 0; index < data.items.length; index++) {
    const element = data.items[index];
    await Inventories.updateOne(
      {_id: element.id},
      { $inc: {sold: element.qty}}
    )
  }
  if (data.received>0){
    const updateCustomer = await Customers.updateOne(
      { _id: data.customer_id},
      { $inc: { orders: 1, Total: data.Total, received: data.received },
        $push:{
          payments:{
            bill: data.bill,
            pay: data.received,
            date: data.date,
            note: "For order# "+data.order
          }
        },
    }
    )
    return res.json({ msg: true, data: addnewOrders, Customer: updateCustomer })

  }else{
    const updateCustomer = await Customers.updateOne(
      { _id: data.customer_id},
      { $inc: { orders: 1, Total: data.Total },
      
    }
    )
    return res.json({ msg: true, data: addnewOrders, Customer: updateCustomer })
  }
   
    
    
    // .catch((err) => res.status(400).json("Error: " + err));
});

//////////////////////////////////////
///////////get by id Orders////////////////
router.route("/:id").get((req, res) => {
  Orders.findById(req.params.id)
    .then((Orders) => res.json(Orders))
    .catch((err) => res.status(400).json("Error: " + err));
});

//////////////////////////////////////
///////////delete by id Orders////////////////
router.route("/:id/:customer_id").delete(async (req, res) => {
  
  const order = await Orders.findByIdAndDelete(req.params.id)

  const customerupdate = await Customers.updateOne(
    { _id: req.params.customer_id},
    { $inc: { orders: -1, Total: -order.Total},
    
  }
  )
 
    .then(() => res.json({msg: "Orders deleted.", order}))
    .catch((err) => res.status(400).json("Error: " + err));
});

//////////////////////////////////////
///////////update by id Orders////////////////

// router.route("/:id").put((req, res) => {
//   const data = req.body;

//   Orders.findById(req.params.id)
//     .then((Orders) => {
//       Orders.grade = data.grade;
//       Orders.Orders = data.Orders;

//       Orders.save()
//         .then(() => res.json("Orders updated!"))
//         .catch((err) => res.status(400).json("Error: " + err));
//     })
//     .catch((err) => res.status(400).json("Error: " + err));
// });

//////////////////////////////////////
///////////update by id Orders////////////////

router.route("/:id/").put(async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const update = await Orders.updateOne(
      { _id: req.params.id },
      { $set: data }
    );

    res.json({ msg: "Orders updated!" });
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});


///////////Get All Orders By Date////////////////
router.route("/stats/:date").get((req, res) => {
  const date = req.params.date
  Orders.aggregate(
   
    [
      {$match: { month: date } },
      {
        
        $group: {
          _id: { date: "$date" },
          total: {
            $sum: "$Total"
          },
          stock: {
            $sum: "$stock"
          },
        }
      }
    ],)
    .then((Orders) => res.json(Orders))
    .catch((err) => res.status(400).json("Error: " + err));
});

///////////Get All Orders By Date////////////////
router.route("/stats/invetory").get((req, res) => {
 
  Inventories.aggregate(
   
    [
      {
        
        $group: {
          _id:null,
          stock: {
            $sum:{ $multiply: [ "$qty", "$price" ] }
          },
        }
      }
    ],)
    .then((invetory) => res.json(invetory))
    .catch((err) => res.status(400).json("Error: " + err));
});
module.exports = router;
