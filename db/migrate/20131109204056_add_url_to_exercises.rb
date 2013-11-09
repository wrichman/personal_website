class AddUrlToExercises < ActiveRecord::Migration
  def change
    add_column :exercises, :url, :string
    add_column :exercises, :image, :string
  end
end
