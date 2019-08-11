const fs = require("fs");
const { exec } = require('child_process');
const platform = process.argv[2];

const addPlatform = function() {
    console.log(`adding ${platform} platform`)
    return new Promise(function (resolve, reject) {
        exec(`npx cap add ${platform}`, (err, stdout, stderr) => {
            if (err) {
                console.error(stderr)
                reject(err);
                return;
            } else {
                resolve();
            }
            console.log(stdout)
        });
    });
    
}

const openIde = function() {
    console.log(`opening ${platform} platform`)
    exec(`npx cap copy ${platform} && npx cap open ${platform}`, (err, stdout, stderr) => {
        console.log(stdout);
        if (err) {
            console.error(err);
            console.error(stderr);
            return;
        }
    });
}

if (fs.existsSync(platform)) {
    
    openIde();

} else {
    
    addPlatform().then(function(){ openIde() });

}
 

