class CoursesController < ApplicationController
  skip_before_filter :verify_authenticity_token  

  before_filter :require_login

  def new
    @course = current_user.courses.build
  end

  def create
    @course = current_user.courses.build course_params
    @course.user = current_user
    
    if @course.save
      # UserMailer.new_pledge(@pledge).deliver
      redirect_to user_path(current_user), notice: "Nice! Thanks for creating #{@course.title}!"
    else
      render :new
    end
  end

  def edit
    @course = Course.find params[:id]
  end

  def update
    @course = Course.find params[:id]
    if @course.update_attributes course_params
      redirect_to root_path, notice: "Nice! Thanks for updating #{@course.title}!"
    else
      render :edit
    end
  end

  def show
    @course = Course.find params[:id]
    @lessons = @course.lessons
  end

  private

  def course_params
    params.require(:course).permit(:title, :description)
  end
end
