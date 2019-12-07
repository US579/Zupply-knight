module Api
  module V1
    class FindpathsController < ApplicationController
    #   def index
    #     render json: {status: 'SUCCESS', message:'Loaded articles'},status: :ok
    #   end
      def show
        lis = params[:id].split(",").map(&:to_i)
        startPoint =  Array[lis[0],lis[1]]
        endPoint = Array[lis[2],lis[3]]
        path = Array[]
        $i = startPoint[0]
        # main algorithm to find path 
        if startPoint[0] < endPoint[0]
            while $i < endPoint[0]
                $i += 1
                path.push([$i,startPoint[1]])
            end
            $j = startPoint[1]
            if startPoint[1] < endPoint[1]
                while $j < endPoint[1]
                    $j += 1
                    path.push([$i,$j])
                end
            else
                while $j > endPoint[1]
                    $j -= 1
                    path.push([$i,$j])
                end
            end

        else
            while $i > endPoint[0]
                $i -= 1
                path.push([$i,startPoint[1]])
            end
             $j = startPoint[1]
            if startPoint[1] < endPoint[1]
                while $j < endPoint[1]
                    $j += 1
                    path.push([$i,$j])
                end
            else
                while $j > endPoint[1]
                    $j -= 1
                    path.push([$i,$j])
                end
            end
        end
        render json: {status: 'SUCCESS', message:'Loaded article', data:path},status: :ok
      end

    end
  end
end

