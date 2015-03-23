
module.exports.run = function () {

	var paletteCss = compilePalletesCss ();
		
	var link = document.createElement("style");
	link.type = "text/css";
	link.innerHTML = paletteCss;
	document.getElementsByTagName("head")[0].appendChild(link);
};

/*
module.exports.render = function () {

	var paletteCss = getPalletesCssTestHtml ();
	return paletteCss;
};

function getPalletesCssTestHtml () {
	
	var resultHtml = [];
	
	for(var painter in palettes) {
		
		var painterClassName = getPainterClassName(painter);
		resultHtml.push('<div class="' + painterClassName + '">');
		resultHtml.push('<div class="painter_name">' + painter + '</div>');
		
		var painterPalette = palettes[painter];
		
		for(var paletteColorGroup in painterPalette) {
			
			var paletteColors = painterPalette[paletteColorGroup];
			
			for(var i = 0; i < paletteColors.length; i++) {
				
				var paletteColorName = paletteColorGroup + i;
				resultHtml.push('<span class="' + getColorClassName(paletteColorName) + '">');
				resultHtml.push('<span>' + paletteColorName + '</span>');
				resultHtml.push('</span>');
			}
		}

		resultHtml.push('</div>');
	}
	
	return resultHtml.join(' ');
} */

module.exports.compilePalletesCss = function (palettes) {

	var resultCss = [];
	
	for(var painter in palettes) {
		
		var painterSelector = getCssSelector(getPainterClassName(painter));
		var painterCss = getCssRule(painterSelector);
		resultCss.push(painterCss);
		
		var painterPalette = palettes[painter];
		
		for(var paletteColorGroup in painterPalette) {
			
			var paletteColors = painterPalette[paletteColorGroup];
			
			for(var i = 0; i < paletteColors.length; i++) {
				
				var paletteColor = paletteColors[i];
				var paletteColorName = paletteColorGroup + i;
				var paletteColorClassName = getColorClassName(paletteColorName);
				var paletteColorSelector = getCssSelector(paletteColorClassName, painterSelector);
				var paletteColorCss = getCssRule (paletteColorSelector, 'background-color: ' + '#' + paletteColor + ';');
				
				resultCss.push(paletteColorCss);
			}
		}
	}
	
	return resultCss.join(' ');
}

function getPainterClassName (className) {
	return 'painter_' + className;
}

function getColorClassName (className) {
	return 'palette_color_' + className;
}

function getCssSelector (selector, parentSelector) {
	
	var nodeSelector = '.' + selector;
	parentSelector = parentSelector || '';
	
	return parentSelector + ' ' + nodeSelector; 
}

function getCssRule (selector, rules) {
	
	rules = rules || '';
	return selector + '   {' + rules + '}';
}

