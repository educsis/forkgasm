var gulp = require("gulp");
var rename = require("gulp-rename");
var postcss = require('gulp-postcss');
var fileinclude = require("gulp-file-include");

gulp.task('css', function () {
	return gulp.src(["**/*.src.css", "!node_modules/**"])
		.pipe(postcss([
			require('postcss-nesting')(),
			require("postcss-selector-matches")({
				lineBreak: true
			}),
			require('autoprefixer')({
				browsers: ["last 2 versions"]
			}),
			require("postcss-custom-properties")({
				preserve: false,
				warnings: false
			})
		]))
		.pipe(rename({ extname: "" }))
		.pipe(rename({ extname: ".css" }))
		.pipe(gulp.dest('.'));
});

gulp.task("html", function() {
	gulp.src(["**/*.tpl.html"])
		.pipe(fileinclude({
			basepath: "templates/"
		}).on("error", function(error) {
			console.error(error);
		}))
		.pipe(rename({ extname: "" }))
		.pipe(rename({ extname: ".html" }))
		.pipe(gulp.dest("."))
});

gulp.task("watch", function() {
	gulp.watch(["**/*.src.css"], ["css"]);
	gulp.watch(["**/*.tpl.html", "./templates/*.html"], ["html"]);
});

gulp.task("default", ["css"]);
