class RemoveDrumsActiveIndexFromSequencer < ActiveRecord::Migration[7.2]
  def change
    remove_column :sequencers, :drums_active_index, :string
  end
end
