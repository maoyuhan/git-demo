/**
 * Created by Administrator on 2017/03/16.
 */

/**
 * 1. LESS编译 压缩 合并
 * 2. JS合并 压缩 混淆
 * 3. img复制
 * 4. html压缩
 */

//在gulpfile中先载入gulp包，因为这个包提供了一些API（方法）
var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// 1. LESS编译 压缩     //合并  预处理CSS文件可以直接导包，合并没有必要
gulp.task('style',function(){
    //这里是在执行style任务时自动执行的
    gulp.src(['src/styles/*.less','!src/styles/_*.less'])
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/styles'))
        .pipe(browserSync.reload({              //刷新
            stream:true
        }));
});

// 2. JS合并 压缩混淆
gulp.task('script',function(){
    gulp.src('src/scripts/*.js')
        .pipe(concat('all.js'))  //合并所有js文件，放到all.js中
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(browserSync.reload({              //刷新
            stream:true
        }));

});

// 3. img复制
gulp.task('image',function(){
    gulp.src('src/images/*.*')
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({              //刷新
            stream:true
        }));
})

// 4. html压缩
gulp.task('html',function(){
    gulp.src('src/*.html')
        .pipe(htmlmin({
            collapseWhitespace:true,      //HTML压缩时不会自动去掉空白字符，需要手动添加参数{collapseWhitespace:true}
            removeComments:true           //HTML压缩时不会自动去掉注释，需要手动添加参数{removeComments:true}
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({              //刷新
            stream:true
        }));
});

gulp.task('serve',function(){
    browserSync({
        server:{
            baseDir:['dist']
        }
    },function(err,bs){
        console.log(bs.options.getIn(["urls","local"]));
    });

    //文件监听
    gulp.watch('src/styles/*.less',['style']);   //所有的styles文件夹下面的,less文件变化时，执行'style'命令  （下面同理）
    gulp.watch('src/scripts/*.js',['script']);
    gulp.watch('src/*.html',['html']);
    gulp.watch('src/images/*.*',['image']);
})