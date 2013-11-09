class CreateExercises < ActiveRecord::Migration
  def change
    create_table :exercises do |t|
      t.string :title
      t.text :body
      t.integer :lesson_id

      t.timestamps
    end
  end
end
