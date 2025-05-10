class CreateSequencers < ActiveRecord::Migration[7.2]
  def change
    create_table :sequencers do |t|
      t.references :beat, null: false, foreign_key: true
      t.integer :bpm, null: false
      t.string :drums_active_index, null: false
      t.string :pads_assigned, null: false
      t.string :pad_active_index, null: false
      t.string :youtube_volume, null: false
      t.string :hihat_volume, null: false
      t.string :snare_volume, null: false
      t.string :kick_volume, null: false

      t.timestamps
    end
  end
end
