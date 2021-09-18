/**
 * 让ajax操作前开始loading，返回结果后，一通操作后结束loading（相当于最后加了个finally(()=>{结束loading]})）
 * @param {function} promise
 *
 */
function viaLoaing(promise) {
	// 开始loading
	console.log("loading");
	// .then() .catch() .finally() 都会返回新的promise对象，因此可以这样搞
	promise().then(() => {
		// 结束loading
		console.log("loading done");
	});
}

function myAjax() {
	return new Promise((resolve, reject) => {
		// 模拟ajax
		setTimeout(() => {
			resolve({
				ret: 1,
				msg: "ok",
				data: {
					hello: "world",
				},
			});
		}, 2000);
	});
}

viaLoaing(() => {
	return myAjax()
		.then((res) => {
			console.log("res=", res);
		})
		.catch((err) => {
			console.log("error!");
			console.error(err);
		})
		.finally(() => {
			console.log("myAjax finally");
		});
});
