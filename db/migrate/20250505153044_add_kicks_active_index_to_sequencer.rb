class AddKicksActiveIndexToSequencer < ActiveRecord::Migration[7.2]
  def change
    add_column :sequencers, :kicks_active_index, :string, null: false, default: ""
  end
end
