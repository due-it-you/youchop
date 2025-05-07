class BeatsController < ApplicationController
  def create
    ActiveRecord::Base.transaction do
      beats_data_json = JSON.parse(beat_params[:beats_data])
      youtubes_data_json = JSON.parse(beat_params[:youtubes_data])
      sequencers_data_json = JSON.parse(beat_params[:sequencers_data])
      pad_timings_data_json = JSON.parse(beat_params[:pad_timings_data])

      # raise if beats_data_json["title"].blank?

      @beat = current_user.beats.new(beats_data_json)
      @beat.save!

      @beat.create_youtube!(youtubes_data_json)

      @beat.create_sequencer!(sequencers_data_json)

      @beat.create_pad_timing!(pad_timings_data_json)
    end
    redirect_to mybeats_beats_path, notice: 'The beat was saved successfully.'
  end

  def mybeats

  end

  private

  def beat_params
    params.require(:beat).permit(:beat_title, :beats_data, :youtubes_data, :sequencers_data, :pad_timings_data)
  end
end
