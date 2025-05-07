class PadTiming < ApplicationRecord
  validates :t_time, presence: true
  validates :y_time, presence: true
  validates :u_time, presence: true
  validates :g_time, presence: true
  validates :h_time, presence: true
  validates :j_time, presence: true
  validates :b_time, presence: true
  validates :n_time, presence: true
  validates :m_time, presence: true

  belongs_to :beat
end
