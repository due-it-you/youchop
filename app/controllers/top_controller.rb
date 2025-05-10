class TopController < ApplicationController
  def index
    @beat = Beat.new
  end
end
