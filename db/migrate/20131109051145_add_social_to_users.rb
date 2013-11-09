class AddSocialToUsers < ActiveRecord::Migration
  def change
    add_column :users, :description, :text
    add_column :users, :facebook_profile, :text
    add_column :users, :twitter_profile, :text
    add_column :users, :image, :string
  end
end
