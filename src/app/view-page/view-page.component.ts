import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.scss']
})
export class ViewPageComponent implements OnInit {

  constructor(private router: Router) { }

  onBackClick(){
    this.router.navigate(["../"])
  }

  ngOnInit(): void {
  }

}
