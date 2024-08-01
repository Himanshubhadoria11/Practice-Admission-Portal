const mongoose = require('mongoose')
const live_url='mongodb+srv://himanshubhadoria:Hsb81996@cluster1.aava1gd.mongodb.net/PracticeAdmissionPortal?retryWrites=true&w=majority&appName=Cluster1'
const local_url = 'mongodb://127.0.0.1:27017/Admission_portal'

const connectDb = () => {
    // return mongoose.connect(local_URL)
    return mongoose.connect(live_url)
        .then(() => {
            console.log('connect Success')
        }).catch((error) => {
            console.log(error)
        })
}
module.exports = connectDb