var express=require('express');
var router=express.Router();
var mysql=require('mysql');
var fs=require('fs');
var formidable=require('formidable');
var pool=mysql.createPool({
	host:'127.0.0.1',
	user:'root',
	password:'MBF5323ZH',
	database:'crmdata',  
	port:3306
})
function inSertWork(sql,name,sex,age,img,numBer,tel,familyTel,eml,QQ,address,matrimonialRes,Graduation,specialities,qualificAtions,posiTion,workNumber,leavedate,entryTime,department,state,callback){
	pool.getConnection(function(err,conns){
		//console.log(conns+'>>>'+err)
			conns.query(sql,[name,sex,age,img,numBer,tel,familyTel,eml,QQ,address,matrimonialRes,Graduation,specialities,qualificAtions,posiTion,workNumber,leavedate,entryTime,department,state],function(err,result){
					//释放连接  
	             conns.release();
	             callback(err,result)
			})
				 
	})
}
function serchData(sql,id,callback){
	pool.getConnection(function(err,conns){
			//console.log(conns+'>>>'+err)
			conns.query(sql,[id],function(err,result){
				//释放连接  
             	 conns.release();  
				callback(err,result)
			})
		
	})
}

//获取图片对象
router.post('/up',function(req,res){
	res.header("Access-Control-Allow-Origin","*")
	var form=new formidable.IncomingForm()  //创建IncomingForm对象
	form.uploadDir='public/upload/tempImg/';
	form.parse(req,function(error,fields,files){
		for(var i in files){
			var file=files[i];
			var fName=(new Date).getTime();  //名字
			switch(file.type){
				case "image/jpeg":
					fName=fName+'.jpg';
					break;
				case "image/png":
					fName=fName+'.png';
					break;
					
			}
			var newPath='public/upload/'+fName;
			fs.renameSync(file.path,newPath)
			res.send(fName)
		}
	})
})

//添加
router.post('/add',function(req,res){
	res.header("Access-Control-Allow-Origin","*")
	var  name=req.body['name'],
		 sex=req.body['sex'],
		 age=req.body['age'],
		 img=req.body['img'],
		 numBer=req.body['numBer'],
		 tel=req.body['tel'],
		 familyTel=req.body['familyTel'],
		 eml=req.body['eml'],
		 QQ=req.body['QQ'],
		 address=req.body['address'],
		 matrimonialRes=req.body['matrimonialRes'],
		 specialities=req.body['specialities'],
		 qualificAtions=req.body['qualificAtions'],
		 posiTion=req.body['posiTion'],
		 workNumber=req.body['workNumber'],
		 leavedate=req.body['leavedate'],
		 entryTime=req.body['entryTime'],
		 department=req.body['department'],
		 state=req.body['state'],
		 Graduation=req.body['Graduation'];
		 	console.log(address)
		pool.getConnection(function(err,conns){
				//console.log(conns+'>>>'+err)
					conns.query('insert into workdata(name,sex,age,img,number,tel,familyTel,eml,QQ,address,matrimonialRes,Graduation,specialities,qualificAtions,zy,workNumber,leavedate,entryTime,department,state) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[name,sex,age,img,numBer,tel,familyTel,eml,QQ,address,matrimonialRes,Graduation,specialities,qualificAtions,posiTion,workNumber,leavedate,entryTime,department,state],function(err,result){
							//释放连接  
							if(err){
								console.log('err'+err.message)
								return;
							}
			             conns.release();
			             if(result.insertId>0){
			             	res.send({flag:1})
			             }else{
			             	res.send({flag:2})
			             }
					})
						 
		})
})

//详情
router.get('/details',function(req,res){
	//	res.setHeader("Access-Control-Allow-Credentials",true);
	res.header("Access-Control-Allow-Origin","*")

	var xqId=req.query.id;
	//if(req.session.username!=null&&req.session.username!=''){
		serchData('select * from workdata where id=?',xqId,function(err,result){
		//console.log(result);
			res.send(result)
		})
//	}else{
	//	res.send({flag:2})
	//}
	
	
})

//删除
router.post('/delete',function(req,res){
	res.header("Access-Control-Allow-Origin","*")
	var delId=req.body['delid'];
	var delstate=req.body['delstate']
	//console.log(delId)
	pool.getConnection(function(err,conns){
			//console.log(conns+'>>>'+err)
			conns.query('update workdata set delstate=? where id=?',[delstate,delId],function(err,result){
				//释放连接  
             	 conns.release();  
				if(result.changedRows>0){
					res.send({flag:1})
				}else{
					res.send({flag:2})
				}
			})
		
	})
})

//修改
router.post('/amend',function(req,res){
	res.header("Access-Control-Allow-Origin","*")
		var  name=req.body['name'],
		 id=req.body['id'],
		 sex=req.body['sex'],
		 age=req.body['age'],
		 img=req.body['img'],
		 numBer=req.body['numBer'],
		 tel=req.body['tel'],
		 familyTel=req.body['familyTel'],
		 eml=req.body['eml'],
		 QQ=req.body['QQ'],
		 address=req.body['address'],
		 matrimonialRes=req.body['matrimonialRes'],
		 specialities=req.body['specialities'],
		 qualificAtions=req.body['qualificAtions'],
		 posiTion=req.body['posiTion'],
		 workNumber=req.body['workNumber'],
		 leavedate=req.body['leavedate'],
		 entryTime=req.body['entryTime'],
		 department=req.body['department'],
		 state=req.body['state'],
		 Graduation=req.body['Graduation'];
		 pool.getConnection(function(err,conns){
				//console.log(conns+'>>>'+err)
					conns.query('update workdata set name=?,sex=?,age=?,img=?,number=?,tel=?,familyTel=?,eml=?,QQ=?,address=?,matrimonialRes=?,Graduation=?,specialities=?,qualificAtions=?,zy=?,workNumber=?,leavedate=?,entryTime=?,department=?,state=? where id=?',[name,sex,age,img,numBer,tel,familyTel,eml,QQ,address,matrimonialRes,Graduation,specialities,qualificAtions,posiTion,workNumber,leavedate,entryTime,department,state,id],function(err,result){
							//释放连接  
						//	console.log(result)
			             conns.release();
			             if(result.changedRows>0){
			             	res.send({flag:1})
			             }else{
			             	res.send({flag:2})
			             }
					})
						 
		})
})
//搜索
router.get('/search',function(req,res){
	res.header("Access-Control-Allow-Origin","*")
	var searchVal=req.param('seaVal');
	if(searchVal=='人事部'){
		searchVal='r'
	}else if(searchVal=='市场部'){
		searchVal='s'
	}else if(searchVal=='财务部'){
		searchVal='c'
	}else if(searchVal=='技术部'){
		searchVal='j'
	}
	pool.getConnection(function(err,conns){
			//console.log(conns+'>>>'+err)
			conns.query('select * from workdata where name like "%"?"%" or workNumber like "%"?"%" or department like "%"?"%"',[searchVal,searchVal,searchVal],function(err,result){
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
