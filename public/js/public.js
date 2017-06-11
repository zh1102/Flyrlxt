window.onload = function(){
	//点击退出登录
	$('#quit').click(function(){
		sessionStorage.clear()
		window.location.href = '../index.html'
	})
	if(sessionStorage.uname){
			$('.right_add').click(function(){
				window.location.href = 'inForMation.html'
			})
			
			//点击退出
			$('#quit').click(function(){
				window.location.href = '../index.html'
			})
				//提交头像
			$(".tx").click(function() { //点击切换头像
				$("#file_tx").click();
				$("#file_tx").change(function() {
					var files = this.files[0],
						read = new FileReader();
					read.readAsDataURL(files);
					read.onload = function() {
						$(".tx")[0].innerHTML = "<img src='" + this.result + "'/>";
						$('#header_p').innerHTML = "<img src='" + this.result + "'/>";
					}
				})
			});
			$(".emend").click(function() { //点击切换头像
				$("#left_file").click();
				$("#left_file").change(function() {
					var files = this.files[0],
						read = new FileReader();
					read.readAsDataURL(files);
					read.onload = function() {
						$(".emend_img")[0].innerHTML = "<img src='" + this.result + "'/>";
					}
				})
			})
			$("#header_p").click(function() {
				$(".control_mask").css('display', 'block');
			});
			$('#submit_tx').click(function() {
					$(".control_mask").css('display', 'none');
			});
			$("#controlClose").click(function() {
				$(".control_mask").css('display', 'none');
			})
			//下拉菜单
			$('.menu_control').mouseover(function() {
				$('#alter').attr('src', '../img/down.png');
			});
			$(".menu_control").mouseout(function() {
				$('#alter').attr('src', '../img/up.png');
			})
			$(".menu_control").hover(function() {
					$(this).find(".submenu").slideToggle(200);
			
				})
			
			
			$("#switchover").click(function() {
				$(".header_z").css('display', 'block');
				obj.int($(".header_z"));
			});
			$("#loginClose").click(function() {
				$(".header_z").css('display', 'none');
			//	$(".login").style.left = document.body.clientWidth / 2 - obj.now.clientWidth / 2 + "px";
			//	$(".login").style.top = document.body.clientHeight / 2 - obj.now.clientHeight / 2 + "px";
			})
			$('.icon-search').click(function(){
				
				$.ajax({
					type:"get",
					url:"http://192.168.43.197:8005/operate/search",
					async:true,
					data:{
						seaVal:$('#search').val()
					},
					success:function(c){
						if(c.flag==2){
							alert('没有找到此人')
						}else{
							
							var e = c.splice(0,3);
						var html='';
						//location.href='Jindex.html';
						
						$('#oul').empty();
						for(var i=0;i<e.length;i++){	
							if(e[i].department=='r'){
								e[i].department='人事部'
							}else if(e[i].department=='s'){
								e[i].department='市场部'
							}else if(e[i].department=='c'){
								e[i].department='财务部'
							}else if(e[i].department=='j'){
								e[i].department='技术部'
							}
							html += '<li><div class="bar"><img src="http://192.168.43.197:8005/upload/'+e[i].img+'" alt=""></div>'
							+'<span>'+e[i].name+'</span><span>'+e[i].sex+'</span>'
							+'<span><b>'+e[i].department+'</b></span>'
							+'<span>'+e[i].zy+'</span>'
							+'<span><a href="detail.html?id='+e[i].id+'" style="color:#4a83c7">查看&nbsp;</a>'
							+'<a href="modification.html?id='+e[i].id+'" style="color:#eb6100;">修改</a>'
							+'<a href="javascript:;" del="'+e[i].id+'" style="color:#b6b6b6;">&nbsp;删除</a></span></li>';
						};
						$('#oul').append(html)
						}
					},
					error:function(){
						alert('失败')
					}
					
				});
			})
			//	//提交头像
			var files;
			$(".tx").click(function() { //点击切换头像
				$("#file_tx").click();
				$("#file_tx").change(function() {
					files = this.files[0];
					read = new FileReader();
					read.readAsDataURL(files);
					read.onload = function() {
						$(".tx")[0].innerHTML = "<img src='" + this.result + "'/>";
						$('#header_p').innerHTML = "<img src='" + this.result + "'/>";
					}
				})
			});
			//上传头像
			$("#submit_tx").click(function(){
				var fd = new FormData();
				fd.append('file_tx',files);
				$.ajax({
					type:"post",
					url:"http://192.168.43.197:8005/register/up",
					data:fd,
					async:true,
					contentType:false,
					processData:false,
					success:function(data){
						$.ajax({
							type:'post',
							url:'http://192.168.43.197:8005/register/userImg',
							data:{
								userImg:data,
								uId:sessionStorage.user_id
							},
							success:function(e){
								if(e.flag == 1){
									window.location.reload();
									alert('提交成功')
								}else{
									alert('提交失败')
								}
							},error:function(){
								alert('login .. error')
							}
						})
					},
					error:function(){
						
					}
				});
			});

		// 获取头像
			$.ajax({
				type:'get',
				url:'http://192.168.43.197:8005/register/getuImg',
				data:{
					getId:sessionStorage.user_id
				},success:function(e){
					$('#header_p').html('<img src="http://192.168.43.197:8005/upload/'+e[0].userImg+'"/>')
				},error:function(){
					alert('error')
				}
			})
	}else{
		alert('请登录');
		window.location.href="../index.html"
	}
}



