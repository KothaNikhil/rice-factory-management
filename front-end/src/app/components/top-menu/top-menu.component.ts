import { Component, OnInit, ViewChild, ElementRef, Renderer2, HostListener } from '@angular/core';
import { FirmAuthService } from 'src/app/modules/firm-auth/services/firm-auth.service';

@Component({
    selector: 'app-top-menu',
    templateUrl: './top-menu.component.html',
    styleUrls: ['./top-menu.component.scss'],
    standalone: false
})
export class TopMenuComponent implements OnInit {

  showProfileMenu = false;
  @ViewChild('profileLink', { static: true }) profileLink!: ElementRef;
  @ViewChild('profileMenu', { static: true }) profileMenu!: ElementRef;

  constructor(private firmAuthService: FirmAuthService, private renderer: Renderer2) { }

  ngOnInit(): void {
  }
  
  hideProfileMenu() {
    this.showProfileMenu = false;
  }

  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
    if (this.showProfileMenu) {
      const rect = this.profileLink.nativeElement.getBoundingClientRect();
      this.renderer.setStyle(this.profileMenu.nativeElement, 'top', `${rect.bottom}px`);
      this.renderer.setStyle(this.profileMenu.nativeElement, 'right', `${window.innerWidth - rect.right}px`);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.showProfileMenu
       && !this.profileLink.nativeElement.contains(event.target)
      ) {
      this.hideProfileMenu();
    }
  }

  logout() {
    this.firmAuthService.logoutAndNavigate();
  }
}
