class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new user_params
    if @user.save
      auto_login(@user) # Log them in right away. No account verification required.
      redirect_to root_path, notice: "Account created."
    else
      render :new
    end
  end

  def edit
  end

  def show
  end

  private
  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end
end
