A simple "Hello World" sinatra application ready for deployment to [Heroku](http://heroku.com).

This application uses the newer "Bamboo" Heroku stack and runs on either REE 1.8.7 or MRI 1.9.1. You can read more about Heroku stacks [here](http://docs.heroku.com/stack).

Prerequisites
-------------

 * Git client
 * Heroku gem: sudo gem install heroku

Usage
-----

    git clone git@github.com:jpatterson/heroku-sinatra-template.git YOUR_PROJECT_NAME
    cd YOUR_PROJECT_NAME
    heroku create YOUR_PROJECT_NAME --stack bamboo-mri-1.9.1
    git remote rm origin
    git push heroku master
    heroku open