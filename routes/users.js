import express from 'express';
const router = express.Router();
let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
  { id: 4, name: 'Diana' }
];

router.get('/', (req, res) => {
    res.json(users); 
});

router.post('/', (req, res) => {
    let newUser = { id: users.length+1, name: req.body.name };
    users.push(newUser);
    res.status(201).json(newUser);
  
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    if(!user)
        res.status(404).json({msg: 'User not found'});
    else
        res.json(user);
});

router.put('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if(!user)
        res.status(404).json({msg: 'User not found'});
    else{
        user.name = req.body.name;
        res.json(user);
    } 
});

router.delete('/:id', (req, res) => {
    const index = users.findIndex(u=> u.id === parseInt(req.params.id));
    if (index === -1){
        res.status(404).json({msg: 'User not found'});
    }
    else{
        users.splice(index, 1);
        res.status(200).json({msg: 'User deleted successfully'});
    }
});

export default router;