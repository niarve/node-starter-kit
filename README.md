# Node Starter Kit
###### Nathan Iarve
---

This is a simple nodejs starter kit with the following features:
* Gulp as build tool
* Sass integration
* HTML file include

This repo is meant to be used as a project template for nodejs

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
Then just go to localhost:8080 in your browser! This task is equipped with livereload so you won't have to refresh your page

---

#### Building the game
```sh
    $ gulp build
```
This will create a directory 'dest' containing an artifact for deployment. To test the contents of dest try:
```sh
    $ gulp serve
```
Then just go to localhost:3000 in your browser!

---
