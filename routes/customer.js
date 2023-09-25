const router = require("express").Router();
let Customers = require("../models/customers");
let Orders = require("../models/orders");
let Inventories = require("../models/inventory");

//////////////////////////////////////
///////////Get All Customers////////////////
router.route("/").get((req, res) => {
  Customers.find()
    .then((Customers) => res.json(Customers))
    .catch((err) => res.status(400).json("Error: " + err));
});


//////////////////////////////////////
///////////post Customers////////////////
router.route("/").post(async (req, res) => {
  const data = req.body;
  console.log(data);
  const addnewCustomers = new Customers(data);
  await addnewCustomers
    .save()
    .then(() => res.json({ msg: true, data: addnewCustomers }))
    .catch((err) => res.status(400).json("Error: " + err));
});


//////////////////////////////////////
///////////get by id Customers////////////////
router.route("/:id").get((req, res) => {
  Customers.findById(req.params.id)
    .then((Customers) => res.json(Customers))
    .catch((err) => res.status(400).json("Error: " + err));
});

//////////////////////////////////////
///////////delete by id Customers////////////////
router.route("/:id").delete((req, res) => {
  const id = req.params.id
Orders.deleteMany({
    customer_id: id
  }, function(err) {console.log(err);})
  Customers.findByIdAndDelete(id)

    .then(() => res.json("Customers deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

//////////////////////////////////////
///////////update by id Customers////////////////

router.route("/:id").put(async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const update = await Customers.updateOne(
      { _id: req.params.id},
      { $set: data }
    );

    res.json({ msg: "Customers updated!" });
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

router.route("/reset").post(async (req, res) => {
  const data = req.body;
 
  console.log(data);
  try {
    const resetOrders =   Orders.insertMany(data.orders);
    // await resetOrders.save()
   
    const resetCustomers =   Customers.insertMany(data.customers);
    // await resetCustomers.save()
    const resetInventory =   Inventories.insertMany(data.inventories);
    // await resetInventory.save()
    res.json({ msg: "data has been reset!"});
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});
//////////////////////////////////////
///////////payment by id Customers////////////////

router.route("/pay/:id").put(async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const update = await Customers.updateOne(
      { _id: req.params.id},
      {$inc: { received: data.pay },
       $push:{
        payments:{
          bill:String(data.bill),
          pay: Number(data.pay),
          date:String(data.date),
          note:String(data.note),
        }
      } }
    );

    res.json({ msg: "Customers updated!" , update: update});
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});


router.route("/paypull/:id").put(async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const update = await Customers.updateOne(
      { _id: req.params.id},
      {$inc: { received: -data.pay },
       $pull:{
        payments:{
          _id:String(data.pay_id),
        }
      } }
    );

    res.json({ msg: "Customers updated!" , update: update});
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});
module.exports = router;
