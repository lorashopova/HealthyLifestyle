import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
    selector: 'app-recipe.dialog',
    templateUrl: './recipe.dialog.component.html',
    styleUrls: ['./recipe.dialog.component.css']
})

export class RecipeDialogComponent implements OnInit {
    public pathname: any;

    constructor(@Inject(DOCUMENT) private document: any) { }

    ngOnInit() {
        this.pathname = this.document.location.href;
        // this.pathname = window.location.pathname;
    }

    copyToClipboard() {
        document.querySelector('input').select();
        document.execCommand('copy');
    }
}




