var mongoose = require('mongoose')

//Mongoose options
var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
}

//Mongoose connect
mongoose.connect('mongodb+srv://Mathieu33333:oief4623ERT@cluster0.rxgkpre.mongodb.net/ticketac', 
    options,
    function (err) {
          if (err) {
              console.log(`Error, failed to connect to the database because --> ${err}`);
          } else {
              console.info("Connexion a ticketac réussie");
          }
     }
)