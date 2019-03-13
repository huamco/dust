import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    {
        path: '',component: LoginComponent
    },
    {
        path: 'pages', component: PagesComponent,  children: [
        {path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardModule', data: {breadcrumb: 'Dashboard'}},
        {path: 'type-a', loadChildren: './pages/typea/typea.module#TypeaModule', data: {breadcrumb: 'Type A'}},
        {path: 'type-b', loadChildren: './pages/typeb/typeb.module#TypebModule', data: {breadcrumb: 'Type B'}},
        {path: 'alarm', loadChildren: './pages/alarm/alarm.module#AlarmModule', data: {breadcrumb: '알림내역'}},
        {path: 'm-search', loadChildren: './pages/m-search/m-search.module#MSearchModule', data: {breadcrumb: '장비검색'}},
        {path: 'system', loadChildren: './pages/system/system.module#SystemModule', data: {breadcrumb: 'System'}},
        {path: 'admin', loadChildren: './pages/admin/admin.module#AdminModule', data: {breadcrumb: 'Admin'}},
            // { path: 'ui', loadChildren: './pages/ui/ui.module#UiModule', data: { breadcrumb: 'UI' } }
            // { path: 'form-controls', loadChildren: './pages/form-controls/form-controls.module#FormControlsModule', data: { breadcrumb: 'Form Controls' } },
            // { path: 'tables', loadChildren: './pages/tables/tables.module#TablesModule', data: { breadcrumb: 'Tables' } },
            // { path: 'icons', loadChildren: './pages/icons/icons.module#IconsModule', data: { breadcrumb: 'Material Icons' } },
            // { path: 'drag-drop', loadChildren: './pages/drag-drop/drag-drop.module#DragDropModule', data: { breadcrumb: 'Drag & Drop' } },
            // { path: 'schedule', loadChildren: './pages/schedule/schedule.module#ScheduleModule', data: { breadcrumb: 'Schedule' } },
            // { path: 'mailbox', loadChildren: './pages/mailbox/mailbox.module#MailboxModule', data: { breadcrumb: 'Mailbox' } },
            // { path: 'chat', loadChildren: './pages/chat/chat.module#ChatModule', data: { breadcrumb: 'Chat' } },
            // { path: 'maps', loadChildren: './pages/maps/maps.module#MapsModule', data: { breadcrumb: 'Maps' } },
            // { path: 'charts', loadChildren: './pages/charts/charts.module#ChartsModule', data: { breadcrumb: 'Charts' } },
            // { path: 'dynamic-menu', loadChildren: './pages/dynamic-menu/dynamic-menu.module#DynamicMenuModule', data: { breadcrumb: 'Dynamic Menu' }  },
            // { path: 'blank', component: BlankComponent, data: { breadcrumb: 'Blank page' } },
            // { path: 'search', component: SearchComponent, data: { breadcrumb: 'Search' } }
        ]
    }
    // }
    /*{ path: 'landing', loadChildren: './pages/landing/landing.module#LandingModule' },*/
    // { path: '', loadChildren: './pages/login/login.module#LoginModule' },
    // { path: 'register', loadChildren: './pages/register/register.module#RegisterModule' },
    /*    { path: 'error', component: ErrorComponent, data: { breadcrumb: 'Error' } },
        { path: '**', component: NotFoundComponent }*/
];





// export const routes: Routes = [
//     {
//         path: '',
//         component: LoginComponent , children: [
//             { path: 'pages', component : PagesComponent},
//             { path: 'pages/dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardModule', data: { breadcrumb: 'Dashboard' } },
//             { path: 'pages/type-a', loadChildren: './pages/typea/typea.module#TypeaModule', data: { breadcrumb: 'Type A' } },
//             { path: 'pages/type-b', loadChildren: './pages/typeb/typeb.module#TypebModule', data: { breadcrumb: 'Type B' } },
//             { path: 'pages/alarm', loadChildren: './pages/alarm/alarm.module#AlarmModule', data: { breadcrumb: '알림내역' } },
//             { path: 'pages/m-search', loadChildren: './pages/m-search/m-search.module#MSearchModule', data: { breadcrumb: '장비검색' } },
//             { path: 'pages/system', loadChildren: './pages/system/system.module#SystemModule', data: { breadcrumb: 'System' } },
//             { path: 'pages/admin', loadChildren: './pages/admin/admin.module#AdminModule', data: { breadcrumb: 'Admin' } },
//             // { path: 'ui', loadChildren: './pages/ui/ui.module#UiModule', data: { breadcrumb: 'UI' } }
//             // { path: 'form-controls', loadChildren: './pages/form-controls/form-controls.module#FormControlsModule', data: { breadcrumb: 'Form Controls' } },
//             // { path: 'tables', loadChildren: './pages/tables/tables.module#TablesModule', data: { breadcrumb: 'Tables' } },
//             // { path: 'icons', loadChildren: './pages/icons/icons.module#IconsModule', data: { breadcrumb: 'Material Icons' } },
//             // { path: 'drag-drop', loadChildren: './pages/drag-drop/drag-drop.module#DragDropModule', data: { breadcrumb: 'Drag & Drop' } },
//             // { path: 'schedule', loadChildren: './pages/schedule/schedule.module#ScheduleModule', data: { breadcrumb: 'Schedule' } },
//             // { path: 'mailbox', loadChildren: './pages/mailbox/mailbox.module#MailboxModule', data: { breadcrumb: 'Mailbox' } },
//             // { path: 'chat', loadChildren: './pages/chat/chat.module#ChatModule', data: { breadcrumb: 'Chat' } },
//             // { path: 'maps', loadChildren: './pages/maps/maps.module#MapsModule', data: { breadcrumb: 'Maps' } },
//             // { path: 'charts', loadChildren: './pages/charts/charts.module#ChartsModule', data: { breadcrumb: 'Charts' } },
//             // { path: 'dynamic-menu', loadChildren: './pages/dynamic-menu/dynamic-menu.module#DynamicMenuModule', data: { breadcrumb: 'Dynamic Menu' }  },
//             // { path: 'blank', component: BlankComponent, data: { breadcrumb: 'Blank page' } },
//             // { path: 'search', component: SearchComponent, data: { breadcrumb: 'Search' } }
//         ]
//     },
//     // { path: 'pages', component : PagesComponent
//     // }
//     /*{ path: 'landing', loadChildren: './pages/landing/landing.module#LandingModule' },*/
//     // { path: '', loadChildren: './pages/login/login.module#LoginModule' },
//     // { path: 'register', loadChildren: './pages/register/register.module#RegisterModule' },
// /*    { path: 'error', component: ErrorComponent, data: { breadcrumb: 'Error' } },
//     { path: '**', component: NotFoundComponent }*/
// ];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
   preloadingStrategy: PreloadAllModules,  // <- comment this line for activate lazy load
   // useHash: true
});
