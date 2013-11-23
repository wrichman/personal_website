class CreateCompleteds < ActiveRecord::Migration
  def change
    create_table :completeds do |t|
      t.integer :exercise_id
      t.integer :user_id

      t.timestamps
    end
  end
end
