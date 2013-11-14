class ExercisesController < ApplicationController
  skip_before_filter :verify_authenticity_token  


  before_filter :require_course
  before_filter :require_lesson
  before_filter :require_exercise, :except => [:new, :create]
  before_filter :require_login

  def new
    @exercise = @lesson.exercises.build
  end

  def create
    @exercise = @lesson.exercises.build exercise_params
    
    if @exercise.save
      # UserMailer.new_pledge(@pledge).deliver
      redirect_to course_path(@course), notice: "Nice! Thanks for creating #{@exercise.title}!"
    else
      render :new
    end
  end

  def show
  end

  def edit
  end

 def update

    if @exercise.update_attributes exercise_params
      redirect_to root_path, notice: "Nice! Thanks for creating #{@course.title}!"
    else
      render :edit
    end
  end

  protected

  # def require_user
  #   @user = User.find params[:user_id]
  # end

  def require_course
    @course = Course.find params[:course_id]
  end

  def require_lesson
    @lesson = Lesson.find params[:lesson_id]
  end

  def require_exercise
    @exercise = Exercise.find params[:id]
  end

  private

  def exercise_params
    params.require(:exercise).permit(:title, :body)
  end
end
