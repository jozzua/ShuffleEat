class Application < Sinatra::Application

  configure :production do
    # Configure stuff here you'll want to
    # only be run at Heroku at boot

    # TIP:  You can get you database information
    #       from ENV['DATABASE_URI'] (see /env route below)
  end

  get '/' do
    "Hello World"
  end

end
