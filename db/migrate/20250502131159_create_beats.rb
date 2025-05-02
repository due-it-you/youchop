class CreateBeats < ActiveRecord::Migration[7.2]
  def change
    create_table :beats do |t|
      t.timestamps
    end
  end
end
