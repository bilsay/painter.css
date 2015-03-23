var painter = require ('./painter');

var fs = require("fs"),
    path = require("path");

var paths = {
	palettesDir: 'palettes',
	painterCss: 'painter.css'
};

var getPaletteName = function (fileName) {
	return fileName.replace ('.json', '').trim ();
}

var getPalettesFromFiles = function (files) {
 
 	var palettes = {};

    files.filter(function (file) {
        return fs.statSync(path.join(paths.palettesDir, file)).isFile();
    }).forEach(function (file) {

       // console.log("%s (%s)", file, path.extname(file));

        var palleteJson = JSON.parse(fs.readFileSync(path.join(paths.palettesDir, file), 'utf8'));

        var paletteName = getPaletteName (file);
        palettes[paletteName] = palleteJson;
    });

    return palettes;
}

var saveCss = function (css) {

	fs.writeFile(paths.painterCss, css, function(err) {
	   
	    if(err) {
	        return console.log(err);
	    }

	    console.log("The file was saved!");
	}); 
};

fs.readdir(paths.palettesDir, function (err, files) {
    
    if (err) {
        throw err;
    }

    var palettes = getPalettesFromFiles (files);
	var palettesCss = painter.compilePalletesCss (palettes);
	console.log (palettesCss);

	saveCss (palettesCss);


});
