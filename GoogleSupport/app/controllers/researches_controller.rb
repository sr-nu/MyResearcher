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
      format.json { render :json => @research }
      format.html { render :json => @research }
      format.xml { render :json => @research }      
    end

    # render :text => "openTab("+@research.id.to_s+")"
    
  end

  # def options
  #   # if access_allowed?
  #     set_access_control_headers
  #     head :ok
  #   # else
  #   #   head :forbidden
  #   # end
  # end

  # private
  # def set_access_control_headers 
  #   headers['Access-Control-Allow-Origin'] = request.env['HTTP_ORIGIN']
  #   headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
  #   headers['Access-Control-Max-Age'] = '1000'
  #   headers['Access-Control-Allow-Headers'] = '*,x-requested-with'
  # end

end
