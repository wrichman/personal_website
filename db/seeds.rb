# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Course.destroy_all
Exercise.destroy_all
Lesson.destroy_all
User.destroy_all

User.create({
  email: "williamrichman@gmail.com",
  description: "a nerd at heart",
  first_name: "Will",
  last_name: "Richman",
  password: "william",
  facebook_profile: "https://www.facebook.com/williamrichman",
  twitter_profile: "https://twitter.com/will_richman",
  image: "https://2.gravatar.com/avatar/c3d27b8217282ab181ace47d753d76a7?d=https%3A%2F%2Fidenticons.github.com%2F83fe00bbc0602633425d8d2e17d3017e.png&r=x&s=440"
})

User.create({
  email: "bobrichman@gmail.com",
  description: "a nerd at heart",
  first_name: "Bob",
  last_name: "Richman",
  password: "bob",
  facebook_profile: "https://www.facebook.com/williamrichman",
  twitter_profile: "https://twitter.com/will_richman",
  image: "https://2.gravatar.com/avatar/c3d27b8217282ab181ace47d753d76a7?d=https%3A%2F%2Fidenticons.github.com%2F83fe00bbc0602633425d8d2e17d3017e.png&r=x&s=440"
})

courses = [
  { title: "Python", description: "A dynamic, open source programming language with a focus on simplicity and productivity. It has an elegant syntax that is natural to read and easy to write.", image: "http://blog.lingohub.com/wp-content/uploads/2013/08/ruby1.png"},
  { title: "Lisp", description: "JavaScript is a prototype-based scripting language with dynamic typing and has first-class functions.", image: "http://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"},
  { title: "Design", description: "HTML (the Hypertext Markup Language) and CSS (Cascading Style Sheets) are two of the core technologies for building Web pages. HTML provides the structure of the page, CSS the (visual and aural) layout, for a variety of devices. Along with graphics and scripting, HTML and CSS are the basis of building Web pages and Web Applications.", image: "http://www.w3.org/html/logo/downloads/HTML5_Logo_512.png"}
]

ruby_lessons = [
  {title: "Numbers", description: "Mastering arithmetic"},
  {title: "Letters", description: "Using characters"},
  {title: "VariablesandAssignment", description: "Understanding how you assign variables in Ruby"},
  {title: "ControlFlow", description: "Mastering control structures"},
  {title: "ArraysandIterators", description: "Lets learn how to loop over things"}
]

html_lessons = [
  {title: "HTMLBasics", description: "Fundamentals of HTML"},
  {title: "BuildYourOwnWebpage", description: "Now that you know HTML, you can create your very own webpage. Lets get started"},
  {title: "HTMLBasicsII", description: "Now that you know how to build a webpage, lets learn how to make it look nice"},
  {title: "SocialNetworkingProfile", description: "HTML Basics III"},
  {title: "ClickablePhotoPage", description: "Have you ever wanted to make a photo album or collection of images like the once you've seen on Facebook or Pinterest?"}
]

javascript_lessons = [
  {title: "GettingStartedwithProgramming", description: "Time to become a coding ninja"},
  {title: "ChooseYourOwnAdventure", description: "Lets create your very one choose your adventure game"},
  {title: "IntroductiontoFunctionsinJS", description: "This course introduces functions, why we use them, and how to use them."},
  {title: "BuildRock,Paper,Scissors", description: "Make use of functions to program this game"},
  {title: "IntroductiontoForLoopsinJS", description: "For loops are one of the most commonly used bits of code"}
]

sample_exercises = [
  {title: "Exercise#{Faker::Lorem.words(2).join("")}", body: Faker::Lorem.paragraphs(4..8).join("\n\n"), url: "https://www.facebook.com/williamrichman", image: "http://media.smashingmagazine.com/images/introduction-to-rails/rails.jpg"},
  {title: "Exercise#{Faker::Lorem.words(2).join("")}", body: Faker::Lorem.paragraphs(4..8).join("\n\n"), url: "https://www.facebook.com/williamrichman", image: "http://media.smashingmagazine.com/images/introduction-to-rails/rails.jpg"},
  {title: "Exercise#{Faker::Lorem.words(2).join("")}", body: Faker::Lorem.paragraphs(4..8).join("\n\n"), url: "https://www.facebook.com/williamrichman", image: "http://media.smashingmagazine.com/images/introduction-to-rails/rails.jpg"}
]

will = User.first
bob = User.all[1]

will.courses.create courses

will.courses[0].lessons.create ruby_lessons
will.courses[1].lessons.create javascript_lessons
will.courses[2].lessons.create html_lessons

will.courses[0].lessons.each do |lesson|
  lesson.exercises.create sample_exercises
end

will.courses[1].lessons.each do |lesson|
  lesson.exercises.create sample_exercises
end

will.courses[2].lessons.each do |lesson|
  lesson.exercises.create sample_exercises
end

bob.courses.create courses

bob.courses[0].lessons.create ruby_lessons
bob.courses[1].lessons.create javascript_lessons
bob.courses[2].lessons.create html_lessons

bob.courses[0].lessons.each do |lesson|
  lesson.exercises.create sample_exercises
end

bob.courses[1].lessons.each do |lesson|
  lesson.exercises.create sample_exercises
end

bob.courses[2].lessons.each do |lesson|
  lesson.exercises.create sample_exercises
end

