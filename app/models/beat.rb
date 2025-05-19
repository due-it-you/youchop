class Beat < ApplicationRecord
  validates :title, presence: true, length: { maximum: 35 }

  has_one :youtube, dependent: :destroy
  has_one :pad_timing, dependent: :destroy
  has_one :sequencer, dependent: :destroy
  belongs_to :user
end
