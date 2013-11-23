class CreateRelationships < ActiveRecord::Migration
  def change
    create_table :relationships do |t|
      t.integer :creator_id
      t.integer :course_id
      t.integer :subscriber_id

      t.timestamps
    end
  end
end
