# -*- encoding : utf-8 -*-

class HomesController < BaseController

  def index
    @number = params[:number] || 10
    @offset = params[:offset] || 0
    @users = User.limit(@number).offset(@offset).order('id')
  end

  def load_data
    per_page = params[:number] || 10
    offset = params[:offset]
    content = ""
    if offset < 100
      @users = User.limit(per_page).offset(offset).order('id')
      @users.each do |user|
        content << "<li><a href='#''>#{user.id}</a></li>"
      end
    end
    render text: content
  end

end