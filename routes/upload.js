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
			console.log(result)
				//释放连接  
             	 conns.release();  
				callback(err,result)
			})
		
	})
}
function inSertUser(sql,uname,pwd,email,img,callback){
	pool.getConnection(function(err,conns){
		//console.log(conns+'>>>'+err)
			conns.query(sql,[uname,pwd,email,img],function(err,result){
					//释放连接  
					console.log(result)
	             conns.release();
	             callback(err,result)
			})
				 
	})
}

router.post('/up',function(req,res){
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
router.post('/sc',function(req,res){
	var uname=req.body['uname']
	var pwd=req.body['pwd']
	var email=req.body['email']
	var imgName=req.body['img'];
	query('select * from userdata where uname=? or email=?',uname,email,function(err,result){
		if(result!=null&&result!=''){
			res.send({flag:2})
			return;
		}
		if(uname&&pwd&&email&&imgName){
			console.log(uname,pwd,email,imgName)
			inSertUser('insert into userdata(uname,pwd,email,img) values(?,?,?,?)',uname,pwd,email,imgName,function(err,result){
				if(result.insertId>0){
					res.send({flag:1})
				}		
			})
		}else{
			res.send({flag:3})
		}
	})
})
router.get('/list',function(req,res){
	if(req.session.username != '' && req.session.username != null){
		search('select * from userdata',function(err,result){
		res.send({list:result,flag:1})
		})
	}else{
		res.redirect({flag:0})
	}
	
})
module.exports=router;
