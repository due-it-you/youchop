class BeatsController < ApplicationController
  def create
    if !user_signed_in?
      return
    end
    ActiveRecord::Base.transaction do
      beats_data_json = JSON.parse(beat_params[:beats_data])
      youtubes_data_json = JSON.parse(beat_params[:youtubes_data])
      sequencers_data_json = JSON.parse(beat_params[:sequencers_data])
      pad_timings_data_json = JSON.parse(beat_params[:pad_timings_data])

      @beat = current_user.beats.new(beats_data_json)
      @beat.save!

      @beat.create_youtube!(youtubes_data_json)

      @beat.create_sequencer!(sequencers_data_json)

      @beat.create_pad_timing!(pad_timings_data_json)
    end
    redirect_to mybeats_beats_path, notice: "The beat was saved successfully."
  rescue ActiveRecord::RecordInvalid => e
    flash.now[:danger] = "The beat could not be saved."
    render turbo_stream: turbo_stream.replace(
      "error_messages",
      render_to_string(partial: "shared/danger")
    ), status: :unprocessable_entity
  end

  def show
    @beat = Beat.find(params[:id])
    @youtube = @beat.youtube
    @sequencer = @beat.sequencer
    @pad_timing = @beat.pad_timing
    respond_to do |format|
      format.html
      format.json { render json: {
        beats_data:            @beat.slice(:title),
        youtubes_data:      @youtube.slice(:video_title, :video_id),
        sequencers_data:  @sequencer.slice(
                                          :bpm,
                                          :hihats_active_index,
                                          :snares_active_index,
                                          :kicks_active_index,
                                          :pads_assigned,
                                          :pad_active_index,
                                          :youtube_volume,
                                          :hihat_volume,
                                          :snare_volume,
                                          :kick_volume
                                        ),
        pad_timings_data: @pad_timing.slice(
                                          :t_time,
                                          :y_time,
                                          :u_time,
                                          :g_time,
                                          :h_time,
                                          :j_time,
                                          :b_time,
                                          :n_time,
                                          :m_time
                                        )
                                        }}
    end
  end

  def mybeats
    @beats = Beat.where(user_id: current_user.id).order(created_at: :desc).page(params[:page])
  end

  def destroy
    @beat = Beat.find(params[:id])
    if @beat.destroy!
      redirect_to mybeats_beats_path, status: :see_other, notice: "the beat is deleted successfully."
    else
      redirect_to mybeats_beats_path, status: :see_other, danger: "Error: Could not delete the beat."
    end
  end

  private

  def beat_params
    params.require(:beat).permit(:beat_title, :beats_data, :youtubes_data, :sequencers_data, :pad_timings_data)
  end
end
