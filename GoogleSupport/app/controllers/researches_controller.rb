class ResearchesController < ActionController::Base
  respond_to  :json,:html
  protect_from_forgery

  #index files
  def index
    @researches = Research.all || []
  end

  def show
  	@research = Research.find(params[:id])
  	respond_with(@research)
  end

  def create
  	research = Research.create('bookmarks' => params[:bookmarks])
    # render :json => research.to_json
    head :ok
  end

end
