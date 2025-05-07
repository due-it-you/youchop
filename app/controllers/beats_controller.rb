class BeatsController < ApplicationController

  private

  def beat_params
    params.require(:beat).permit(:beat_title, :beats_data, :youtubes_data, :sequencers_data, :pad_timings_data)
  end
end
