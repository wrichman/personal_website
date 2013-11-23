class User < ActiveRecord::Base
  authenticates_with_sorcery!

  has_many :relationships, foreign_key: "creator_id", dependent: :destroy
  has_many :subscriber_relationships, class_name: "Relationship", foreign_key: "subscriber_id", dependent: :destroy
  has_many :courses, through: :relationships

  def subscribe!(user, course)
    Relationship.create(subscriber_id: user.id, course_id: course.id)
  end

  def unsubscribe!
    subscriber_relationships.find_by_subscriber_id(self.id).destroy
  end

  def subscribed?(course)
    subscriber_relationships.find_by(course_id: course.id)
  end
end