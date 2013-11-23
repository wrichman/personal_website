class RelationshipsController < ApplicationController
  skip_before_filter :verify_authenticity_token  
  
  def create
    @course = Course.find(params[:relationship][:course_id])
    current_user.subscribe!(current_user, @course)
    redirect_to course_path(@course)
  end

  def destroy
    current_user.unsubscribe!
    redirect_to(:back)
  end
end
