//export NODE_ENV=dev &&export DEBUG='my:*' && node target/server.js
import projcore from 'project-core';
import path from 'path';
import inidebug from 'debug';
const $=global.$=new projcore();
$.createdebug=function(name){
return inidebug('my:'+name);
};
const debug=$.createdebug('start');
//加函数至ini的动作
$.init.add((done)=>{
const env=process.env.NODE_ENV||null;
$.config.load(path.resolve(__dirname,'config.js'));
if(env){
debug('get env');
$.config.load(path.resolve(__dirname,'../config',env+'.js'));
}
$.env=env;
done();
}
);
//加文件于ini过程
$.init.load(path.resolve(__dirname,'init','mdb.js'));
$.init.load(path.resolve(__dirname,'init','ex.js'));
$.init.load(path.resolve(__dirname,'model'));
$.init.load(path.resolve(__dirname,'midw'));
$.init.load(path.resolve(__dirname,'route'));
$.init.load(path.resolve(__dirname,'method'));
$.init((err)=>{

if(err){
console.error(err);
process.exit(-1);
}else{
console.log('envini [env =%s]',$.env);
}
}
);