const { training } = require("../models");
const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
const Subject = db.subject;
const Stream = db.stream;
const Types = db.types;
const Training = db.training;

exports.create = async (req, res) => {
  const training = new Training({
    course_name: req.body.training,
    modified_by: req.userId
  });
  if (req.body.subject) {
    var result = await getSubjects(req.body.subject)
    if (!result.status) {
      res.status(500).send({ message: "Something is wrong" });
      return;
    }
    training.subjects = result.msg;
    training.stream = result.msg2;
  }
  if (req.body.type) {
    var result = await getTypes(req.body.type)
    if (!result.status) {
      res.status(500).send({ message: "Something is wrong" });
      return;
    }
    training.types = result.msg;
  }
  training.save(async (err, training) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "Training was Created successfully!" });
  });
};


exports.getAllTraining = async (req, res) => {

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const sort = parseInt(req.query.order) || 1
  const skipIndex = (page - 1) * limit;
  const results = {};
  let query = {}
  if (req.query.subjects) {
    var subjects = await Subject.findOne({ subjects: req.query.subjects })
    if(subjects){
    query = { subjects: { $in: subjects._id } };
  }else{
    return res.status(200).send(results);
  }
  }
  if (req.query.types) {

    var types = await Types.findOne({ name: req.query.types })
    if(types){
    query = { types: { $in: types._id } };
    }
    else{
      return res.status(200).send(results);
    }
  }
  if (req.query.stream) {
    var stream = await Stream.findOne({ name: req.query.stream })
    if(stream){
    query = { stream: { $in: stream._id } };
    }else{
      return res.status(200).send(results);
    }
  }
  
  try {
    results.results = await Training.find(query)
      .sort({ _id: sort })
      .populate("types")
      .populate({
        path: "subjects",
        populate: { path: 'stream' }
      })
      .populate({
        path: "modified_by"
      })
      .limit(limit)
      .skip(skipIndex)
      .exec();
    res.status(200).send(results);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error Occured" });
  }
}

async function getSubjects(list) {
  return new Promise((resolve, reject) => {
    Subject.find(
      {
        subjects: { $in: list }
      },
      (err, subjects) => {
        if (err) {
          return resolve({
            status: false,
            msg: err
          });
        }
        var res = subjects.map(subject => subject._id);
        var res2 = subjects.map(subject => subject.stream);
        return resolve({
          status: true,
          msg: res,
          msg2: res2
        });
      }
    );
  });
}

async function getTypes(list) {
  return new Promise((resolve, reject) => {
    Types.find(
      {
        name: { $in: list }
      },
      (err, types) => {
        if (err) {
          return resolve({
            status: false,
            msg: err
          });
        }
        var res = types.map(type => type._id);
        return resolve({
          status: true,
          msg: res
        });
      }
    );
  });
}