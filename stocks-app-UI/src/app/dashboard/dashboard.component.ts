import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AllCommunityModules, Module} from '@ag-grid-community/all-modules';
import { AgGridAngular } from '@ag-grid-community/angular';
import { HttpService } from '../services/httpservice.service';
import { Router, NavigationExtras } from '@angular/router';
import { ExchangeData } from '../services/dataexchange.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  rowData = [];
 constructor(private dataService:ExchangeData,private httpClient: HttpClient, private httpService: HttpService,private router: Router) {
   httpService.getDashBoardData().subscribe((response: any) => {
     this.rowData = response.data;
   });
 }

  columnDefs = [
    { headerName: 'ID', field: '_id', sortable: true, filter: true, checkboxSelection: true },
    { headerName: 'Title', field: 'title', sortable: true, filter: true },
    { headerName: 'Price', field: 'price', sortable: true, filter: true }
  ];

  modules = AllCommunityModules;

  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  buyStocks() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    const selectedDataStringPresentation = selectedData.map(node => node._id + ' ' + node.title+''+node.price).join(', ');

    //alert(`Selected nodes: ${selectedDataStringPresentation}`);
    this.dataService.setOption(selectedData);
    this.router.navigate(['/buystocks']);
  }

  ngOnInit(){}
}
