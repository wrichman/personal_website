class CompletedsController < ApplicationController
  skip_before_filter :verify_authenticity_token  
  
  def create
    @exercise = Exercise.find(params[:completed][:exercise_id])
    @course = @exercise.lesson.course
    current_user.complete!(@exercise)
    redirect_to course_path(@course)
  end

  def destroy
    current_user.uncomplete!
    redirect_to(:back)
  end
end
