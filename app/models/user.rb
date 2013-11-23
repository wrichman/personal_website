class User < ActiveRecord::Base
  authenticates_with_sorcery!

  has_many :relationships, foreign_key: "creator_id", dependent: :destroy
  has_many :subscriber_relationships, class_name: "Relationship", foreign_key: "subscriber_id", dependent: :destroy
  has_many :courses, through: :relationships

  has_many :completeds
  has_many :exercises, through: :completeds

  def subscribe!(user, course)
    Relationship.create(subscriber_id: user.id, course_id: course.id)
  end

  def unsubscribe!
    subscriber_relationships.find_by_subscriber_id(self.id).destroy
  end

  def subscribed?(course)
    subscriber_relationships.find_by(course_id: course.id)
  end

  def complete!(exercise)
    completeds.create(exercise_id: exercise.id)
  end

  def uncomplete!
    completeds.find_by_user_id(self.id).destroy
  end

  def completed?(exercise)
    completeds.find_by(exercise_id: exercise.id)
  end
end