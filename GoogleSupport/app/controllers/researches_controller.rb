class ResearchesController < ActionController::Base
  respond_to  :json,:html
  protect_from_forgery

  def index
    @researches = Research.all || []
  end

  def show
    if Research.exists?(params[:id])
      @research = Research.find(params[:id])
      # Research.find(params[:id]).delete
    else
        flash[:error] = "Your content is no longer available, Kindly close this window and click on your chrome extention to search...."
    end
  end

  def create
  	@research = Research.create('bookmarks' => params[:bookmarks], 'guid' => params[:r])
    render :text => @research.id
  end

end
