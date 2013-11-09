class CoursesController < ApplicationController

  # before_filter :require_user
  before_filter :require_login

  def new
    @course = @user.courses.build
  end

  def create
    @course = @user.courses.build course_params
    @course.user = @user
    
    if @course.save
      # UserMailer.new_pledge(@pledge).deliver
      redirect_to user_course_path(@user, @course), notice: "Nice! Thanks for creating #{@course.title}!"
    else
      render :new
    end
  end

  def show
    @course = Course.find params[:id]
  end

  protected

  def require_user
    @user = User.find params[:user_id]
  end

  private

  def course_params
    params.require(:course).permit(:title, :description)
  end
end
