class CreatePadTimings < ActiveRecord::Migration[7.2]
  def change
    create_table :pad_timings do |t|
      t.references :beat, null: false, foreign_key: true
      t.string :t_time, null: false
      t.string :y_time, null: false
      t.string :u_time, null: false
      t.string :g_time, null: false
      t.string :h_time, null: false
      t.string :j_time, null: false
      t.string :b_time, null: false
      t.string :n_time, null: false
      t.string :m_time, null: false

      t.timestamps
    end
  end
end
