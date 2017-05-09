$(document).ready(function() {
		$menuLeft = $('.pushmenu-left');
		$nav_list = $('#navigation');
		
		$nav_list.click(function() {
			$(this).toggleClass('active');
			$('.pushmenu-push').toggleClass('pushmenu-push-toright');
			$menuLeft.toggleClass('pushmenu-open');
		});
	});