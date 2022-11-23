import { of } from "rxjs";

export const httpClientMock = (): any => ({
  get: jasmine.createSpy().and.returnValue(of(null)),
  post: jasmine.createSpy().and.returnValue(of(null)),
  put: jasmine.createSpy().and.returnValue(of(null)),
  delete: jasmine.createSpy().and.returnValue(of(null)),
});