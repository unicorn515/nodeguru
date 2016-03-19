import express from 'express';
import bodyparser from 'body-parser';
import serves from 'serve-static';
import path from 'path';
module.exports=function(done){
const app=express();
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
const router=express.Router();
$.router=router;
app.use(router);
app.use('/static',serves(path.resolve(__dirname,'../../static')));
app.listen($.config.get('web.port'),(err)=>{
done(err);
});
};