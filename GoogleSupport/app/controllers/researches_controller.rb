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

  def new
    @research = Research.new()
  end

  def create
  	@research = Research.create('bookmarks' => params[:bookmarks])
    respond_to do |format|
      format.json { render :json => @research.id }
      format.html { render :text => @research.id }
      format.xml { render :xml => @research.id }
    end
    
  end

end
