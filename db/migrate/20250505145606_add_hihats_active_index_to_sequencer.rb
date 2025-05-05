class AddHihatsActiveIndexToSequencer < ActiveRecord::Migration[7.2]
  def change
    add_column :sequencers, :hihats_active_index, :string, null: false, default: ""
  end
end
