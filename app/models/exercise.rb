class Exercise < ActiveRecord::Base
  belongs_to :lesson
  has_one :course, through: :lesson
  
  has_many :completeds
  has_many :users, through: :completeds


  def complete?(current_user)
    user = User.find(current_user.id)
    # find a complete given a current user id
    completeds.find_by_user_id(user.id)
  end
end
