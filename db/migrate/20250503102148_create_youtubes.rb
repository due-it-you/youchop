class CreateYoutubes < ActiveRecord::Migration[7.2]
  def change
    create_table :youtubes do |t|
      t.string :video_id
      t.references :beat, null: false, foreign_key: true

      t.timestamps
    end
  end
end
