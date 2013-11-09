class UsersController < ApplicationController
  skip_before_filter :verify_authenticity_token  

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
    @user = User.find params[:id]
  end

  def update
    @user = User.find(params[:id])

    if @user.update_attributes user_params
      redirect_to user_path(@user), notice: "User updated!"
    else
      render :edit
    end
  end

  def show
    @user = User.find params[:id]
  end

  private
  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation, :description, :facebook_profile, :twitter_profile)
  end
end
