Prerequisites
-------------

 * Git client
 * Heroku gem: sudo gem install heroku

Usage
-----

    git clone git@github.com:jpatterson/heroku-sinatra-template.git YOUR_PROJECT_NAME --stack bamboo-ree-1.8.7
    cd YOUR_PROJECT_NAME
    heroku create YOUR_PROJECT_NAME
    git remote add heroku git@heroku.com:YOUR_PROJECT_NAME.git
    git remote rm origin
    git push heroku master