export class FilterService {
    getFilter(typeName:string, typeGenre:any, typeYear:any, typeNetwork:any, array:any){

        let filtered: string[];
        let pristineArr = array;

        if(typeName != null){
           filtered = pristineArr.filter(item => {
                return item.title.toLowerCase().indexOf(typeName.toLowerCase()) > -1;
            });
            pristineArr = filtered
        }

        if(typeGenre != null){
            filtered = pristineArr.filter(item => {
                return item.type.indexOf(typeGenre) > -1;
            });
            pristineArr = filtered
        }
        if(typeNetwork != null){

            filtered = pristineArr.filter(item => {
                return item.network.indexOf(typeNetwork) > -1;
            });
            pristineArr = filtered
        }
        if(typeYear != null){

            filtered = pristineArr.filter(item => {
                let itemYearArr = item.premiere.split('.');
                let itemYear = itemYearArr[itemYearArr.length - 1];
                if(itemYear == itemYear){
                    return item.premiere.indexOf(typeYear) > -1;
                }
            });
           pristineArr = filtered

        }

        return pristineArr
    }
}