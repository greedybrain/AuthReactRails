class StaticController < ApplicationController

     def home
          render json: {status: "Working"}
     end

end
