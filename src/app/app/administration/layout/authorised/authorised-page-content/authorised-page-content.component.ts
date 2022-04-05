import { Component, OnInit } from '@angular/core';
import { AuthorisedSideNavService } from '../services/authorised-side-nav.service';

@Component({
  selector: 'app-authorised-page-content',
  templateUrl: './authorised-page-content.component.html',
  styleUrls: ['./authorised-page-content.component.css']
})
export class AuthorisedPageContentComponent implements OnInit {

  constructor(public sideNavService: AuthorisedSideNavService) { }

  ngOnInit(): void {
  }

}
