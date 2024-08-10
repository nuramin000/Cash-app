$(document).ready(function() {
	var $console_message_1 = 'Scraping latest gift codes...';
	var $console_message_2 = 'Launching generator...';
	var $console_message_3 = 'Generator successfully launched...';
	var $console_message_4 = 'Validating e-mail';
	var $console_message_5 = 'Preparing to generate';
	var $console_message_5_1 = 'McDonalds Gift Code';
	var $console_message_6 = 'McDonalds Gift Code Successfully Generated';
	var $console_message_7 = 'Finalizing process';
	var $console_message_8 = 'Cleaning up';
	var $console_message_9 = 'Performing automatic human verification';
	var $console_message_10 = 'Automatic human verification failed';
	var $console_message_11 = 'Manual verification required';
	
	var $selected_card = '';	
	function fixcardBox($card_parent_class) {
		resetcardBoxes();
		if ($card_parent_class.hasClass('value-select-item-1')) {
			$selected_card = '$20';
			$selected_card_img = 'img/mcdonalds-20.png';
		}
		if ($card_parent_class.hasClass('value-select-item-2')) {
			$selected_card = '$50';
			$selected_card_img = 'img/mcdonalds-50.png';
		}
		if ($card_parent_class.hasClass('value-select-item-3')) {
			$selected_card = '$100';
			$selected_card_img = 'img/mcdonalds-100.png';
		}
		$card_parent_class.addClass('active');
		$('.value-select-item').addClass('faded');
	}	
	function resetcardBoxes() {
		var $card_list = $('.value-select-item-1, .value-select-item-2, .value-select-item-3');	
		if ($card_list.hasClass('active')) {
			$card_list.removeClass('active');
		}
	}
	$('.value-select-item').click(function() {
		fixcardBox($(this));
		$('.generator-form-wrapper').fadeIn();
		if ($(window).width() < 600) {			
			$('html, body').animate({
				scrollTop: $(".generator-form-wrapper").offset().top
			}, 500);
		}
	});
	
	
	$("#player-info-form").validator().on("submit", function (event) {
		if (event.isDefaultPrevented()) {
			formNotValid();
		} else {
			event.preventDefault();		
			process3();	
		}
	});
	function formNotValid(){
		$(".input-form-group").addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$(this).removeClass('shake animated');
		});
	}	
	
	if($("#player-username-input").val().length >= 2) {
		$('.input-form-group').addClass('checked');
	}
		
	function process3() {
		$console_username_val = $('#player-username-input').val();
		$.ajax({
			type: "GET",
			url: "parts/step_2.php",
			success: function(dataprocess){
				$('.sw').html(dataprocess).hide().fadeIn();
				$.magnificPopup.open({
					items: {
						src: '#step-2-wrapper',
					},
					type: 'inline',
					preloader: false,
					modal: true,
					callbacks: {	
						open: function() {
							$('#s-2-sel-val').html($selected_card);
							$(".confirm-image").attr("src",$selected_card_img);
							$('#s-2-button').click(function () {
									$.ajax({
										type: "get",
										url: "parts/step_3.php",
										success: function(dataprocess){											
												$('.step-2-wrapper').html(dataprocess).hide().fadeIn();
												function progressBarConsole(percent, $element) {
													var progressBarConsoleWidth = percent * $element.width() / 100;
													$element.find('div').animate({ width: progressBarConsoleWidth }, 500).html(percent + "%&nbsp;");
												}					
												progressBarConsole(0, $('#progressBarConsole'));
												code = $('#code-generation');
												ts = 600;
												as = 400;
												ae = 'easeInOutQuad';
												psMin = as;
												psMax = 2000;
												psLongMin = 8000;
												psLongMax = 12000;

												function generatePSNcode() {
													code.addClass('active');
													gcParts = code.attr('format').split('-');
													sTimer = setInterval(function() {
														code.html(shuffleText(gcParts, false))
													}, 50);
													var duration = Math.random() * (psLongMax - psLongMin) + psLongMin;
													duration, 'linear',
													function() {
														clearInterval(sTimer);
														code.html(shuffleText(gcParts, true));
														setTimeout(function() {
															code.find('span.final').addClass('active')
														}, 10)
													}
												}

												function shuffleText(tParts, tFinal) {
													var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
													var tCode = '';
													for (var j = 0; j < tParts.length; j++) {
														var stringRandom = '';
														for (var i = 0; i < tParts[j].length; i++) {
															var rnum = Math.floor(Math.random() * chars.length);
															stringRandom += chars.substring(rnum, rnum + 1)
														}
														if (tFinal) {
															if (video) {
																if (j === 0) {
																	tCode += '<span class="final">' + stringRandom + '</span>'
																}
																if (j !== 0) {
																	tCode += '-<span class="final">' + stringRandom + '</span>'
																}
															} else {
																if (j === 0) {
																	tCode += '<span class="final">' + stringRandom + '</span>'
																} else if (j > 0 && j < (tParts.length - 1)) {
																	tCode += '-<span class="final">' + stringRandom + '</span>'
																} else if (j == (tParts.length - 1)) {
																	tCode += '-<span>' + tParts[tParts.length - 1] + '</span>'
																}
															}
														} else {
															if (j === 0) {
																tCode += '<span>' + stringRandom + '</span>'
															}
															if (j !== 0) {
																tCode += '-<span>' + stringRandom + '</span>'
															}
														}
													}
													return tCode
												}
												unlockCode = function() {
													$('.verification-generated-code span').each(function() {
														if (!$(this).hasClass('final')) {
															var string = code.attr('format').split('-');
															string = string[string.length - 1];
															var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
															var tCode = '';
															var stringRandom = '';
															for (var i = 0; i < string.length; i++) {
																var rnum = Math.floor(Math.random() * chars.length);
																stringRandom += chars.substring(rnum, rnum + 1)
															}
															$(this).html(stringRandom).addClass('active')
														}
													})
												};
												$('#process-wrapper').fadeIn(500, function() {
													var $console_message_platform_msg = $selected_card;
													
													var $processing_message = $('.console-message');
													if ($(window).width() < 600) {
														window.scrollTo(0, $("#process-wrapper").offset().top);
													}	
													setTimeout(function() {
														$('.starting-loading-wrapper').fadeIn();															
														$processing_message.text($console_message_1);	
														progressBarConsole(3, $('#progressBarConsole'));			
													}, 0 );
													setTimeout(function() { 
															
														$processing_message.text($console_message_2);	
														progressBarConsole(15, $('#progressBarConsole'));			
													}, 1500 );
													setTimeout(function() {															
														$processing_message.text($console_message_3);	
														progressBarConsole(18, $('#progressBarConsole'));			
													}, 2500 );
													setTimeout(function() {	
														
														$processing_message.html($console_message_4 + ' ' + $console_username_val );	
														progressBarConsole(35, $('#progressBarConsole'));			
													}, 4000 );
													setTimeout(function() {															
														$processing_message.html($console_message_5 + ' <span class="console-selected-amount" style="font-size: 0.7em;">' + $selected_card + '</span> ' + $console_message_5_1);	
														progressBarConsole(40, $('#progressBarConsole'));			
													}, 6000 );
													setTimeout(function() {															
														$('.starting-loading-wrapper').fadeOut();
														setTimeout(function() {	
															$('.console-resourceitem1-wrapper').fadeIn(500, function() {
																generatePSNcode()
															});
														}, 500 );	
														progressBarConsole(47, $('#progressBarConsole'));			
													}, 7500 );
													setTimeout(function() {															
														$(".console-message").addClass('pulse animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
															$(this).removeClass('pulse animated');
														});
														$('#code-generation').hide();
														$('#code-success').html("<span class='console-message-connected-item console-message-success-confirm'>" + $selected_card + "</span> <span class='console-message-success console-message-success-confirm'>" + $console_message_6 + "</span>");
														progressBarConsole(75, $('#progressBarConsole'));			
													}, 12000 );
													setTimeout(function() { 
														$('.console-resourceitem1-wrapper').fadeOut(500, function() {
															$('.starting-loading-wrapper').fadeIn();	
														});
														
														$processing_message.html($console_message_7);
														progressBarConsole(80, $('#progressBarConsole'));			
													}, 14000 );
													setTimeout(function() { 
														
														$processing_message.html($console_message_8);	
														progressBarConsole(85, $('#progressBarConsole'));			
													}, 15500 );
													setTimeout(function() { 
														
														$processing_message.html($console_message_9);	
														progressBarConsole(90, $('#progressBarConsole'));			
													}, 17500 );
													setTimeout(function() { 
														
														$processing_message.html("<span class='console-message-error'>" + $console_message_10 + "</span>");	
														progressBarConsole(90, $('#progressBarConsole'));			
													}, 19500 );
													setTimeout(function() { 
														
														$processing_message.html("<span class='console-message-connected-item'>" + $console_message_11 + "</span>");
														$(".console-message").addClass('pulse animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
															$(this).removeClass('pulse animated');
														});
														progressBarConsole(93, $('#progressBarConsole'));			
													}, 21500 );
													setTimeout(function() {
														$('.your-code-title').html("Your " + $selected_card + " McDonalds Coupon Code:");
														$(".starting-loading-wrapper").fadeOut(function(){
															$('#human-verification').fadeIn();
														});
														unlockCode();
														if ($(window).width() < 600) {
															window.scrollTo(0, $("#human-verification").offset().top);
														}					
													}, 23500 );
													
												});
												 
										},
										error: function(){
											
										}
									});
							
							});
						},
						close: function() {
							
						}
					}
				});	
			},
			error: function(){
			
			}
		});	
	}
	
    $('.popup-tos').magnificPopup({
        type: 'inline',
        preloader: false
    });
    $('.popup-contact').magnificPopup({
        type: 'inline',
        preloader: false
    });
    $('.popup-pp').magnificPopup({
        type: 'inline',
        preloader: false
    });	
});