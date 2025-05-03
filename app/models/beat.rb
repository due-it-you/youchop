class Beat < ApplicationRecord
  has_one :youtube
  has_one :pad_timing
  has_one :sequencer
  belongs_to :user
end
