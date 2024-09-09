const express = require('express');
const fs = require("fs")
const app = express();
const port = 3000;

app.use(express.json())
// const tours = fs.readFileSync("D:/Nakul/BackEnd/Natours/dev-data/data/tours-simple.json")
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

// console.log(tours)

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json(
    {
      status: 'success',
      result: tours.length,
      data:{
        tours
      }
    });
});

app.post("/api/v1/tours", (req,res)=>{
    const userData = req.body
    const newId = tours[tours.length - 1].id +  1
    const newTour = {id:newId, ...userData}
    tours.push(newTour)
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err =>{
      res.status(201).json({
        status: 'success',
        data:{
          tour: newTour
        }
      })
    })
})

app.get("/api/v1/tours/:id", (req,res)=>{

  const id = Number(req.params.id)
  const data = tours.find(el => el.id === id)
  console.log(data)

  if(!data){
    res.status(404).json({
      status: "Not Found"
    })
  }

  res.status(200).json({
    status: 'success',
    data:{
      tour: data
    }
  })
})

app.patch("/api/v1/tours/:id", (req,res)=>{
  const id = Number(req.params.id)
  const data = req.body

  console.log(id)
  console.log(data)
  console.log("This is not a bug")
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
