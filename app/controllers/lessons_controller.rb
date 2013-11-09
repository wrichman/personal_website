class LessonsController < ApplicationController
 # before_filter :require_user
 before_filter :require_course

  def new
    @lesson = @course.lessons.build
  end

  def create
    @lesson = @course.lessons.build lesson_params
    
    if @lesson.save
      # UserMailer.new_pledge(@pledge).deliver
      redirect_to root, notice: "Nice! Thanks for creating #{@course.title}!"
    else
      render :new
    end
  end

  def show
    @course = Course.find params[:id]
  end

  protected

  # def require_user
  #   @user = User.find params[:user_id]
  # end

  def require_course
    @course = Course.find params[:course_id]
  end

  private

  def lesson_params
    params.require(:lesson).permit(:title, :description)
  end


end
