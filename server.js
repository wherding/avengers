let express = require('express');
let path = require("path")
let app = express();

//need the 2 lines below to parse the body of a request for a post. 
app.use(express.urlencoded({extended:true}))
app.use(express.json());

let PORT = process.env.Port|| 3000;
/*first argument is the root route the second arg is an action it takes request and response. */
app.get("/", function(req, res){
    //this join method will take the dirname and add view to it. 
    // this is important for when deploying files to the cloud. 
    res.sendFile(path.join(__dirname, "view.html"));
});
app.get("/add", function(req, res){
    //this join method will take the dirname and add view to it. 
    // this is important for when deploying files to the cloud. 
    res.sendFile(path.join(__dirname, "add.html"));
});
app.listen(PORT, function(){
    console.log("avengers assemble on PORT: " + PORT);
});

let characters = [
    {
        routeName: "captainamerican",
        name: "captain America",
        role: "saving the world",
        age: 100,
        strengthPoints: 1000
    },
    {
        routeName: "drstrange",
        name: "Dr Strange",
        role: "time weaver",
        age: 50,
        strengthPoints: 300
    },
    {
        routeName: "ironman",
        name: "Iron Man",
        role: "saving the world",
        age: 41,
        strengthPoints: 500
    }
]

app.get("/api/v1/characters", function(req, res){
    //converts characters array as json
    return res.json(characters);
});

//.params.(whatver) what ever is what is after : so in this case :characterId
app.get("/api/v1/characters/:characterId", function(req, res){
    //the line below is important. its how we get the characterId from the user. 
    let characterId = req.params.characterId;
    console.log(characterId);
    for (let i = 0; i < characters.length; i++) {
       if (characterId === characters[i].routeName) {
        return res.json(characters[i]);       
       }
        
    }
    return res.json("false")
    
});

app.post("/api/v1/characters", function(req, res){
    let newchar = req.body;
    console.log(newchar);
    characters.push(newchar);
    //return what was inserted after its been inserted. 
    return res.json(newchar);
});