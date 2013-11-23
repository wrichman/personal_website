class Course < ActiveRecord::Base
  has_many :relationships
  has_many :creators, class_name: "User", through: :relationships, source: "creator"
  has_many :subscribers, class_name: "User", through: :relationships, source: "subscriber"
  has_many :lessons

  def creator
    self.creators.first
  end
end
