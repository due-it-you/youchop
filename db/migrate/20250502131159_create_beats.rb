class CreateBeats < ActiveRecord::Migration[7.2]
  def change
    create_table :beats do |t|
      add_reference :beats, :user, null: false, foreign_key: true
      t.string :title, null: false

      t.timestamps
    end
  end
end
