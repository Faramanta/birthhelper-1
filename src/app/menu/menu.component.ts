import {Component, OnInit} from '@angular/core';
import {AuthService} from '../modules/auth-module/auth.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

    constructor(public auth: AuthService) {
    }

    ngOnInit(): void {
    }

}
