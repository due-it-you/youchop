class Beat < ApplicationRecord
  has_one :youtube
  belongs_to :user
end
