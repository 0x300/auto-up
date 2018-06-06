var gulp = require('gulp'),
    rsync = require('gulp-rsync');

var user = 'first.last';
var sync_running = false;

var sync_config = {
    progress: false,
    hostname: 'tbx2-promodev.int.eprize.net',
    exclude: ['*.swp', '.git', '.hg', '.vscode'],
    incremental: true,
    progress: true,
    relative: true,
    recursive: true,
    dryrun: false
};

gulp.task('sync-promodev', function () {
    console.log('syncing promodev -START');
    var my_config = JSON.parse(JSON.stringify(sync_config));
    my_config.root = 'Projects';
    my_config.destination = '/home/' + user + '/webroot';

    if (sync_running === false) {
        console.log('starting sync');
        sync_running = true;
        gulp.src('webroot')
            .pipe(rsync(my_config));
        console.log('syncing promdev -DONE');
        sync_running = false;
    }
    else {
        console.log('sync running...skipping');
    }
});

gulp.task('watch-webroot', function () {
    console.log('start - watch webroot');
    watch(['~/Projects/**/*.{pm,yml,html,tt2,flo,css,scss,ts,js,json,gitignore,kjb,ktr,xml,png,gif,jpg,jpeg,bmp,pdf,jqt}'], function (file) {
        console.log(file.path + " changed");
        gulp.start('sync-promodev');
    });
});
