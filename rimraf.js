const rimraf = require("rimraf");

rimraf(process.argv[2], function (error){

    if(error){
        console.error(error)
    } 

});



