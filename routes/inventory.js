const router = require("express").Router();
let Inventories = require("../models/inventory");

//////////////////////////////////////
///////////Get All Inventories////////////////
router.route("/").get((req, res) => {
  Inventories.find()
    .then((Inventories) => res.json(Inventories))
    .catch((err) => res.status(400).json("Error: " + err));
});

//////////////////////////////////////
///////////post Inventories////////////////
router.route("/").post(async (req, res) => {
  const data = req.body;
  console.log(data);
  const addnewInventories = new Inventories(data);
  await addnewInventories
    .save()
    .then(() => res.json({ msg: true, data: addnewInventories }))
    .catch((err) => res.status(400).json("Error: " + err));
});

//////////////////////////////////////
///////////get by id Inventories////////////////
router.route("/:id").get((req, res) => {
  Inventories.findById(req.params.id)
    .then((Inventories) => res.json(Inventories))
    .catch((err) => res.status(400).json("Error: " + err));
});

//////////////////////////////////////
///////////delete by id Inventories////////////////
router.route("/:id").delete((req, res) => {
  Inventories.findByIdAndDelete(req.params.id)
    .then(() => res.json("Inventories deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

//////////////////////////////////////
///////////update by id Inventories////////////////

// router.route("/:id").put((req, res) => {
//   const data = req.body;

//   Inventories.findById(req.params.id)
//     .then((Inventories) => {
//       Inventories.grade = data.grade;
//       Inventories.Inventories = data.Inventories;

//       Inventories.save()
//         .then(() => res.json("Inventories updated!"))
//         .catch((err) => res.status(400).json("Error: " + err));
//     })
//     .catch((err) => res.status(400).json("Error: " + err));
// });

//////////////////////////////////////
///////////update by id Inventories////////////////

router.route("/:id").put(async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const update = await Inventories.updateOne(
      { _id: req.params.id },
      { $set: data }
    );

    res.json({ msg: "Inventories updated!" });
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});
module.exports = router;
