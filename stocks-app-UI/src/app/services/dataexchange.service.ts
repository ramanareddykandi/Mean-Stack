import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
  })

export class ExchangeData{
    private data = {};  
  
    setOption( value) {      
       this.data = value;  
     }  
     
     getOption() {  
       return this.data;  
     }  
  
}