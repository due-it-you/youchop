class AddVideoTitleToYoutube < ActiveRecord::Migration[7.2]
  def change
    add_column :youtubes, :video_title, :string, null: false
  end
end
