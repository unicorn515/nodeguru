import mong from 'mongoose';
module.exports=function(done){
const conn=mong.createConnection($.config.get('db.mongodb'));
$.mongodb=conn;
$.model={};
done();
}