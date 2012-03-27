class ApplicationController < ActionController::Base
  protect_from_forgery
  
  before_filter :prepair_for_mobile
  
  def login_required
    if session[:user]
      return true
    end
    flash[:warning]='Please login to continue'
    session[:return_to]=request.request_uri
    redirect_to :controller => "user", :action => "login"
    return false 
  end

  def current_user_session
    User.find(session[:User])
  end
  
  def current_user
    return User.find(session[:user])
  end
  helper_method :current_user

  def isAdmin?
    return current_user.admin
  end
  helper_method :isAdmin?

  def redirect_to_stored
    if return_to = session[:return_to]
      session[:return_to]=nil
      redirect_to_url(return_to)
    else
      redirect_to :controller=>'user', :action=>'welcome'
    end
  end
  
  private
 
#These are in users_controller also?  
#  def set_admin(curr_user)
#    curr_user.admin = true
#  end
#  helper_method :set_admin
  
#  def rm_admin(curr_user)
#    curr_user.admin = false
#  end
#  helper_method :rm_admin  
  
  def mobile_device?
    if session[:mobile_param]
      session[:mobile_param] == "1"
    else
      request.user_agent =~ /Mobile|webOS/
    end
  end
  helper_method :mobile_device?

  def prepair_for_mobile
    session[:mobile_param] = params[:mobile] if params[:mobile]
    request.format = :mobile if mobile_device?
  end
end
