source 'https://rubygems.org'

# Rails
gem 'rails', '3.2.0'

gem 'thin', require: 'eventmachine'


# Mailer

gem 'tlsmail'

# PostgreSQL.
gem 'pg'

# Gems used only for assets and not required in production environments by default.
group :assets do
  gem 'sass-rails',   '~> 3.2.3'
  gem 'coffee-rails', '~> 3.2.1'

  # See https://github.com/sstephenson/execjs#readme for more supported runtimes
  # Linux JavaScript Runtime
  gem 'therubyracer', require: "v8", :platforms => :ruby

  gem 'uglifier', '>= 1.0.3'
end

# JQuery
gem 'jquery-rails'
gem 'jquery-mobile-rails'

# Paginatination
#gem 'will_paginate', '~> 3.0'

source 'https://gems.gemfury.com/8n1rdTK8pezvcsyVmmgJ/'

# Debug
group :development do
  gem 'linecache19', '>= 0.5.13'
  gem 'ruby-debug-base19', :platforms => :ruby
  gem 'ruby-debug19', :platforms => :ruby
end


gem 'will_paginate', :platforms => :ruby
gem 'eventmachine'
# To use ActiveModel has_secure_password
# gem 'bcrypt-ruby', '~> 3.0.0'

# To use Jbuilder templates for JSON
# gem 'jbuilder'

# To use debugger
# gem 'ruby-debug19', :require => 'ruby-debug'

# Thin Webserver - To install:
#  gem install eventmachine --pre
#  gem install thin
# Must be last gem.
