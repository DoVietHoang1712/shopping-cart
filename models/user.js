const {mongoose} = require('../database/database');
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

// UserSchema.methods.encryptPassword = function(password) {
//     return bcrypt.hash(password, 10);
// }

// UserSchema.methods.validPassword = function(password) {
//     return bcrypt.compare(password, this.password);
// }
module.exports = mongoose.model('User', UserSchema);