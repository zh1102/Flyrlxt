var express=require('express')
var router=express.Router();
var mysql=require('mysql');
var fs=require('fs');
var formidable=require('formidable');
var pool=mysql.createPool({
	host:'127.0.0.1',
	user:'root',
	password:'MBF5323ZH',
	database:'test',                                                                                   
	port:3306
})
function query(sql,uname,email,callback){
	pool.getConnection(function(err,conns){
			//console.log(conns+'>>>'+err)
			conns.query(sql,[uname,email],function(err,result){
			//console.log(result)
				//释放连接  
             	 conns.release();  
				callback(err,result)
			})
		
	})
}

function search(sql,callback){
	pool.getConnection(function(err,conns){
			//console.log(conns+'>>>'+err)
			conns.query(sql,function(err,result){
				//释放连接  
             	 conns.release();  
				callback(err,result)
			})
		
	})
}
router.get('/search',function(req,res){
	var searchVal=req.param('seaVal');
	pool.getConnection(function(err,conns){
			//console.log(conns+'>>>'+err)
			conns.query('select * from userdata where uname like "%"?"%" or pwd like "%"?"%"',[searchVal,searchVal],function(err,result){

				//释放连接  
				if(result!=null&&result!=''){
					res.send(result)
					
				}else{
				 	res.send({flag:2})
				}
             	 conns.release(); 
             	
			})
		
	})
})
module.exports=router;
