class Sequencer < ApplicationRecord
  validates :bpm, presence: true
  validates :hihats_active_index, presence: true
  validates :snares_active_index, presence: true
  validates :kicks_active_index, presence: true
  validates :pads_assigned, presence: true
  validates :pad_active_index, presence: true
  validates :youtube_volume, presence: true
  validates :hihat_volume, presence: true
  validates :snare_volume, presence: true
  validates :kick_volume, presence: true

  belongs_to :beat
end
