import { httpClientMock } from '../../testing/angular/common/http/http-client.mock.spec';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    service = new LoginService(httpClientMock());
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should work', (done) => {
    service['getUser']('xxx', 'yyy').subscribe((ret) => {
      expect(service['http'].get).toHaveBeenCalledOnceWith('http://localhost:3000/users?username=xxx&password=yyy');
      done();

    });
  })
});
