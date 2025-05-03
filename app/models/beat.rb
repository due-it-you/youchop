class Beat < ApplicationRecord
  has_one :youtube
  has_one :pad_timing
  belongs_to :user
end
