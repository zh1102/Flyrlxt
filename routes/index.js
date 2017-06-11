var express=require('express');
var router=express.Router();
var mysql=require('mysql');
var pool=mysql.createPool({
	host:'127.0.0.1',
	user:'root',
	password:'MBF5323ZH',
	database:'crmdata',  
	port:3306
})
function query(sql,callback){
	pool.getConnection(function(err,conns){
			//console.log(conns+'>>>'+err)
			conns.query(sql,function(err,result){
			//console.log(result)
				//释放连接  
        	conns.release();  
				callback(err,result)
			})
		
	})
}
//查询条数
function getPages(getPages,callback){
	var total=0;
	pool.getConnection(function(err,connection){
		var total_sql='select count(*) from workdata where delstate=?';
		connection.query(total_sql,[getPages],function(err,result){
			if(err){
				//console.log('total_Error:'+err.message)
				return;
			}
			connection.release();
			total=result[0]['count(*)'];
			callback(err,total);
		})
	})
}

//查询结果
function getResults(delstate,pageNum,callback){
	var pageSize=3;
	var startPage=(pageNum-1)*pageSize;
	pool.getConnection(function(err,conn){
		var total_Sal="select * from workdata where delstate=? limit ?,?";
		conn.query(total_Sal,[delstate,startPage,pageSize],function(err,result){
			if(err){
				//console.log('total_Error:'+err.message);
				return;
			}
			conn.release();
			callback(err,result,pageSize)
		})
	})
}
router.get('/list',function(req,res){
	res.header("Access-Control-Allow-Origin","*")
		 query('select * from workdata where delstate=0',function(err,reselt){
	 		var resData=reselt;
	 		res.send(resData)
	 	})
		
})

router.post('/page',function(req,res){
	res.header("Access-Control-Allow-Origin","*")
		var pageNUm=req.body['pageNum'];
		var delstate=req.body['delstate']
		var total=0; //总条数
		getPages(delstate,function(err,results){
			if(err){
				res.send('error');
				return;
			}else if(results){
				getResults(delstate,pageNUm,function(err,result,pageSize){
					//console.log(result)
					var totalPage=Math.ceil(results/pageSize),
					data={total:results,pageSize:pageSize,totalPage:totalPage,list:result}
					res.send(data);
				})
			}
			
		})
})
module.exports=router;
