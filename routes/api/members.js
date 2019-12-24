const express = require('express');
const router = express.Router();
const members = require('../../MembersDB');
/*
require('../../MembersDB') MembersDB file si 2 folders up so we need
to give double ../ path to go up 2 times to the file location
*/
const uuid = require('uuid'); //id number generator for databases

//GET ALL MEMBERS
router.get('/', (req, res) => {res.json(members);});
/*
responses the content of the members array contained in MembersDB.js
res.json(stuff) turns into json file teh content of stuff which in
this specific example is an array containing objects made of properties
like "name" , "email" and "status".

curly brakes on {res.json(members)} could be in this case avoided
because after the arrow "=>" there is a single statement,

router.get('/api/members', (req, res) => res.json(members););

otherwise in case of more statements, curly brakes would have been
of course mandatory.

router.get('/api/members', (req, res) => {res.json(members);
  do.thing(whatever);
  do.anotherthing(stuff);
});
*/

//GET A SINGLE MEMBER BY ITS ID NUMBER:
router.get('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
/*
The some() array method tests whether at least one element in the array passes
the test implemented by the provided function. It returns a Boolean value.
*/
  if (found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
  }
  else {
    res.status(400).json({msg: `no member with ${req.params.id} id number`});
  }
});
/*
responses a json file filtered from "members" array by its id
parseInt is necessary because member.id must to match value and type of
req.params.id because of === usage

Filter array method returns the element which satisfies the given
conditions, in this case "id"
*/

//CREATE A NEW MEMBER

router.post('/' , (req, res) => {
  const newMember = {
      id: uuid.v4(), //generates a random id number for new member
      name: req.body.name,
      email: req.body.email,
      status: 'active'
  }
  if (!newMember.name || !newMember.email){
    return (res.status(400).json({msg: 'please insert a name and an email'}));
  }

  members.push(newMember);
  //res.json(members);
  res.redirect('/');
});

//MODIFY EXISTING MEMBER (UPDATE)

router.put('/:id',(req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    const updateMember = req.body;
    members.forEach(member => {
    if(member.id === parseInt(req.params.id)) {
      member.name = updateMember.name ? updateMember.name : member.name;
      member.email = updateMember.email ? updateMember.email : member.email;

      res.json({msg: 'member updated', member});
    }
  });
  }
  else {
  res.status(400).json({msg: `no member with ${req.params.id} id number`});
  }
});

//DELETE A SINGLE MEMBER BY ITS ID NUMBER:
router.delete('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
/*
The some() array method tests whether at least one element in the array passes
the test implemented by the provided function. It returns a Boolean value.
*/
  if (found) {
    res.json({
      msg : 'member deleted',
      members: members.filter(member => member.id !== parseInt(req.params.id))
    });
  }
  else {
    res.status(400).json({msg: `no member with ${req.params.id} id number`});
  }
});

module.exports = router;
