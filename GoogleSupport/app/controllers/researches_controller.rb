class ResearchesController < ActionController::Base
  respond_to  :json,:html
  protect_from_forgery

  def index
    @researches = Research.all || []
  end

  def show
    research = Research.find(params[:id])
    if(!research.guid || (research.guid == params[:r])) 
      @research = research
    end
  end

  def create
  	research = Research.create('bookmarks' => params[:bookmarks], 'guid' => params[:r])
    render :text => research.id
  end

end
