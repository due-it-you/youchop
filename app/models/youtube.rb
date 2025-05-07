class Youtube < ApplicationRecord
  validates :video_title, presence: true
  validates :video_id, presence: true

  belongs_to :beat
end
