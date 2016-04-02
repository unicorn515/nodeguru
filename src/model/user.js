import mong from 'mongoose';
module.exports=function(done){
const schema=mong.Schema;
const data_u=new schema({
    name: {type: String, unique: true},
    email: {type: String, unique: true},
    password: {type: String},
    nickname: {type: String},
    about: {type: String},
  });
$.mongodb.model('user',data_u);
$.model.user=$.mongodb.model('user');
done();
};