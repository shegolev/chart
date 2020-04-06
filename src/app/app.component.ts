import { Component, OnInit} from '@angular/core';
import { HttpService} from './service/http.service';
import { PaginatorService} from './service/paginator.service';
import { FilterService} from './service/filter.sevice';

@Component({
    selector: 'premiere-chart-app',
    templateUrl: '../templates/tableTemplate.html',
    styleUrls: ['../style/style.css', '../style/font-awesome.min.css'],
    providers: [HttpService, PaginatorService, FilterService]
})
export class AppComponent implements OnInit  {

    filterByName:string = null;
    filterByGenre:string = null;
    filterByYear:string = null;
    filterByNetwork:string = null;

    filteredArray: any;
    items: string[];
    itemsPerPage: number = 10;
    pager: any= {};
    pagedItems: any[];
    currentPage: number;

    constructor(private httpService: HttpService,
                private paginatorService : PaginatorService,
                private filterService : FilterService){}

    ngOnInit(){
        this.httpService.getData().subscribe(
            data => {this.items=data["serialsList"];
                let results = data["serialsList"];
                this.filteredArray = results;
                this.setPage(1);
        });
    }
    setPage(page: number) {
        this.currentPage = page;
        this.pager = this.paginatorService.getPager(this.filteredArray.length, this.currentPage, this.itemsPerPage);
        this.pagedItems = this.filteredArray.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
    showOnPage(value: number) {
        this.itemsPerPage = value;
        this.setPage(1);
    }

    filteredBy(){
        this.filteredArray = this.filterService.getFilter(this.filterByName, this.filterByGenre, this.filterByYear, this.filterByNetwork, this.items);
        this.setPage(1);
    }

    sortBy(name, direction) {

        let sortedArray: any = this.items;

        if(direction == 'up'){
           sortedArray = this.filteredArray.sort(( a:any, b:any ) => {
               switch (name){
                   case 'title': return a.title > b.title ? 1 : -1;
                   case 'season' : return  a.season > b.season ? 1 : -1;
                   case 'premiere' : return  new Date(a.premiere) > new Date(b.premiere) ? 1 : -1;
                   default : return
               }

           });
        }
        if(direction == 'down'){
            sortedArray = this.filteredArray.sort(( a:any, b:any ) => {

                switch (name){
                    case 'title': return a.title < b.title ? 1 : -1;
                    case 'season' : return  a.season < b.season ? 1 : -1;
                    case 'premiere' : return  new Date(a.premiere) < new Date(b.premiere) ? 1 : -1;
                    default : return
                }
            });
        }

        this.filteredArray = sortedArray;
        this.setPage(1);
    }

    setClass(type) {
        switch (type){
            case 'drama': return 'purple';
            case 'horror' : return  'black';
            case 'animation' : return  'yellow';
            case 'comedy' : return  'red';
            case 'fantasy' : return  'green';
            case 'documentary' : return  'gray';
            case 'crime' : return  'dark-gray';
            default : return 'genre'
        }
    }
}
