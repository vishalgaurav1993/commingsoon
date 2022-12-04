$(document).ready(function(){
	setTimeout(function(){
		$('body').addClass('gameOn');
	},2000);

	let defaultModel = 'SE_TITANIUM';
	let defaultColor = 'G';
	let defaultFace = '1';
	let defaultPattern = '1';

	let carFaceLength = 2;

	let defaultImgPath = 'images/Car pngs/' + defaultModel + '/' + defaultModel + '_' + defaultColor + '/' + defaultModel + '_' + defaultColor + '_' + defaultFace + '_' + defaultPattern + '.png';
	$('.displayImg img').attr('src', defaultImgPath);
	setActionStatus(defaultColor,defaultFace,defaultPattern);

	$('select#carList').change(function(){
		let modelName = $(this).val();
		let colorName = modelName + '_' + defaultColor;
		let carPath = colorName + '_' + defaultFace + '_' + defaultPattern;
		changeCar(modelName,colorName,carPath);
	});

	$('.colors ul li a').click(function(){
		let modelName = $('select#carList').val();
		let colorName = modelName + '_' + $(this).attr('data-color');
		let carFace = $('.navigation').attr('data-direction');
		let carPattern = $('.colorPatterns .patterns ul li.active a').attr('data-pattern');
		let carPath = colorName + '_' + carFace + '_' + carPattern;
		changeCar(modelName,colorName,carPath);
	});

	$('.patterns ul li a').click(function(){
		let modelName = $('select#carList').val();
		let colorName = modelName + '_' + $('.colorPatterns .colors ul li.active a').attr('data-color');
		let carFace = $('.navigation').attr('data-direction');
		let carPattern = $(this).attr('data-pattern');
		let carPath = colorName + '_' + carFace + '_' + carPattern;
		changeCar(modelName,colorName,carPath);
	});

	function changeCar(modelName,colorName,carPath){
		let imgPath = 'images/Car pngs/' + modelName + '/' + colorName + '/' + carPath + '.png';
		$('.displayImg img').addClass('hide');
		setTimeout(function(){
			$('.displayImg img').attr('src', imgPath);
			var img = new Image();
			img.onload = function() {
			    $('.displayImg img').removeClass('hide');

			    let color = carPath.split('_')[carPath.split('_').length - 3];
			    let face = carPath.split('_')[carPath.split('_').length - 2];
			    let pattern = carPath.split('_')[carPath.split('_').length - 1];
			    setActionStatus(color,face,pattern)
			};
			img.src = imgPath;
		},500);
	}

	function setActionStatus(color,face,pattern){
		// set active on actions buttons
	    $('.colorPatterns .colors ul li a[data-color="'+color+'"]').parent().addClass('active').siblings().removeClass('active');
	    $('.colorPatterns .patterns ul li a[data-pattern="'+pattern+'"]').parent().addClass('active').siblings().removeClass('active');
	    $('.navigation').attr('data-direction',face);
	}

	$('.navigation > ul > li > a').click(function(){
		let face = parseInt($('.navigation').attr('data-direction'));
		let type = $(this).attr('data-direction');
		if(type == 'left'){
			face--;
		}
		if(type == 'right'){
			face++;
		}
		if(face == 0){
			face = carFaceLength;
		}
		if(face == (carFaceLength + 1)){
			face = 1;
		}

		let modelName = $('select#carList').val();
		let colorName = modelName + '_' + $('.colorPatterns .colors ul li.active a').attr('data-color');
		let carFace = face;
		let carPattern = $('.colorPatterns .patterns ul li.active a').attr('data-pattern');
		let carPath = colorName + '_' + carFace + '_' + carPattern;
		changeCar(modelName,colorName,carPath);
	});

});