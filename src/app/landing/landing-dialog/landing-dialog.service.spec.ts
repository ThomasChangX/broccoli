import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {
  HttpClientModule,
  HttpClient
} from '@angular/common/http';

import { LandingDialogService } from './landing-dialog.service';

describe('LandingDialogService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: LandingDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LandingDialogService],
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(LandingDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create new request for invitation', () => {
    service.requestInvit({ name: 'name', email: 'test@email.com' }).subscribe(resposne => {
      expect(resposne).not.toBeNaN();
      expect(resposne).toEqual('Registed');
    });
  });

  it('should create new request for invitation', () => {
    service.requestInvit({ name: 'usedemail@airwallex.com', email: 'usedemail@airwallex.com' }).subscribe(resposne => {
      expect(resposne).not.toBeNaN();
      expect(resposne['error']).toContain('error');
    });
  });
});
