const fs = require('fs-extra');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const {candidate_id} = req.body;
        let DIR = `./public/${candidate_id}`;
        if (!fs.existsSync(DIR)){
            fs.mkdirSync(DIR);
        }
        cb(null, DIR);       
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, Date.now() + '-' + fileName)
    }
});

const imageMiddleware = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

module.exports = imageMiddleware;