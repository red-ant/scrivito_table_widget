$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "scrivito_table_widget/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |gem|
  gem.platform    = Gem::Platform::RUBY
  gem.name        = "scrivito_table_widget"
  gem.version     = ScrivitoTableWidget::VERSION
  gem.authors     = ["Scrivito"]
  gem.email       = ["support@scrivito.com"]
  gem.homepage    = "https://www.scrivito.com"
  gem.summary     = "Scrivito Widget for a table."
  gem.description = "Scrivito Widget for a table."
  gem.license     = "LGPL-3.0"

  gem.files = Dir[
    "{app,lib}/**/*",
    "LICENSE",
    "Rakefile",
    "README.md"
  ]

  gem.add_dependency 'scrivito'
  gem.add_dependency 'font-awesome-rails'
end
