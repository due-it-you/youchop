class Beat < ApplicationRecord
  validates :title, presence: true, length: { maximum: 50 }

  has_one :youtube
  has_one :pad_timing
  has_one :sequencer
  belongs_to :user
end
