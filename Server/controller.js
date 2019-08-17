

//This is where I will store waffle data
let waffles = [
    {id:0, name:'Basic Maple', syrup: 'Maple'},
    {id:1, name:'Strawberry for days', syrup: 'Strawberry'},
    {id:2, name:'Antioxidants Plus', syrup: 'Chocolate'}
]


                    //remeber that each one of the 
module.exports={ //this get endpoint will send our entire waffles array to our front end
    getWaffles: (req, res) =>{
    res.status(200).send(waffles)
    },

    createWaffles:(req,res) =>{  //I need to make some logic that will allow me to create an index value and add it to waffles aka array
        waffles.length
        ? id = waffles[waffles.length-1].id + 1
        : id = 0
        //I now have the id value for object that is being passed into waffles,  I need to get it added into the array now

        const newWaffle = {
            name: req.body.name,
            syrup: req.body.syrup,
            id
        }

        // we now need to push this const into the new array
        waffles.push(newWaffle)
        //we need to send back 2 things, the status that all is good and the actual array
        res.status(200).send(waffles)
      
    },

    updateWaffles: (req, res) => {
        const {id} = req.params
        const updatedWaffle = req.body
        let myWaffle = waffles.find(waffle => {
            return waffle.id === +id
        })

        myWaffle.name = updatedWaffle.name
        res.status(200).send(waffles)
    },
    //we want to delete a pet using the id number
    deleteWaffles: (req, res) => {
        //1) we need to grab the id off of the params on the endpoint url
        const {id} = req.params;
        //2) we now need to use the array method filter, the .filter() method creates a new array with all elements that pass the test implemented by the providewd function.  I will assign my array waffles to the filtered output array of filter waffles =  waffles.filter((waffles)=>waffles.id !== +id)

        waffles = waffles.filter((waffles)=>waffles.id !== +id)

        //3) I need to now send the response back to the frontend 
        res.status(200).send(waffles)

    }
}

// I now need to set up the post functionality in the server\
    // I have already sent the waffleName and waffleSyrup to the backend