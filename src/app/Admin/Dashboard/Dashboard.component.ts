import { Component, OnInit } from '@angular/core';
import { MenuService } from './menu.service';

export enum EMENUMODE{
  'CREATE',
  'EDIT',
  'DELETE',
}

export interface IMenuRepo {
  name: string;
  containerKey?: string;
  slotKey?: string;
  title: string;
  titleVoc: string;
  titleVocs: string;
  type: string;
  mime?: string;
  modes: EMENUMODE[];
}
@Component({
  selector: 'app-Dashboard',
  templateUrl: './Dashboard.component.html',
  styleUrls: ['./Dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public selectedMenu: IMenuRepo;
  public selectedMode: EMENUMODE;

  public readonly menuRepo: IMenuRepo[] = [
    {
      name: 'doctor',
      title: 'Специалисты',
      titleVoc: 'специалиста',
      titleVocs: 'специалисты',
      type: 'entity',
      modes: [
        EMENUMODE.CREATE,
        EMENUMODE.EDIT,
        EMENUMODE.DELETE,
      ]
    },
    {
      name: 'services',
      title: 'Услуги',
      titleVoc: 'услугу',
      titleVocs: 'услуги',
      type: 'entity',
      modes: [
        EMENUMODE.CREATE,
        EMENUMODE.EDIT,
        EMENUMODE.DELETE,
      ]
    },
    {
      name: 'service_containers',
      containerKey: 'container_services',
      title: 'Контейнеры услуг',
      titleVoc: 'контейнер',
      titleVocs: 'контейнера',
      type: 'container',
      modes: [
        EMENUMODE.CREATE,
        EMENUMODE.DELETE,
        EMENUMODE.EDIT,
      ]
    },
    {
      name: 'clinics',
      title: 'Клиники',
      titleVoc: 'клинику',
      titleVocs: 'клиники',
      type: 'entity',
      modes: [
        EMENUMODE.CREATE,
        EMENUMODE.EDIT,
        EMENUMODE.DELETE,
      ]
    },
    {
      name: 'phones',
      title: 'Телефоны системы',
      titleVoc: 'телефон',
      titleVocs: 'телефоны',
      type: 'entity',
      modes: [
        EMENUMODE.CREATE,
        EMENUMODE.EDIT,
        EMENUMODE.DELETE,
      ]
    },
    {
      name: 'phone_containers',
      containerKey: 'container_phones',
      title: 'Контейнеры телефонов',
      titleVoc: 'контейнер',
      titleVocs: 'контейнера',
      type: 'container',
      modes: [
        EMENUMODE.CREATE,
        EMENUMODE.DELETE,
        EMENUMODE.EDIT,
      ]
    },
    {
      name: 'facilities_containers',
      containerKey: 'container_facilities',
      title: 'Контейнеры удобств в клиниках',
      titleVoc: 'контейнер',
      titleVocs: 'контейнера',
      type: 'container',
      modes: [
        EMENUMODE.CREATE,
        EMENUMODE.DELETE,
        EMENUMODE.EDIT,
      ]
    },
    {
      name: 'specialities_clinic_containers',
      containerKey: 'container_specialities',
      title: 'Контейнеры специализаций клиник',
      titleVoc: 'контейнер',
      titleVocs: 'контейнера',
      type: 'container',
      modes: [
        EMENUMODE.CREATE,
        EMENUMODE.DELETE,
        EMENUMODE.EDIT,
      ]
    },
    {
      name: 'services_slots',
      slotKey: 'slot_service_natal',
      title: 'Слоты услуг родовспоможения',
      titleVoc: 'слот',
      titleVocs: 'слота',
      type: 'slot',
      modes: [
        EMENUMODE.CREATE,
        EMENUMODE.DELETE,
        EMENUMODE.EDIT,
      ]
    },
    {
      name: 'images',
      title: 'Изображения системы',
      titleVoc: 'изображение',
      titleVocs: 'изображения',
      type: 'entity',
      mime: 'image',
      modes: [
        EMENUMODE.CREATE,
        EMENUMODE.DELETE,
        EMENUMODE.EDIT,
      ]
    },
    {
      name: 'birthtype',
      title: 'Виды родов(словарь)',
      titleVoc: 'вид родов',
      titleVocs: 'виды родов',
      type: 'entity',
      //mime: 'image',
      modes: [
        EMENUMODE.CREATE,
        EMENUMODE.DELETE,
        EMENUMODE.EDIT,
      ]
    },
    {
      name: 'doctor_position',
      title: 'Должности врачей(словарь)',
      titleVoc: 'должность',
      titleVocs: 'должности',
      type: 'entity',
      //mime: 'image',
      modes: [
        EMENUMODE.CREATE,
        EMENUMODE.DELETE,
        EMENUMODE.EDIT,
      ]
    },
    {
      name: 'doctor_category',
      title: 'Категории врачей(словарь)',
      titleVoc: 'категория',
      titleVocs: 'категории',
      type: 'entity',
      //mime: 'image',
      modes: [
        EMENUMODE.CREATE,
        EMENUMODE.DELETE,
        EMENUMODE.EDIT,
      ]
    },
    {
      name: 'specialities_clinic',
      title: 'Специализация клиник(словарь)',
      titleVoc: 'специализация',
      titleVocs: 'специализации',
      type: 'entity',
      //mime: 'image',
      modes: [
        EMENUMODE.CREATE,
        EMENUMODE.DELETE,
        EMENUMODE.EDIT,
      ]
    },
    {
      name: 'facilities',
      title: 'Удобства клиник(словарь)',
      titleVoc: 'удобство',
      titleVocs: 'удобства',
      type: 'entity',
      //mime: 'image',
      modes: [
        EMENUMODE.CREATE,
        EMENUMODE.DELETE,
        EMENUMODE.EDIT,
      ]
    }
  ]


  constructor(private menuService: MenuService ) { }

  ngOnInit() {

    this.menuService.menuStream$.subscribe( menu => this.selectedMenu = menu);

    this.menuService.submenuStream$.subscribe( mode => this.selectedMode = mode);
  }



}
