window.onload = function(){
	mui.init();
	//header toggle
	(function(){
		var $header = $('#header'),
			$QRcode = $('#QRcode'),
			$mask = $QRcode.find('.mask'),
			$movie_list = $('#movie-list');
		
		$header.on('click',function(){
			$QRcode.removeClass('hide')
		})
		$('.mui-title').on('click',function(){
			$QRcode.removeClass('hide')
		})
		$('.closeQR').on('click',function(){
			$QRcode.addClass('hide')
		})
		$mask.on('click',function(){
			$QRcode.addClass('hide')
		})
	})()
}