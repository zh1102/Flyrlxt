$(function() {
	if (sessionStorage.uname) {
		$("#btn_login").click(function() {
			$.ajax({
				type: "post",
				url: "http://192.168.43.197:8005/loginUp/login",
				data: {
					uname: $("#loginuname").val(),
					pwd: base.encode($("#loginpwd").val())
				},
				success: function(e) {
					if (e.flag == 1) {
						localStorage.user_id = e.list.id
					} else {
						if (e.flag == 2) {
							alert("用户名不存在")
						} else {
							if (e.flag == 3) {
								alert("密码错误")
							}
						}
					}
				},
				error: function() {
					aler("error")
				}
			})
		});
		var h;
		$(".tx").click(function() {
			$("#file_tx").click();
			$("#file_tx").change(function() {
				h = this.files[0];
				read = new FileReader();
				read.readAsDataURL(h);
				read.onload = function() {
					$(".tx")[0].innerHTML = "<img src='" + this.result + "'/>";
					$("#header_p").innerHTML = "<img src='" + this.result + "'/>"
				}
			})
		});
		$("#submit_tx").click(function() {
			var b = new FormData();
			b.append("file_tx", h);
			$.ajax({
				type: "post",
				url: "http://192.168.43.197:8005/register/up",
				data: b,
				async: true,
				contentType: false,
				processData: false,
				success: function(a) {
					$.ajax({
						type: "post",
						url: "http://192.168.43.197:8005/register/userImg",
						data: {
							userImg: a,
							uId: sessionStorage.user_id
						},
						success: function(e) {
							if (e.flag == 1) {
								window.location.reload();
								alert("提交成功")
							} else {
								alert("提交失败")
							}
						},
						error: function() {
							alert("login .. error")
						}
					})
				},
				error: function() {}
			})
		});
		$.ajax({
			type: "get",
			url: "http://192.168.43.197:8005/register/getuImg",
			data: {
				getId: sessionStorage.user_id
			},
			success: function(e) {
				$("#header_p").html('<img src="http://192.168.43.197:8005/upload/' + e[0].userImg + '"/>')
			},
			error: function() {
				alert("error")
			}
		});
		var j = document.getElementsByClassName("staff_page")[0];
		var k = document.getElementsByClassName("depa_data");
		$.ajax({
			type: "get",
			url: "http://192.168.43.197:8005/index/list",
			async: true,
			success: function(a) {
				var b = [0, 0, 0, 0, 0];
				var c = [0, 0, 0, 0, 0];
				var d = document.createElement("div");
				d.id = "box";
				for (var i = 0; i < a.length; i++) {
					var e = a[i].entryTime.split("-")[0]
					if (parseInt(e) <= 2016) {
						b[0]++;
						if (a[i].department == "r") {
							b[1]++
						} else {
							if (a[i].department == "j") {
								b[2]++
							} else {
								if (a[i].department == "c") {
									b[3]++
								} else {
									if (a[i].department == "s") {
										b[4]++
									}
								}
							}
						}
					} else {
						if (parseInt(e) <= 2017) {
							c[0]++;
							if (a[i].department == "r") {
								c[1]++
							} else {
								if (a[i].department == "j") {
									c[2]++
								} else {
									if (a[i].department == "c") {
										c[3]++
									} else {
										if (a[i].department == "s") {
											c[4]++
										}
									}
								}
							}
						}
					}
					if (a[i].department == "r") {
						a[i].department = "人事部"
					} else {
						if (a[i].department == "j") {
							a[i].department = "技术部"
						} else {
							if (a[i].department == "c") {
								a[i].department = "财务部"
							} else {
								if (a[i].department == "s") {
									a[i].department = "市场部"
								} else {
									a[i].department = "其他"
								}
							}
						}
					}
					var f = document.createElement("div");
					f.className = "staff_message";
					f.innerHTML = '<a href="detail.html?id=' + a[i].id + '">' + '<img src="http://192.168.43.197:8005/upload/' + a[i].img + '"/>' + "<span>" + a[i].name + "</span>" + "<span>工号：" + a[i].workNumber + "</span>" + "<p>入职时间：" + a[i].entryTime + "</p>" + "</a>";
					j.appendChild(f);
					j.appendChild(d);
					if (a[i].zy == "市场部主任") {
						k[0].innerHTML = '<a href="detail.html?id=' + a[i].id + '">' + '<img src="http://192.168.43.197:8005/upload/' + a[i].img + '" />' + "</a>" + "<h4>" + a[i].name + "</h4>" + "<p>部门：<span>" + a[i].department + "</span></p>" + "<p>职位：<span>" + a[i].zy + "</span></p>" + "<p>工号：<span>" + a[i].workNumber + "</p>"
					} else {
						if (a[i].zy == "技术总监") {
							k[1].innerHTML = '<a href="detail.html?id=' + a[i].id + '">' + '<img src="http://192.168.43.197:8005/upload/' + a[i].img + '" />' + "</a>" + "<h4>" + a[i].name + "</h4>" + "<p>部门：<span>" + a[i].department + "</span></p>" + "<p>职位：<span>" + a[i].zy + "</span></p>" + "<p>工号：<span>" + a[i].workNumber + "</p>"
						} else {
							if (a[i].zy == "人事部主管") {
								k[2].innerHTML = '<a href="detail.html?id=' + a[i].id + '">' + '<img src="http://192.168.43.197:8005/upload/' + a[i].img + '" />' + "</a>" + "<h4>" + a[i].name + "</h4>" + "<p>部门：<span>" + a[i].department + "</span></p>" + "<p>职位：<span>" + a[i].zy + "</span></p>" + "<p>工号：<span>" + a[i].workNumber + "</p>"
							} else {
								if (a[i].zy == "财务经理") {
									k[3].innerHTML = '<a href="detail.html?id=' + a[i].id + '">' + '<img src="http://192.168.43.197:8005/upload/' + a[i].img + '" />' + "</a>" + "<h4>" + a[i].name + "</h4>" + "<p>部门：<span>" + a[i].department + "</span></p>" + "<p>职位：<span>" + a[i].zy + "</span></p>" + "<p>工号：<span>" + a[i].workNumber + "</p>"
								}
							}
						}
					}
				}
				var g = echarts.init(document.getElementById("charts_z"));
				option = {
					title: {
						text: "近两年公司人数占比",
						subtext: "数据来公司内部"
					},
					tooltip: {
						trigger: "axis",
						axisPointer: {
							type: "shadow"
						}
					},
					legend: {
						data: ["2011年", "2012年"]
					},
					grid: {
						left: "3%",
						right: "4%",
						bottom: "3%",
						containLabel: true
					},
					xAxis: {
						type: "value",
						boundaryGap: [0, 0.01]
					},
					yAxis: {
						type: "category",
						data: ["公司人数", "人事部", "技术部", "财务", "市场部"]
					},
					series: [{
						name: "2016年",
						type: "bar",
						data: b
					}, {
						name: "2017年",
						type: "bar",
						data: c
					}],
					color: ["#D9B3E7", "#81C3D7"]
				};
				g.setOption(option)
			},
			complete: function() {
				$(".staff_box").height($(".staff_box div").height() * 2);
				$("#box").html($(".staff_page").html());
				var b = $(".staff_box").height($("#box").height() * 2).height();
				var c = null;
				clearInterval(c);
				c = setInterval(function() {
					var a = parseInt($(".staff_box").css("top"));
					$(".staff_box").css({
						"top": --a
					});
					if (a < -b / 2) {
						$(".staff_box").css({
							"top": 0
						})
					}
				}, 30);
				$(".staff_box").hover(function() {
					clearInterval(c)
				}, function() {
					c = setInterval(function() {
						var a = parseInt($(".staff_box").css("top"));
						$(".staff_box").css({
							"top": --a
						});
						if (a < -b / 2) {
							$(".staff_box").css({
								"top": 0
							})
						}
					}, 30)
				})
			},
			error: function() {
				alert("数据传输错误！")
			}
		})
	} else {
		alert("请登录")
	}
});