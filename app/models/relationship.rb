class Relationship < ActiveRecord::Base
  belongs_to :creator, class_name: "User"
  belongs_to :subscriber, class_name: "User"
  belongs_to :course  
end
