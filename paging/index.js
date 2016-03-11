import app from '../../module'
import html from './index.html'
app.directive('mcPaging', directive)

function directive() {
    return {
        restrict: 'E',
        template: html,
        scope: {
            current: '=',
            total: '=',
            len: '='         
        },
        controller: /*@ngIniect*/ ($scope) => {
            $scope.current = 1
            $scope.total = 0
            $scope.isShow = false
            let middle = Math.ceil($scope.len / 2) 

            $scope.$watchGroup(['total', 'len', 'current'], ([total = 0, len = 0, current = 1] = []) => {  
                if(!current || current < 0 || !total || !len || total <= 0 || len <= 0 || current > total){
                    $scope.isShow = false
                    return
                } 
                $scope.isShow = true 

                $scope.array = Array(Math.min(total, len)).fill(1).map((v, index) => {
                    return index + 1
                })


                if ($scope.current <= middle) {
                    for(let i = 0; i < $scope.array.length; i ++){
                        $scope.array[i] = i + 1
                    }
                }
                else if ($scope.current > middle && $scope.current < ($scope.total - middle + 1 )){
                    for (let i = 0; i < $scope.array.length; i ++){
                        $scope.array[i] = $scope.current + i + 1 - middle 
                    }
                }
                else if ($scope.total > $scope.array.length && $scope.current >= ($scope.total - middle + 1)){
                    for (let i = 0; i < $scope.array.length; i ++){
                        $scope.array[i] = $scope.total - ($scope.array.length - i) + 1
                    }                    
                }                 
                               
            })

            $scope.getPage = (index) => {
                $scope.current = index
            }
            $scope.previous = () => {
                if($scope.current > 1){
                    $scope.current --
                }
            }
            $scope.next = () => {
                if($scope.current < $scope.total){
                    $scope.current ++
                }
            }
            $scope.firstPage = () => {
                $scope.current = 1
            }
            $scope.lastPage = () => {
                $scope.current = $scope.total
            }
        }
    }
}