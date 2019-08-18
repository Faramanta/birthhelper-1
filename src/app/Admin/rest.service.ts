import { Injectable } from '@angular/core';
import { IDictItem } from './dict.service';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { IEntityItem, ISet, IEntity } from './entity.service';
import { ITableFilters } from './table/table/table.component';
import { IContainer, IContainerData } from './container.service';

export interface ISettingsParams {
  mode: string;
  segment: string;
  script?: string;
  resource?: string;
};

export interface IRestParams {
  [name: string]: string; 
}

export interface IRestBody {
  body: any;
}

@Injectable()
export class RestService {

  constructor(
    private http: HttpClient,
    private api: ApiService
  ) { 
    console.log('ADMIN REST SERVICE', this);
  }

  public createEntity( key: string , data: IEntityItem): Observable<any>{
    const entSetting: ISettingsParams = {
      mode: 'admin',
      segment: 'entity',
      resource: key
    };

    return this.postData(entSetting, data)
  }

  public deleteEntity( key: string, id: number): Observable<string>{
    const entSetting: ISettingsParams = {
      mode: 'admin',
      segment: 'entity',
      resource: key
    };

    return this.remData<string>( entSetting, { id: id.toString() });
    
  }

  public getFormFieldCurrentValue( name: string ): any {
    return null;
  }

  public getEntityFilters( key: string ): Observable<ITableFilters[]>{
    const entFiltersSetting: ISettingsParams = {
      mode: 'admin',
      segment: 'entity',
      resource: key,
      script: 'filters'
    };

    return this.getData<ITableFilters[]>( entFiltersSetting );
  }

  public getEntitySet( key: string ): Observable<ISet>{
    const entSetSetting: ISettingsParams = {
      mode: 'admin',
      segment: 'entity',
      resource: key,
      script: 'set'
    };

    return this.getData<ISet>( entSetSetting );
  }

  public getEntities( key: string, page?: number, qp?: IRestParams ): Observable<IEntityItem[]> {
    const entSetting: ISettingsParams = {
      mode: 'admin',
      segment: 'entity',
      resource: key
    };

    const data: IRestParams = page ? { skip: (20 * (page-1)).toString()} : null;

    if( qp ) Object.assign(data, qp);

    return this.getData<IEntityItem[]>( entSetting, data );
  }

  public getContainersList( key: string, page?: number, qp?: IRestParams ): Observable<IContainerData[]> {

    const entSetting: ISettingsParams = {
      mode: 'admin',
      segment: 'container',
      resource: key
    };

    const data: IRestParams = page ? { skip: (20 * (page-1)).toString()} : null;

    if( qp ) Object.assign(data, qp);

    return this.getData<IContainerData[]>( entSetting, data );
  }

  public getContainerFromId( key: string, id: number, qp?: IRestParams ): Observable<IContainerData[]> {

    const entSetting: ISettingsParams = {
      mode: 'admin',
      segment: `containers/${key}`,
      resource: ''+id
    };

    return this.getData<IContainerData[]>( entSetting, qp );
  }

  public getDict( name: string, page?: number ): Observable<IDictItem[]> {
    const dictSetting: ISettingsParams = {
      mode: 'admin',
      segment: 'dict',
      resource: name
    };

    const data: IRestParams = page ? { skip: (20 * (page-1)).toString()} : null;

    return this.getData<IDictItem[]>( dictSetting, data );
  }

  public getData<T>( path: ISettingsParams, data?: IRestParams): Observable<T>{

    if( path ) Object.keys( path ).forEach(key => path[key] = '/' + path[key]);

    let url = `${ this.api.getApiPath() + ':3000' }${path.mode ? path.mode : ''}${path.segment ? path.segment : ''}${path.resource ? path.resource : ''}${path.script ? path.script : ''}`;
   
    let req = this.http.get( url, { params: data } );

    return req as Observable<T>;
  }

  public postData<T>( path: ISettingsParams, data?: IEntityItem): Observable<T>{

    if( path ) Object.keys( path ).forEach(key => path[key] = '/' + path[key]);

    let url = `${ this.api.getApiPath() + ':3000' }${path.mode ? path.mode : ''}${path.segment ? path.segment : ''}${path.resource ? path.resource : ''}${path.script ? path.script : ''}`;
   
    let req = this.http.post( url, data );

    return req as Observable<T>;
  }

  public remData<T>( path: ISettingsParams, data?: IRestParams): Observable<T>{

    if( path ) Object.keys( path ).forEach(key => path[key] = '/' + path[key]);

    let url = `${ this.api.getApiPath() + ':3000' }${path.mode ? path.mode : ''}${path.segment ? path.segment : ''}${path.resource ? path.resource : ''}${path.script ? path.script : ''}`;
   
    let req = this.http.request('delete', url, {body:data} );

    return req as Observable<T>;
  }

}
