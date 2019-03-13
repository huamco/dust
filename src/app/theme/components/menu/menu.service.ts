import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Menu } from './menu.model';
import { verticalMenuItems, horizontalMenuItems } from './menu';
import {User} from '../../../pages/admin/user/user.model';

@Injectable()
export class MenuService {
  currentUser: User;
  currentUserLevel: number;
  constructor(private location:Location,
              private router:Router){ }

  public getVerticalMenuItems():Array<Menu> {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getUserLove(currentUser);
    let filteredMenu : Array<Menu>;
    filteredMenu = verticalMenuItems.filter((m)=>{
          return m.userLevel <= this.currentUserLevel;
    });
    console.log('filteredMenu::',filteredMenu);
    return filteredMenu;
  }

   public getUserLove(user: any){
    console.log(user);
        if(user.isAdmin){
            this.currentUserLevel = 3;
        } else if(user.isManager){
            this.currentUserLevel = 2;
        } else  if(user.isWorker){
            this.currentUserLevel = 1;
        } else {
            this.currentUserLevel = 0;
        }
        console.log('set this.currentUserLevel',this.currentUserLevel);
   }

  public setCurrentUser(user : User){
    this.currentUser = user;
    if(this.currentUser.isAdmin){
      this.currentUserLevel = 3;
    } else if(this.currentUser.isManager){
        this.currentUserLevel = 2;
    } else  if(this.currentUser.isWorker){
        this.currentUserLevel = 1;
    } else {
        this.currentUserLevel = 0;
    }
    console.log('set this.currentUserLevel',this.currentUserLevel);
  }

  public getHorizontalMenuItems():Array<Menu> {
    let filteredMenu : Array<Menu>;
    filteredMenu = horizontalMenuItems.filter((m)=>{
      return m.userLevel === this.currentUserLevel;
    })
    return filteredMenu;
  }

  public expandActiveSubMenu(menu:Array<Menu>){
      let url = this.location.path();
      let routerLink = url; // url.substring(1, url.length);
      let activeMenuItem = menu.filter(item => item.routerLink === routerLink);
      if(activeMenuItem[0]){
        let menuItem = activeMenuItem[0];
        while (menuItem.parentId != 0){
          let parentMenuItem = menu.filter(item => item.id == menuItem.parentId)[0];
          menuItem = parentMenuItem;
          this.toggleMenuItem(menuItem.id);
        }
      }
  }

  public toggleMenuItem(menuId){
    let menuItem = document.getElementById('menu-item-'+menuId);
    let subMenu = document.getElementById('sub-menu-'+menuId);
    if(subMenu){
      if(subMenu.classList.contains('show')){
        subMenu.classList.remove('show');
        menuItem.classList.remove('expanded');
      }
      else{
        subMenu.classList.add('show');
        menuItem.classList.add('expanded');
      }
    }
  }

  public closeOtherSubMenus(menu:Array<Menu>, menuId){
    let currentMenuItem = menu.filter(item => item.id == menuId)[0];
    if(currentMenuItem.parentId == 0 && !currentMenuItem.target){
      menu.forEach(item => {
        if(item.id != menuId){
          let subMenu = document.getElementById('sub-menu-'+item.id);
          let menuItem = document.getElementById('menu-item-'+item.id);
          if(subMenu){
            if(subMenu.classList.contains('show')){
              subMenu.classList.remove('show');
              menuItem.classList.remove('expanded');
            }
          }
        }
      });
    }
  }


}
