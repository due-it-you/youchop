class AddSnaresActiveIndexToSequencer < ActiveRecord::Migration[7.2]
  def change
    add_column :sequencers, :snares_active_index, :string, null: false, default: ""
  end
end
