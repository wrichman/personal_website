class CreateLessons < ActiveRecord::Migration
  def change
    create_table :lessons do |t|
      t.string :title
      t.string :description
      t.string :url
      t.integer :course_id

      t.timestamps
    end
  end
end
