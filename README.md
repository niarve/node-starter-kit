# Node Starter Kit
###### Nathan Iarve
---

This is a simple nodejs starter kit with the following features:
* Gulp
* AngularJs
* Sass
* Webpack
* ES2015
* GitHub pages (simple static webpage deployment)
* Docker with Nginx

This repo is meant to be used as a project template

---
#### Installation
First, install these packages
```sh
  sudo apt-get install npm
  npm i gulp-cli -g
  # ^if fails, try sudo
```
Now create the project
```sh
    $ git clone https://github.com/niarve/node-starter-kit.git
    $ cd node-starter-kit
    $ npm i
```

---

#### Development
```sh
    $ gulp
```
Then just go to ```localhost:8080``` in your browser! This task is equipped with livereload so you won't have to refresh your page

---

#### Building the game
```sh
    $ gulp build
```
This will create a directory 'dest' containing an artifact for deployment. To test the contents of dest try:
```sh
    $ gulp serve
```
Then just go to ```localhost:3000``` in your browser!

---

#### GitHub Pages
> An easy way to deploy your app using GitHub

First, follow these instructions to setup your GitHub page
* [GitHub Pages]

Next uncomment out the following in Gulpfile.js
```sh
    // ghPages = require('gulp-gh-pages'),
```
and
```sh
    // gulp.task('deploy', ['build'], function () {
    //   gulp.src('./dest/**/*')
    //     .pipe(ghPages({
    //       remoteUrl: 'url to your gh page',
    //       branch: 'master'
    //     }))
    // });
```
Next replace ```remoteUrl: 'url to your gh page'``` with the name of your newly created GitHub repository.

Now you're ready to deploy!
Make sure you have access from your terminal to your GitHub account, that your recently made repo is empty, and finally you can deploy by running ```gulp deploy``` in your command line.

---

#### Docker
First you're going to need to install Docker and Docker Compose
* [DOCKER]
* [DOCKER COMPOSE]

Now that you have everything installed, compose the image
```sh
    $ docker-compose build
```
Then run your image to make a container
```sh
    $ docker run -d -p 8081:80 node-starter-kit:v2
```
To see the beauty of docker in action, run ```docker ps``` in your command line, then visit ```localhost:8081``` in your browser!

---

For open source use, please refer to the [LICENSE]

[LICENSE]: <https://github.com/niarve/node-starter-kit/blob/master/LICENSE>
[DOCKER]: <https://docs.docker.com/engine/installation>
[DOCKER COMPOSE]: <https://docs.docker.com/compose/install>
[GitHub Pages]: <https://pages.github.com>
