class ResearchesController < ActionController::Base
  grant :all, :show, :create
  respond_to  :json
  protect_from_forgery

  def show
  	@research = Research.find(params[:id])
  	respond_wth(@research)
  end

  def create
  	Research.create('bookmarks' => params[:bookmarks]).id
  end

end
